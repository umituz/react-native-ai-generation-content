# Presentation Screens

Screen components for AI generation features.

## Overview

The screens module provides complete, ready-to-use screen components for AI generation features. These screens combine layouts, components, and hooks into fully functional screens.

## Features

- Unified AI feature screen
- Feature-specific screens
- Navigation integration
- State management
- Error handling

## Core Screens

### AIFeatureScreen

Unified screen for all AI features:

```tsx
import { AIFeatureScreen } from '@umituz/react-native-ai-generation-content';

function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AIImage"
        component={() => (
          <AIFeatureScreen
            featureId="text-to-image"
            userId="user-123"
          />
        )}
      />
      <Stack.Screen
        name="FaceSwap"
        component={() => (
          <AIFeatureScreen
            featureId="face-swap"
            userId="user-123"
          />
        )}
      />
      <Stack.Screen
        name="PhotoRestoration"
        component={() => (
          <AIFeatureScreen
            featureId="photo-restoration"
            userId="user-123"
          />
        )}
      />
    </Stack.Navigator>
  );
}
```

## Feature Configuration

### AI_FEATURE_CONFIGS

Pre-configured feature definitions:

```tsx
import { AI_FEATURE_CONFIGS, getAIFeatureConfig } from '@umituz/react-native-ai-generation-content';

// Get config for a feature
const config = getAIFeatureConfig('text-to-image');
console.log(config);
// {
//   id: 'text-to-image',
//   name: 'Text to Image',
//   description: 'Generate images from text',
//   mode: 'single-image-prompt',
//   ...
// }
```

### AIFeatureConfig

```tsx
interface AIFeatureConfig {
  id: AIFeatureId;
  name: string;
  description: string;
  mode: AIFeatureMode;
  outputType: AIFeatureOutputType;
  creditType: AIFeatureCreditType;
  creditCost: number;
  translations?: AIFeatureTranslations;
}
```

## Feature IDs

### Available Features

```tsx
type AIFeatureId =
  | 'text-to-image'
  | 'text-to-video'
  | 'text-to-voice'
  | 'face-swap'
  | 'photo-restoration'
  | 'upscaling'
  | 'style-transfer'
  | 'hd-touch-up'
  | 'colorization'
  | 'remove-background'
  | 'replace-background'
  | 'remove-object'
  | 'inpainting'
  | 'image-to-image'
  | 'image-to-video'
  | 'ai-hug'
  | 'ai-kiss'
  | 'anime-selfie'
  | 'meme-generator'
  | 'couple-future'
  | 'future-prediction'
  | 'sketch-to-image'
  | 'script-generator'
  | 'audio-generation'
  | 'image-captioning';
```

## Feature Modes

### AIFeatureMode

```tsx
type AIFeatureMode =
  | 'single-image'          // Single image input
  | 'dual-image'           // Two image inputs
  | 'single-image-prompt'  // Image + prompt
  | 'prompt-only'          // Text prompt only
  | 'dual-image-video'     // Two images/videos
  | 'video-input'          // Video input
  | 'text-input-only';     // Text input only
```

## Screen Props

### AIFeatureScreenProps

```tsx
interface AIFeatureScreenProps {
  featureId: AIFeatureId;
  userId: string;
  customConfig?: Partial<AIFeatureConfig>;
  translations?: Partial<AIFeatureTranslations>;
  onResult?: (result: GenerationResult) => void;
  onError?: (error: Error) => void;
}
```

## Usage Examples

### Basic Usage

```tsx
import { AIFeatureScreen } from '@umituz/react-native-ai-generation-content';

function TextToImageScreen() {
  return (
    <AIFeatureScreen
      featureId="text-to-image"
      userId="user-123"
    />
  );
}
```

### With Custom Config

```tsx
function CustomScreen() {
  return (
    <AIFeatureScreen
      featureId="text-to-image"
      userId="user-123"
      customConfig={{
        creditCost: 2, // Override default cost
      }}
      translations={{
        title: 'Custom Title',
        description: 'Custom Description',
      }}
      onResult={(result) => {
        console.log('Result:', result);
      }}
      onError={(error) => {
        Alert.alert('Error', error.message);
      }}
    />
  );
}
```

### With Navigation

```tsx
import { AIFeatureScreen } from '@umituz/react-native-ai-generation-content';

function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="AIFeature"
        component={({ route }) => (
          <AIFeatureScreen
            featureId={route.params.featureId}
            userId={route.params.userId}
          />
        )}
        options={({ route }) => ({
          title: route.params.featureId,
        })}
      />
    </Stack.Navigator>
  );
}

// Navigate to feature
navigation.navigate('AIFeature', {
  featureId: 'text-to-image',
  userId: 'user-123',
});
```

