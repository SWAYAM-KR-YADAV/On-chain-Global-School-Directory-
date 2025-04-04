import axios from 'axios';
import { Aptos } from '@aptos-labs/ts-sdk';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const APTOS_NODE_URL = process.env.REACT_APP_APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com/v1';
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || '0x60b3b266d1309715c8d53385417de0ad9cb5ce069b7018ecdc6a442277bb0930';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Initialize the Aptos SDK client
const aptosClient = new Aptos({
  nodeUrl: APTOS_NODE_URL,
});

export const getSchools = async () => {
  try {
    const response = await api.get('/schools');
    return response.data;
  } catch (error) {
    console.error('Error fetching schools:', error);
    throw error;
  }
};

export const registerSchool = async (schoolData) => {
  try {
    const response = await api.post('/schools', schoolData);
    return response.data;
  } catch (error) {
    console.error('Error registering school:', error);
    throw error;
  }
};

export const getContractInfo = async () => {
  try {
    const response = await api.get('/contract');
    return response.data;
  } catch (error) {
    console.error('Error fetching contract info:', error);
    throw error;
  }
};

export const submitTransaction = async (transactionData) => {
  try {
    const response = await api.post('/transactions', transactionData);
    return response.data;
  } catch (error) {
    console.error('Error submitting transaction:', error);
    throw error;
  }
};

