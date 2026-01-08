# Anime Selfie

Convert photos to anime/manga style using AI.

## Features

- Transform photos into anime-style artwork
- Multiple anime style options
- Support for portraits and group photos
- High-quality character preservation
- Customizable intensity levels

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useAnimeSelfieFeature } from '@umituz/react-native-ai-generation-content';
import * as ImagePicker from 'react-native-image-picker';

function AnimeSelfieScreen() {
  const [photo, setPhoto] = useState<string | null>(null);

  const feature = useAnimeSelfieFeature({
    config: {
      style: 'shonen',
      intensity: 0.8,
      onProcessingStart: () => console.log('Converting to anime...'),
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
        title="Select Photo to Convert"
      />

      <AnimeStyleSelector
        selectedStyle={feature.state.style}
        onSelectStyle={feature.setStyle}
      />

      <IntensitySlider
        value={feature.state.intensity}
        onChange={feature.setIntensity}
      />

      <Button
        title="Convert to Anime"
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
      featureId="anime-selfie"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface AnimeSelfieFeatureConfig {
  style?: 'shonen' | 'shojo' | 'chibi' | 'realistic';
  intensity?: number; // 0.0 - 1.0 (default: 0.8)
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: AnimeSelfieResult) => void;
  onError?: (error: string) => void;
}
```

### Generation Options

```tsx
interface AnimeSelfieOptions {
  style: 'shonen' | 'shojo' | 'chibi' | 'realistic';
  intensity: number; // How strong the anime effect is (0.0 - 1.0)
  enhanceDetails?: boolean; // Enhance anime features (default: true)
  backgroundStyle?: 'original' | 'anime' | 'solid';
}
```

## Anime Styles

### Shonen Style

Bold, action-oriented manga style:

```tsx
const result = await feature.process({
  style: 'shonen',
  intensity: 0.9,
});
```

### Shojo Style

Soft, romantic manga style:

```tsx
const result = await feature.process({
  style: 'shojo',
  intensity: 0.8,
});
```

### Chibi Style

Cute, small character style:

```tsx
const result = await feature.process({
  style: 'chibi',
  intensity: 1.0,
});
```

### Realistic Style

Semi-realistic anime style:

```tsx
const result = await feature.process({
  style: 'realistic',
  intensity: 0.7,
});
```

## Usage Flow

1. Select **Photo** - Choose a photo to convert
2. Choose **Anime Style** - Select the desired anime style
3. Adjust **Intensity** - Control how strong the effect is
4. Tap **Convert** - Start the conversion
5. View **Result** - See the anime version
6. Save or Share - Save or share the result

## Component Examples

### Style Selector

```tsx
import { StylePresetsGrid } from '@umituz/react-native-ai-generation-content';

const animeStyles = [
  { id: 'shonen', name: 'Shonen', preview: '...' },
  { id: 'shojo', name: 'Shojo', preview: '...' },
  { id: 'chibi', name: 'Chibi', preview: '...' },
  { id: 'realistic', name: 'Realistic', preview: '...' },
];

<StylePresetsGrid
  styles={animeStyles}
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

<Text>Intensity: {Math.round(intensity * 100)}%</Text>
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

## Advanced Usage

### Custom Options

```tsx
const result = await feature.process({
  style: 'shonen',
  intensity: 0.85,
  enhanceDetails: true,
  backgroundStyle: 'anime',
});
```

### Batch Processing

```tsx
// Convert multiple photos
const photos = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'];
const results = await Promise.all(
  photos.map(photo => feature.process({ image: photo }))
);
```

## Best Practices

1. **Portrait Photos**: Forward-facing portraits work best
2. **Good Lighting**: Even lighting produces better results
3. **Clear Faces**: Ensure facial features are clearly visible
4. **Intensity**: Start with 0.7-0.8 for natural results
5. **Style Selection**: Match style to photo subject and mood

## Use Cases

### Profile Pictures

```tsx
// Create anime profile pictures
const result = await feature.process({
  style: 'shojo',
  intensity: 0.8,
});
```

### Social Media

```tsx
// Generate anime content for social media
const result = await feature.process({
  style: 'chibi',
  intensity: 1.0,
});
```

### Art Projects

```tsx
// Create anime art from photos
const result = await feature.process({
  style: 'realistic',
  intensity: 0.7,
  enhanceDetails: true,
});
```

## Error Handling

```tsx
const { state, process } = useAnimeSelfieFeature({ ...config });

useEffect(() => {
  if (state.error) {
    Alert.alert('Conversion Failed', state.error);
  }
}, [state.error]);
```

## Related Features

- [Style Transfer](../style-transfer) - Apply artistic styles to images
- [Face Swap](../face-swap) - Swap faces between images
- [Text to Image](../text-to-image) - Generate anime from text prompts

## License

MIT
