# Microboxlabs Auth Manager SDK for Python 3

This SDK provides a set of tools to interact and manage authentication with Microboxlabs services using Python 3.

## Installation

### Using pip:

You can install the SDK from PyPI using `pip`:

```bash
pip install microboxlabs-auth-manager-sdk
```

### Using Poetry:

If you're using Poetry for your project, you can add it as a dependency:

```bash
poetry add microboxlabs-auth-manager-sdk
```

## Usage

To use the SDK in your Python projects:

```python
from microboxlabs_auth_sdk import AuthManager

# Initialization with your client details
auth_manager = AuthManager(client_id="YOUR_CLIENT_ID", 
                           client_secret="YOUR_CLIENT_SECRET", 
                           audience="https://api.microboxlabs.com/v1", 
                           grant_type="client_credentials")

# Get a new access token
access_token = auth_manager.get_token()
```

## Development

For development purposes, you'll want to clone the repository and set up using Poetry:

```bash
# Clone the repository
git clone https://github.com/your_username/microboxlabs-auth-manager-sdk.git
cd microboxlabs-auth-manager-sdk

# Install the SDK dependencies for development
poetry install
```

### Running Tests

Ensure you have the development dependencies installed:

```bash
# Run tests using unittest (or your preferred testing tool)
poetry run python -m unittest discover tests

# OR if you're using pytest
poetry run pytest
```

## Features

- Seamless authentication with Microboxlabs services.
- Token management: acquire, refresh, and validate tokens.

## Documentation

Refer to the [official documentation](URL_TO_YOUR_DOCS) for detailed usage and API references.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
