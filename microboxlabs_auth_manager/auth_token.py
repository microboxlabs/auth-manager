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

# def is_token_expired(token: str):
#     # Decode the token without verification to get the payload
#     payload = jwt.decode(token, options={"verify_signature": False})

#     # Check if the token has expired
#     current_time = time.time()
#     if 'exp' in payload and payload['exp'] < current_time:
#         return True
#     return False

# def login(client_id: str, client_secret: str, audience: str, grant_type: str):
    
#     endpoint = "https://api.microboxlabs.com/api/v1/login"

#     # Get the token from the user
#     token = requests.post(endpoint, data={
#         "client_id": client_id,
#         "client_secret": client_secret,
#         "audience": audience,
#         "grant_type": grant_type
#     })
#     token.raise_for_status()
#     return token.json()
    