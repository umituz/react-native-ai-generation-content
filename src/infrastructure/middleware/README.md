# Infrastructure Middleware

Request/response middleware for AI generation operations.

## Overview

The middleware module provides a flexible middleware system for intercepting and modifying AI generation requests and responses. Common use cases include credit checks, history tracking, content moderation, and logging.

## Features

- Request interception and modification
- Response processing
- Async middleware support
- Error handling
- Chainable middleware

## Usage

### Creating Middleware

```tsx
import type { GenerationMiddleware } from '@umituz/react-native-ai-generation-content';

const loggingMiddleware: GenerationMiddleware = {
  name: 'logging',

  before: async (context) => {
    console.log('[Before]', {
      featureType: context.featureType,
      inputData: context.inputData,
    });
  },

  after: async (context) => {
    console.log('[After]', {
      featureType: context.featureType,
      result: context.result,
    });
  },

  onError: async (context) => {
    console.error('[Error]', {
      featureType: context.featureType,
      error: context.error,
    });
  },
};
```

### Credit Check Middleware

```tsx
import { createCreditCheckMiddleware } from '@umituz/react-native-ai-generation-content';

const creditMiddleware = createCreditCheckMiddleware({
  creditCost: 1, // Cost per generation
  paywallThreshold: 5, // Show paywall after 5 insufficient credit attempts
  onInsufficientCredits: async (userId, cost) => {
    Alert.alert(
      'Insufficient Credits',
      `You need ${cost} credits to generate. Upgrade now?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Upgrade', onPress: () => navigateToUpgrade() },
      ]
    );
  },
  onPaywallTrigger: async () => {
    await navigateToPaywall();
  },
});
```

### History Tracking Middleware

```tsx
import { createHistoryTrackingMiddleware } from '@umituz/react-native-ai-generation-content';

const historyMiddleware = createHistoryTrackingMiddleware({
  maxHistorySize: 100, // Keep last 100 generations
  storage: AsyncStorage, // Storage implementation
  onHistoryUpdate: async (history) => {
    console.log('History updated:', history.length);
  },
});
```

### Content Moderation Middleware

```tsx
import { ModerationWrapper } from '@umituz/react-native-ai-generation-content';

const moderationMiddleware = {
  name: 'moderation',

  before: async (context) => {
    // Check prompt for inappropriate content
    if (context.inputData.prompt) {
      const moderationResult = await moderateText(context.inputData.prompt);
      if (!moderationResult.isSafe) {
        throw new Error('Content flagged as inappropriate');
      }
    }
  },
};
```

### Custom Middleware

```tsx
const customMiddleware: GenerationMiddleware = {
  name: 'custom',

  before: async (context) => {
    // Modify request before processing
    if (context.featureType === 'text-to-image') {
      context.inputData.prompt = enhancePrompt(context.inputData.prompt);
    }
  },

  after: async (context) => {
    // Process response after generation
    if (context.result.success) {
      await cacheResult(context.result);
    }
  },

  onError: async (context) => {
    // Handle errors
    await logError(context.error);
  },
};
```

## Middleware Chain

### Creating a Chain

```tsx
import { MiddlewareChain } from '@umituz/react-native-ai-generation-content';

const chain = new MiddlewareChain([
  creditMiddleware,
  historyMiddleware,
  moderationMiddleware,
  loggingMiddleware,
]);

await chain.execute({
  featureType: 'text-to-image',
  inputData: { prompt: 'A sunset' },
  execute: async (input) => {
    // Actual generation logic
    return await generateImage(input);
  },
});
```

### Execution Order

Middlewares execute in order:

```
Request → [Middleware 1] → [Middleware 2] → [Middleware 3] → Generation
           ↓ before           ↓ before           ↓ before

Response ← [Middleware 1] ← [Middleware 2] ← [Middleware 3] ← Result
           ↓ after            ↓ after            ↓ after
```

### Error Handling

If a middleware throws an error:

```
Request → [Middleware 1] → [Middleware 2] ✗ Error
           ↓ before           ↓ onError

