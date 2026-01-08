# Remove Background

Remove backgrounds from images using AI with precision.

## Features

- Automatic background detection and removal
- Keep main subject while removing background
- Support for complex subjects (hair, fur, transparent objects)
- Fine-tune edges for professional results
- Export as transparent PNG

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useRemoveBackgroundFeature } from '@umituz/react-native-ai-generation-content';
import * as ImagePicker from 'react-native-image-picker';

function RemoveBackgroundScreen() {
  const [image, setImage] = useState<string | null>(null);

  const feature = useRemoveBackgroundFeature({
    config: {
      edgeSmoothness: 'medium',
      onProcessingStart: () => console.log('Removing background...'),
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
        title="Select Image to Remove Background"
      />

      <Button
        title="Remove Background"
        onPress={feature.process}
        disabled={!feature.isReady || feature.state.isProcessing}
      />

      {feature.state.isProcessing && (
        <ActivityIndicator />
      )}

      {feature.state.result && (
        <ResultDisplay
          originalImage={image}
          resultImage={feature.state.result.imageUrl}
          onSave={() => feature.saveResult()}
          showTransparentBackground
        />
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
      featureId="remove-background"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface RemoveBackgroundFeatureConfig {
  edgeSmoothness?: 'low' | 'medium' | 'high';
  returnMask?: boolean; // Return the mask along with result
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: RemoveBackgroundResult) => void;
  onError?: (error: string) => void;
}
```

### Processing Options

```tsx
interface RemoveBackgroundOptions {
  edgeSmoothness: 'low' | 'medium' | 'high';
  featherEdges?: boolean; // Soften edges for natural look
  preserveHair?: boolean; // Better hair detection (default: true)
  backgroundColor?: string; // Add new background color
}
```

## Usage Flow

1. Select **Image** - Choose an image with background to remove
2. Configure **Options** - Adjust edge smoothness and other settings
3. Tap **Remove Background** - Start the removal process
4. View **Result** - See the image with transparent background
5. Save or Edit - Save as PNG or add new background

## Component Examples

### Edge Smoothness Selector

```tsx
import { GridSelector } from '@umituz/react-native-ai-generation-content';

const smoothnessOptions = [
  { id: 'low', name: 'Sharp', description: 'Precise edges' },
  { id: 'medium', name: 'Balanced', description: 'Natural edges' },
  { id: 'high', name: 'Smooth', description: 'Soft edges' },
];

function MyScreen() {
  const [smoothness, setSmoothness] = useState('medium');

  return (
    <GridSelector
      options={smoothnessOptions}
      selectedOption={smoothness}
      onSelectOption={setSmoothness}
    />
  );
}
```

### Background Preview

```tsx
import { View, Image } from 'react-native';

const previewBackgrounds = [
  { color: '#FFFFFF', name: 'White' },
  { color: '#000000', name: 'Black' },
  { color: '#F0F0F0', name: 'Gray' },
  { color: 'transparent', name: 'Transparent' },
];

function BackgroundPreview({ imageUrl }) {
  const [background, setBackground] = useState('transparent');

  return (
    <View style={{ backgroundColor: background }}>
      <Image
        source={{ uri: imageUrl }}
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
}
```

### Before/After Comparison

```tsx
import { ResultDisplay } from '@umituz/react-native-ai-generation-content';

{feature.state.result && image && (
  <ResultDisplay
    originalImage={image}
    resultImage={feature.state.result.imageUrl}
    onSave={() => feature.saveResult()}
    onShare={() => shareImage(feature.state.result.imageUrl)}
  />
)}
```

## Advanced Usage

### Custom Edge Smoothness

```tsx
const result = await feature.process({
  edgeSmoothness: 'high',
  featherEdges: true,
  preserveHair: true,
});
```

### Add New Background

```tsx
// After removing background, add a new one
const result = await feature.process({
  edgeSmoothness: 'medium',
  backgroundColor: '#FF5733', // Orange background
});
```

### Export with Mask

```tsx
const result = await feature.process({
  edgeSmoothness: 'medium',
  returnMask: true,
});

// result.maskUrl contains the segmentation mask
```

## Use Cases

### Product Photos

```tsx
// Remove background for e-commerce product photos
const result = await feature.process({
  edgeSmoothness: 'high',
  preserveHair: false,
});
```

### Profile Pictures

```tsx
// Create clean profile pictures
const result = await feature.process({
  edgeSmoothness: 'medium',
  featherEdges: true,
});
```

### Graphic Design

```tsx
// Extract subjects for design work
const result = await feature.process({
  edgeSmoothness: 'low',
  returnMask: true,
});
```

## Best Practices

1. **Image Quality**: Use high-resolution images for best results
2. **Subject Separation**: Ensure subject is clearly separated from background
3. **Edge Smoothness**: Adjust based on subject type (high for hair, low for objects)
4. **Hair/Fur**: Enable hair preservation for better results
5. **Lighting**: Even lighting produces better edge detection

## Error Handling

```tsx
const { state, process } = useRemoveBackgroundFeature({ ...config });

useEffect(() => {
  if (state.error) {
    Alert.alert('Removal Failed', state.error);
  }
}, [state.error]);
```

## Related Features

- [Replace Background](../replace-background) - Replace with new background
- [Remove Object](../remove-object) - Remove unwanted objects
- [Image to Image](../image-to-image) - Transform images with AI

## License

MIT
