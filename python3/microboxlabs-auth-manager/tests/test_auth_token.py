import requests
import unittest
from unittest.mock import patch, Mock
from microboxlabs_auth_manager import AuthToken

class TestAuthToken(unittest.TestCase):

    def setUp(self):
        self.auth = AuthToken(
            client_id="test_client_id",
            client_secret="test_client_secret",
            audience="test_audience",
            grant_type="test_grant_type"
        )

    @patch("requests.post")
    def test_fetch_token_success(self, mock_post):
        mock_response = Mock()
        mock_response.json.return_value = {
            "access_token": "test_token",
            "expires_in": 3600,
            "token_type": "Bearer"
        }
        mock_response.raise_for_status.return_value = None
        mock_post.return_value = mock_response

        token = self.auth.get_token()

        self.assertEqual(token, "test_token")
        self.assertIsNotNone(self.auth.expiry)

    @patch("requests.post")
    def test_fetch_token_failure(self, mock_post):
        mock_response = Mock()
        mock_response.raise_for_status.side_effect = requests.HTTPError("Error")
        mock_post.return_value = mock_response

        with self.assertRaises(requests.HTTPError):
            self.auth.get_token()

    @patch("requests.post")
    def test_token_expiry(self, mock_post):
        mock_response = Mock()
        mock_response.json.return_value = {
            "access_token": "test_token",
            "expires_in": -1,  # Immediate expiry
            "token_type": "Bearer"
        }
        mock_response.raise_for_status.return_value = None
        mock_post.return_value = mock_response

        token = self.auth.get_token()
        self.assertEqual(token, "test_token")

        # Given that token expiry was set to immediate expiry, this should fetch a new token
        with patch.object(self.auth, "_fetch_token") as mock_fetch:
            mock_fetch.return_value = {
                "access_token": "new_token",
                "expires_in": 3600,
                "token_type": "Bearer"
            }
            new_token = self.auth.get_token()

        self.assertEqual(new_token, "new_token")


if __name__ == "__main__":
    unittest.main()
