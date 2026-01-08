# Image to Video

Convert static images into animated videos using AI.

## Features

- Animate static photos into videos
- Multiple animation styles (zoom, pan, 3D motion)
- Support for various durations
- Natural movement patterns
- High-quality output

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useImageToVideoFeature } from '@umituz/react-native-ai-generation-content';
import * as ImagePicker from 'react-native-image-picker';

function ImageToVideoScreen() {
  const [image, setImage] = useState<string | null>(null);

  const feature = useImageToVideoFeature({
    config: {
      motionType: 'zoom-in',
      duration: 4,
      onProcessingStart: () => console.log('Creating video...'),
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
    onSaveVideo: async (videoUrl) => {
      await saveToGallery(videoUrl);
    },
  });

  return (
    <View>
      <PhotoUploadCard
        image={image}
        onSelectImage={feature.selectImage}
        title="Select Image to Animate"
      />

      <MotionTypeSelector
        selectedType={feature.state.motionType}
        onSelectType={feature.setMotionType}
      />

      <DurationSelector
        selectedDuration={feature.state.duration}
        onSelectDuration={feature.setDuration}
      />

      <Button
        title="Create Video"
        onPress={feature.process}
        disabled={!feature.isReady || feature.state.isProcessing}
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
      featureId="image-to-video"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface ImageToVideoFeatureConfig {
  motionType?: 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right' | '3d';
  duration?: number; // Video duration in seconds (2-8)
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: ImageToVideoResult) => void;
  onError?: (error: string) => void;
}
```

### Generation Options

```tsx
interface ImageToVideoOptions {
  motionType: 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right' | '3d';
  duration: number; // Duration in seconds
  intensity?: number; // Motion intensity 0.0 - 1.0 (default: 0.7)
  fps?: number; // Frames per second (default: 30)
}
```

## Motion Types

### Zoom In

Gradually zoom into the image:

```tsx
const result = await feature.process({
  motionType: 'zoom-in',
  duration: 4,
  intensity: 0.7,
});
```

### Zoom Out

Gradually zoom out from the image:

```tsx
const result = await feature.process({
  motionType: 'zoom-out',
  duration: 5,
  intensity: 0.6,
});
```

### Pan Left

Pan the image to the left:

```tsx
const result = await feature.process({
  motionType: 'pan-left',
  duration: 4,
  intensity: 0.7,
});
```

### Pan Right

Pan the image to the right:

```tsx
const result = await feature.process({
  motionType: 'pan-right',
  duration: 4,
  intensity: 0.7,
});
```

### 3D Motion

Add depth with 3D parallax effect:

```tsx
const result = await feature.process({
  motionType: '3d',
  duration: 5,
  intensity: 0.8,
});
```

## Usage Flow

1. Select **Image** - Choose a static image to animate
2. Choose **Motion Type** - Select the animation style
3. Set **Duration** - Choose video length
4. Tap **Create Video** - Start the animation
5. View Result - Watch the generated video
6. Save or Share - Save to gallery or share

## Component Examples

### Motion Type Selector

```tsx
import { StylePresetsGrid } from '@umituz/react-native-ai-generation-content';

const motionTypes = [
  { id: 'zoom-in', name: 'Zoom In', preview: '...' },
  { id: 'zoom-out', name: 'Zoom Out', preview: '...' },
  { id: 'pan-left', name: 'Pan Left', preview: '...' },
  { id: 'pan-right', name: 'Pan Right', preview: '...' },
  { id: '3d', name: '3D Motion', preview: '...' },
];

<StylePresetsGrid
  styles={motionTypes}
  selectedStyle={selectedMotionType}
  onSelectStyle={setSelectedMotionType}
/>
```

### Duration Selector

```tsx
import { DurationSelector, createDurationOptions } from '@umituz/react-native-ai-generation-content';

const durations = createDurationOptions([2, 3, 4, 5, 6, 7, 8]);

<DurationSelector
  selectedDuration={duration}
  onSelectDuration={setDuration}
  durations={durations}
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

<Text>Motion Intensity: {Math.round(intensity * 100)}%</Text>
```

## Advanced Usage

### Custom Options

```tsx
const result = await feature.process({
  motionType: '3d',
  duration: 6,
  intensity: 0.8,
  fps: 30,
});
```

### Progress Stages

```tsx
const { state } = useImageToVideoFeature({ ...config });

// Progress stages:
// - Analyzing image (0-20%)
// - Generating motion (20-60%)
// - Rendering frames (60-90%)
// - Finalizing video (90-100%)
```

### Video Preview

```tsx
import { Video } from 'expo-av';
import { useRef } from 'react';

const videoRef = useRef<Video>(null);

<Video
  ref={videoRef}
  source={{ uri: feature.state.result.videoUrl }}
  useNativeControls
  resizeMode="contain"
  style={{ width: '100%', height: 300 }}
/>
```

## Use Cases

### Social Media Content

```tsx
// Create animated posts
const result = await feature.process({
  motionType: 'zoom-in',
  duration: 4,
});
```

### Photo Slideshows

```tsx
// Animate photos for slideshows
const result = await feature.process({
  motionType: 'pan-right',
  duration: 5,
});
```

### Product Showcases

```tsx
// Create dynamic product videos
const result = await feature.process({
  motionType: '3d',
  duration: 6,
  intensity: 0.8,
});
```

### Storytelling

```tsx
// Add motion to story images
const result = await feature.process({
  motionType: 'zoom-out',
  duration: 5,
});
```

## Best Practices

1. **Image Quality**: Use high-resolution images for best results
2. **Subject Focus**: Choose motion that highlights the main subject
3. **Duration**: Shorter durations (3-5s) work well for social media
4. **Intensity**: Moderate intensity (0.6-0.8) produces natural motion
5. **Testing**: Try different motion types to find the best fit

## Error Handling

```tsx
const { state, process } = useImageToVideoFeature({ ...config });

useEffect(() => {
  if (state.error) {
    Alert.alert('Generation Failed', state.error);
  }
}, [state.error]);
```

## Related Features

- [Text to Video](../text-to-video) - Generate videos from text
- [Text to Image](../text-to-image) - Generate images from text
- [Upscaling](../upscaling) - Increase image resolution before video creation

## License

MIT
