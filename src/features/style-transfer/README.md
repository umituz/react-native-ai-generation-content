# Style Transfer

Apply artistic styles to images using AI.

## Features

- Transform photos into artwork
- Multiple artistic styles (painting, sketch, watercolor, etc.)
- Customizable style intensity
- Preserve image content while changing style
- High-quality artistic output

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useStyleTransferFeature } from '@umituz/react-native-ai-generation-content';
import * as ImagePicker from 'react-native-image-picker';

function StyleTransferScreen() {
  const [image, setImage] = useState<string | null>(null);

  const feature = useStyleTransferFeature({
    config: {
      style: 'oil-painting',
      intensity: 0.8,
      onProcessingStart: () => console.log('Applying style...'),
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
        title="Select Image to Style"
      />

      <StyleSelector
        selectedStyle={feature.state.style}
        onSelectStyle={feature.setStyle}
      />

      <IntensitySlider
        value={feature.state.intensity}
        onChange={feature.setIntensity}
      />

      <Button
        title="Apply Style"
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
      featureId="style-transfer"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface StyleTransferFeatureConfig {
  style?: 'oil-painting' | 'watercolor' | 'sketch' | 'anime' | 'impressionist';
  intensity?: number; // 0.0 - 1.0 (default: 0.8)
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: StyleTransferResult) => void;
  onError?: (error: string) => void;
}
```

### Processing Options

```tsx
interface StyleTransferOptions {
  style: string; // Style ID
  intensity: number; // How strong the style is (0.0 - 1.0)
  preserveDetails?: boolean; // Maintain original details (default: true)
}
```

## Available Styles

### Oil Painting

Classic oil painting style:

```tsx
const result = await feature.process({
  style: 'oil-painting',
  intensity: 0.8,
  preserveDetails: true,
});
```

### Watercolor

Soft watercolor painting style:

```tsx
const result = await feature.process({
  style: 'watercolor',
  intensity: 0.7,
});
```

### Sketch

Pencil sketch style:

```tsx
const result = await feature.process({
  style: 'sketch',
  intensity: 0.9,
});
```

### Anime

Anime/manga style:

```tsx
const result = await feature.process({
  style: 'anime',
  intensity: 0.8,
});
```

### Impressionist

Impressionist painting style:

```tsx
const result = await feature.process({
  style: 'impressionist',
  intensity: 0.7,
});
```

## Usage Flow

1. Select **Image** - Choose an image to transform
2. Choose **Style** - Select the artistic style
3. Adjust **Intensity** - Control style strength
4. Tap **Apply** - Start the style transfer
5. View Result - See the styled image
6. Save or Share - Save or share the result

## Component Examples

### Style Selector

```tsx
import { StylePresetsGrid } from '@umituz/react-native-ai-generation-content';

const styles = [
  { id: 'oil-painting', name: 'Oil Painting', preview: '...' },
  { id: 'watercolor', name: 'Watercolor', preview: '...' },
  { id: 'sketch', name: 'Sketch', preview: '...' },
  { id: 'anime', name: 'Anime', preview: '...' },
  { id: 'impressionist', name: 'Impressionist', preview: '...' },
];

<StylePresetsGrid
  styles={styles}
  selectedStyle={selectedStyle}
  onSelectStyle={setSelectedStyle}
/>
```

### Intensity Slider

```tsx
import { Slider } from 'react-native';

<Slider
  minimumValue={0}
  maximumValue={1}
  step={0.1}
  value={intensity}
  onValueChange={setIntensity}
/>

<Text>Style Intensity: {Math.round(intensity * 100)}%</Text>
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

### Art Creation

```tsx
// Create artwork from photos
const result = await feature.process({
  style: 'oil-painting',
  intensity: 0.9,
});
```

### Social Media

```tsx
// Create stylized content
const result = await feature.process({
  style: 'sketch',
  intensity: 0.8,
});
```

### Photo Effects

```tsx
// Add artistic effects to photos
const result = await feature.process({
  style: 'watercolor',
  intensity: 0.7,
});
```

## Best Practices

1. **Style Selection**: Match style to image content for best results
2. **Intensity**: Start with 0.7-0.8 for balanced results
3. **Image Quality**: High-quality images produce better artwork
4. **Preserve Details**: Enable for photos with important details
5. **Experiment**: Try different styles to find the best match

## Related Features

- [Anime Selfie](../anime-selfie) - Convert photos to anime style
- [Image to Image](../image-to-image) - Transform images with AI
- [Text to Image](../text-to-image) - Generate artwork from text

## License

MIT
