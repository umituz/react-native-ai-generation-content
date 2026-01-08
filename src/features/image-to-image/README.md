# Image to Image

Transform images using AI with various operations and styles.

## Features

- Transform images with AI
- Support for single and dual image operations
- Multiple transformation modes
- Style transfer and image modification
- Flexible and extensible

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Single Image Operation

```tsx
import { useSingleImageFeature } from '@umituz/react-native-ai-generation-content';
import * as ImagePicker from 'react-native-image-picker';

function TransformScreen() {
  const [image, setImage] = useState<string | null>(null);

  const feature = useSingleImageFeature({
    config: {
      onProcessingStart: () => console.log('Processing...'),
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
    onSaveImage: async (imageUrl) => {
      await saveToGallery(imageUrl);
    },
    buildInput: (imageBase64, config) => ({
      imageBase64,
      options: { mode: 'transform' },
    }),
  });

  return (
    <View>
      <PhotoUploadCard
        image={image}
        onSelectImage={feature.selectImage}
        title="Select Image"
      />
      <Button
        title="Transform"
        onPress={feature.process}
        disabled={!feature.isReady}
      />
      {feature.state.result && (
        <Image source={{ uri: feature.state.result.imageUrl }} />
      )}
    </View>
  );
}
```

### Dual Image Operation

```tsx
import { useDualImageFeature } from '@umituz/react-native-ai-generation-content';

function DualTransformScreen() {
  const [image1, setImage1] = useState<string | null>(null);
  const [image2, setImage2] = useState<string | null>(null);

  const feature = useDualImageFeature({
    config: {
      onProcessingStart: () => console.log('Processing...'),
      onProcessingComplete: (result) => console.log('Complete:', result),
      onError: (error) => console.error('Error:', error),
    },
    onSelectSourceImage: async () => {
      const result = await ImagePicker.launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets[0].uri) {
        return await convertToBase64(result.assets[0].uri);
      }
      return null;
    },
    onSelectTargetImage: async () => {
      const result = await ImagePicker.launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets[0].uri) {
        return await convertToBase64(result.assets[0].uri);
      }
      return null;
    },
    onSaveImage: async (imageUrl) => {
      await saveToGallery(imageUrl);
    },
    buildInput: (sourceBase64, targetBase64, config) => ({
      imageBase64: sourceBase64,
      targetImageBase64: targetBase64,
      options: config.defaultOptions,
    }),
  });

  return (
    <View>
      <DualImagePicker
        sourceImage={image1}
        targetImage={image2}
        onSelectSourceImage={feature.selectSourceImage}
        onSelectTargetImage={feature.selectTargetImage}
      />
      <Button
        title="Process"
        onPress={feature.process}
        disabled={!feature.isReady}
      />
      {feature.state.result && (
        <Image source={{ uri: feature.state.result.imageUrl }} />
      )}
    </View>
  );
}
```

### Image with Prompt

```tsx
import { useImageWithPromptFeature } from '@umituz/react-native-ai-generation-content';

function ImagePromptScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');

  const feature = useImageWithPromptFeature({
    config: {
      onProcessingStart: () => console.log('Processing...'),
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
    onSaveImage: async (imageUrl) => {
      await saveToGallery(imageUrl);
    },
    buildInput: (imageBase64, promptText, config) => ({
      imageBase64,
      prompt: promptText,
      options: config.defaultOptions,
    }),
  });

  return (
    <View>
      <PhotoUploadCard
        image={image}
        onSelectImage={feature.selectImage}
        title="Select Image"
      />
      <TextInput
        placeholder="Describe transformation..."
        value={prompt}
        onChangeText={setPrompt}
      />
      <Button
        title="Transform"
        onPress={() => feature.process(prompt)}
        disabled={!feature.isReady}
      />
      {feature.state.result && (
        <Image source={{ uri: feature.state.result.imageUrl }} />
      )}
    </View>
  );
}
```

## Hook Types

### useSingleImageFeature

For operations that require a single image input:

```tsx
const feature = useSingleImageFeature<Config, Result>({
  config,
  onSelectImage,
  onSaveImage,
  onBeforeProcess,
  options: {
    buildInput: (imageBase64, config) => ({ ... }),
  },
});
```

