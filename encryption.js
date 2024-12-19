import sodium from 'libsodium-wrappers';

class SecureMessage {
    static async generateKeyPair() {
        await sodium.ready;
        return sodium.crypto_box_keypair();
    }

    static async encrypt(message, recipientPublicKey, senderSecretKey, senderPublicKey) {
        await sodium.ready;

        //convert message to Uint8Array
        const messageBuffer = sodium.from_string(message);

        //generate nonce
        const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);

        //encrypt the message
        const encryptedMessage = sodium.crypto_box_easy(
            messageBuffer,
            nonce,
            recipientPublicKey,
            senderSecretKey
        );

        return {
            nonce: sodium.to_base64(nonce),
            message: sodium.to_base64(encryptedMessage),
            senderPublicKey: sodium.to_hex(senderPublicKey),
        };
    }
}

export default SecureMessage;
