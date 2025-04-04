import React, { useState, useEffect } from 'react';
import { getContractInfo, checkSchoolExists, createRegisterSchoolPayload, createUpdateSchoolPayload } from '../services/api';
import { useAptosWallet } from '../services/AptosWalletProvider';
import './RegisterSchool.css';

const RegisterSchool = () => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    address: '',
    accreditation: '',
    contact: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [contractInfo, setContractInfo] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const [schoolExists, setSchoolExists] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Use Aptos wallet
  const { connect, disconnect, connected, wallet, account, walletAddress, signAndSubmitTransaction } = useAptosWallet();

  // Fetch contract information
  useEffect(() => {
    const fetchContractInfo = async () => {
      try {
        const response = await getContractInfo();
        setContractInfo(response.data);
      } catch (err) {
        console.error('Error fetching contract info:', err);
      }
    };

    fetchContractInfo();
  }, []);

  // Check if school already exists for the connected wallet
  useEffect(() => {
    const checkSchool = async () => {
      if (connected && walletAddress) {
        try {
          const { exists, data } = await checkSchoolExists(walletAddress);
          setSchoolExists(exists);
          
          if (exists && data) {
            // If school exists, pre-fill the form with existing data
            setFormData({
              name: new TextDecoder().decode(new Uint8Array(data.name)),
              country: new TextDecoder().decode(new Uint8Array(data.country)),
              address: new TextDecoder().decode(new Uint8Array(data.address)),
              accreditation: new TextDecoder().decode(new Uint8Array(data.accreditation)),
              contact: new TextDecoder().decode(new Uint8Array(data.contact))
            });
            setIsUpdating(true);
          } else {
            setIsUpdating(false);
          }
        } catch (err) {
          console.error('Error checking if school exists:', err);
        }
      }
    };

    checkSchool();
  }, [connected, walletAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const connectWallet = async () => {
    try {
      await connect();
    } catch (err) {
      setError(`Failed to connect wallet: ${err.message}`);
      console.error('Error connecting wallet:', err);
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnect();
      setSchoolExists(false);
      setIsUpdating(false);
      setFormData({
        name: '',
        country: '',
        address: '',
        accreditation: '',
        contact: ''
      });
    } catch (err) {
      console.error('Error disconnecting wallet:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name.trim() || !formData.country.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    // Check if wallet is connected
    if (!connected || !walletAddress) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Create the transaction payload based on whether we're registering or updating
      const transaction = isUpdating
        ? createUpdateSchoolPayload(
            formData.name,
            formData.country,
            formData.address || '', 
            formData.accreditation || '', 
            formData.contact || ''
          )
        : createRegisterSchoolPayload(
            formData.name,
            formData.country,
            formData.address || '', 
            formData.accreditation || '', 
            formData.contact || ''
          );

      // Sign and submit the transaction
      try {
        const pendingTransaction = await signAndSubmitTransaction(transaction);
        setTxHash(pendingTransaction.hash);
        setSuccess(
          isUpdating
            ? `School "${formData.name}" updated successfully! Transaction hash: ${pendingTransaction.hash}`
            : `School "${formData.name}" registered successfully! Transaction hash: ${pendingTransaction.hash}`
        );
        
        // Update state after successful transaction
        setIsUpdating(true);
        setSchoolExists(true);
      } catch (txError) {
        setError(`Transaction failed: ${txError.message}`);
        console.error('Transaction error:', txError);
        setLoading(false);
        return;
      }
      
      setLoading(false);
    } catch (err) {
      setError(`Failed to ${isUpdating ? 'update' : 'register'} school. Please try again.`);
      setLoading(false);
      console.error(`Error ${isUpdating ? 'updating' : 'registering'} school:`, err);
    }
  };

  return (
    <div className="register-school">
      <div className="register-header">
        <h1>{isUpdating ? 'Update School Information' : 'Register a School'}</h1>
        <p>{isUpdating ? 'Update your school information on the Aptos blockchain' : 'Add a new school to the Aptos blockchain directory'}</p>
      </div>

      <div className="wallet-section">
        <div className="wallet-status">
          <span>Status: {connected ? `Connected (${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)})` : 'Wallet not connected'}</span>
          {!connected ? (
            <button className="connect-wallet-btn" onClick={connectWallet} disabled={loading}>
              Connect Wallet
            </button>
          ) : (
            <button className="connect-wallet-btn disconnect" onClick={disconnectWallet} disabled={loading}>
              Disconnect Wallet
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {success && (
        <div className="success-message">
          {success}
        </div>
      )}

      {txHash && (
        <div className="tx-info">
          <p>Transaction Hash: <a href={`https://explorer.aptoslabs.com/txn/${txHash}?network=mainnet`} target="_blank" rel="noopener noreferrer">{txHash}</a></p>
        </div>
      )}

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">School Name*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter school name"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country*</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter country"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter school address"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="accreditation">Accreditation</label>
          <input
            type="text"
            id="accreditation"
            name="accreditation"
            value={formData.accreditation}
            onChange={handleChange}
            placeholder="Enter accreditation information"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact Information</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter contact information"
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          className="register-btn"
          disabled={loading || !connected}
        >
          {loading ? 'Processing...' : isUpdating ? 'Update School' : 'Register School'}
        </button>
      </form>

      <div className="info-section">
        <h3>Why Register a School?</h3>
        <ul>
          <li>Create a permanent, tamper-proof record on the blockchain</li>
          <li>Make school information accessible globally</li>
          <li>Participate in the decentralized education ecosystem</li>
        </ul>

        <h3>Required Information</h3>
        <ul>
          <li><strong>School Name*</strong> - Official name of the school</li>
          <li><strong>Country*</strong> - Country where the school is located</li>
          <li><strong>Address</strong> - Physical address of the school (optional)</li>
          <li><strong>Accreditation</strong> - Accreditation information (optional)</li>
          <li><strong>Contact</strong> - Contact information (optional)</li>
        </ul>
        <p><small>* Required fields</small></p>
      </div>
    </div>
  );
};

export default RegisterSchool; 
