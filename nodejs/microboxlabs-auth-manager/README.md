# Microboxlabs Auth Manager - Node.js Implementation

A Node.js library for managing authentication tokens for Microboxlabs API.

## Installation

```bash
npm install microboxlabs-auth-manager
```

## Usage

```javascript
const AuthToken = require('microboxlabs-auth-manager');

const auth = new AuthToken(
    'your_client_id',
    'your_client_secret',
    'your_audience',
    'client_credentials'
);

// Get a token
async function example() {
    try {
        const token = await auth.getToken();
        console.log('Access Token:', token);
    } catch (error) {
        console.error('Error getting token:', error);
    }
}
```

## Features

- Automatic token refresh when expired
- Promise-based API
- Built-in token caching
- Error handling

## API Reference

### `new AuthToken(clientId, clientSecret, audience, grantType)`

Creates a new instance of the auth token manager.

### `async getToken()`

Returns the current access token, fetching a new one if necessary.

## Error Handling

The library will throw errors if:
- The API request fails
- Invalid credentials are provided
- Network issues occur

Make sure to wrap calls in try/catch blocks for proper error handling. 