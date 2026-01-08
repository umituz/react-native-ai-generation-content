# HD Touch Up

Apply high-detail enhancements to images using AI.

## Features

- Enhance image quality and details
- Sharpen and clarify images
- Reduce noise and artifacts
- Improve facial features in portraits
- Add professional polish

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useHDTouchUpFeature } from '@umituz/react-native-ai-generation-content';
import * as ImagePicker from 'react-native-image-picker';

function HDTouchUpScreen() {
  const [image, setImage] = useState<string | null>(null);

  const feature = useHDTouchUpFeature({
    config: {
      enhancementLevel: 'medium',
      enhanceFaces: true,
      onProcessingStart: () => console.log('Enhancing image...'),
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
    onSaveResult: async (imageUrl) => {
      await saveToGallery(imageUrl);
    },
  });

  return (
    <View>
      <PhotoUploadCard
        image={image}
        onSelectImage={feature.selectImage}
        title="Select Image to Enhance"
      />

      <EnhancementLevelSelector
        selectedLevel={feature.state.enhancementLevel}
        onSelectLevel={feature.setEnhancementLevel}
      />

      <Button
        title="Enhance Image"
        onPress={feature.process}
        disabled={!feature.isReady || feature.state.isProcessing}
      />

      {feature.state.isProcessing && (
        <View>
          <Text>Enhancing image...</Text>
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
      featureId="hd-touch-up"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface HDTouchUpFeatureConfig {
  enhancementLevel?: 'low' | 'medium' | 'high';
  enhanceFaces?: boolean; // Apply face-specific enhancements
  denoise?: boolean; // Reduce image noise
  sharpen?: boolean; // Sharpen details
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: HDTouchUpResult) => void;
  onError?: (error: string) => void;
}
```

### Enhancement Options

```tsx
interface HDTouchUpOptions {
  enhancementLevel: 'low' | 'medium' | 'high';
  enhanceFaces?: boolean;
  denoise?: boolean; // Remove noise and grain
  sharpen?: boolean; // Enhance edges and details
  adjustColors?: boolean; // Improve color vibrancy
  adjustContrast?: boolean; // Enhance contrast and tones
}
```

## Enhancement Levels

### Low Enhancement

Subtle improvements, natural look:

```tsx
const result = await feature.process({
  enhancementLevel: 'low',
  sharpen: true,
});
```

### Medium Enhancement

Balanced improvements, noticeable but natural:

```tsx
const result = await feature.process({
  enhancementLevel: 'medium',
  enhanceFaces: true,
  denoise: true,
  sharpen: true,
});
```

### High Enhancement

Strong enhancements, professional quality:

```tsx
const result = await feature.process({
  enhancementLevel: 'high',
  enhanceFaces: true,
  denoise: true,
  sharpen: true,
  adjustColors: true,
  adjustContrast: true,
});
```

## Usage Flow

1. Select **Image** - Choose an image to enhance
2. Choose **Enhancement Level** - Select intensity
3. Configure **Options** - Toggle specific enhancements
4. Tap **Enhance** - Start the enhancement
5. View **Result** - See the enhanced image
6. Save or Share - Save or share the result

## Component Examples

### Enhancement Level Selector

```tsx
import { GridSelector } from '@umituz/react-native-ai-generation-content';

const levels = [
  { id: 'low', name: 'Subtle', description: 'Light enhancements' },
  { id: 'medium', name: 'Balanced', description: 'Moderate enhancements' },
  { id: 'high', name: 'Strong', description: 'Maximum enhancements' },
];

<GridSelector
  options={levels}
  selectedOption={selectedLevel}
  onSelectOption={setSelectedLevel}
/>
```

### Enhancement Toggles

```tsx
import { Switch } from 'react-native';

<View>
  <Switch
    value={enhanceFaces}
    onValueChange={setEnhanceFaces}
  />
  <Text>Enhance Faces</Text>

  <Switch
    value={denoise}
    onValueChange={setDenoise}
  />
  <Text>Reduce Noise</Text>

  <Switch
    value={sharpen}
    onValueChange={setSharpen}
  />
  <Text>Sharpen Details</Text>
</View>
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

### Portrait Enhancement

```tsx
// Enhance portrait photos
const result = await feature.process({
  enhancementLevel: 'high',
  enhanceFaces: true,
  adjustColors: true,
});
```

### Product Photos

```tsx
// Improve product image quality
const result = await feature.process({
  enhancementLevel: 'medium',
  sharpen: true,
  adjustColors: true,
});
```

### Landscape Enhancement

```tsx
// Enhance landscape details
const result = await feature.process({
  enhancementLevel: 'medium',
  sharpen: true,
  adjustContrast: true,
});
```

### Old Photo Restoration

```tsx
// Improve old photo quality
const result = await feature.process({
  enhancementLevel: 'high',
  denoise: true,
  sharpen: true,
});
```

## Best Practices

1. **Enhancement Level**: Start with Medium for most photos
2. **Face Enhancement**: Enable for portraits, disable for other subjects
3. **Noise Reduction**: Useful for low-light or high-ISO photos
4. **Sharpening**: Be careful not to over-sharpen
5. **Color Adjustment**: Works well for faded or dull photos

## Related Features

- [Photo Restoration](../photo-restoration) - Restore old photos
- [Upscaling](../upscaling) - Increase image resolution
- [Colorization](../colorization) - Add color to B&W photos

## License

MIT