## Feature Detection

### hasAIFeature

Check if feature exists:

```tsx
import { hasAIFeature } from '@umituz/react-native-ai-generation-content';

if (hasAIFeature('text-to-image')) {
  console.log('Feature exists');
}
```

### getAllAIFeatureIds

Get all feature IDs:

```tsx
import { getAllAIFeatureIds } from '@umituz/react-native-ai-generation-content';

const features = getAllAIFeatureIds();
console.log('Available features:', features);
// ['text-to-image', 'face-swap', 'photo-restoration', ...]
```

### getAIFeaturesByMode

Get features by mode:

```tsx
import { getAIFeaturesByMode } from '@umituz/react-native-ai-generation-content';

const singleImageFeatures = getAIFeaturesByMode('single-image');
console.log('Single image features:', singleImageFeatures);
// ['photo-restoration', 'upscaling', 'hd-touch-up', ...]
```

## Translations

### createFeatureTranslations

Create translations for a feature:

```tsx
import { createFeatureTranslations } from '@umituz/react-native-ai-generation-content';

const translations = createFeatureTranslations({
  title: 'Text to Image',
  description: 'Generate images from text',
  input: {
    prompt: {
      label: 'Prompt',
      placeholder: 'Describe the image...',
      error: 'Please enter a prompt',
    },
    image: {
      label: 'Image',
      placeholder: 'Select an image',
      error: 'Please select an image',
    },
  },
  actions: {
    generate: 'Generate',
    cancel: 'Cancel',
    save: 'Save',
    share: 'Share',
  },
  status: {
    generating: 'Generating...',
    completed: 'Completed!',
    error: 'Error',
  },
});
```

### createSingleImageTranslations

Single image input translations:

```tsx
import { createSingleImageTranslations } from '@umituz/react-native-ai-generation-content';

const translations = createSingleImageTranslations({
  imageLabel: 'Upload Photo',
  imagePlaceholder: 'Select a photo to enhance',
  generateButton: 'Enhance Photo',
});
```

### createDualImageTranslations

Dual image input translations:

```tsx
import { createDualImageTranslations } from '@umituz/react-native-ai-generation-content';

const translations = createDualImageTranslations({
  sourceLabel: 'First Photo',
  targetLabel: 'Second Photo',
  generateButton: 'Process',
});
```

### createPromptTranslations

Prompt input translations:

```tsx
import { createPromptTranslations } from '@umituz/react-native-ai-generation-content';

const translations = createPromptTranslations({
  label: 'Prompt',
  placeholder: 'Describe what you want to create...',
  charLimit: 1000,
  examples: [
    'A beautiful sunset',
    'A futuristic city',
    'A serene forest',
  ],
});
```

## Custom Screens

### Creating Custom Screen

```tsx
import { useTextToImageFeature } from '@umituz/react-native-ai-generation-content';

function CustomTextToImageScreen() {
  const feature = useTextToImageFeature({
    config: {
      model: 'imagen-3',
    },
    userId: 'user-123',
  });

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        AI Image Generator
      </Text>

      <TextInput
        style={{ height: 100, borderWidth: 1, marginTop: 16 }}
        placeholder="Describe the image..."
        onChangeText={feature.setPrompt}
        value={feature.state.prompt}
      />

      <Button
        style={{ marginTop: 16 }}
        onPress={() => feature.generate()}
        disabled={!feature.isReady}
        title="Generate"
      />

      {feature.state.isProcessing && (
        <Text style={{ marginTop: 16 }}>
          Generating... {feature.state.progress}%
        </Text>
      )}

      {feature.state.result && (
        <Image
          source={{ uri: feature.state.result.imageUrl }}
          style={{ width: '100%', height: 300, marginTop: 16 }}
        />
      )}
    </View>
  );
}
```

## Best Practices

1. **Use AIFeatureScreen**: For standard features, use the unified screen
2. **Custom Screens**: Create custom screens only when needed
3. **Translations**: Provide translations for all user-facing text
4. **Error Handling**: Handle errors gracefully
5. **Navigation**: Integrate with your navigation system

## Related

- [Components](../components/) - UI components
- [Hooks](../hooks/) - Custom hooks
- [Layouts](../layouts/) - Layout components

## License

MIT
