# Sketch to Image

Convert hand-drawn sketches and doodles into realistic images using AI.

## Features

- Transform rough sketches into detailed images
- Support for various sketch styles
- Multiple output styles (realistic, artistic, etc.)
- Automatic detail enhancement
- Color and texture generation

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useSketchToImageFeature } from '@umituz/react-native-ai-generation-content';
import * as ImagePicker from 'react-native-image-picker';

function SketchToImageScreen() {
  const [sketch, setSketch] = useState<string | null>(null);

  const feature = useSketchToImageFeature({
    config: {
      outputStyle: 'realistic',
      prompt: 'A beautiful landscape',
      onProcessingStart: () => console.log('Converting sketch...'),
      onProcessingComplete: (result) => console.log('Complete:', result),
      onError: (error) => console.error('Error:', error),
    },
    onSelectSketch: async () => {
      const result = await ImagePicker.launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets[0].uri) {
        const base64 = await convertToBase64(result.assets[0].uri);
        setSketch(base64);
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
        image={sketch}
        onSelectImage={feature.selectSketch}
        title="Upload Your Sketch"
      />

      <OutputStyleSelector
        selectedStyle={feature.state.outputStyle}
        onSelectStyle={feature.setOutputStyle}
      />

      <PromptInput
        prompt={feature.state.prompt}
        onChangePrompt={feature.setPrompt}
        placeholder="Describe what you drew..."
      />

      <Button
        title="Convert to Image"
        onPress={feature.process}
        disabled={!feature.isReady || feature.state.isProcessing}
      />

      {feature.state.isProcessing && (
        <ActivityIndicator />
      )}

      {feature.state.result && (
        <ResultDisplay
          originalImage={sketch}
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
      featureId="sketch-to-image"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface SketchToImageFeatureConfig {
  outputStyle?: 'realistic' | 'artistic' | 'anime' | '3d';
  prompt?: string; // Description of the sketch
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: SketchToImageResult) => void;
  onError?: (error: string) => void;
}
```

### Generation Options

```tsx
interface SketchToImageOptions {
  sketch: string; // Base64 sketch image
  outputStyle: 'realistic' | 'artistic' | 'anime' | '3d';
  prompt?: string; // Optional description
  addColor?: boolean; // Add color to sketch (default: true)
  addDetails?: boolean; // Enhance with details (default: true)
}
```

## Output Styles

### Realistic

Photorealistic output:

```tsx
const result = await feature.process({
  outputStyle: 'realistic',
  addColor: true,
  addDetails: true,
});
```

### Artistic

Artistic interpretation:

```tsx
const result = await feature.process({
  outputStyle: 'artistic',
});
```

### Anime

Anime/manga style:

```tsx
const result = await feature.process({
  outputStyle: 'anime',
});
```

### 3D Render

3D rendered look:

```tsx
const result = await feature.process({
  outputStyle: '3d',
});
```

## Usage Flow

1. Select **Sketch** - Upload or draw a sketch
2. Choose **Output Style** - Select the desired output style
3. Add **Prompt** (optional) - Describe what you drew
4. Tap **Convert** - Start the conversion
5. View **Result** - See the generated image
6. Save or Share - Save or share the result

## Component Examples

### Output Style Selector

```tsx
import { StylePresetsGrid } from '@umituz/react-native-ai-generation-content';

const styles = [
  { id: 'realistic', name: 'Realistic', preview: '...' },
  { id: 'artistic', name: 'Artistic', preview: '...' },
  { id: 'anime', name: 'Anime', preview: '...' },
  { id: '3d', name: '3D Render', preview: '...' },
];

<StylePresetsGrid
  styles={styles}
  selectedStyle={selectedStyle}
  onSelectStyle={setSelectedStyle}
/>
```

### Prompt Input

```tsx
import { TextInput } from 'react-native';

<TextInput
  placeholder="Describe what you drew..."
  value={prompt}
  onChangeText={setPrompt}
  multiline
  numberOfLines={3}
/>
```

### Before/After Comparison

```tsx
import { ResultDisplay } from '@umituz/react-native-ai-generation-content';

{feature.state.result && sketch && (
  <ResultDisplay
    originalImage={sketch}
    resultImage={feature.state.result.imageUrl}
    onSave={() => feature.saveResult()}
    onShare={() => shareImage(feature.state.result.imageUrl)}
  />
)}
```

## Use Cases

### Concept Art

```tsx
// Convert rough sketches to detailed concept art
const result = await feature.process({
  outputStyle: 'realistic',
  prompt: 'Futuristic cityscape',
});
```

### Illustration

```tsx
// Turn doodles into illustrations
const result = await feature.process({
  outputStyle: 'artistic',
});
```

### Storyboarding

```tsx
// Transform storyboard sketches
const result = await feature.process({
  outputStyle: 'realistic',
  prompt: 'Action scene with characters',
});
```

### Design Mockups

```tsx
// Convert design sketches to realistic mockups
const result = await feature.process({
  outputStyle: 'realistic',
  addDetails: true,
});
```

## Best Practices

1. **Clear Sketches**: Use clear, readable sketches
2. **Descriptive Prompts**: Provide detailed descriptions
3. **Style Selection**: Match style to your use case
4. **Multiple Iterations**: Try different styles and prompts
5. **Sketch Quality**: Better sketches produce better results

## Related Features

- [Text to Image](../text-to-image) - Generate images from text
- [Image to Image](../image-to-image) - Transform images with AI
- [Style Transfer](../style-transfer) - Apply artistic styles

## License

MIT
