# Part 1: Simple Message Encryption

## Overview
This project implements a secure message encryption system using the libsodium cryptographic library. It provides public-key encryption functionality to securely exchange messages.

## Components

### SecureMessage Class (`encryption.js`)
The `SecureMessage` class provides two main functionalities:

1. **Key Pair Generation**
   - Generates cryptographic key pairs (public and private keys)
   - Uses libsodium's `crypto_box_keypair()` function
   - Returns an object containing both public and private keys

2. **Message Encryption**
   - Encrypts messages using the recipient's public key and sender's private key
   - Generates a random nonce for each encryption
   - Returns the encrypted message, nonce, and sender's public key in a structured format

### Main Application (`index.js`)
The main application demonstrates the usage of the encryption system by:
- Generating a new key pair for the sender
- Using a predefined recipient public key
- Encrypting a JSON object containing personal information
- Outputting the encrypted message in a base64 format

## Dependencies
- `libsodium-wrappers`: Provides the cryptographic functions

## Example Usage
The system encrypts a JSON object containing:
- Name
- Email
- Role
- Asking Salary
- Start Date
- Personal Statement

The encrypted output includes:
- Encrypted message (base64)
- Nonce (base64)
- Sender's public key (hex)

## Error Handling
The system includes basic error handling with try-catch blocks to manage potential encryption failures.

# Part 2: Sending a Message via Web3 (memo.js)

## Overview
This script demonstrates how to send Ethereum transactions on the Sepolia testnet using ethers.js. It includes functionality to send ETH with an attached memo (public key) in the transaction data field.

## Features
- Connects to Ethereum Sepolia testnet
- Sends ETH transactions with custom data
- Handles transaction signing and confirmation
- Includes gas price optimization

## Prerequisites
- Node.js installed
- An Ethereum wallet with Sepolia testnet ETH
- A Sepolia RPC URL (from providers like Infura or Alchemy)
- ethers.js library installed

## Configuration Requirements
The script needs two crucial pieces of information:
1. Sepolia RPC URL: Used to connect to the Ethereum network
2. Private Key: For signing transactions (Keep this secure and never share)

## Key Components

### Provider Setup
```javascript
const provider = new ethers.JsonRpcProvider("YOUR_SEPOLIA_RPC_URL");
```

### Wallet Configuration
```javascript
const wallet = new ethers.Wallet(privateKey, provider);
```

### Transaction Parameters
- Recipient Address: The destination wallet
- Value: 0.001 ETH
- Data: Includes a public key as memo
- Gas Limit: 21512 (minimum for ETH transfer)
- Gas Price: Dynamically fetched from network

## Transaction Flow
1. Fetches current gas fees from the network
2. Constructs the transaction object
3. Signs and sends the transaction
4. Waits for transaction confirmation
5. Logs the transaction hash and receipt

## Error Handling
The script includes try-catch blocks to handle potential errors during:
- Transaction creation
- Transaction signing
- Network communication
- Transaction confirmation

## Network Details
- Network: Ethereum Sepolia Testnet
- Currency: SepoliaETH (test ETH)
- Explorer: [Sepolia Etherscan](https://sepolia.etherscan.io)

## Usage Example
1. Set up your environment variables
2. Run the script
3. Monitor the console for transaction status
4. Verify the transaction on Sepolia Etherscan

## Dependencies
- ethers.js: Ethereum wallet and transaction library