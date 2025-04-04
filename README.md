# Onchain Global School Directory

## Description
The Onchain Global School Directory is a decentralized application (dApp) built on the Aptos blockchain. It allows users to register schools on-chain and retrieve their details, ensuring transparency and accessibility in school data management.

## Project Structure
This project consists of:
- A Move smart contract on the Aptos blockchain
- A Node.js/Express backend API
- A React frontend application

### Directory Structure
```
On-chain-Global-School-Directory-/
├── aptos/                  # Original contract with SchoolDirectory module
│   └── sources/            # Move source files  
├── aptos_v2/               # Updated contract with SchoolDirectoryV2 module
│   └── sources/            # Move source files
├── backend/                # Express.js API server
│   └── src/                # Backend source code
├── frontend/               # React frontend application
│   └── src/                # Frontend source code
├── README.md               # This file
├── .gitignore              # Git ignore file
├── cleanup.sh              # Script to clean up unnecessary files
└── prepare-for-github.sh   # Script to prepare the repository for GitHub
```

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- The Aptos CLI (for blockchain interactions)
- Git (for version control)

## Preparing for GitHub

This project includes two helper scripts to prepare the codebase for GitHub:

1. **cleanup.sh** - Removes unnecessary files like build artifacts, .DS_Store files, and local configuration
2. **prepare-for-github.sh** - An interactive script that runs the cleanup and guides you through the Git setup process

To prepare the project for GitHub, simply run:

```
./prepare-for-github.sh
```

This will:
- Clean up unnecessary files
- Initialize Git if needed
- Help you connect to a GitHub repository
- Guide you through staging, committing, and pushing your code

## Setup and Installation

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5001
   APTOS_NODE_URL=https://fullnode.devnet.aptoslabs.com/v1
   CONTRACT_ADDRESS=0x60b3b266d1309715c8d53385417de0ad9cb5ce069b7018ecdc6a442277bb0930
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with:
   ```
   REACT_APP_API_URL=http://localhost:5001/api
   REACT_APP_APTOS_NODE_URL=https://fullnode.devnet.aptoslabs.com/v1
   REACT_APP_CONTRACT_ADDRESS=0x60b3b266d1309715c8d53385417de0ad9cb5ce069b7018ecdc6a442277bb0930
   ```

4. Start the frontend development server:
   ```
   npm start
   ```

## Usage
- **Home**: Learn about the project and its purpose
- **School Directory**: Browse all registered schools
- **Register School**: Add a new school to the blockchain (requires an Aptos wallet)

## Smart Contract
The Move smart contracts reside in:
- `aptos/sources/project.move` - Original version (commented out)
- `aptos_v2/sources/school_directory_v2.move` - New enhanced version with additional fields

## Files to Exclude When Uploading to GitHub
When uploading this project to GitHub, you should exclude the following files/directories:
- `node_modules/` directories (in both frontend and backend)
- Build directories (`aptos/build/`, `aptos_v2/build/`, etc.)
- `.DS_Store` files
- Environment files (`.env`)
- Local configuration files (`.aptos/`)

These are all configured in the provided `.gitignore` file.

## Vision
Our vision is to create a globally accessible, decentralized, and tamper-proof school directory that ensures accurate and verifiable school data. This will help in improving trust and efficiency in the education sector.

## Future Scope
- Adding more metadata for schools such as address, accreditation, and contact details
- Implementing a verification system for school authenticity
- Enabling search and filtering features for easier access to school data
- Integrating with educational institutions and government bodies for official recognition

## Contract Details
**Contract Address:** 0x60b3b266d1309715c8d53385417de0ad9cb5ce069b7018ecdc6a442277bb0930

<img width="1710" alt="Screenshot 2025-03-28 at 1 53 05 PM" src="https://github.com/user-attachments/assets/0ab8b57f-c0f8-4991-b7ce-65f35ff41f12" /> 