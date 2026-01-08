# Frequently Asked Questions

Common questions and strategies for using `@umituz/react-native-ai-generation-content`.

## 🎯 Purpose

Quick reference for common questions, configuration strategies, and troubleshooting approaches. Focus on "what to do" rather than extensive code examples.

---

## 📋 Table of Contents

- [General](#general)
- [Installation & Setup](#installation--setup)
- [Features & Usage](#features--usage)
- [Configuration](#configuration)
- [Pricing & Credits](#pricing--credits)
- [Performance](#performance)
- [Troubleshooting](#troubleshooting)

---

## General

### What is this library?

Provider-agnostic AI generation orchestration for React Native with:
- **25+ AI features** (image, video, audio generation)
- **Clean architecture** (domain-driven design)
- **Type-safe APIs** (comprehensive TypeScript)
- **Multiple provider support**
- **Content moderation** built-in
- **Usage tracking** capabilities

### What AI providers are supported?

**Provider-agnostic architecture** supports:
- OpenAI (DALL-E, GPT)
- Google (Imagen, Veo)
- Stability AI
- Replicate
- Any custom provider

### Is this library free?

**MIT License** - Free to use, but you need:
- API keys from AI providers (paid)
- Your own backend infrastructure
- Provider-specific pricing applies

### Can I use this commercially?

**Yes!** MIT license allows commercial use.

---

## Installation & Setup

### How do I install?

```bash
npm install @umituz/react-native-ai-generation-content
```

### Minimum requirements?

- **React Native**: 0.70+
- **iOS**: 13+ / **Android**: 8+
- **TypeScript**: 5.0+
- **Node.js**: 18+

### How do I configure API keys?

**Strategy**: Use environment variables, never hardcode

```typescript
import { configureAppServices } from '@umituz/react-native-ai-generation-content';

configureAppServices({
  networkService: {
    baseUrl: process.env.API_BASE_URL,
    apiKey: process.env.AI_API_KEY,
  },
});
```

**⚠️ Critical**: Never commit API keys to version control!

### Do I need a backend server?

**Recommendation**:
- **Development**: Direct API calls (caution)
- **Production**: Backend server for:
  - API key security
  - Rate limiting
  - Usage tracking
  - Payment processing

---

## Features & Usage

### How do I use a feature?

**Strategy**:
1. Import feature hook
2. Configure with userId
3. Check isReady before actions
4. Handle isProcessing state
5. Display errors clearly

```typescript
import { useTextToImageFeature } from '@umituz/react-native-ai-generation-content';

const feature = useTextToImageFeature({
  config: { model: 'imagen-3' },
  userId: 'user-123',
});

// Use feature.state, feature.generate(), etc.
```

**See feature documentation**: `src/features/text-to-image/README.md`

### Which features are available?

**Image Generation**:
- Text to Image, Image to Image, Style Transfer
- Photo Restoration, Upscaling, HD Touch Up

**Face & Person**:
- Face Swap, AI Hug, AI Kiss, Couple Future

**Video**:
- Text to Video, Image to Video

**Editing**:
- Remove/Replace Background, Inpainting, Remove Object

**Creative**:
- Meme Generator, Sketch to Image, Anime Selfie

**Audio**:
- Audio Generation, Text to Voice

**Analysis**:
- Image Captioning

### Can I use UI components directly?

**Yes!** All components exported:

```typescript
import {
  AIFeatureScreen,
  GenerationProgressModal,
  DualImagePicker,
  PhotoUploadCard,
} from '@umituz/react-native-ai-generation-content';
```

### How do I add custom provider?

**Strategy**: Register with explicit capabilities

```typescript
import { providerRegistry } from '@umituz/react-native-ai-generation-content';

providerRegistry.registerProvider({
  id: 'my-provider',
  name: 'My AI Provider',
  capabilities: {
    textToImage: true,
    faceSwap: false,
    // Declare all capabilities
  },
  execute: async (request) => {
    // Your implementation
    return result;
  },
});
```

---

## Configuration

### What services must I configure?

**Required**:
- `networkService` - API communication
- `creditService` - Credit checking (if using credits)
- `paywallService` - Paywall display (if using paywall)

**Optional**:
- `analyticsService` - Usage tracking
- `moderationService` - Content moderation
- `storageService` - Local storage

### How do I implement credit system?

**Strategy**: Check before, deduct after

```typescript
configureAppServices({
  creditService: {
    checkCredits: async (userId, cost) => {
      // Check if user has enough credits
      return user.credits >= cost;
    },
    deductCredits: async (userId, cost) => {
      // Deduct credits from user
    },
  },
});
```

### How do I show paywall?

**Strategy**: Trigger on insufficient credits

```typescript
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

---

## Pricing & Credits

### How do I track usage?

**Strategy**: Use history tracking middleware

```typescript
import { createHistoryTrackingMiddleware } from '@umituz/react-native-ai-generation-content';

const historyMiddleware = createHistoryTrackingMiddleware({
  maxHistorySize: 100,
  onHistoryUpdate: (history) => {
    console.log('Usage:', history.length);
  },
});
```

### How do I set pricing?

**Strategy**: Configure per feature

```typescript
const featurePricing = {
  'text-to-image': 1,
  'face-swap': 2,
  'photo-restoration': 1,
  // Cost in credits per generation
};
```

---

## Performance

### How do I optimize performance?

**Best Practices**:
1. **Cache results** locally
2. **Compress images** before upload
3. **Lazy load** features
4. **Background processing** for long operations
5. **Pagination** for large datasets

### How do I cache results?

**Strategy**: Use AsyncStorage or custom cache

```typescript
import { AsyncStorage } from '@react-native-async-storage/async-storage';

const cacheResult = async (key: string, result: any) => {
  await AsyncStorage.setItem(`cache_${key}`, JSON.stringify(result));
};

const getCachedResult = async (key: string) => {
  const cached = await AsyncStorage.getItem(`cache_${key}`);
  return cached ? JSON.parse(cached) : null;
};
```

### How do I optimize images?

**Strategy**: Compress before upload

```typescript
import { preparePhoto } from '@umituz/react-native-ai-generation-content';

const optimizedImage = await preparePhoto({
  imageBase64: rawImage,
  maxSize: 1024, // 1MB
  maxWidth: 1920,
  maxHeight: 1080,
});
```

### Can I run in background?

**Yes!** Use background generation hook

```typescript
import { useBackgroundGeneration } from '@umituz/react-native-ai-generation-content';

const { startGeneration, getJobs } = useBackgroundGeneration();

await startGeneration({
  featureType: 'text-to-image',
  inputData: { prompt: '...' },
});
```

---

## Troubleshooting

### "Network service not configured"

**Solution**: Configure app services first

```typescript
configureAppServices({
  networkService: {
    baseUrl: 'https://your-api.com',
    apiKey: 'your-key',
  },
});
```

### "UserId is required"

**Solution**: Always provide userId

```typescript
const feature = useFeature({
  config: { /* ... */ },
  userId: 'user-123', // ← Required
});
```

### Generation is very slow

**Possible causes**:
- Network latency
- Provider load
- Large image sizes
- Complex prompts

**Solutions**:
- Check network connection
- Reduce image size
- Use simpler prompts
- Show progress to users
- Implement timeout

### Error: "Insufficient credits"

**Solution**: Check before processing

```typescript
const hasCredits = await checkCredits(userId, cost);

if (!hasCredits) {
  showPaywall();
  return;
}
```

### Images not generating

**Check**:
1. API key is valid
2. Network connection working
3. Provider accessible
4. Prompt not empty
5. Sufficient quota

### TypeScript errors

**Solution**: Use proper types

```typescript
import type { TextToImageOptions } from '@umituz/react-native-ai-generation-content';

const options: TextToImageOptions = {
  style: 'realistic',
  aspectRatio: '16:9',
};
```

---

## Common Strategies

### Error Handling Strategy

1. **Classify errors** by type
2. **Show user-friendly** messages
3. **Log technical** details
4. **Offer retry** or alternatives
5. **Recover gracefully**

### Performance Strategy

1. **Implement caching** for results
2. **Compress uploads** before sending
3. **Lazy load** features
4. **Background process** long operations
5. **Show progress** to users

### Security Strategy

1. **Never hardcode** API keys
2. **Use environment** variables
3. **Implement rate** limiting
4. **Moderate content** appropriately
5. **Secure backend** for production

---

## Still Have Questions?

- **Documentation**: [README.md](./README.md)
- **Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Contributing**: [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Issues**: [GitHub Issues](https://github.com/umituz/react-native-ai-generation-content/issues)
- **New Issue**: [Create Issue](https://github.com/umituz/react-native-ai-generation-content/issues/new)

---

**Version**: 2.0.0 (Strategy-based Documentation)
**Last Updated**: 2025-01-08
