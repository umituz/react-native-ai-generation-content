# Text to Video

Generate videos from text descriptions using AI.

## Features

- Create videos from natural language descriptions
- Support for various video durations
- Multiple aspect ratios (16:9, 9:16, 1:1)
- Style presets for different video styles
- Progress tracking during generation

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useTextToVideoFeature } from '@umituz/react-native-ai-generation-content';

function TextToVideoScreen() {
  const feature = useTextToVideoFeature({
    config: {
      model: 'veo-3',
      onPromptChange: (prompt) => console.log('Prompt changed:', prompt),
      onProcessingStart: () => console.log('Starting generation...'),
      onProcessingComplete: (result) => console.log('Complete:', result),
      onError: (error) => console.error('Error:', error),
    },
    userId: 'user-123',
  });

  return (
    <View>
      <PromptInput
        prompt={feature.state.prompt}
        onChangePrompt={feature.setPrompt}
        placeholder="Describe the video you want to create..."
      />

      <DurationSelector
        selectedDuration={feature.state.duration}
        onSelectDuration={feature.setDuration}
      />

      <AspectRatioSelector
        selectedAspectRatio={feature.state.aspectRatio}
        onSelectAspectRatio={feature.setAspectRatio}
      />

      <Button
        title="Generate Video"
        onPress={() => feature.generate()}
        disabled={!feature.isReady}
      />

      {feature.state.isProcessing && (
        <View>
          <Text>Progress: {feature.state.progress}%</Text>
          <ProgressBar progress={feature.state.progress} />
        </View>
      )}

      {feature.state.result && (
        <Video source={{ uri: feature.state.result.videoUrl }} />
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
      featureId="text-to-video"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface TextToVideoFeatureConfig {
  model?: string; // AI model to use (default: 'veo-3')
  defaultDuration?: number; // Default video duration in seconds
  defaultAspectRatio?: '16:9' | '9:16' | '1:1';
  onPromptChange?: (prompt: string) => void;
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: TextToVideoResult) => void;
  onError?: (error: string) => void;
}
```

### Generation Options

```tsx
interface TextToVideoOptions {
  duration: number; // Video duration in seconds
  aspectRatio: '16:9' | '9:16' | '1:1';
  style?: 'realistic' | 'cinematic' | 'anime' | '3d';
  negativePrompt?: string;
}
```

## Usage Flow

1. Enter **Prompt** - Describe the video you want to create
2. Select **Duration** - Choose video length (4-8 seconds)
3. Select **Aspect Ratio** - Choose 16:9, 9:16, or 1:1
4. Tap **Generate** - Start video generation
5. View Result - Watch the generated video
6. Save or Share - Download or share the video

## Component Examples

### Duration Selector

```tsx
import { DurationSelector, createDurationOptions } from '@umituz/react-native-ai-generation-content';

const durations = createDurationOptions([4, 5, 6, 7, 8]);

<DurationSelector
  selectedDuration={duration}
  onSelectDuration={setDuration}
  durations={durations}
/>
```

### Style Presets

```tsx
import { StylePresetsGrid } from '@umituz/react-native-ai-generation-content';

const styles = [
  { id: 'realistic', name: 'Realistic', preview: '...' },
  { id: 'cinematic', name: 'Cinematic', preview: '...' },
  { id: 'anime', name: 'Anime', preview: '...' },
];

<StylePresetsGrid
  styles={styles}
  selectedStyle={selectedStyle}
  onSelectStyle={setSelectedStyle}
/>
```

## Example Prompts

```tsx
const examplePrompts = [
  'A majestic eagle soaring through mountain peaks at sunrise',
  'A futuristic city with flying cars and neon lights',
  'Ocean waves crashing on a peaceful beach during sunset',
  'A cozy cabin in the woods during winter with falling snow',
  'A dramatic battle scene between two knights in armor',
];
```

## Advanced Usage

### Custom Generation Options

```tsx
const result = await feature.generate({
  duration: 6,
  aspectRatio: '16:9',
  style: 'cinematic',
  negativePrompt: 'blurry, low quality, distorted',
});
```

### Progress Stages

```tsx
const { state } = useTextToVideoFeature({ ...config });

// Progress stages:
// - Initializing (0-10%)
// - Processing prompt (10-30%)
// - Generating frames (30-70%)
// - Rendering video (70-90%)
// - Finalizing (90-100%)
```

### Video Saving

```tsx
const { state, saveVideo } = useTextToVideoFeature({
  config: {
    onProcessingComplete: async (result) => {
      if (result.success && result.videoUrl) {
        await saveVideo(result.videoUrl);
      }
    },
  },
  // ... other props
});
```

## Best Practices

1. **Detailed Prompts**: Use descriptive prompts for better results
2. **Duration**: Shorter videos (4-5s) generate faster
3. **Aspect Ratio**: Match aspect ratio to your use case (16:9 for YouTube, 9:16 for TikTok)
4. **Style**: Choose appropriate style for your content
5. **Patience**: Video generation takes time, show progress to users

## Error Handling

```tsx
const { state, generate } = useTextToVideoFeature({ ...config });

useEffect(() => {
  if (state.error) {
    Alert.alert('Generation Failed', state.error);
  }
}, [state.error]);
```

## Related Features

- [Text to Image](../text-to-image) - Generate images from text
- [Image to Video](../image-to-video) - Convert images to videos
- [Script Generator](../script-generator) - Generate video scripts

## License

MIT
