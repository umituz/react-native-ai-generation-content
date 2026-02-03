# Generation Config Provider Guide

## Overview

The `GenerationConfigProvider` allows each app to configure only the AI models it needs. Some apps only need IMAGE generation, some only VIDEO, and some need both.

## Configuration Examples

### Image-Only App (Future US)
```typescript
// src/config/generation.config.ts
export const GENERATION_MODELS = {
  imageCoupleMultiRef: "fal-ai/nano-banana/edit",
  imageTextToImage: "fal-ai/flux-pro/v1.1",
} as const;
```

### Video-Only App
```typescript
export const GENERATION_MODELS = {
  imageToVideo: "fal-ai/kling-video/v1/standard/image-to-video",
  textToVideo: "fal-ai/kling-video/v1/standard/text-to-video",
  aiKiss: "fal-ai/kling-video/v1/standard/image-to-video",
  aiHug: "fal-ai/kling-video/v1/standard/image-to-video",
} as const;
```

### Hybrid App (Image + Video)
```typescript
export const GENERATION_MODELS = {
  // Image models
  imageCoupleMultiRef: "fal-ai/nano-banana/edit",
  imageTextToImage: "fal-ai/flux-pro/v1.1",

  // Video models
  imageToVideo: "fal-ai/kling-video/v1/standard/image-to-video",
  textToVideo: "fal-ai/kling-video/v1/standard/text-to-video",
  aiKiss: "fal-ai/kling-video/v1/standard/image-to-video",
  aiHug: "fal-ai/kling-video/v1/standard/image-to-video",
} as const;
```

### Meme Generator App
```typescript
export const GENERATION_MODELS = {
  memeCaption: "fal-ai/llama-3-8b-instruct",
  memeImage: "fal-ai/flux/schnell",
} as const;
```

## Provider Setup

Wrap your app with the provider:

```tsx
// src/core/providers/AppProviders.tsx
import { GenerationConfigProvider } from "@umituz/react-native-ai-generation-content";
import { GENERATION_MODELS } from "@config/generation.config";

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <GenerationConfigProvider models={GENERATION_MODELS}>
      {/* Other providers */}
      {children}
    </GenerationConfigProvider>
  );
};
```

## Available Model Types

### Image Generation
- `imageCoupleMultiRef` - Multi-reference image (couple photos with face identity)
- `imageTextToImage` - Standard text-to-image
- `faceSwap` - Face swap feature
- `memeImage` - Meme image generation

### Video Generation
- `imageToVideo` - Image-to-video animation
- `textToVideo` - Text-to-video generation

### Other
- `memeCaption` - Meme caption generation (text-to-text)
- `textToVoice` - Text-to-speech

## Error Handling

If your app tries to use a feature without configuring its model:

```typescript
// App only has imageCoupleMultiRef configured
// User tries to use video feature

// Error thrown:
// "Model not configured for feature: imageToVideo.
//
// This app only supports: imageCoupleMultiRef.
// Please configure 'imageToVideo' in your GenerationConfigProvider if you need it."
```

## Best Practices

1. **Only configure what you need**: Don't add video models if your app is image-only
2. **Document your choice**: Add comments explaining why certain models are/aren't included
3. **Keep it DRY**: Define models in one place (`generation.config.ts`)
4. **Type safety**: Use `as const` to ensure type inference works correctly

## Migration from Hard-coded Models

### Before (v1.25.x)
```typescript
// Hard-coded in package ❌
const model = "fal-ai/nano-banana/edit";
```

### After (v1.26.0+)
```typescript
// Configured in app ✅
export const GENERATION_MODELS = {
  imageCoupleMultiRef: "fal-ai/nano-banana/edit",
} as const;
```

## Benefits

1. **Flexibility**: Each app chooses its own models
2. **Cost Control**: Only pay for models you use
3. **Type Safety**: TypeScript ensures correct usage
4. **Clear Errors**: Helpful error messages if misconfigured
5. **Zero Hard-coding**: Package is 100% app-agnostic
