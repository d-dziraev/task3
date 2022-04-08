class Security {
    HMAC;

    getHMAC(key, message) {
        const crypto = require('crypto');
        this.HMAC = crypto.createHmac('sha256', key)
        .update(message)
        .digest('hex');
    }

}

module.exports = Security
