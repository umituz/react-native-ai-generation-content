# Migration Guide

This guide helps you migrate between versions of `@umituz/react-native-ai-generation-content`.

## 📋 Table of Contents

- [Version 1.x to 2.x](#version-1x-to-2x)
- [Version 2.x to 3.x](#version-2x-to-3x)
- [Breaking Changes](#breaking-changes)
- [Deprecated Features](#deprecated-features)

## Version 1.x to 2.x

### Overview

Version 2.x introduces significant improvements to the API, better type safety, and new features.

### Breaking Changes

#### 1. Hook Renaming

Some hooks have been renamed for clarity:

```tsx
// ❌ Old (v1.x)
import { useTextToImage } from '@umituz/react-native-ai-generation-content';

// ✅ New (v2.x)
import { useTextToImageFeature } from '@umituz/react-native-ai-generation-content';
```

**Affected hooks:**
- `useTextToImage` → `useTextToImageFeature`
- `useFaceSwap` → `useFaceSwapFeature`
- `usePhotoRestoration` → `usePhotoRestoreFeature`
- And all other feature hooks

#### 2. Config Object Structure

Configuration objects now use more explicit property names:

```tsx
// ❌ Old (v1.x)
const feature = useTextToImageFeature({
  model: 'imagen-3',
  onPromptChange: (prompt) => console.log(prompt),
});

// ✅ New (v2.x)
const feature = useTextToImageFeature({
  config: {
    model: 'imagen-3',
    onPromptChange: (prompt) => console.log(prompt),
  },
  userId: 'user-123', // Now required
});
```

#### 3. Result Object Structure

Result objects now have consistent structure:

```tsx
// ❌ Old (v1.x)
interface Result {
  imageUrl?: string;
  error?: string;
}

// ✅ New (v2.x)
interface Result {
  success: boolean;
  imageUrl?: string;
  imageUrls?: string[];
  error?: string;
  metadata?: {
    prompt: string;
    model: string;
    timestamp: string;
  };
}
```

#### 4. Service Configuration

App services configuration has changed:

```tsx
// ❌ Old (v1.x)
configureAppServices({
  apiUrl: 'https://api.example.com',
  apiKey: 'your-key',
});

// ✅ New (v2.x)
configureAppServices({
  networkService: {
    baseUrl: 'https://api.example.com',
    apiKey: 'your-key',
    timeout: 30000,
  },
  creditService: {
    checkCredits: async (userId, cost) => { /* ... */ },
    deductCredits: async (userId, cost) => { /* ... */ },
  },
  // Other services now explicitly configured
});
```

### New Features

#### Unified AI Feature Screen

```tsx
// ✅ New in v2.x
import { AIFeatureScreen } from '@umituz/react-native-ai-generation-content';

function App() {
  return (
    <AIFeatureScreen
      featureId="text-to-image"
      userId="user-123"
    />
  );
}
```

#### Content Moderation

```tsx
// ✅ New in v2.x
import { ModerationWrapper } from '@umituz/react-native-ai-generation-content';

const wrapper = new ModerationWrapper({
  enabled: true,
  onViolation: (result) => {
    Alert.alert('Content Warning', result.warning);
  },
});
```

#### Creations Gallery

```tsx
// ✅ New in v2.x
import { useCreations } from '@umituz/react-native-ai-generation-content';

const { creations, loadMore, deleteCreation } = useCreations({
  userId: 'user-123',
  type: 'image',
});
```

### Migration Steps

1. Update your package.json:
```json
{
  "dependencies": {
    "@umituz/react-native-ai-generation-content": "^2.0.0"
  }
}
```

2. Update hook names:
```bash
# Find and replace
find . -name "*.tsx" -type f -exec sed -i 's/useTextToImage/useTextToImageFeature/g' {} \;
```

3. Update config objects:
```tsx
// Wrap config in `config` property
const feature = useFeature({
  config: { /* options */ },
  userId: 'user-123',
});
```

4. Update result handling:
```tsx
// Check success property
if (result.success) {
  console.log(result.imageUrl);
} else {
  console.error(result.error);
}
```

5. Configure required services:
```tsx
configureAppServices({
  networkService: { /* ... */ },
  creditService: { /* ... */ },
  // ...
});
```

## Version 2.x to 3.x

### Breaking Changes

#### 1. Provider Registration

Provider registration now requires explicit capabilities:

```tsx
// ❌ Old (v2.x)
providerRegistry.registerProvider({
  id: 'my-provider',
  execute: async (request) => { /* ... */ },
});

// ✅ New (v3.x)
providerRegistry.registerProvider({
  id: 'my-provider',
  name: 'My Provider',
  capabilities: {
    textToImage: true,
    textToVideo: false,
    imageToImage: true,
    // ... declare all capabilities
  },
  execute: async (request) => { /* ... */ },
});
```

#### 2. Generation Options

Generation options now use explicit types:

```tsx
// ❌ Old (v2.x)
await feature.generate({
  style: 'oil-painting',
  intensity: 0.8,
});

// ✅ New (v3.x)
await feature.process({
  style: 'oil-painting',
  intensity: 0.8,
  // Options are now strongly typed
});
```

#### 3. Error Handling

Error types are now more specific:

```tsx
// ❌ Old (v2.x)
try {
  await feature.process();
} catch (error) {
  console.error('Error:', error);
}

// ✅ New (v3.x)
import { AIErrorType } from '@umituz/react-native-ai-generation-content';

try {
  await feature.process();
} catch (error) {
  if (error.type === AIErrorType.INSUFFICIENT_CREDITS) {
    // Handle insufficient credits
  } else if (error.type === AIErrorType.PROVIDER_ERROR) {
    // Handle provider error
  }
}
```

### Migration Steps

1. Update provider registrations:
```tsx
providerRegistry.registerProvider({
  // Add explicit capabilities
  capabilities: {
    textToImage: true,
    faceSwap: true,
    // ... etc
  },
});
```

2. Update generation calls:
```tsx
// Change `generate` to `process` for most features
await feature.process(options);
```

3. Update error handling:
```tsx
// Use specific error types
if (result.error) {
  const errorType = classifyError(result.error);
  // Handle based on error type
}
```

## Deprecated Features

### Removed in v2.x

- `useAIImage()` - Use `useTextToImageFeature()` instead
- `useAIGeneration()` - Use `useGeneration()` instead
- `useBackgroundGeneration()` - Use `useBackgroundGeneration()` hook directly

### Removed in v3.x

- `AIGenerator` component - Use `AIFeatureScreen` instead
- `ImageUploader` component - Use `PhotoUploadCard` instead
- Legacy provider interface - Use new `IAIProvider` interface

## Common Migration Issues

### Issue: "userId is required"

**Solution:**
```tsx
// Add userId to all feature hooks
const feature = useFeature({
  config: { /* ... */ },
  userId: 'user-123', // ← Add this
});
```

### Issue: "Network service not configured"

**Solution:**
```tsx
// Configure network service
configureAppServices({
  networkService: {
    baseUrl: 'https://api.example.com',
    apiKey: 'your-key',
  },
});
```

### Issue: Type errors with options

**Solution:**
```tsx
// Import and use proper types
import type { TextToImageOptions } from '@umituz/react-native-ai-generation-content';

const options: TextToImageOptions = {
  style: 'realistic',
  aspectRatio: '16:9',
};
```

## Rollback Guide

If you need to rollback to a previous version:

```bash
# Install previous version
npm install @umituz/react-native-ai-generation-content@1.17.228

# Revert code changes
git checkout HEAD~1  # Or your backup

# Reinstall dependencies
npm install
```

## Testing Your Migration

After migrating, test your app:

1. **Test all AI features**:
   - Text to Image
   - Face Swap
   - Photo Restoration
   - And any other features you use

2. **Test error handling**:
   - Network errors
   - API errors
   - Insufficient credits

3. **Test UI components**:
   - Progress modals
   - Result displays
   - Error displays

4. **Test user flows**:
   - Generation flow
   - Saving/sharing
   - History navigation

## Need Help?

- Check [GitHub Issues](https://github.com/umituz/react-native-ai-generation-content/issues)
- Read [Documentation](./README.md)
- Review [Architecture](./ARCHITECTURE.md)
- Join our [Community Discord](https://discord.gg/...)

## Version Compatibility

| Version | React Native | TypeScript | Support Status |
|---------|--------------|------------|----------------|
| 1.x     | 0.60+        | 4.0+       | ⚠️ Deprecated |
| 2.x     | 0.65+        | 4.5+       | ✅ Maintained |
| 3.x     | 0.70+        | 5.0+       | ✅ Latest |

---

Last updated: 2025-01-08
