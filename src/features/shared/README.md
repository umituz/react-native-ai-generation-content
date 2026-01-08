# Shared Features

Common functionality and utilities shared across multiple AI features.

## Overview

This directory contains shared components, hooks, and utilities used by multiple features. It provides reusable implementations for common patterns like dual image/video processing.

## Features

- **Dual Image/Video Processing**: Shared logic for features that require two inputs
- **Common Hooks**: Reusable hooks for similar feature patterns
- **Type Definitions**: Shared TypeScript types and interfaces
- **Utilities**: Common helper functions

## Installation

This is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Dual Image/Video Processing

Many AI features require two images or videos as input (e.g., face swap, AI hug, AI kiss). The dual image/video processing module provides a shared implementation for these features.

### Data Types

#### DualImageVideoProcessingStartData

```tsx
interface DualImageVideoProcessingStartData {
  sourceImageOrVideo: string; // Base64 of source image/video
  targetImageOrVideo: string; // Base64 of target image/video
  options?: Record<string, any>;
}
```

#### DualImageVideoResult

```tsx
interface DualImageVideoResult {
  success: boolean;
  result?: {
    imageUrl?: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    metadata?: Record<string, any>;
  };
  error?: string;
}
```

#### DualImageVideoFeatureConfig

```tsx
interface DualImageVideoFeatureConfig {
  featureType: string; // e.g., 'face-swap', 'ai-hug', 'ai-kiss'
  inputType: 'image' | 'video';
  defaultOptions?: Record<string, any>;
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: DualImageVideoResult) => void;
  onError?: (error: string) => void;
}
```

## Usage Example

### Using Dual Image/Video Processing

```tsx
import { useDualImageVideoProcessing } from '@umituz/react-native-ai-generation-content';

function FaceSwapScreen() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [targetImage, setTargetImage] = useState<string | null>(null);

  const {
    state,
    selectSourceImage,
    selectTargetImage,
    process,
    reset,
    isReady,
  } = useDualImageVideoProcessing({
    config: {
      featureType: 'face-swap',
      inputType: 'image',
      defaultOptions: {
        enhanceFace: true,
        matchSkinTone: true,
      },
      onProcessingStart: () => console.log('Starting face swap...'),
      onProcessingComplete: (result) => console.log('Complete:', result),
      onError: (error) => console.error('Error:', error),
    },
    onSelectSourceImage: async () => {
      // Select source image
      const result = await ImagePicker.launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets[0].uri) {
        const base64 = await convertToBase64(result.assets[0].uri);
        setSourceImage(base64);
        return base64;
      }
      return null;
    },
    onSelectTargetImage: async () => {
      // Select target image
      const result = await ImagePicker.launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets[0].uri) {
        const base64 = await convertToBase64(result.assets[0].uri);
        setTargetImage(base64);
        return base64;
      }
      return null;
    },
  });

  return (
    <View>
      <DualImagePicker
        sourceImage={sourceImage}
        targetImage={targetImage}
        onSelectSourceImage={selectSourceImage}
        onSelectTargetImage={selectTargetImage}
      />

      <Button
        title="Process"
        onPress={process}
        disabled={!isReady || state.isProcessing}
      />

      {state.isProcessing && <ActivityIndicator />}

      {state.result && (
        <Image source={{ uri: state.result.result?.imageUrl }} />
      )}

      {state.error && <Text>Error: {state.error}</Text>}
    </View>
  );
}
```

## State Management

### Processing State

```tsx
interface DualImageVideoState {
  sourceImageOrVideo: string | null;
  targetImageOrVideo: string | null;
  result: DualImageVideoResult | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}
```

## Features Using Dual Image/Video Processing

- **Face Swap**: Swap faces between two images
- **AI Hug**: Generate hug images from two photos
- **AI Kiss**: Generate kiss images from two photos
- **Couple Future**: Generate future predictions for couples

## Helper Components

### DualImagePicker

```tsx
import { DualImagePicker } from '@umituz/react-native-ai-generation-content';

<DualImagePicker
  sourceImage={sourceImage}
  targetImage={targetImage}
  onSelectSourceImage={handleSelectSource}
  onSelectTargetImage={handleSelectTarget}
  sourceLabel="First Image"
  targetLabel="Second Image"
/>
```

### DualVideoPicker

```tsx
import { DualVideoPicker } from '@umituz/react-native-ai-generation-content';

<DualVideoPicker
  sourceVideo={sourceVideo}
  targetVideo={targetVideo}
  onSelectSourceVideo={handleSelectSource}
  onSelectTargetVideo={handleSelectTarget}
  sourceLabel="First Video"
  targetLabel="Second Video"
/>
```

## Advanced Usage

### Custom Processing Logic

```tsx
import { useDualImageVideoProcessing } from '@umituz/react-native-ai-generation-content';

const { process } = useDualImageVideoProcessing({
  config: {
    featureType: 'my-custom-feature',
    inputType: 'image',
  },
  // ... other props
  customProcess: async (source, target, options) => {
    // Custom processing logic
    const result = await myCustomProcessingFunction(source, target, options);
    return result;
  },
});
```

### Validation

```tsx
const { validate } = useDualImageVideoProcessing({
  // ... config
  validateInput: (source, target) => {
    if (!source || !target) {
      throw new Error('Both images are required');
    }
    if (source.size > MAX_SIZE) {
      throw new Error('Source image is too large');
    }
    if (target.size > MAX_SIZE) {
      throw new Error('Target image is too large');
    }
    return true;
  },
});
```

### Before Process Hook

```tsx
const { process } = useDualImageVideoProcessing({
  // ... config
  onBeforeProcess: async (source, target) => {
    // Show confirmation dialog
    return new Promise((resolve) => {
      Alert.alert(
        'Confirm',
        'Do you want to proceed?',
        [
          { text: 'Cancel', onPress: () => resolve(false) },
          { text: 'OK', onPress: () => resolve(true) },
        ]
      );
    });
  },
});
```

## Best Practices

1. **Input Validation**: Always validate inputs before processing
2. **Error Handling**: Handle errors gracefully and show user-friendly messages
3. **Progress Tracking**: Show progress to users during processing
4. **Confirmation**: Use confirmation dialogs for destructive operations
5. **State Reset**: Reset state after successful operations

## Related Features

- [Face Swap](../face-swap) - Swap faces between images
- [AI Hug](../ai-hug) - Generate AI hug images
- [AI Kiss](../ai-kiss) - Generate AI kiss images
- [Couple Future](../couple-future) - Generate future couple predictions

## License

MIT
