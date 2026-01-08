# Infrastructure Services

Core AI generation services.

## Overview

The services module provides the core AI generation services that power all features. These services handle communication with AI providers, manage generation requests, and process responses.

## Features

- Image generation (text-to-image, image-to-image)
- Video generation (text-to-video, image-to-video)
- Audio generation (text-to-voice)
- Face operations (swap, detection)
- Image enhancement (restoration, upscaling, etc.)

## Core Services

### Image Generation Services

#### executeImageFeature

Execute image-based AI features:

```tsx
import { executeImageFeature } from '@umituz/react-native-ai-generation-content';

const result = await executeImageFeature({
  featureType: 'text-to-image',
  inputData: {
    prompt: 'A beautiful sunset over mountains',
    style: 'realistic',
    aspectRatio: '16:9',
  },
  userId: 'user-123',
});

if (result.success) {
  console.log('Generated image:', result.imageUrl);
} else {
  console.error('Error:', result.error);
}
```

#### hasImageFeatureSupport

Check if an image feature is supported:

```tsx
import { hasImageFeatureSupport } from '@umituz/react-native-ai-generation-content';

if (hasImageFeatureSupport('text-to-image')) {
  // Feature is supported
}
```

### Video Generation Services

#### executeVideoFeature

Execute video-based AI features:

```tsx
import { executeVideoFeature } from '@umituz/react-native-ai-generation-content';

const result = await executeVideoFeature({
  featureType: 'text-to-video',
  inputData: {
    prompt: 'A drone flying over a forest',
    duration: 5,
    aspectRatio: '16:9',
  },
  userId: 'user-123',
});

if (result.success) {
  console.log('Generated video:', result.videoUrl);
  console.log('Thumbnail:', result.thumbnailUrl);
} else {
  console.error('Error:', result.error);
}
```

#### hasVideoFeatureSupport

Check if a video feature is supported:

```tsx
import { hasVideoFeatureSupport } from '@umituz/react-native-ai-generation-content';

if (hasVideoFeatureSupport('text-to-video')) {
  // Feature is supported
}
```

## Feature Types

### Image Features

```tsx
type ImageFeatureType =
  | 'text-to-image'
  | 'face-swap'
  | 'photo-restoration'
  | 'upscaling'
  | 'style-transfer'
  | 'remove-background'
  | 'replace-background'
  | 'remove-object'
  | 'inpainting'
  | 'colorization'
  | 'hd-touch-up'
  | 'image-to-image';
```

### Video Features

```tsx
type VideoFeatureType =
  | 'text-to-video'
  | 'image-to-video';
```

## Input Data Types

### ImageFeatureInputData

```tsx
interface ImageFeatureInputData {
  prompt?: string;
  imageBase64?: string;
  targetImageBase64?: string; // For dual-image features
  options?: Record<string, any>;
}
```

### VideoFeatureInputData

```tsx
interface VideoFeatureInputData {
  prompt?: string;
  imageBase64?: string;
  videoBase64?: string;
  duration?: number;
  aspectRatio?: string;
  options?: Record<string, any>;
}
```

## Result Types

### ImageFeatureResult

```tsx
interface ImageFeatureResult {
  success: boolean;
  imageUrl?: string;
  imageUrls?: string[];
  thumbnailUrl?: string;
  metadata?: {
    prompt: string;
    model: string;
    timestamp: string;
    [key: string]: any;
  };
  error?: string;
}
```

### VideoFeatureResult

```tsx
interface VideoFeatureResult {
  success: boolean;
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: number;
  metadata?: {
    prompt: string;
    model: string;
    timestamp: string;
    [key: string]: any;
  };
  error?: string;
}
```

## Execution Options

### ExecuteImageFeatureOptions

```tsx
interface ExecuteImageFeatureOptions {
  featureType: ImageFeatureType;
  inputData: ImageFeatureInputData;
  userId: string;
  providerId?: string;
  onProgress?: (progress: number) => void;
  timeout?: number;
}
```

