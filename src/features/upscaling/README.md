# Upscaling

Increase image resolution while maintaining quality using AI.

## Features

- Upscale images by 2x, 4x, or more
- Maintain image quality and details
- Remove noise and artifacts during upscaling
- Support for various image formats

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content`
```

## Basic Usage

### Using the Hook

```tsx
import { useUpscaleFeature } from '@umituz/react-native-ai-generation-content';
import * as ImagePicker from 'react-native-image-picker';

function UpscaleScreen() {
  const [image, setImage] = useState<string | null>(null);

  const feature = useUpscaleFeature({
    config: {
      defaultScaleFactor: 2,
      onProcessingStart: () => console.log('Starting upscaling...'),
      onProcessingComplete: (result) => console.log('Complete:', result),
      onError: (error) => console.error('Error:', error),
    },
    onSelectImage: async () => {
      const result = await ImagePicker.launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets[0].uri) {
        const base64 = await convertToBase64(result.assets[0].uri);
        setImage(base64);
        return base64;
      }
      return null;
    },
    onSaveImage: async (imageUrl) => {
      await saveToGallery(imageUrl);
    },
  });

  return (
    <View>
      <PhotoUploadCard
        image={image}
        onSelectImage={feature.selectImage}
        title="Select Image to Upscale"
      />

      <Button
        title="Upscale Image"
        onPress={feature.process}
        disabled={!feature.isReady || feature.state.isProcessing}
      />

      {feature.state.isProcessing && (
        <View>
          <Text>Upscaling image...</Text>
          <ProgressBar progress={feature.state.progress} />
        </View>
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
      featureId="upscaling"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface UpscaleFeatureConfig {
  defaultScaleFactor?: 2 | 4; // Scale factor (default: 2)
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: UpscaleResult) => void;
  onError?: (error: string) => void;
}
```

### Generation Options

```tsx
interface UpscaleOptions {
  scaleFactor: 2 | 4;
  enhance?: boolean; // Enhance image during upscaling
  denoise?: boolean; // Remove noise during upscaling
}
```

## Usage Flow

1. Select **Image** - Choose an image to upscale
2. Choose **Scale Factor** - Select 2x or 4x upscaling
3. Tap **Upscale** - Start the upscaling process
4. View Result - See the upscaled high-resolution image
5. Save or Share - Save to gallery or share

## Component Examples

### Scale Factor Selector

```tsx
import { GridSelector } from '@umituz/react-native-ai-generation-content';

const scaleOptions = [
  { id: '2x', name: '2x', description: 'Double resolution' },
  { id: '4x', name: '4x', description: 'Quadruple resolution' },
];

function MyScreen() {
  const [scaleFactor, setScaleFactor] = useState('2x');

  return (
    <GridSelector
      options={scaleOptions}
      selectedOption={scaleFactor}
      onSelectOption={setScaleFactor}
    />
  );
}
```

### Before/After Comparison

```tsx
import { ResultDisplay } from '@umituz/react-native-ai-generation-content';

{feature.state.result && originalImage && (
  <View>
    <Text>Before:</Text>
    <Image source={{ uri: originalImage }} style={{ width: 200, height: 200 }} />

    <Text>After (Upscaled):</Text>
    <Image source={{ uri: feature.state.result.imageUrl }} style={{ width: 400, height: 400 }} />
  </View>
)}
```

## Advanced Usage

### Custom Scale Factor

```tsx
const result = await feature.process({
  scaleFactor: 4,
  enhance: true,
  denoise: true,
});
```

### Progress Tracking

```tsx
const { state, process } = useUpscaleFeature({ ...config });

useEffect(() => {
  if (state.isProcessing) {
    console.log(`Upscaling progress: ${state.progress}%`);
  }
}, [state.progress]);
```

## Use Cases

### Enhancing Low-Resolution Photos

```tsx
// Upscale old photos for better quality
const result = await feature.process({ scaleFactor: 2 });
```

### Preparing Images for Print

```tsx
// Upscale to print-ready resolution
const result = await feature.process({ scaleFactor: 4 });
```

### Improving Image Quality

```tsx
// Upscale with enhancement and denoising
const result = await feature.process({
  scaleFactor: 2,
  enhance: true,
  denoise: true,
});
```

## Best Practices

1. **Start with 2x**: Try 2x first, then 4x if needed
2. **Image Quality**: Higher quality source images produce better results
3. **File Size**: Be aware that 4x upscaling significantly increases file size
4. **Enhancement**: Use enhancement for better detail preservation
5. **Testing**: Test different scale factors to find the best result

## Error Handling

```tsx
const { state, process } = useUpscaleFeature({ ...config });

useEffect(() => {
  if (state.error) {
    Alert.alert('Upscaling Failed', state.error);
  }
}, [state.error]);
```

## Related Features

- [HD Touch Up](../hd-touch-up) - High-detail image enhancements
- [Photo Restoration](../photo-restoration) - Restore old/blurry photos
- [Image to Image](../image-to-image) - Transform images using AI

## License

MIT
