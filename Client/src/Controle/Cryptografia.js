function generateRandomKey() {
    const array = new Uint8Array(32); // 32 bytes para uma chave AES de 256 bits
    crypto.getRandomValues(array); // Preencher o array com valores aleatórios
    return array.buffer; // Retornar o buffer da array
}

const ChaveCripto = generateRandomKey(); 

export default new class Criptografar {
    Criptografar = (text) => {
        const iv = crypto.getRandomValues(new Uint8Array(16));
        const keyBuffer = ChaveCripto;
        const textBuffer = new TextEncoder().encode(text);
        return crypto.subtle.importKey(
            'raw',
            keyBuffer,
            { name: 'AES-GCM' },
            false,
            ['encrypt']
        ).then(cryptoKey => {
            return crypto.subtle.encrypt({ name: 'AES-GCM', iv }, cryptoKey, textBuffer);
        }).then(encryptedData => {
            const encryptedArray = new Uint8Array(encryptedData);
            return btoa(String.fromCharCode(...encryptedArray));
        });
    }
    
    DesCriptografar = async (encryptedText) => {
        const iv = crypto.getRandomValues(new Uint8Array(16));
        const keyBuffer = ChaveCripto;
        const encryptedBuffer = Uint8Array.from(atob(encryptedText), c => c.charCodeAt(0));
        try {
            console.log("A")
            const cryptoKey = await crypto.subtle.importKey(
                'raw',
                keyBuffer,
                { name: 'AES-GCM' },
                false,
                ['decrypt']
            );
            console.log("b")
            const decryptedData = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, cryptoKey, encryptedBuffer);
            console.log("c")
            return new TextDecoder().decode(decryptedData);
        } catch (error) {
            console.error("Erro durante a descriptografia:", error);
            return null; // Retorna null para indicar que houve um erro
        }
    }
}
