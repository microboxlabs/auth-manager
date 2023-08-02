import requests
from datetime import datetime, timedelta

class AuthToken:
    def __init__(self, client_id, client_secret, audience, grant_type):
        self.client_id = client_id
        self.client_secret = client_secret
        self.audience = audience
        self.grant_type = grant_type
        self.token = None
        self.expiry = None

    def _fetch_token(self):
        endpoint = "https://api.microboxlabs.com/api/v1/login"
        response = requests.post(endpoint, data={
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "audience": self.audience,
            "grant_type": self.grant_type
        })
        response.raise_for_status()
        return response.json()

    def get_token(self):
        if not self.token or self._is_token_expired():
            token_data = self._fetch_token()
            self.token = token_data["access_token"]
            self.expiry = datetime.now() + timedelta(seconds=token_data["expires_in"])
        return self.token

    def _is_token_expired(self):
        return datetime.now() > self.expiry