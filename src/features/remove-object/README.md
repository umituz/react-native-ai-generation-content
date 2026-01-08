# Remove Object

Remove unwanted objects from images using AI.

## Features

- Remove any unwanted object from photos
- Automatic background reconstruction
- Smart fill to maintain image quality
- Support for multiple objects
- Natural-looking results

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useRemoveObjectFeature } from '@umituz/react-native-ai-generation-content';
import * as ImagePicker from 'react-native-image-picker';

function RemoveObjectScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [mask, setMask] = useState<string | null>(null);

  const feature = useRemoveObjectFeature({
    config: {
      onProcessingStart: () => console.log('Removing object...'),
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
      // User paints over the object to remove
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
        title="Select Image with Object to Remove"
      />

      <MaskEditor
        image={image}
        mask={mask}
        onMaskCreated={feature.createMask}
      />

      <Button
        title="Remove Object"
        onPress={feature.process}
        disabled={!feature.isReady || feature.state.isProcessing}
      />

      {feature.state.isProcessing && (
        <View>
          <Text>Removing object...</Text>
          <ProgressBar progress={feature.state.progress} />
        </View>
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
      featureId="remove-object"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface RemoveObjectFeatureConfig {
  fillMethod?: 'smart' | 'blur' | 'color'; // How to fill the removed area
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: RemoveObjectResult) => void;
  onError?: (error: string) => void;
}
```

### Processing Options

```tsx
interface RemoveObjectOptions {
  mask: string; // Base64 mask indicating the object to remove
  fillMethod: 'smart' | 'blur' | 'color';
  featherEdges?: boolean; // Soften edges for natural look (default: true)
  preserveContext?: boolean; // Maintain surrounding context (default: true)
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

### Blur Fill

Blur and blend surrounding area:

```tsx
const result = await feature.process({
  mask: maskImage,
  fillMethod: 'blur',
  featherEdges: true,
});
```

### Color Fill

Fill with average surrounding color:

```tsx
const result = await feature.process({
  mask: maskImage,
  fillMethod: 'color',
  featherEdges: true,
});
```

## Usage Flow

1. Select **Image** - Choose an image with unwanted objects
2. Create **Mask** - Paint over the objects to remove
3. Choose **Fill Method** - Select how to fill the removed area
4. Tap **Remove** - Start the removal process
5. View Result - See the cleaned image
6. Save or Edit - Save or make further adjustments

## Component Examples

### Fill Method Selector

```tsx
import { GridSelector } from '@umituz/react-native-ai-generation-content';

const fillMethods = [
  { id: 'smart', name: 'Smart Fill', description: 'AI reconstruction' },
  { id: 'blur', name: 'Blur', description: 'Blurred fill' },
  { id: 'color', name: 'Color', description: 'Solid color fill' },
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
import { GestureHandlerRootView, GestureDetector } from 'react-native-gesture-handler';

function MaskEditor({ image, mask, onMaskCreated }) {
  const [isDrawing, setIsDrawing] = useState(false);

  const handleDraw = (gestureEvent) => {
    // Implement drawing logic
    // Update mask as user draws
  };

  return (
    <GestureDetector onGestureEvent={handleDraw}>
      <View style={{ position: 'relative' }}>
        <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
        {mask && (
          <Image
            source={{ uri: mask }}
            style={{ width: 300, height: 300, position: 'absolute' }}
          />
        )}
      </View>
    </GestureDetector>
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

### Remove Photobombers

```tsx
// Remove unwanted people from photos
const result = await feature.process({
  mask: photobomberMask,
  fillMethod: 'smart',
});
```

### Clean Up Backgrounds

```tsx
// Remove distracting elements
const result = await feature.process({
  mask: objectMask,
  fillMethod: 'smart',
  preserveContext: true,
});
```

### Remove Text & Watermarks

```tsx
// Remove unwanted text or logos
const result = await feature.process({
  mask: textMask,
  fillMethod: 'blur',
  featherEdges: true,
});
```

### Remove Objects from Nature

```tsx
// Remove trash, signs, etc. from nature photos
const result = await feature.process({
  mask: objectMask,
  fillMethod: 'smart',
});
```

## Best Practices

1. **Mask Precision**: Paint carefully over the object edges
2. **Fill Method**: Use Smart Fill for most natural results
4. **Simple Backgrounds**: Easier removal from simple backgrounds
5. **Context Preservation**: Enable for objects near important elements
6. **Multiple Passes**: For difficult objects, try multiple approaches

## Advanced Usage

### Multiple Objects

```tsx
// Create mask covering all objects to remove
const combinedMask = combineMasks([mask1, mask2, mask3]);
const result = await feature.process({
  mask: combinedMask,
  fillMethod: 'smart',
});
```

### Iterative Refinement

```tsx
// Remove object, then adjust if needed
let result = await feature.process({
  mask: initialMask,
  fillMethod: 'smart',
});

if (!result.success || needsRefinement) {
  const refinedMask = refineMask(initialMask);
  result = await feature.process({
    mask: refinedMask,
    fillMethod: 'smart',
  });
}
```

## Error Handling

```tsx
const { state, process } = useRemoveObjectFeature({ ...config });

useEffect(() => {
  if (state.error) {
    Alert.alert('Removal Failed', state.error);
  }
}, [state.error]);
```

## Related Features

- [Remove Background](../remove-background) - Remove entire backgrounds
- [Inpainting](../inpainting) - Fill in missing parts of images
- [Replace Background](../replace-background) - Replace with new background

## License

MIT
