# Inpainting

Fill in missing or hidden parts of images using AI.

## Features

- Fill in missing areas of images
- Remove unwanted objects seamlessly
- Extend image boundaries
- Smart content-aware fill
- Natural-looking reconstruction

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useInpaintingFeature } from '@umituz/react-native-ai-generation-content';
import * as ImagePicker from 'react-native-image-picker';

function InpaintingScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [mask, setMask] = useState<string | null>(null);

  const feature = useInpaintingFeature({
    config: {
      fillMethod: 'smart',
      onProcessingStart: () => console.log('Filling area...'),
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
    onCreateMask: async () => {
      // User paints over the area to fill
      const maskImage = await paintMaskOverImage(image);
      setMask(maskImage);
      return maskImage;
    },
    onSaveResult: async (imageUrl) => {
      await saveToGallery(imageUrl);
    },
  });

  return (
    <View>
      <PhotoUploadCard
        image={image}
        onSelectImage={feature.selectImage}
        title="Select Image"
      />

      <MaskEditor
        image={image}
        mask={mask}
        onMaskCreated={feature.createMask}
      />

      <FillMethodSelector
        selectedMethod={feature.state.fillMethod}
        onSelectMethod={feature.setFillMethod}
      />

      <Button
        title="Fill Area"
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
      featureId="inpainting"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface InpaintingFeatureConfig {
  fillMethod?: 'smart' | 'contextual' | 'pattern';
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: InpaintingResult) => void;
  onError?: (error: string) => void;
}
```

### Processing Options

```tsx
interface InpaintingOptions {
  mask: string; // Base64 mask of area to fill
  fillMethod: 'smart' | 'contextual' | 'pattern';
  preserveContext?: boolean; // Maintain surrounding context (default: true)
  blendEdges?: boolean; // Blend filled area with surroundings (default: true)
}
```

## Fill Methods

### Smart Fill

AI-powered intelligent reconstruction:

```tsx
const result = await feature.process({
  mask: maskImage,
  fillMethod: 'smart',
  preserveContext: true,
});
```

### Contextual Fill

Fill based on surrounding content:

```tsx
const result = await feature.process({
  mask: maskImage,
  fillMethod: 'contextual',
  blendEdges: true,
});
```

### Pattern Fill

Fill with detected patterns:

```tsx
const result = await feature.process({
  mask: maskImage,
  fillMethod: 'pattern',
});
```

## Usage Flow

1. Select **Image** - Choose an image with missing or unwanted areas
2. Create **Mask** - Paint over the area to fill
3. Choose **Fill Method** - Select the fill strategy
4. Tap **Fill** - Start the inpainting process
5. View **Result** - See the filled image
6. Save or Adjust - Save or make further adjustments

## Component Examples

### Fill Method Selector

```tsx
import { GridSelector } from '@umituz/react-native-ai-generation-content';

const fillMethods = [
  { id: 'smart', name: 'Smart Fill', description: 'AI reconstruction' },
  { id: 'contextual', name: 'Contextual', description: 'Based on surroundings' },
  { id: 'pattern', name: 'Pattern', description: 'Pattern matching' },
];

<GridSelector
  options={fillMethods}
  selectedOption={selectedMethod}
  onSelectOption={setSelectedMethod}
/>
```

### Mask Editor

```tsx
import { View, Image } from 'react-native';

function MaskEditor({ image, mask, onMaskCreated }) {
  return (
    <View style={{ position: 'relative' }}>
      <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
      {mask && (
        <Image
          source={{ uri: mask }}
          style={{ width: 300, height: 300, position: 'absolute', opacity: 0.5 }}
        />
      )}
      <Button title="Paint Mask" onPress={onMaskCreated} />
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

## Use Cases

### Remove Objects

```tsx
// Remove unwanted objects
const result = await feature.process({
  mask: objectMask,
  fillMethod: 'smart',
});
```

### Repair Damaged Photos

```tsx
// Fix tears or damaged areas
const result = await feature.process({
  mask: damageMask,
  fillMethod: 'contextual',
  blendEdges: true,
});
```

### Extend Image

```tsx
// Expand image boundaries
const result = await feature.process({
  mask: extensionMask,
  fillMethod: 'smart',
});
```

### Fill Missing Parts

```tsx
// Complete missing elements
const result = await feature.process({
  mask: missingPartMask,
  fillMethod: 'smart',
  preserveContext: true,
});
```

## Best Practices

1. **Mask Precision**: Paint carefully around the edges
2. **Fill Method**: Use Smart Fill for most cases
3. **Context Preservation**: Enable for natural results
4. **Multiple Tries**: May need multiple attempts for complex areas
5. **Edge Blending**: Enable for seamless integration

## Related Features

- [Remove Object](../remove-object) - Remove unwanted objects
- [Remove Background](../remove-background) - Remove backgrounds
- [Photo Restoration](../photo-restoration) - Restore old photos

## License

MIT
