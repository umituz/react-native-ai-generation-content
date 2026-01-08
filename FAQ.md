# Frequently Asked Questions

Common questions and answers about `@umituz/react-native-ai-generation-content`.

## 📋 Table of Contents

- [General](#general)
- [Installation & Setup](#installation--setup)
- [Features & Usage](#features--usage)
- [Pricing & Credits](#pricing--credits)
- [Performance & Optimization](#performance--optimization)
- [Troubleshooting](#troubleshooting)
- [API & Integration](#api--integration)

## General

### What is this library?

A comprehensive React Native library for AI-powered content generation. It provides:
- 30+ AI features (image generation, video creation, face swap, etc.)
- Provider-agnostic architecture
- Type-safe TypeScript APIs
- Pre-built UI components
- Content moderation
- Usage tracking

### What AI providers are supported?

The library is provider-agnostic. You can integrate with:
- OpenAI (DALL-E, GPT)
- Google (Imagen, Veo)
- Stability AI
- Replicate
- Any custom AI provider

### Is this library free?

The library itself is open-source (MIT license), but you'll need:
- API keys from AI providers (paid services)
- Your own backend infrastructure
- Provider-specific pricing applies

### Can I use this in commercial projects?

Yes! The library is licensed under MIT, allowing commercial use.

## Installation & Setup

### How do I install?

```bash
npm install @umituz/react-native-ai-generation-content
```

or

```bash
yarn add @umituz/react-native-ai-generation-content
```

### What are the minimum requirements?

- React Native 0.70+
- iOS 13+ / Android 8+
- TypeScript 5.0+
- Node.js 18+

### How do I configure API keys?

```tsx
import { configureAppServices } from '@umituz/react-native-ai-generation-content';

configureAppServices({
  networkService: {
    baseUrl: 'https://your-api.com',
    apiKey: process.env.AI_API_KEY,
  },
});
```

**⚠️ Important:** Never commit API keys to version control!

### Do I need a backend server?

While not strictly required, we recommend:
- **For Development**: Direct API calls (with caution)
- **For Production**: Backend server to:
  - Secure API keys
  - Implement rate limiting
  - Track usage
  - Handle payments

## Features & Usage

### How do I generate an image from text?

```tsx
import { useTextToImageFeature } from '@umituz/react-native-ai-generation-content';

const feature = useTextToImageFeature({
  config: {
    model: 'imagen-3',
  },
  userId: 'user-123',
});

await feature.generate({
  prompt: 'A beautiful sunset over mountains',
  style: 'realistic',
});
```

### How do I swap faces?

```tsx
import { useFaceSwapFeature } from '@umituz/react-native-ai-generation-content';

const feature = useFaceSwapFeature({
  config: {
    enhanceFace: true,
  },
  onSelectSourceImage: async () => { /* ... */ },
  onSelectTargetImage: async () => { /* ... */ },
  onSaveImage: async (url) => { /* ... */ },
});

await feature.process();
```

### Can I use the UI components directly?

Yes! All UI components are exported:

```tsx
import {
  AIFeatureScreen,
  GenerationProgressModal,
  DualImagePicker,
  PhotoUploadCard,
} from '@umituz/react-native-ai-generation-content';
```

### How do I add a custom provider?

```tsx
import { providerRegistry } from '@umituz/react-native-ai-generation-content';

providerRegistry.registerProvider({
  id: 'my-provider',
  name: 'My AI Provider',
  capabilities: {
    textToImage: true,
    faceSwap: true,
  },
  execute: async (request) => {
    // Your implementation
    return result;
  },
});
```

## Pricing & Credits

### How do I track usage?

```tsx
import { createHistoryTrackingMiddleware } from '@umituz/react-native-ai-generation-content';

const historyMiddleware = createHistoryTrackingMiddleware({
  maxHistorySize: 100,
  onHistoryUpdate: (history) => {
    console.log('Usage:', history.length);
  },
});
```

### How do I implement credit system?

```tsx
configureAppServices({
  creditService: {
    checkCredits: async (userId, cost) => {
      const user = await getUserCredits(userId);
      return user.credits >= cost;
    },
    deductCredits: async (userId, cost) => {
      await updateUserCredits(userId, -cost);
    },
  },
});
```

### How do I show paywall?

```tsx
import { createCreditCheckMiddleware } from '@umituz/react-native-ai-generation-content';

const creditMiddleware = createCreditCheckMiddleware({
  creditCost: 1,
  paywallThreshold: 5,
  onPaywallTrigger: async () => {
    // Navigate to paywall
    navigation.navigate('Paywall');
  },
});
```

## Performance & Optimization

### How do I cache results?

The library doesn't cache by default, but you can:

```tsx
import { AsyncStorage } from 'react-native';

const cacheResult = async (key: string, result: any) => {
  await AsyncStorage.setItem(`cache_${key}`, JSON.stringify(result));
};

const getCachedResult = async (key: string) => {
  const cached = await AsyncStorage.getItem(`cache_${key}`);
  return cached ? JSON.parse(cached) : null;
};
```

### How do I optimize image sizes?

```tsx
import { preparePhoto } from '@umituz/react-native-ai-generation-content';

// Automatically compresses and optimizes
const optimizedImage = await preparePhoto({
  imageBase64: rawImage,
  maxSize: 1024, // 1MB
  maxWidth: 1920,
  maxHeight: 1080,
});
```

### Can I run generations in background?

Yes!

```tsx
import { useBackgroundGeneration } from '@umituz/react-native-ai-generation-content';

const { startGeneration, getJobs } = useBackgroundGeneration();

await startGeneration({
  featureType: 'text-to-image',
  inputData: { prompt: '...' },
});
```

## Troubleshooting

### "Network service not configured"

**Solution:**
```tsx
configureAppServices({
  networkService: {
    baseUrl: 'https://your-api.com',
    apiKey: 'your-key',
  },
});
```

### "UserId is required"

**Solution:**
```tsx
const feature = useFeature({
  config: { /* ... */ },
  userId: 'user-123', // ← Add this
});
```

### Generation is very slow

**Possible causes:**
- Network latency
- Provider load
- Large image sizes
- Complex prompts

**Solutions:**
- Check network connection
- Reduce image size
- Use simpler prompts
- Show progress to users

### Error: "Insufficient credits"

**Solution:**
```tsx
// Check credits before generation
const hasCredits = await checkCredits(userId, cost);

if (!hasCredits) {
  // Show paywall or upgrade prompt
  showPaywall();
  return;
}
```

### Images not generating

**Check:**
1. API key is valid
2. Network connection is working
3. Provider is accessible
4. Prompt isn't empty
5. Account has sufficient quota

### TypeScript errors

**Solution:**
```tsx
// Make sure you're using proper types
import type { TextToImageOptions } from '@umituz/react-native-ai-generation-content';

const options: TextToImageOptions = {
  style: 'realistic',
};
```

## API & Integration

### Can I use this with Expo?

Yes! The library works with Expo. Just install and use:

```bash
expo install @umituz/react-native-ai-generation-content
```

### How do I integrate with my existing app?

```tsx
// 1. Install the library
npm install @umituz/react-native-ai-generation-content

// 2. Configure services
configureAppServices({ /* ... */ });

// 3. Add to your navigation
<Stack.Screen
  name="AIImage"
  component={AIFeatureScreen}
  initialParams={{ featureId: 'text-to-image' }}
/>

// 4. Navigate
navigation.navigate('AIImage', { featureId: 'text-to-image', userId: 'user-123' });
```

### How do I test my integration?

```tsx
import { renderHook, waitFor } from '@testing-library/react-native';
import { useTextToImageFeature } from '@umituz/react-native-ai-generation-content';

test('generates image', async () => {
  const { result } = renderHook(() =>
    useTextToImageFeature({
      config: {},
      userId: 'test-user',
    })
  );

  await act(async () => {
    await result.current.generate({ prompt: 'Test' });
  });

  await waitFor(() => {
    expect(result.current.state.imageUrl).toBeTruthy();
  });
});
```

### How do I handle errors?

```tsx
try {
  await feature.process();
} catch (error) {
  if (error.type === AIErrorType.INSUFFICIENT_CREDITS) {
    // Handle credits
  } else if (error.type === AIErrorType.PROVIDER_ERROR) {
    // Handle provider error
  } else {
    // Handle other errors
  }
}
```

## Still Have Questions?

- Check the [Documentation](./README.md)
- Read [Architecture](./ARCHITECTURE.md)
- Review [Contributing](./CONTRIBUTING.md)
- Search [GitHub Issues](https://github.com/umituz/react-native-ai-generation-content/issues)
- Open a [New Issue](https://github.com/umituz/react-native-ai-generation-content/issues/new)

---

Last updated: 2025-01-08
