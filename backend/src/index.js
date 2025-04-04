const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { AptosClient, Types, BCS } = require('aptos');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Setup Aptos client
const aptosClient = new AptosClient(process.env.APTOS_NODE_URL || 'https://fullnode.mainnet.aptoslabs.com/v1');
const contractAddress = process.env.CONTRACT_ADDRESS || '0xc7619c330a24e2be7a0112731a33df903cbaf540c0958a2d63b02bd49fd22c75';

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Global School Directory API' });
});

// Get all schools
app.get('/api/schools', async (req, res) => {
  try {
    // In a real application, you would query the blockchain for schools
    // This is a simplified example
    res.json({
      success: true,
      message: 'Schools retrieved successfully',
      data: [
        { id: 1, name: 'School A', country: 'Country A' },
        { id: 2, name: 'School B', country: 'Country B' },
      ]
    });
  } catch (error) {
    console.error('Error retrieving schools:', error);
    res.status(500).json({ success: false, message: 'Error retrieving schools', error: error.message });
  }
});

// Process a transaction - This endpoint is for demonstration purposes
// In a real application, transactions would be sent directly from the frontend
app.post('/api/transactions', async (req, res) => {
  try {
    const { transaction, signature, senderPublicKey } = req.body;
    
    // Verify and process transaction
    // This is a simplified example - in a real app, you would submit this to the blockchain
    
    res.json({
      success: true,
      message: 'Transaction processed successfully',
      data: {
        txHash: '0x123...', // Sample transaction hash
        status: 'success'
      }
    });
  } catch (error) {
    console.error('Error processing transaction:', error);
    res.status(500).json({ success: false, message: 'Error processing transaction', error: error.message });
  }
});

// Register a new school (you'd need to implement wallet connection in frontend)
app.post('/api/schools', (req, res) => {
  try {
    const { name, country } = req.body;
    
    // In a real application, you would submit a transaction to the blockchain
    // This is a simplified example
    res.json({
      success: true,
      message: 'School registration initiated',
      data: {
        name,
        country,
        status: 'pending',
        contractAddress,
        functionName: `${contractAddress}::SchoolDirectoryV2::register_school`
      }
    });
  } catch (error) {
    console.error('Error registering school:', error);
    res.status(500).json({ success: false, message: 'Error registering school', error: error.message });
  }
});

// Helper function to get transaction data
app.get('/api/transaction/:txHash', async (req, res) => {
  try {
    const { txHash } = req.params;
    
    // In a real application, you would query the transaction status on the blockchain
    // Example:
    // const txnInfo = await aptosClient.getTransactionByHash(txHash);
    
    res.json({
      success: true,
      message: 'Transaction retrieved successfully',
      data: {
        txHash,
        status: 'success',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error retrieving transaction:', error);
    res.status(500).json({ success: false, message: 'Error retrieving transaction', error: error.message });
  }
});

// Get contract information
app.get('/api/contract', (req, res) => {
  res.json({
    success: true,
    message: 'Contract information retrieved successfully',
    data: {
      address: contractAddress,
      name: 'SchoolDirectoryV2',
      network: process.env.APTOS_NETWORK || 'devnet',
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 