const axios = require('axios');

class AuthToken {
    constructor(clientId, clientSecret, audience, grantType) {
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