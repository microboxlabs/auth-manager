const axios = require('axios');

class AuthToken {
    constructor(clientId, clientSecret, audience, grantType) {
        if (!clientId || !clientSecret || !audience || !grantType) {
            throw new Error('All parameters (clientId, clientSecret, audience, grantType) are required');
        }
        if (typeof clientId !== 'string' || typeof clientSecret !== 'string' || 
            typeof audience !== 'string' || typeof grantType !== 'string') {
            throw new Error('All parameters must be strings');
        }
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.audience = audience;
        this.grantType = grantType;
        this.token = null;
        this.expiry = null;
    }

    async _fetchToken() {
        const endpoint = "https://api.microboxlabs.com/api/v1/login";
        const response = await axios.post(endpoint, {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            audience: this.audience,
            grant_type: this.grantType
        });

        return response.data;
    }

    _isTokenExpired() {
        return !this.expiry || new Date() > this.expiry;
    }

    async getToken() {
        if (!this.token || this._isTokenExpired()) {
            const tokenData = await this._fetchToken();
            this.token = tokenData.access_token;
            this.expiry = new Date(Date.now() + tokenData.expires_in * 1000);
        }
        return this.token;
    }
}

module.exports = AuthToken; 