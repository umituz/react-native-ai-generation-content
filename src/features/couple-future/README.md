# Couple Future

Generate images showing couples in future scenarios using AI.

## Features

- Create future predictions for couples
- Multiple future scenarios (wedding, old age, etc.)
- Natural aging and progression
- High-quality facial matching
- Romantic and heartwarming results

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useCoupleFutureGeneration } from '@umituz/react-native-ai-generation-content';
import * as ImagePicker from 'react-native-image-picker';

function CoupleFutureScreen() {
  const [person1, setPerson1] = useState<string | null>(null);
  const [person2, setPerson2] = useState<string | null>(null);

  const feature = useCoupleFutureGeneration({
    config: {
      scenario: 'wedding',
      onProcessingStart: () => console.log('Generating future image...'),
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

      <ScenarioSelector
        selectedScenario={feature.state.scenario}
        onSelectScenario={feature.setScenario}
      />

      <Button
        title="Generate Future Image"
        onPress={feature.process}
        disabled={!feature.isReady || feature.state.isProcessing}
      />

      {feature.state.isProcessing && (
        <View>
          <Text>Creating your future image...</Text>
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
      featureId="couple-future"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface CoupleFutureFeatureConfig {
  scenario?: 'wedding' | 'old-age' | 'anniversary' | 'family';
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: CoupleFutureResult) => void;
  onError?: (error: string) => void;
}
```

### Generation Options

```tsx
interface CoupleFutureOptions {
  scenario: 'wedding' | 'old-age' | 'anniversary' | 'family';
  preserveFaces?: boolean; // Maintain facial features (default: true)
  enhanceQuality?: boolean; // Enhance output quality (default: true)
}
```

## Future Scenarios

### Wedding

Couples on their wedding day:

```tsx
const result = await feature.process({
  scenario: 'wedding',
});
```

### Old Age

The couple as elderly:

```tsx
const result = await feature.process({
  scenario: 'old-age',
});
```

### Anniversary

Celebrating an anniversary:

```tsx
const result = await feature.process({
  scenario: 'anniversary',
});
```

### Family

The couple with a family:

```tsx
const result = await feature.process({
  scenario: 'family',
});
```

## Usage Flow

1. Select **Person 1** - Choose the first person's photo
2. Select **Person 2** - Choose the second person's photo
3. Choose **Scenario** - Select the future scenario
4. Tap **Generate** - Start the AI generation
5. View Result - See the future prediction
6. Save or Share - Save to gallery or share

## Component Examples

### Scenario Selector

```tsx
import { StylePresetsGrid } from '@umituz/react-native-ai-generation-content';

const scenarios = [
  { id: 'wedding', name: 'Wedding', preview: '...' },
  { id: 'old-age', name: 'Old Age', preview: '...' },
  { id: 'anniversary', name: 'Anniversary', preview: '...' },
  { id: 'family', name: 'Family', preview: '...' },
];

<StylePresetsGrid
  styles={scenarios}
  selectedStyle={selectedScenario}
  onSelectStyle={setSelectedScenario}
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
4. **Similar Angles**: Similar head angles produce better results
5. **Good Lighting**: Even lighting creates more natural results

## Use Cases

### Fun with Partners

```tsx
// Create fun future predictions with your partner
const result = await feature.process({
  scenario: 'wedding',
});
```

### Social Media Content

```tsx
// Share couple future predictions on social media
const result = await feature.process({
  scenario: 'old-age',
});
```

### Anniversary Gifts

```tsx
// Create anniversary content
const result = await feature.process({
  scenario: 'anniversary',
});
```

## Related Features

- [AI Hug](../ai-hug) - Generate AI hug images
- [AI Kiss](../ai-kiss) - Generate AI kiss images
- [Face Swap](../face-swap) - Swap faces between images

## License

MIT
