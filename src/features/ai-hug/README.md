# AI Hug

Generate AI-powered hug images between two people.

## Features

- Create realistic hug images from two photos
- Automatic pose and body detection
- Natural arm positioning and embrace
- Support for various hug types
- High-quality facial matching

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useAIHugFeature } from '@umituz/react-native-ai-generation-content';
import * as ImagePicker from 'react-native-image-picker';

function AIHugScreen() {
  const [person1, setPerson1] = useState<string | null>(null);
  const [person2, setPerson2] = useState<string | null>(null);

  const feature = useAIHugFeature({
    config: {
      hugType: 'romantic',
      onProcessingStart: () => console.log('Generating hug...'),
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

      <HugTypeSelector
        selectedType={feature.state.hugType}
        onSelectType={feature.setHugType}
      />

      <Button
        title="Generate AI Hug"
        onPress={feature.process}
        disabled={!feature.isReady || feature.state.isProcessing}
      />

      {feature.state.isProcessing && (
        <View>
          <Text>Creating your hug image...</Text>
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
      featureId="ai-hug"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface AIHugFeatureConfig {
  hugType?: 'romantic' | 'friendly' | 'family' | 'cute';
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: AIHugResult) => void;
  onError?: (error: string) => void;
}
```

### Generation Options

```tsx
interface AIHugOptions {
  hugType: 'romantic' | 'friendly' | 'family' | 'cute';
  preserveFaces?: boolean; // Maintain facial features (default: true)
  enhanceQuality?: boolean; // Enhance output quality (default: true)
}
```

## Hug Types

### Romantic Hug

```tsx
const result = await feature.process({
  hugType: 'romantic',
});
```

### Friendly Hug

```tsx
const result = await feature.process({
  hugType: 'friendly',
});
```

### Family Hug

```tsx
const result = await feature.process({
  hugType: 'family',
});
```

### Cute Hug

```tsx
const result = await feature.process({
  hugType: 'cute',
});
```

## Usage Flow

1. Select **Person 1** - Choose the first person's photo
2. Select **Person 2** - Choose the second person's photo
3. Choose **Hug Type** - Select the style of hug
4. Tap **Generate** - Start the AI generation
5. View Result - See the generated hug image
6. Save or Share - Save to gallery or share

## Component Examples

### Hug Type Selector

```tsx
import { StylePresetsGrid } from '@umituz/react-native-ai-generation-content';

const hugTypes = [
  { id: 'romantic', name: 'Romantic', preview: '...' },
  { id: 'friendly', name: 'Friendly', preview: '...' },
  { id: 'family', name: 'Family', preview: '...' },
  { id: 'cute', name: 'Cute', preview: '...' },
];

<StylePresetsGrid
  styles={hugTypes}
  selectedStyle={selectedHugType}
  onSelectStyle={setSelectedHugType}
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
2. **Full Body**: Photos showing full body work best
3. **Facing Forward**: Forward-facing photos produce better results
4. **Clear Faces**: Ensure both faces are clearly visible
5. **Similar Lighting**: Similar lighting in both photos creates more natural results

## Use Cases

### Couple Photos

```tsx
// Create romantic hug images for couples
const result = await feature.process({
  hugType: 'romantic',
  preserveFaces: true,
});
```

### Family Moments

```tsx
// Generate family hug photos
const result = await feature.process({
  hugType: 'family',
  enhanceQuality: true,
});
```

### Fun with Friends

```tsx
// Create fun hug images with friends
const result = await feature.process({
  hugType: 'friendly',
});
```

## Error Handling

```tsx
const { state, process } = useAIHugFeature({ ...config });

useEffect(() => {
  if (state.error) {
    Alert.alert('Generation Failed', state.error);
  }
}, [state.error]);
```

## Related Features

- [AI Kiss](../ai-kiss) - Generate AI kiss images
- [Couple Future](../couple-future) - Generate future couple predictions
- [Face Swap](../face-swap) - Swap faces between images

## License

MIT
