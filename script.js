// Encoding/Decoding Handlers
function encodeText() {
    const inputText = document.getElementById('inputText').value;
    const method = document.getElementById('method').value;
    const keyInput = document.getElementById('key').value;

    if (!inputText) {
        alert("Please enter text to encode or encrypt.");
        return;
    }

    // Key length checks for different methods
    if (method === 'des') {
        if (!keyInput || keyInput.length !== 8) {
            alert("DES requires a key of exactly 8 characters.");
            return;
        }
    } else if (method === 'aes') {
        if (!keyInput || ![16, 24, 32].includes(keyInput.length)) {
            alert("AES requires a key of 16, 24, or 32 characters.");
            return;
        }
    } else if (method === '3des') {
        if (!keyInput || keyInput.length !== 24) {
            alert("3DES requires a key of exactly 24 characters.");
            return;
        }
    }

    let result;
    try {
        switch (method) {
            case 'base64':
                result = btoa(inputText);
                break;
            case 'hex':
                result = toHex(inputText);
                break;
            case 'url':
                result = encodeURIComponent(inputText);
                break;
            case 'des':
                const encryptedDES = CryptoJS.DES.encrypt(inputText, keyInput);
                result = encryptedDES.toString();
                break;
            case 'aes':
                const encryptedAES = CryptoJS.AES.encrypt(inputText, keyInput);
                result = encryptedAES.toString();
                break;
            case '3des':
                const encrypted3DES = CryptoJS.TripleDES.encrypt(inputText, keyInput);
                result = encrypted3DES.toString();
                break;
            default:
                throw new Error("Unsupported method");
        }
        document.getElementById('outputText').value = result;
    } catch (error) {
        alert("Error encoding/encrypting text: " + error.message);
    }
}

function decodeText() {
    const inputText = document.getElementById('inputText').value;
    const method = document.getElementById('method').value;
    const keyInput = document.getElementById('key').value;

    if (!inputText) {
        alert("Please enter text to decode or decrypt.");
        return;
    }

    let result;
    try {
        switch (method) {
            case 'base64':
                result = atob(inputText);
                break;
            case 'hex':
                result = fromHex(inputText);
                break;
            case 'url':
                result = decodeURIComponent(inputText);
                break;
            case 'des':
                if (!keyInput) {
                    alert("Please enter a key for DES decryption.");
                    return;
                }
                const decryptedDES = CryptoJS.DES.decrypt(inputText, keyInput);
                result = decryptedDES.toString(CryptoJS.enc.Utf8);
                break;
            case 'aes':
                if (!keyInput) {
                    alert("Please enter a key for AES decryption.");
                    return;
                }
                const decryptedAES = CryptoJS.AES.decrypt(inputText, keyInput);
                result = decryptedAES.toString(CryptoJS.enc.Utf8);
                break;
            case '3des':
                if (!keyInput) {
                    alert("Please enter a key for 3DES decryption.");
                    return;
                }
                const decrypted3DES = CryptoJS.TripleDES.decrypt(inputText, keyInput);
                result = decrypted3DES.toString(CryptoJS.enc.Utf8);
                break;
            default:
                throw new Error("Unsupported method");
        }
        document.getElementById('outputText').value = result;
    } catch (error) {
        alert("Error decoding/decrypting text: " + error.message);
    }
}

// Hex Conversion Functions
function toHex(str) {
    return Array.from(str)
        .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('');
}

function fromHex(hexStr) {
    return hexStr.match(/.{1,2}/g)
        .map(byte => String.fromCharCode(parseInt(byte, 16)))
        .join('');
}

// Show/Hide Key Input for DES, AES, and 3DES
document.getElementById('method').addEventListener('change', function () {
    const keyInput = document.getElementById('key');
    if (this.value === 'des' || this.value === 'aes' || this.value === '3des') {
        keyInput.style.display = 'block';
    } else {
        keyInput.style.display = 'none';
    }
});
