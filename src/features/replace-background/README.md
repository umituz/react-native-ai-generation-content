# Replace Background

Replace image backgrounds with new scenes using AI.

## Features

- Remove existing background
- Replace with custom backgrounds
- Built-in background templates
- Upload custom background images
- Natural edge blending

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useReplaceBackgroundFeature } from '@umituz/react-native-ai-generation-content';
import * as ImagePicker from 'react-native-image-picker';

function ReplaceBackgroundScreen() {
  const [foreground, setForeground] = useState<string | null>(null);
  const [background, setBackground] = useState<string | null>(null);

  const feature = useReplaceBackgroundFeature({
    config: {
      edgeSmoothness: 'medium',
      onProcessingStart: () => console.log('Replacing background...'),
      onProcessingComplete: (result) => console.log('Complete:', result),
      onError: (error) => console.error('Error:', error),
    },
    onSelectForeground: async () => {
      const result = await ImagePicker.launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets[0].uri) {
        const base64 = await convertToBase64(result.assets[0].uri);
        setForeground(base64);
        return base64;
      }
      return null;
    },
    onSelectBackground: async () => {
      const result = await ImagePicker.launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets[0].uri) {
        const base64 = await convertToBase64(result.assets[0].uri);
        setBackground(base64);
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
        image={foreground}
        onSelectImage={feature.selectForeground}
        title="Select Foreground Image"
      />

      <PhotoUploadCard
        image={background}
        onSelectImage={feature.selectBackground}
        title="Select New Background"
      />

      <Button
        title="Replace Background"
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
      featureId="replace-background"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface ReplaceBackgroundFeatureConfig {
  edgeSmoothness?: 'low' | 'medium' | 'high';
  adjustLighting?: boolean; // Match lighting between images
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: ReplaceBackgroundResult) => void;
  onError?: (error: string) => void;
}
```

### Processing Options

```tsx
interface ReplaceBackgroundOptions {
  edgeSmoothness: 'low' | 'medium' | 'high';
  adjustLighting?: boolean; // Match foreground and background lighting
  adjustColors?: boolean; // Color-grade foreground to match background
  blurBackground?: boolean; // Add blur to background for depth effect
}
```

## Usage Flow

1. Select **Foreground** - Choose the main subject image
2. Select **Background** - Choose new background image
3. Configure **Options** - Adjust edge smoothness and other settings
4. Tap **Replace** - Start the replacement process
5. View **Result** - See the combined image
6. Save or Share - Save or share the result

## Component Examples

### Background Templates

```tsx
import { StylePresetsGrid } from '@umituz/react-native-ai-generation-content';

const backgrounds = [
  { id: 'beach', name: 'Beach', preview: 'https://...' },
  { id: 'city', name: 'City', preview: 'https://...' },
  { id: 'nature', name: 'Nature', preview: 'https://...' },
  { id: 'studio', name: 'Studio', preview: 'https://...' },
];

<StylePresetsGrid
  styles={backgrounds}
  selectedStyle={selectedBackground}
  onSelectStyle={async (bg) => {
    const bgImage = await downloadBackground(bg.preview);
    setBackground(bgImage);
  }}
/>
```

### Edge Smoothness Selector

```tsx
import { GridSelector } from '@umituz/react-native-ai-generation-content';

const smoothnessOptions = [
  { id: 'low', name: 'Sharp', description: 'Precise edges' },
  { id: 'medium', name: 'Balanced', description: 'Natural edges' },
  { id: 'high', name: 'Smooth', description: 'Soft edges' },
];

<GridSelector
  options={smoothnessOptions}
  selectedOption={smoothness}
  onSelectOption={setSmoothness}
/>
```

### Lighting Toggle

```tsx
import { Switch } from 'react-native';

<Switch
  value={adjustLighting}
  onValueChange={setAdjustLighting}
/>

<Text>Match Lighting</Text>
```

## Advanced Usage

### Custom Options

```tsx
const result = await feature.process({
  edgeSmoothness: 'medium',
  adjustLighting: true,
  adjustColors: true,
  blurBackground: false,
});
```

### Preset Backgrounds

```tsx
const PRESET_BACKGROUNDS = {
  beach: 'https://example.com/bg/beach.jpg',
  city: 'https://example.com/bg/city.jpg',
  studio: 'https://example.com/bg/studio.jpg',
  nature: 'https://example.com/bg/nature.jpg',
};

const result = await feature.process({
  background: PRESET_BACKGROUNDS.beach,
  edgeSmoothness: 'medium',
});
```

## Use Cases

### Professional Photos

```tsx
// Replace with professional studio background
const result = await feature.process({
  background: studioBackground,
  adjustLighting: true,
  adjustColors: true,
});
```

### Travel Photos

```tsx
// Add exotic travel backgrounds
const result = await feature.process({
  background: beachBackground,
  edgeSmoothness: 'high',
});
```

### Creative Effects

```tsx
// Create fantasy backgrounds
const result = await feature.process({
  background: fantasyBackground,
  blurBackground: true,
});
```

### Product Photos

```tsx
// Clean white background for products
const result = await feature.process({
  background: whiteBackground,
  edgeSmoothness: 'low',
  adjustLighting: true,
});
```

## Best Practices

1. **Foreground Quality**: Use high-quality images with clear subjects
2. **Background Match**: Choose backgrounds with similar perspective
3. **Edge Smoothness**: Higher values for portraits, lower for products
4. **Lighting**: Enable lighting adjustment for more natural results
5. **Colors**: Use color adjustment for better foreground/background harmony

## Related Features

- [Remove Background](../remove-background) - Remove backgrounds
- [Remove Object](../remove-object) - Remove unwanted objects
- [Image to Image](../image-to-image) - Transform images with AI

## License

MIT
