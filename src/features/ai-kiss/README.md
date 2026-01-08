# AI Kiss

Generate AI-powered kiss images between two people.

## Features

- Create realistic kiss images from two photos
- Automatic face and pose detection
- Natural positioning and expression
- Support for various kiss styles
- High-quality facial matching

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useAIKissFeature } from '@umituz/react-native-ai-generation-content';
import * as ImagePicker from 'react-native-image-picker';

function AIKissScreen() {
  const [person1, setPerson1] = useState<string | null>(null);
  const [person2, setPerson2] = useState<string | null>(null);

  const feature = useAIKissFeature({
    config: {
      kissType: 'romantic',
      onProcessingStart: () => console.log('Generating kiss...'),
      onProcessingComplete: (result) => console.log('Complete:', result),
      onError: (error) => console.error('Error:', error),
    },
    onSelectPerson1: async () => {
      const result = await ImagePicker.launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets[0].uri) {
        const base64 = await convertToBase64(result.assets[0].uri);
        setPerson1(base64);
        return base64;
      }
      return null;
    },
    onSelectPerson2: async () => {
      const result = await ImagePicker.launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets[0].uri) {
        const base64 = await convertToBase64(result.assets[0].uri);
        setPerson2(base64);
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
      <DualImagePicker
        sourceImage={person1}
        targetImage={person2}
        onSelectSourceImage={feature.selectPerson1}
        onSelectTargetImage={feature.selectPerson2}
        sourceLabel="Person 1"
        targetLabel="Person 2"
      />

      <KissTypeSelector
        selectedType={feature.state.kissType}
        onSelectType={feature.setKissType}
      />

      <Button
        title="Generate AI Kiss"
        onPress={feature.process}
        disabled={!feature.isReady || feature.state.isProcessing}
      />

      {feature.state.isProcessing && (
        <View>
          <Text>Creating your kiss image...</Text>
          <ProgressBar progress={feature.state.progress} />
        </View>
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
      featureId="ai-kiss"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface AIKissFeatureConfig {
  kissType?: 'romantic' | 'gentle' | 'passionate' | 'cute';
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: AIKissResult) => void;
  onError?: (error: string) => void;
}
```

### Generation Options

```tsx
interface AIKissOptions {
  kissType: 'romantic' | 'gentle' | 'passionate' | 'cute';
  preserveFaces?: boolean; // Maintain facial features (default: true)
  enhanceQuality?: boolean; // Enhance output quality (default: true)
}
```

## Kiss Types

### Romantic Kiss

```tsx
const result = await feature.process({
  kissType: 'romantic',
});
```

### Gentle Kiss

```tsx
const result = await feature.process({
  kissType: 'gentle',
});
```

### Passionate Kiss

```tsx
const result = await feature.process({
  kissType: 'passionate',
});
```

### Cute Kiss

```tsx
const result = await feature.process({
  kissType: 'cute',
});
```

## Usage Flow

1. Select **Person 1** - Choose the first person's photo
2. Select **Person 2** - Choose the second person's photo
3. Choose **Kiss Type** - Select the style of kiss
4. Tap **Generate** - Start the AI generation
5. View Result - See the generated kiss image
6. Save or Share - Save to gallery or share

## Component Examples

### Kiss Type Selector

```tsx
import { StylePresetsGrid } from '@umituz/react-native-ai-generation-content';

const kissTypes = [
  { id: 'romantic', name: 'Romantic', preview: '...' },
  { id: 'gentle', name: 'Gentle', preview: '...' },
  { id: 'passionate', name: 'Passionate', preview: '...' },
  { id: 'cute', name: 'Cute', preview: '...' },
];

<StylePresetsGrid
  styles={kissTypes}
  selectedStyle={selectedKissType}
  onSelectStyle={setSelectedKissType}
/>
```

### Result Display with Actions

```tsx
import { ResultImageCard } from '@umituz/react-native-ai-generation-content';

{feature.state.result && (
  <ResultImageCard
    imageUrl={feature.state.result.imageUrl}
    onSave={() => feature.saveResult()}
    onShare={() => shareImage(feature.state.result.imageUrl)}
    onRegenerate={() => feature.process()}
  />
)}
```

## Best Practices

1. **Photo Quality**: Use high-quality, well-lit photos
2. **Face Visibility**: Ensure both faces are clearly visible
3. **Forward Facing**: Forward-facing photos work best
4. **Similar Angles**: Similar head angles produce more natural results
5. **Good Lighting**: Even lighting creates better facial matching

## Use Cases

### Couple Photos

```tsx
// Create romantic kiss images for couples
const result = await feature.process({
  kissType: 'romantic',
  preserveFaces: true,
});
```

### Fun & Creative

```tsx
// Generate fun kiss images
const result = await feature.process({
  kissType: 'cute',
  enhanceQuality: true,
});
```

### Social Media Content

```tsx
// Create engaging social media content
const result = await feature.process({
  kissType: 'gentle',
});
```

## Error Handling

```tsx
const { state, process } = useAIKissFeature({ ...config });

useEffect(() => {
  if (state.error) {
    Alert.alert('Generation Failed', state.error);
  }
}, [state.error]);
```

## Related Features

- [AI Hug](../ai-hug) - Generate AI hug images
- [Couple Future](../couple-future) - Generate future couple predictions
- [Face Swap](../face-swap) - Swap faces between images

## License

MIT
