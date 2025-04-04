import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AptosWalletContext = createContext(null);

// Hook to use the context
export const useAptosWallet = () => {
  const context = useContext(AptosWalletContext);
  if (!context) {
    throw new Error('useAptosWallet must be used within an AptosWalletProvider');
  }
  return context;
};

// Provider component
export const AptosWalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if the Petra wallet extension is installed
  const isPetraInstalled = () => {
    return window.aptos !== undefined;
  };

  // Attempt to auto-connect to the previously connected wallet on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (isPetraInstalled()) {
        try {
          const response = await window.aptos.isConnected();
          if (response) {
            // If already connected, get the account
            const accountInfo = await window.aptos.account();
            setWalletAddress(accountInfo.address);
            setAccount(accountInfo);
            setConnected(true);
            setWallet('petra');
          }
        } catch (error) {
          console.error('Failed to check wallet connection:', error);
        }
      }
    };

    checkConnection();
  }, []);

  // Connect to wallet
  const connect = async () => {
    if (!isPetraInstalled()) {
      setError('Petra wallet extension is not installed. Please install it first.');
      throw new Error('Petra wallet extension is not installed');
    }

    setLoading(true);
    setError(null);

    try {
      // Connect to the wallet
      await window.aptos.connect();
      
      // Get the account information
      const accountInfo = await window.aptos.account();
      
      setWalletAddress(accountInfo.address);
      setAccount(accountInfo);
      setConnected(true);
      setWallet('petra');
      
      return accountInfo;
    } catch (error) {
      setError(`Failed to connect wallet: ${error.message}`);
      console.error('Error connecting to wallet:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Disconnect wallet
  const disconnect = async () => {
    setLoading(true);
    
    try {
      // Only try to disconnect if wallet is Petra and is installed
      if (connected && wallet === 'petra' && isPetraInstalled()) {
        await window.aptos.disconnect();
      }
      
      // Reset the state
      setWalletAddress('');
      setAccount(null);
      setConnected(false);
      setWallet(null);
    } catch (error) {
      setError(`Failed to disconnect wallet: ${error.message}`);
      console.error('Error disconnecting wallet:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign and submit a transaction
  const signAndSubmitTransaction = async (transaction) => {
    if (!connected || !isPetraInstalled()) {
      throw new Error('Wallet not connected');
    }

    try {
      const pendingTransaction = await window.aptos.signAndSubmitTransaction(transaction);
      return pendingTransaction;
    } catch (error) {
      console.error('Error during transaction:', error);
      throw error;
    }
  };

  // Provide the wallet context values
  const value = {
    walletAddress,
    connected,
    account,
    wallet,
    loading,
    error,
    connect,
    disconnect,
    signAndSubmitTransaction,
  };

  return (
    <AptosWalletContext.Provider value={value}>
      {children}
    </AptosWalletContext.Provider>
  );
};

export default AptosWalletProvider; 
