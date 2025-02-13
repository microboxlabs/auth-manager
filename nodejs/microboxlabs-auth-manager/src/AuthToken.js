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
        try {
            const response = await axios.post(endpoint, {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                audience: this.audience,
                grant_type: this.grantType
            }, {
                timeout: 5000 // 5 seconds timeout
            });
            
            if (!response.data || !response.data.access_token || !response.data.expires_in) {
                throw new Error('Invalid response format from auth server');
            }
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(`Auth server error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
            } else if (error.request) {
                throw new Error('No response received from auth server');
            }
            throw error;
        }
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