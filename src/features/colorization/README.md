# Colorization

Add color to black and white photos using AI.

## Features

- Automatically add realistic color to B&W photos
- Preserve historical accuracy
- Multiple colorization options
- Natural-looking color tones
- Support for various photo types

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useColorizationFeature } from '@umituz/react-native-ai-generation-content';
import * as ImagePicker from 'react-native-image-picker';

function ColorizationScreen() {
  const [photo, setPhoto] = useState<string | null>(null);

  const feature = useColorizationFeature({
    config: {
      colorizationType: 'auto',
      saturation: 1.0,
      onProcessingStart: () => console.log('Colorizing photo...'),
      onProcessingComplete: (result) => console.log('Complete:', result),
      onError: (error) => console.error('Error:', error),
    },
    onSelectPhoto: async () => {
      const result = await ImagePicker.launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets[0].uri) {
        const base64 = await convertToBase64(result.assets[0].uri);
        setPhoto(base64);
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
        image={photo}
        onSelectImage={feature.selectPhoto}
        title="Select Black & White Photo"
      />

      <ColorizationTypeSelector
        selectedType={feature.state.colorizationType}
        onSelectType={feature.setColorizationType}
      />

      <SaturationSlider
        value={feature.state.saturation}
        onChange={feature.setSaturation}
      />

      <Button
        title="Colorize Photo"
        onPress={feature.process}
        disabled={!feature.isReady || feature.state.isProcessing}
      />

      {feature.state.isProcessing && (
        <ActivityIndicator />
      )}

      {feature.state.result && (
        <ResultDisplay
          originalImage={photo}
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
      featureId="colorization"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface ColorizationFeatureConfig {
  colorizationType?: 'auto' | 'vintage' | 'vibrant' | 'natural';
  saturation?: number; // Color saturation level (0.5 - 1.5)
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: ColorizationResult) => void;
  onError?: (error: string) => void;
}
```

### Processing Options

```tsx
interface ColorizationOptions {
  colorizationType: 'auto' | 'vintage' | 'vibrant' | 'natural';
  saturation: number; // Saturation multiplier (0.5 - 1.5)
  preserveTexture?: boolean; // Maintain photo texture (default: true)
}
```

## Colorization Types

### Auto

Automatic color detection and application:

```tsx
const result = await feature.process({
  colorizationType: 'auto',
  saturation: 1.0,
});
```

### Vintage

Historically accurate vintage tones:

```tsx
const result = await feature.process({
  colorizationType: 'vintage',
  saturation: 0.8,
});
```

### Vibrant

Rich, saturated colors:

```tsx
const result = await feature.process({
  colorizationType: 'vibrant',
  saturation: 1.3,
});
```

### Natural

Subtle, natural-looking colors:

```tsx
const result = await feature.process({
  colorizationType: 'natural',
  saturation: 0.9,
});
```

## Usage Flow

1. Select **Photo** - Choose a black and white photo
2. Choose **Type** - Select colorization style
3. Adjust **Saturation** - Control color intensity
4. Tap **Colorize** - Start colorization
5. View **Result** - See the colorized photo
6. Save or Share - Save or share the result

## Component Examples

### Colorization Type Selector

```tsx
import { GridSelector } from '@umituz/react-native-ai-generation-content';

const types = [
  { id: 'auto', name: 'Auto', description: 'Automatic detection' },
  { id: 'vintage', name: 'Vintage', description: 'Historical tones' },
  { id: 'vibrant', name: 'Vibrant', description: 'Rich colors' },
  { id: 'natural', name: 'Natural', description: 'Subtle colors' },
];

<GridSelector
  options={types}
  selectedOption={selectedType}
  onSelectOption={setSelectedType}
/>
```

### Saturation Slider

```tsx
import { Slider } from 'react-native';

<Slider
  minimumValue={0.5}
  maximumValue={1.5}
  step={0.1}
  value={saturation}
  onValueChange={setSaturation}
/>

<Text>Saturation: {saturation.toFixed(1)}x</Text>
```

### Before/After Comparison

```tsx
import { ResultDisplay } from '@umituz/react-native-ai-generation-content';

{feature.state.result && photo && (
  <ResultDisplay
    originalImage={photo}
    resultImage={feature.state.result.imageUrl}
    onSave={() => feature.saveResult()}
    onShare={() => shareImage(feature.state.result.imageUrl)}
  />
)}
```

## Use Cases

### Family Photos

```tsx
// Colorize old family photos
const result = await feature.process({
  colorizationType: 'vintage',
  saturation: 0.9,
});
```

### Historical Photos

```tsx
// Add color to historical images
const result = await feature.process({
  colorizationType: 'natural',
  saturation: 0.8,
  preserveTexture: true,
});
```

### Artistic Effect

```tsx
// Create vibrant colorized artwork
const result = await feature.process({
  colorizationType: 'vibrant',
  saturation: 1.4,
});
```

## Best Practices

1. **Photo Quality**: Use high-quality scans for best results
2. **Type Selection**: Use Vintage for historical accuracy
3. **Saturation**: Start with 1.0 and adjust as needed
4. **Multiple Tries**: Different types work better for different photos
5. **Texture Preservation**: Enable for photos with important textures

## Related Features

- [Photo Restoration](../photo-restoration) - Restore old photos
- [Upscaling](../upscaling) - Increase image resolution
- [HD Touch Up](../hd-touch-up) - Enhance photo quality

## License

MIT