export const getTransactionStatus = async (txHash) => {
  try {
    const response = await api.get(`/transaction/${txHash}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transaction status:', error);
    throw error;
  }
};

export const checkSchoolExists = async (address) => {
  try {
    // Fetching school resource
    const resourceType = `${contractAddress}::SchoolDirectoryV2::School`;
    
    try {
      const resource = await aptosClient.getAccountResource({
        accountAddress: address,
        resourceType: resourceType,
      });
      return { exists: true, data: resource.data };
    } catch (err) {
      if (err.status === 404) {
        return { exists: false, data: null };
      }
      throw err;
    }
  } catch (error) {
    console.error('Error checking school:', error);
    throw error;
  }
};

export const createRegisterSchoolPayload = (name, country, address, accreditation, contact) => {
  return {
    function: `${contractAddress}::SchoolDirectoryV2::register_school`,
    type_arguments: [],
    arguments: [
      name,
      country,
      address,
      accreditation,
      contact
    ]
  };
};

export const createUpdateSchoolPayload = (name, country, address, accreditation, contact) => {
  return {
    function: `${contractAddress}::SchoolDirectoryV2::update_school`,
    type_arguments: [],
    arguments: [
      name,
      country,
      address, 
      accreditation,
      contact
    ]
  };
};

/**
 * Get all registered schools from the blockchain
 * @returns {Promise<Array>} - Array of school objects
 */
export const getAllSchools = async () => {
  try {
    console.log("Fetching all schools...");
    const resourceType = `${contractAddress}::SchoolDirectoryV2::School`;
    console.log("Using resource type:", resourceType);
    console.log("Contract address:", contractAddress);
    
    // We need to query account resources one by one since Aptos SDK doesn't 
    // provide a way to get all resources of a specific type across all accounts
    
    const schools = [];
    
    // First, check the connected wallet account (if any)
    if (window.aptos) {
      try {
        const isConnected = await window.aptos.isConnected();
        console.log("Wallet connected:", isConnected);
        if (isConnected) {
          const account = await window.aptos.account();
          console.log("Checking wallet account for schools:", account.address);
          await checkAccountForSchools(account.address, schools);
        }
      } catch (err) {
        console.error('Error checking wallet account for schools:', err);
      }
    } else {
      console.log("Aptos wallet not found in window object");
    }
    
    // Next, check any accounts we've stored in localStorage
    let knownAccounts = [];
    try {
      const storedAccounts = localStorage.getItem('schoolAccounts');
      if (storedAccounts) {
        console.log("Found known accounts in localStorage:", storedAccounts);
        knownAccounts = JSON.parse(storedAccounts);
        
        for (const address of knownAccounts) {
          console.log("Checking known account for schools:", address);
          await checkAccountForSchools(address, schools);
        }
      } else {
        console.log("No known accounts found in localStorage");
      }
    } catch (err) {
      console.error('Error processing known accounts:', err);
    }
    
    // Specifically check your wallet address (hardcoded for testing)
    // Make sure this matches YOUR wallet address
    const userWalletAddress = "0x5d4eae3e49ad3268094eefffccc25f961c5d28150179e34c6e1d5844f87c00be";
    
    // Only check if not already in known accounts
    if (!knownAccounts.includes(userWalletAddress)) {
      console.log("Explicitly checking your wallet address:", userWalletAddress);
      await checkAccountForSchools(userWalletAddress, schools);
    }
    
    // Store your address in localStorage for future use
    if (!knownAccounts.includes(userWalletAddress)) {
      knownAccounts.push(userWalletAddress);
      localStorage.setItem('schoolAccounts', JSON.stringify(knownAccounts));
      console.log("Added your address to known accounts");
    }
    
    console.log("Found schools:", schools);
    console.log("Total number of schools found:", schools.length);
    return schools;
  } catch (err) {
    console.error('Error getting all schools:', err);
    throw err;
  }
};

/**
 * Helper function to check if an account has a School resource
 * @param {string} address - Account address to check
 * @param {Array} schoolsArray - Array to add schools to
 */
async function checkAccountForSchools(address, schoolsArray) {
  try {
    console.log(`Fetching resources for account: ${address}`);
    
    // Normalize the address format to ensure consistency
    const normalizedAddress = address.startsWith('0x') ? address : `0x${address}`;
    
    // Get all resources for this account
    const resources = await aptosClient.getAccountResources({
      accountAddress: normalizedAddress,
    });
    
    console.log(`Found ${resources.length} resources for account: ${normalizedAddress}`);
    
    // Look specifically for the School resource type
    const schoolResourceType = `${contractAddress}::SchoolDirectoryV2::School`;
    console.log(`Looking for resource type: ${schoolResourceType}`);
    
    // Check if we have a specific school resource
    const schoolResource = resources.find(r => 
      r.type.includes('::SchoolDirectoryV2::School')
    );
    
    if (schoolResource) {
      console.log(`Found school resource for account: ${normalizedAddress}`);
      console.log(`Resource type: ${schoolResource.type}`);
      console.log(`Resource data:`, schoolResource.data);
      
      // Extract school data
      const schoolData = {
        owner: normalizedAddress,
        name: schoolResource.data.name || '',
        country: schoolResource.data.country || '',
        address: schoolResource.data.address || '',
        accreditation: schoolResource.data.accreditation || '',
        contact: schoolResource.data.contact || '',
      };
      
      console.log(`Extracted school data:`, schoolData);
      
      // Check if this school is already in the array (avoid duplicates)
      const existingIndex = schoolsArray.findIndex(s => s.owner === normalizedAddress);
      if (existingIndex === -1) {
        schoolsArray.push(schoolData);
        console.log(`Added school to array, new count: ${schoolsArray.length}`);
      } else {
        console.log(`School already in array at index ${existingIndex}, not adding duplicate`);
      }
      
      // Add to known accounts for future reference
      let knownAccounts = [];
      try {
        knownAccounts = JSON.parse(localStorage.getItem('schoolAccounts') || '[]');
        if (!knownAccounts.includes(normalizedAddress)) {
          console.log(`Adding address to known accounts: ${normalizedAddress}`);
          knownAccounts.push(normalizedAddress);
          localStorage.setItem('schoolAccounts', JSON.stringify(knownAccounts));
        }
      } catch (err) {
        console.error(`Error updating known accounts:`, err);
      }
    } else {
      console.log(`No school resource found for account: ${normalizedAddress}`);
    }
  } catch (err) {
    console.error(`Error checking account ${address} for schools:`, err);
    console.log(`Error details:`, JSON.stringify(err, null, 2));
  }
}

export default api; 