**Returns:**
```tsx
{
  state: {
    image: string | null;
    result: Result | null;
    isProcessing: boolean;
    progress: number;
    error: string | null;
  };
  selectImage: () => Promise<void>;
  process: () => Promise<void>;
  saveResult: () => Promise<void>;
  reset: () => void;
  isReady: boolean;
}
```

### useDualImageFeature

For operations that require two images:

```tsx
const feature = useDualImageFeature<Config, Result>({
  config,
  onSelectSourceImage,
  onSelectTargetImage,
  onSaveImage,
  onBeforeProcess,
  options: {
    buildInput: (sourceBase64, targetBase64, config) => ({ ... }),
  },
});
```

**Returns:**
```tsx
{
  state: {
    sourceImage: string | null;
    targetImage: string | null;
    result: Result | null;
    isProcessing: boolean;
    progress: number;
    error: string | null;
  };
  selectSourceImage: () => Promise<void>;
  selectTargetImage: () => Promise<void>;
  process: () => Promise<void>;
  saveResult: () => Promise<void>;
  reset: () => void;
  isReady: boolean;
}
```

### useImageWithPromptFeature

For operations that require an image and text prompt:

```tsx
const feature = useImageWithPromptFeature<Config, Result>({
  config,
  onSelectImage,
  onSaveImage,
  onBeforeProcess,
  options: {
    buildInput: (imageBase64, prompt, config) => ({ ... }),
  },
});
```

**Returns:**
```tsx
{
  state: {
    image: string | null;
    prompt: string;
    result: Result | null;
    isProcessing: boolean;
    progress: number;
    error: string | null;
  };
  selectImage: () => Promise<void>;
  setPrompt: (prompt: string) => void;
  process: (prompt: string) => Promise<void>;
  saveResult: () => Promise<void>;
  reset: () => void;
  isReady: boolean;
}
```

## Config Options

```tsx
interface BaseFeatureConfig {
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: any) => void;
  onError?: (error: string) => void;
}

interface SingleImageFeatureConfig extends BaseFeatureConfig {
  defaultOptions?: Record<string, any>;
}

interface DualImageFeatureConfig extends BaseFeatureConfig {
  defaultOptions?: Record<string, any>;
}

interface ImagePromptFeatureConfig extends BaseFeatureConfig {
  defaultOptions?: Record<string, any>;
}
```

## Component Examples

### DualImagePicker

```tsx
import { DualImagePicker } from '@umituz/react-native-ai-generation-content';

<DualImagePicker
  sourceImage={sourceImage}
  targetImage={targetImage}
  onSelectSourceImage={handleSelectSource}
  onSelectTargetImage={handleSelectTarget}
  sourceLabel="Source Image"
  targetLabel="Target Image"
/>
```

### ResultDisplay

```tsx
import { ResultDisplay } from '@umituz/react-native-ai-generation-content';

<ResultDisplay
  originalImage={originalImage}
  resultImage={resultImage}
  onSave={() => saveImage()}
  onShare={() => shareImage()}
/>
```

## Usage Examples

### Style Transfer

```tsx
const feature = useSingleImageFeature({
  config: {
    defaultOptions: { style: 'oil-painting' },
  },
  buildInput: (imageBase64, config) => ({
    imageBase64,
    style: config.defaultOptions.style,
  }),
});
```

### Face Swap

```tsx
const feature = useDualImageFeature({
  config: {
    defaultOptions: { preserveFaces: true },
  },
  buildInput: (sourceBase64, targetBase64, config) => ({
    imageBase64: sourceBase64,
    targetImageBase64: targetBase64,
    preserveFaces: config.defaultOptions.preserveFaces,
  }),
});
```

### Image Transformation

```tsx
const feature = useImageWithPromptFeature({
  config: {
    defaultOptions: { strength: 0.8 },
  },
  buildInput: (imageBase64, prompt, config) => ({
    imageBase64,
    prompt,
    strength: config.defaultOptions.strength,
  }),
});
```

## Best Practices

1. **Image Quality**: Use high-quality images for best results
2. **Build Input**: Properly structure input based on API requirements
3. **Error Handling**: Always handle errors gracefully
4. **Progress Tracking**: Show progress to users during processing
5. **Result Validation**: Validate results before presenting to users

## Related Features

- [Style Transfer](../style-transfer) - Apply artistic styles
- [Face Swap](../face-swap) - Swap faces between images
- [Remove Background](../remove-background) - Remove backgrounds

## License

MIT
