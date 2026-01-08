# Infrastructure Config

Configuration management for the AI generation library.

## Overview

The config module provides centralized configuration management for all app services including network, auth, analytics, and more.

## Features

- Centralized service configuration
- Dynamic configuration updates
- Type-safe configuration objects
- Environment-specific configs
- Service availability checks

## Usage

### Initial Configuration

```tsx
import { configureAppServices } from '@umituz/react-native-ai-generation-content';

// Configure all services at app startup
configureAppServices({
  networkService: {
    baseUrl: 'https://api.example.com',
    apiKey: process.env.API_KEY,
    timeout: 30000,
    headers: {
      'X-Custom-Header': 'value',
    },
  },
  creditService: {
    checkCredits: async (userId, cost) => {
      const user = await fetchUserCredits(userId);
      return user.credits >= cost;
    },
    deductCredits: async (userId, cost) => {
      await updateUserCredits(userId, -cost);
    },
    getCredits: async (userId) => {
      const user = await fetchUserCredits(userId);
      return user.credits;
    },
  },
  paywallService: {
    showPaywall: async () => {
      // Show paywall screen or modal
      return await navigateToPaywall();
    },
    isPaywallDismissed: async () => {
      // Check if user has seen paywall
      return await AsyncStorage.getItem('paywall_dismissed');
    },
  },
  authService: {
    getCurrentUser: async () => {
      // Get current authenticated user
      return await Auth.currentSession();
    },
    getToken: async () => {
      // Get auth token
      return await Auth.currentAuthenticatedUser();
    },
  },
  analyticsService: {
    trackEvent: async (event, properties) => {
      // Track analytics event
      await Analytics.track(event, properties);
    },
  },
});
```

### Update Configuration

```tsx
import { updateAppServices } from '@umituz/react-native-ai-generation-content';

// Update specific service configuration
updateAppServices({
  networkService: {
    baseUrl: 'https://new-api.example.com',
  },
});
```

### Check Configuration

```tsx
import { isAppServicesConfigured, getAppServices } from '@umituz/react-native-ai-generation-content';

if (!isAppServicesConfigured()) {
  console.warn('App services not configured!');
  // Handle unconfigured state
}

const services = getAppServices();
console.log('Network base URL:', services.networkService?.baseUrl);
```

### Get Specific Service

```tsx
import {
  getNetworkService,
  getCreditService,
  getPaywallService,
  getAuthService,
  getAnalyticsService,
} from '@umituz/react-native-ai-generation-content';

const networkService = getNetworkService();
if (networkService) {
  console.log('API URL:', networkService.baseUrl);
}

const creditService = getCreditService();
if (creditService) {
  const hasCredits = await creditService.checkCredits('user-123', 1);
}
```

### Reset Configuration

```tsx
import { resetAppServices } from '@umituz/react-native-ai-generation-content';

// Reset all services (useful for testing/logout)
resetAppServices();
```

## Configuration Types

### AppServicesConfig

```tsx
interface AppServicesConfig {
  networkService?: INetworkService;
  creditService?: ICreditService;
  paywallService?: IPaywallService;
  authService?: IAuthService;
  analyticsService?: IAnalyticsService;
}
```

### INetworkService

```tsx
interface INetworkService {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
  headers?: Record<string, string>;
}
```

### ICreditService

```tsx
interface ICreditService {
  checkCredits(userId: string, cost: number): Promise<boolean>;
  deductCredits(userId: string, cost: number): Promise<void>;
  getCredits(userId: string): Promise<number>;
  addCredits(userId: string, amount: number): Promise<void>;
}
```

### IPaywallService

```tsx
interface IPaywallService {
  showPaywall(): Promise<boolean>;
  isPaywallDismissed(): Promise<boolean>;
  dismissPaywall(): Promise<void>;
}
```

### IAuthService

```tsx
interface IAuthService {
  getCurrentUser(): Promise<User | null>;
  getToken(): Promise<string | null>;
  isAuthenticated(): Promise<boolean>;
}
```

### IAnalyticsService

```tsx
interface IAnalyticsService {
  trackEvent(event: string, properties?: Record<string, any>): Promise<void>;
  trackScreen(screenName: string): Promise<void>;
  identifyUser(userId: string): Promise<void>;
}
```

## Environment-Specific Configuration

### Development

```tsx
if (__DEV__) {
  configureAppServices({
    networkService: {
      baseUrl: 'https://dev-api.example.com',
      apiKey: 'dev-key',
    },
    // ... other services
  });
}
```

### Production

```tsx
if (!__DEV__) {
  configureAppServices({
    networkService: {
      baseUrl: 'https://api.example.com',
      apiKey: process.env.PROD_API_KEY,
    },
    // ... other services
  });
}
```

### Dynamic Environment

```tsx
const getEnvConfig = () => {
  const env = process.env.NODE_ENV || 'development';

  switch (env) {
    case 'production':
      return {
        baseUrl: 'https://api.example.com',
      };
    case 'staging':
      return {
        baseUrl: 'https://staging-api.example.com',
      };
    default:
      return {
        baseUrl: 'https://dev-api.example.com',
      };
  }
};

configureAppServices({
  networkService: getEnvConfig(),
});
```

## Best Practices

1. **Configure Early**: Configure services at app startup
2. **Type Safety**: Use proper types for all services
3. **Error Handling**: Handle missing services gracefully
4. **Environment Variables**: Use env vars for sensitive data
5. **Validation**: Validate configuration before use

## Error Handling

```tsx
import { isAppServicesConfigured } from '@umituz/react-native-ai-generation-content';

function App() {
  useEffect(() => {
    if (!isAppServicesConfigured()) {
      Alert.alert(
        'Configuration Error',
        'App services not configured. Please contact support.'
      );
    }
  }, []);

  // ...
}
```

## Testing

```tsx
import { configureAppServices, resetAppServices } from '@umituz/react-native-ai-generation-content';

beforeEach(() => {
  configureAppServices({
    networkService: {
      baseUrl: 'https://test-api.example.com',
    },
  });
});

afterEach(() => {
  resetAppServices();
});
```

## Related

- [Services](../services/) - AI generation services
- [Middleware](../middleware/) - Request/response middleware
- [Utils](../utils/) - Utility functions

## License

MIT
