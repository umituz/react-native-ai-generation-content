# Future Prediction

Generate images showing people in future scenarios using AI.

## Features

- Create future predictions for individuals
- Multiple future scenarios (success, old age, etc.)
- Natural aging and progression
- Various life scenarios
- High-quality facial matching

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useFuturePrediction } from '@umituz/react-native-ai-generation-content';
import * as ImagePicker from 'react-native-image-picker';

function FuturePredictionScreen() {
  const [image, setImage] = useState<string | null>(null);

  const feature = useFuturePrediction({
    config: {
      scenario: 'old-age',
      onProcessingStart: () => console.log('Generating future image...'),
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
        title="Select Your Photo"
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
      featureId="future-prediction"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface FuturePredictionFeatureConfig {
  scenario?: 'old-age' | 'success' | 'future-career' | 'future-family';
  age?: number; // Target age for prediction (optional)
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: FuturePredictionResult) => void;
  onError?: (error: string) => void;
}
```

### Generation Options

```tsx
interface FuturePredictionOptions {
  scenario: 'old-age' | 'success' | 'future-career' | 'future-family';
  age?: number; // Target age
  preserveFaces?: boolean; // Maintain facial features (default: true)
  enhanceQuality?: boolean; // Enhance output quality (default: true)
}
```

## Future Scenarios

### Old Age

See yourself in old age:

```tsx
const result = await feature.process({
  scenario: 'old-age',
  age: 80,
});
```

### Success

Professional success scenario:

```tsx
const result = await feature.process({
  scenario: 'success',
});
```

### Future Career

In a dream career:

```tsx
const result = await feature.process({
  scenario: 'future-career',
});
```

### Future Family

With a future family:

```tsx
const result = await feature.process({
  scenario: 'future-family',
});
```

## Usage Flow

1. Select **Photo** - Choose a current photo
2. Choose **Scenario** - Select the future scenario
3. Set **Age** (optional) - Target age for old age prediction
4. Tap **Generate** - Start the AI generation
5. View Result - See the future prediction
6. Save or Share - Save to gallery or share

## Component Examples

### Scenario Selector

```tsx
import { StylePresetsGrid } from '@umituz/react-native-ai-generation-content';

const scenarios = [
  { id: 'old-age', name: 'Old Age', preview: '...' },
  { id: 'success', name: 'Success', preview: '...' },
  { id: 'future-career', name: 'Dream Career', preview: '...' },
  { id: 'future-family', name: 'Future Family', preview: '...' },
];

<StylePresetsGrid
  styles={scenarios}
  selectedStyle={selectedScenario}
  onSelectStyle={setSelectedScenario}
/>
```

### Age Input

```tsx
import { Slider } from 'react-native';

<Slider
  minimumValue={50}
  maximumValue={100}
  step={1}
  value={age}
  onValueChange={setAge}
/>

<Text>Target Age: {age}</Text>
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
2. **Face Visibility**: Ensure the face is clearly visible
3. **Forward Facing**: Forward-facing photos work best
4. **Good Lighting**: Even lighting creates more natural results
5. **Realistic Expectations**: Results are AI-generated predictions

## Use Cases

### Fun & Entertainment

```tsx
// Create fun future predictions
const result = await feature.process({
  scenario: 'old-age',
  age: 75,
});
```

### Social Media Content

```tsx
// Share future predictions on social media
const result = await feature.process({
  scenario: 'success',
});
```

### Motivation

```tsx
// Visualize future success
const result = await feature.process({
  scenario: 'future-career',
});
```

## Related Features

- [Couple Future](../couple-future) - Generate future couple predictions
- [AI Hug](../ai-hug) - Generate AI hug images
- [Face Swap](../face-swap) - Swap faces between images

## License

MIT
