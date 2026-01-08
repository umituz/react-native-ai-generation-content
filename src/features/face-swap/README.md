# Face Swap

Swap faces between people in images using AI.

## Features

- Swap faces between two images
- Automatic face detection and alignment
- Support for multiple faces in one image
- High-quality output with natural results

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useFaceSwapFeature } from '@umituz/react-native-ai-generation-content';
import * as ImagePicker from 'react-native-image-picker';

function FaceSwapScreen() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [targetImage, setTargetImage] = useState<string | null>(null);

  const feature = useFaceSwapFeature({
    config: {
      onProcessingStart: () => console.log('Starting face swap...'),
      onProcessingComplete: (result) => console.log('Complete:', result),
      onError: (error) => console.error('Error:', error),
    },
    onSelectSourceImage: async () => {
      const result = await ImagePicker.launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets[0].uri) {
        const base64 = await convertToBase64(result.assets[0].uri);
        setSourceImage(base64);
        return base64;
      }
      return null;
    },
    onSelectTargetImage: async () => {
      const result = await ImagePicker.launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets[0].uri) {
        const base64 = await convertToBase64(result.assets[0].uri);
        setTargetImage(base64);
        return base64;
      }
      return null;
    },
    onSaveImage: async (imageUrl) => {
      // Save to gallery or download
      await saveToGallery(imageUrl);
    },
  });

  return (
    <View>
      <DualImagePicker
        sourceImage={sourceImage}
        targetImage={targetImage}
        onSelectSourceImage={feature.selectSourceImage}
        onSelectTargetImage={feature.selectTargetImage}
      />

      <Button
        title="Swap Faces"
        onPress={feature.process}
        disabled={!feature.isReady || feature.state.isProcessing}
      />

      {feature.state.isProcessing && (
        <ActivityIndicator />
      )}

      {feature.state.result && (
        <Image source={{ uri: feature.state.result.imageUrl }} />
      )}
    </View>
  );
}
```

### Using the Unified AI Feature Screen

```tsx
import { AIFeatureScreen } from '@umituz/react-native-ai-generation-content';

function App() {
  return (
    <AIFeatureScreen
      featureId="face-swap"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface FaceSwapFeatureConfig {
  defaultOptions?: {
    enhanceFace?: boolean; // Enhance face quality (default: true)
    matchSkinTone?: boolean; // Match skin tones (default: true)
  };
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: FaceSwapResult) => void;
  onError?: (error: string) => void;
}
```

## Usage Flow

1. Select **Source Image** - Image containing the face to swap FROM
2. Select **Target Image** - Image containing the face to swap TO
3. Tap **Swap Faces** - Start the face swap process
4. View Result - See the face-swapped image
5. Save or Share - Save to gallery or share with others

## Component Examples

### Using DualImagePicker

```tsx
import { DualImagePicker } from '@umituz/react-native-ai-generation-content';

<DualImagePicker
  sourceImage={sourceImage}
  targetImage={targetImage}
  onSelectSourceImage={handleSelectSource}
  onSelectTargetImage={handleSelectTarget}
  sourceLabel="Face to Use"
  targetLabel="Face to Replace"
/>
```

### Custom Result Display

```tsx
import { ResultImageCard } from '@umituz/react-native-ai-generation-content';

{feature.state.result && (
  <ResultImageCard
    imageUrl={feature.state.result.imageUrl}
    onSave={() => feature.saveResult()}
    onShare={() => shareImage(feature.state.result.imageUrl)}
  />
)}
```

## Advanced Usage

### Custom Options

```tsx
const feature = useFaceSwapFeature({
  config: {
    defaultOptions: {
      enhanceFace: true,
      matchSkinTone: true,
    },
  },
  // ... other props
});
```

### Before Process Hook

```tsx
const feature = useFaceSwapFeature({
  config: { ... },
  onBeforeProcess: async () => {
    // Show confirmation dialog
    return new Promise((resolve) => {
      Alert.alert(
        'Confirm Face Swap',
        'Do you want to proceed with face swap?',
        [
          { text: 'Cancel', onPress: () => resolve(false) },
          { text: 'OK', onPress: () => resolve(true) },
        ]
      );
    });
  },
  // ... other props
});
```

## Best Practices

1. **Image Quality**: Use high-quality images for better results
2. **Face Visibility**: Ensure faces are clearly visible in both images
3. **Frontal Faces**: Front-facing photos work best
4. **Lighting**: Similar lighting conditions produce more natural results
5. **Multiple Faces**: The feature can handle multiple faces in one image

## Error Handling

```tsx
const { state, process } = useFaceSwapFeature({ ...config });

useEffect(() => {
  if (state.error) {
    Alert.alert('Face Swap Failed', state.error);
  }
}, [state.error]);
```

## Common Use Cases

- Fun face swaps between friends
- Historical face replacement
- Character face swaps
- Celebrity face swaps
- Movie character transformations

## Related Features

- [AI Hug](../ai-hug) - Generate AI hug images
- [AI Kiss](../ai-kiss) - Generate AI kiss images
- [Photo Restoration](../photo-restoration) - Restore old photos
- [Anime Selfie](../anime-selfie) - Convert photos to anime style

## License

MIT
