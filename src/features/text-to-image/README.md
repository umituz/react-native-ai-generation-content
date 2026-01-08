# Text to Image

Generate images from text prompts using AI.

## Features

- Generate images from natural language descriptions
- Support for multiple aspect ratios and sizes
- Style presets for different artistic effects
- Multiple image generation in one request
- Progress tracking during generation

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useTextToImageFeature } from '@umituz/react-native-ai-generation-content';

function TextToImageScreen() {
  const feature = useTextToImageFeature({
    config: {
      model: 'imagen-3',
      onPromptChange: (prompt) => console.log('Prompt changed:', prompt),
      onProcessingStart: () => console.log('Starting generation...'),
      onProcessingComplete: (result) => console.log('Generation complete:', result),
      onError: (error) => console.error('Error:', error),
    },
    userId: 'user-123',
  });

  return (
    <View>
      <TextInput
        placeholder="Describe the image you want to create..."
        onChangeText={feature.setPrompt}
        value={feature.state.prompt}
      />

      <Button
        title="Generate Image"
        onPress={() => feature.generate()}
        disabled={!feature.isReady}
      />

      {feature.state.isProcessing && (
        <Text>Progress: {feature.state.progress}%</Text>
      )}

      {feature.state.imageUrl && (
        <Image source={{ uri: feature.state.imageUrl }} />
      )}

      {feature.state.error && (
        <Text>Error: {feature.state.error}</Text>
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
      featureId="text-to-image"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface TextToImageFeatureConfig {
  model?: string; // AI model to use (default: 'imagen-3')
  onPromptChange?: (prompt: string) => void;
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: TextToImageResult) => void;
  onError?: (error: string) => void;
  buildInput?: (prompt: string, options: TextToImageOptions) => any;
  extractResult?: (response: any) => TextToImageResult;
}
```

### Generation Options

```tsx
interface TextToImageOptions {
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
  numberOfImages?: number; // 1-4
  style?: 'realistic' | 'artistic' | 'anime' | '3d' | 'painting';
  negativePrompt?: string;
}
```

## Advanced Usage

### Custom Style Selector

```tsx
import { StyleSelector } from '@umituz/react-native-ai-generation-content';

const styles = [
  { id: 'realistic', name: 'Realistic', preview: '...' },
  { id: 'artistic', name: 'Artistic', preview: '...' },
  { id: 'anime', name: 'Anime', preview: '...' },
];

function MyScreen() {
  const [selectedStyle, setSelectedStyle] = useState('realistic');

  return (
    <StyleSelector
      styles={styles}
      selectedStyle={selectedStyle}
      onSelectStyle={setSelectedStyle}
    />
  );
}
```

### Aspect Ratio Selection

```tsx
import { AspectRatioSelector } from '@umituz/react-native-ai-generation-content';

function MyScreen() {
  const [aspectRatio, setAspectRatio] = useState('1:1');

  return (
    <AspectRatioSelector
      selectedAspectRatio={aspectRatio}
      onSelectAspectRatio={setAspectRatio}
    />
  );
}
```

## Examples

### Basic Image Generation

```tsx
const result = await feature.generate({
  aspectRatio: '16:9',
  numberOfImages: 2,
});
```

### With Style Preset

```tsx
const result = await feature.generate({
  style: 'artistic',
  negativePrompt: 'blurry, low quality',
});
```

### Multiple Images

```tsx
const result = await feature.generate({
  numberOfImages: 4,
});

// Access all generated images
result.imageUrls.forEach(url => {
  console.log('Generated image:', url);
});
```

## Example Prompts

```tsx
const examplePrompts = [
  'A beautiful sunset over mountains with vibrant colors',
  'Futuristic cityscape at night with neon lights',
  'Enchanted forest with magical glowing mushrooms',
  'Cozy coffee shop interior on a rainy day',
  'Dragon flying over snow-capped mountain peaks',
];
```

## Error Handling

```tsx
const { state, generate } = useTextToImageFeature({ ...config });

useEffect(() => {
  if (state.error) {
    Alert.alert('Generation Failed', state.error);
  }
}, [state.error]);
```

## Best Practices

1. **Prompt Quality**: Use detailed, descriptive prompts for better results
2. **Aspect Ratio**: Choose the right aspect ratio for your use case
3. **Batch Generation**: Generate multiple images to get more options
4. **Negative Prompts**: Use negative prompts to avoid unwanted elements
5. **Error Handling**: Always handle errors gracefully in production

## Related Features

- [Text to Video](../text-to-video) - Generate videos from text
- [Image to Image](../image-to-image) - Transform images with AI
- [Style Transfer](../style-transfer) - Apply artistic styles to images

## License

MIT
