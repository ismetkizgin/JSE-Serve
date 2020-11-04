const imageUploadTransactions = require('./imageUploadTransactions');

class ImageUploadFactory {
    constructor() { }

    static creating(provider, args) {
        let imageUploadTransaction = imageUploadTransactions[provider];
        if (!imageUploadTransaction)
            throw new Error('Image upload transaction is not found. Image upload transaction provider: ' + provider);
        return new imageUploadTransaction(args);
    }
}

module.exports = ImageUploadFactory;