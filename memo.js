import { ethers } from 'ethers';

//Ethereum Sepolia RPC URL
const provider = new ethers.JsonRpcProvider("");

//wallet private key
const privateKey = "";
const wallet = new ethers.Wallet(privateKey, provider);

//memo
const recipient = "0x29a9225d38de0837d8368BB7AB42D5Cc73900C28"; //recipient's address
const publicKey = "0xa507ef3cb359106507e9c373065ec848632bd3bc6c3ae0bfb1fc6376f35fad2f"; //public key from part 1

//fetch the fee data
const feeData = await provider.getFeeData();

(async () => {
  try {
    //transaction
    const tx = {
      to: recipient,
      value: ethers.parseEther("0.001"), //sending ETH
      data: publicKey, //public key as memo in the data field
      gasLimit: 21512, //minimum gas limit for ETH transfer
      gasPrice: feeData.gasPrice, //current gas price
    };

    //sign and send the transaction
    const signedTx = await wallet.sendTransaction(tx);
    console.log("Transaction Hash:", signedTx.hash);

    //wait for confirmation
    const receipt = await signedTx.wait();
    console.log("Transaction confirmed:", receipt);
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
})();
