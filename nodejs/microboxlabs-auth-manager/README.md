# Microboxlabs Auth Manager - Node.js Implementation

A TypeScript/Node.js library for managing authentication tokens for Microboxlabs API.

## Installation

Using pnpm (recommended):
```bash
pnpm add microboxlabs-auth-manager
```

Using npm:
```bash
npm install microboxlabs-auth-manager
```

## Usage

```typescript
import AuthToken, { AuthTokenConfig } from 'microboxlabs-auth-manager';

const config: AuthTokenConfig = {
    clientId: 'your_client_id',
    clientSecret: 'your_client_secret',
    audience: 'your_audience',
    grantType: 'client_credentials'
};

const auth = new AuthToken(config);

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

- Written in TypeScript with full type definitions
- Automatic token refresh when expired
- Promise-based API
- Built-in token caching
- Error handling

## API Reference

### `new AuthToken(config: AuthTokenConfig)`

Creates a new instance of the auth token manager.

### Interface: AuthTokenConfig
```typescript
interface AuthTokenConfig {
    clientId: string;
    clientSecret: string;
    audience: string;
    grantType: string;
}
```

### `async getToken(): Promise<string>`

Returns the current access token, fetching a new one if necessary.

## Development

1. Install dependencies:
```bash
pnpm install
```

2. Build the project:
```bash
pnpm build
```

3. Run tests:
```bash
pnpm test
```

## Error Handling

The library will throw errors if:
- The API request fails
- Invalid credentials are provided
- Network issues occur

Make sure to wrap calls in try/catch blocks for proper error handling.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Install dependencies (`pnpm install`)
4. Make your changes
5. Run tests (`pnpm test`)
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request 