### ExecuteVideoFeatureOptions

```tsx
interface ExecuteVideoFeatureOptions {
  featureType: VideoFeatureType;
  inputData: VideoFeatureInputData;
  userId: string;
  providerId?: string;
  onProgress?: (progress: number) => void;
  timeout?: number;
}
```

## Usage Examples

### Text to Image

```tsx
const result = await executeImageFeature({
  featureType: 'text-to-image',
  inputData: {
    prompt: 'A majestic lion in the savanna',
    style: 'realistic',
    aspectRatio: '16:9',
    numberOfImages: 1,
  },
  userId: 'user-123',
});
```

### Face Swap

```tsx
const result = await executeImageFeature({
  featureType: 'face-swap',
  inputData: {
    imageBase64: sourceImage,
    targetImageBase64: targetImage,
    options: {
      enhanceFace: true,
      matchSkinTone: true,
    },
  },
  userId: 'user-123',
});
```

### Photo Restoration

```tsx
const result = await executeImageFeature({
  featureType: 'photo-restoration',
  inputData: {
    imageBase64: oldPhoto,
    options: {
      restorationType: 'auto',
      removeScratches: true,
      fixBlur: true,
    },
  },
  userId: 'user-123',
});
```

### Text to Video

```tsx
const result = await executeVideoFeature({
  featureType: 'text-to-video',
  inputData: {
    prompt: 'A futuristic city at night',
    duration: 5,
    aspectRatio: '16:9',
    style: 'cinematic',
  },
  userId: 'user-123',
});
```

### Image to Video

```tsx
const result = await executeVideoFeature({
  featureType: 'image-to-video',
  inputData: {
    imageBase64: staticImage,
    motionType: 'zoom-in',
    duration: 4,
  },
  userId: 'user-123',
});
```

## Progress Tracking

```tsx
const result = await executeImageFeature({
  featureType: 'text-to-image',
  inputData: { prompt: 'A sunset' },
  userId: 'user-123',
  onProgress: (progress) => {
    console.log(`Progress: ${progress}%`);
    // Update UI progress bar
  },
});
```

## Error Handling

```tsx
try {
  const result = await executeImageFeature({
    featureType: 'text-to-image',
    inputData: { prompt: 'A sunset' },
    userId: 'user-123',
  });

  if (!result.success) {
    // Handle error
    console.error('Generation failed:', result.error);
    Alert.alert('Error', result.error);
  } else {
    // Success
    console.log('Image generated:', result.imageUrl);
  }
} catch (error) {
  // Handle unexpected errors
  console.error('Unexpected error:', error);
}
```

## Provider Selection

```tsx
// Use specific provider
const result = await executeImageFeature({
  featureType: 'text-to-image',
  inputData: { prompt: 'A sunset' },
  userId: 'user-123',
  providerId: 'openai', // Use OpenAI provider
});

// Or let system choose based on capabilities
const result = await executeImageFeature({
  featureType: 'text-to-image',
  inputData: { prompt: 'A sunset' },
  userId: 'user-123',
  // No providerId - system will choose best provider
});
```

## Timeout Handling

```tsx
const result = await executeImageFeature({
  featureType: 'text-to-image',
  inputData: { prompt: 'A sunset' },
  userId: 'user-123',
  timeout: 60000, // 60 second timeout
});
```

## Best Practices

1. **Error Handling**: Always check result.success
2. **Progress Tracking**: Use onProgress for long-running operations
3. **Timeout**: Set appropriate timeouts for each feature
4. **Provider Selection**: Let system choose unless you need specific provider
5. **Type Safety**: Use proper input data types

## Related

- [Config](../config/) - Service configuration
- [Middleware](../middleware/) - Request/response middleware
- [Orchestration](../orchestration/) - Generation orchestration
- [Utils](../utils/) - Utility functions

## License

MIT
