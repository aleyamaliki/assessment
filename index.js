import SecureMessage from "./encryption.js";
import sodium from 'libsodium-wrappers';

async function main() {
    try {
        await sodium.ready;

        //generate key pair
        const SenderKeyPair = await SecureMessage.generateKeyPair();

        //convert keys to Uint8Array
        const senderPrivateKey = SenderKeyPair.privateKey; 
        const senderPublicKey = SenderKeyPair.publicKey; 

        //get recipient's public key
        const recipientPublicKeyHex = '3730253cd42a1d4c0ff360bfdd834d24dd664519693a641efc8757776ea4f02b';

        //convert recipient public key to Uint8Array
        const recipientPublicKey = sodium.from_hex(recipientPublicKeyHex);

        //message to encrypt
        const message = JSON.stringify({
            name: "Intan Nur Aleya binti Maliki",
            email: "intannuraleya31@gmail.com",
            role: "Junior Front End Developer",
            askingSalary: "RM3000 - RM3500",
            canStart: "2 weeks from now",
            myself: "Fix to be better",
        });

        //encrypt message
        const encryptMessage = await SecureMessage.encrypt(
            message,
            recipientPublicKey, //receiver public key
            senderPrivateKey, //sender's secret key
            senderPublicKey, //sender's public key
        );
        
        console.log('Encrypted Message:', encryptMessage);
    } catch (error) {
        console.error('Encryption error:', error);
    }
}

main();