Response ← [Middleware 1] ← Error Propagated
           ↓ onError
```

## Context Types

### MiddlewareContext (Before)

```tsx
interface MiddlewareContext {
  featureType: string;
  inputData: any;
  userId?: string;
  options?: Record<string, any>;
}
```

### MiddlewareResultContext (After)

```tsx
interface MiddlewareResultContext extends MiddlewareContext {
  result: GenerationResult;
  duration: number; // Time taken in ms
}
```

### MiddlewareErrorContext (Error)

```tsx
interface MiddlewareErrorContext extends MiddlewareContext {
  error: Error;
  errorType: AIErrorType;
}
```

## Advanced Usage

### Conditional Middleware

```tsx
const conditionalMiddleware: GenerationMiddleware = {
  name: 'conditional',

  before: async (context) => {
    // Only apply to specific features
    if (context.featureType === 'text-to-image') {
      // Do something
    }
  },
};
```

### Async Middleware

```tsx
const asyncMiddleware: GenerationMiddleware = {
  name: 'async',

  before: async (context) => {
    // Fetch data from API
    const userData = await fetchUserData(context.userId);
    context.inputData.userData = userData;
  },
};
```

### Modifying Input

```tsx
const inputModifier: GenerationMiddleware = {
  name: 'input-modifier',

  before: async (context) => {
    // Add default options
    if (!context.inputData.options) {
      context.inputData.options = {};
    }
    context.inputData.options.quality = 'high';
  },
};
```

### Processing Result

```tsx
const resultProcessor: GenerationMiddleware = {
  name: 'result-processor',

  after: async (context) => {
    // Add metadata to result
    context.result.metadata = {
      ...context.result.metadata,
      processedAt: new Date().toISOString(),
    };
  },
};
```

## Best Practices

1. **Order Matters**: Put credit checks before generation
2. **Error Handling**: Always handle errors gracefully
3. **Performance**: Keep middleware lightweight
4. **Async Safety**: Handle async operations properly
5. **Side Effects**: Be careful with state mutations

## Example: Complete Setup

```tsx
import {
  createCreditCheckMiddleware,
  createHistoryTrackingMiddleware,
  MiddlewareChain,
} from '@umituz/react-native-ai-generation-content';

// Create middlewares
const creditMiddleware = createCreditCheckMiddleware({
  creditCost: 1,
  onInsufficientCredits: async (userId) => {
    Alert.alert('Low Credits', 'Please upgrade');
  },
});

const historyMiddleware = createHistoryTrackingMiddleware({
  maxHistorySize: 100,
});

const analyticsMiddleware: GenerationMiddleware = {
  name: 'analytics',

  before: async (context) => {
    await Analytics.track('generation_started', {
      feature: context.featureType,
    });
  },

  after: async (context) => {
    await Analytics.track('generation_completed', {
      feature: context.featureType,
      success: context.result.success,
    });
  },
};

// Create chain
const middlewareChain = new MiddlewareChain([
  creditMiddleware,
  historyMiddleware,
  analyticsMiddleware,
]);

// Use chain
const result = await middlewareChain.execute({
  featureType: 'text-to-image',
  inputData: { prompt: 'A sunset' },
  execute: async (input) => {
    return await generateImage(input);
  },
});
```

## Testing

```tsx
import { MiddlewareChain } from '@umituz/react-native-ai-generation-content';

test('middleware executes in order', async () => {
  const executionOrder: string[] = [];

  const middleware1: GenerationMiddleware = {
    name: 'middleware1',
    before: async () => {
      executionOrder.push('m1-before');
    },
    after: async () => {
      executionOrder.push('m1-after');
    },
  };

  const chain = new MiddlewareChain([middleware1]);

  await chain.execute({
    featureType: 'test',
    inputData: {},
    execute: async () => ({ success: true }),
  });

  expect(executionOrder).toEqual(['m1-before', 'm1-after']);
});
```

## Related

- [Config](../config/) - Service configuration
- [Services](../services/) - AI generation services
- [Orchestration](../orchestration/) - Generation orchestration

## License

MIT
