interface TokenData {
    access_token: string;
    expires_in: number;
}

interface AuthTokenConfig {
    clientId: string;
    clientSecret: string;
    audience: string;
    grantType: string;
}

class AuthToken {
    private clientId: string;
    private clientSecret: string;
    private audience: string;
    private grantType: string;
    private token: string | null;
    private expiry: Date | null;

    constructor(config: AuthTokenConfig) {
        this.clientId = config.clientId;
        this.clientSecret = config.clientSecret;
        this.audience = config.audience;
        this.grantType = config.grantType;
        this.token = null;
        this.expiry = null;
    }

    private async _fetchToken(): Promise<TokenData> {
        const endpoint = "https://api.microboxlabs.com/api/v1/login";
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                client_id: this.clientId,
                client_secret: this.clientSecret,
                audience: this.audience,
                grant_type: this.grantType
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorData}`);
        }

        return await response.json() as TokenData;
    }

    private _isTokenExpired(): boolean {
        return !this.expiry || new Date() > this.expiry;
    }

    public async getToken(): Promise<string> {
        if (!this.token || this._isTokenExpired()) {
            const tokenData = await this._fetchToken();
            this.token = tokenData.access_token;
            this.expiry = new Date(Date.now() + tokenData.expires_in * 1000);
        }
        return this.token;
    }
}

export default AuthToken;
export type { AuthTokenConfig }; 