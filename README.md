# Part 1: Simple Message Encryption

## Overview
This project implements a secure message encryption system using the libsodium cryptographic library. It provides public-key encryption functionality to securely exchange messages.

## How to Encrypt
1. Prepare the keys
Use the provided recipient's public key and the generated sender's key pair for encryption. 
```javascript
const recipientPublicKeyHex = ""; // Recipient's public key
const senderKeyPair = sodium.crypto_box_keypair();
```

Convert the keys to Uint8Array if needed. Example recipient's public key (hexadecimal, 32 bytes):
```javascript
const recipientPublicKey = sodium.from_hex(recipientPublicKeyHex);
```
2. Generate a nonce
A nonce is a unique random value required for each encryption operation
```javascript
const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);
```

3. Prepare the message
Define the plaintext message and conver it to a Uint8Array
```javascript
const message = "Hello, this is a secret message!";
const messageBytes = sodium.from_string(message);
```

4. Encrypt the message
Use the recipient’s public key and the sender’s private key to encrypt the message
```javascript
const encryptedMessage = sodium.crypto_box_easy(
    messageBytes,             // Message
    nonce,                    // Nonce
    recipientPublicKey,       // Recipient's public key
    senderKeyPair.privateKey  // Sender's private key
);
```

5. Output Encrypted Data
Return the encrypted message, nonce, and the sender’s public key for decryption
```javascript
const encryptedData = {
    nonce: sodium.to_base64(nonce),
    ciphertext: sodium.to_base64(encryptedMessage),
    senderPublicKey: sodium.to_base64(senderKeyPair.publicKey),
};
console.log("Encrypted Data:", encryptedData);
```

## How to Decrypt
1. Convert Encrypt Data
Decode the nonce, ciphertext, and sender’s public key from base64 back to Uint8Array
```javascript
const nonce = sodium.from_base64(encryptedData.nonce);
const ciphertext = sodium.from_base64(encryptedData.ciphertext);
const senderPublicKey = sodium.from_base64(encryptedData.senderPublicKey);

```

2. Decrypt the message
Use the sender’s public key, recipient’s private key, and the nonce to decrypt the message
```javascript
const decryptedBytes = sodium.crypto_box_open_easy(
    ciphertext,              // Encrypted message
    nonce,                   // Nonce
    senderPublicKey,         // Sender's public key
    recipientKeyPair.privateKey // Recipient's private key
);
```

3. Convert to plaintext
Convert the decrypted Uint8Array back to a string
```javascript
const decryptedMessage = sodium.to_string(decryptedBytes);
console.log("Decrypted Message:", decryptedMessage);
```

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

## Encrypted output
- Encrypted message (base64)
- Nonce (base64)
- Sender's public key (hex)

## Error Handling
The system includes basic error handling with try-catch blocks to manage potential encryption failures.

# Part 2: Sending a Message via Web3 (`memo.js`)

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
(Public key needs to include "0x" prefix to be recognized as hex data)
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

## Dependencies
- ethers.js: Ethereum wallet and transaction library

## Usage Example
1. Set up your environment variables
2. Run the script
3. Monitor the console for transaction status
4. Verify the transaction on Sepolia Etherscan