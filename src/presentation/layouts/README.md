# Presentation Layouts

Layout components for AI generation features.

## Overview

The layouts module provides pre-built layout components that combine UI elements into complete screens for common AI generation patterns. These layouts handle the UI structure so you can focus on customization.

## Features

- Single image input layouts
- Dual image input layouts
- Image with prompt layouts
- Video generation layouts
- Result display layouts
- Progress modal layouts

## Layout Types

### SingleImageFeatureLayout

Layout for features requiring a single image:

```tsx
import { SingleImageFeatureLayout } from '@umituz/react-native-ai-generation-content';

function UpscalingScreen() {
  return (
    <SingleImageFeatureLayout
      featureId="upscaling"
      userId="user-123"
      config={{
        title: 'AI Upscaling',
        description: 'Enhance image resolution with AI',
        showStyleSelector: false,
        showAspectRatioSelector: false,
      }}
      onSelectImage={async () => {
        // Image selection logic
        return selectedImage;
      }}
      onSaveImage={async (imageUrl) => {
        // Save logic
      }}
      onBeforeProcess={async () => {
        // Pre-processing validation
        return true;
      }}
    />
  );
}
```

### SingleImageWithPromptFeatureLayout

Layout for single image + prompt:

```tsx
import { SingleImageWithPromptFeatureLayout } from '@umituz/react-native-ai-generation-content';

function ImageToImageScreen() {
  return (
    <SingleImageWithPromptFeatureLayout
      featureId="image-to-image"
      userId="user-123"
      config={{
        title: 'Transform Image',
        description: 'Transform your image with AI',
        promptPlaceholder: 'Describe how to transform the image...',
        showStyleSelector: true,
        showAspectRatioSelector: true,
      }}
      onSelectImage={async () => {
        return selectedImage;
      }}
      onSaveImage={async (imageUrl) => {
        await saveToGallery(imageUrl);
      }}
    />
  );
}
```

### DualImageFeatureLayout

Layout for dual image features:

```tsx
import { DualImageFeatureLayout } from '@umituz/react-native-ai-generation-content';

function FaceSwapScreen() {
  return (
    <DualImageFeatureLayout
      featureId="face-swap"
      userId="user-123"
      config={{
        title: 'Face Swap',
        description: 'Swap faces between two photos',
        sourceLabel: 'Face to Use',
        targetLabel: 'Face to Replace',
      }}
      onSelectSourceImage={async () => {
        return sourceImage;
      }}
      onSelectTargetImage={async () => {
        return targetImage;
      }}
      onSaveImage={async (imageUrl) => {
        await saveToGallery(imageUrl);
      }}
    />
  );
}
```

### DualImageVideoFeatureLayout

Layout for dual image/video features:

```tsx
import { DualImageVideoFeatureLayout } from '@umituz/react-native-ai-generation-content';

function AIHugScreen() {
  return (
    <DualImageVideoFeatureLayout
      featureId="ai-hug"
      userId="user-123"
      config={{
        title: 'AI Hug',
        description: 'Generate AI hug images',
        inputType: 'image',
      }}
      onSelectSource={async () => {
        return sourceImage;
      }}
      onSelectTarget={async () => {
        return targetImage;
      }}
      onSaveResult={async (url) => {
        await saveToGallery(url);
      }}
    />
  );
}
```

## Layout Props

### Base Layout Props

```tsx
interface BaseLayoutProps {
  featureId: string;
  userId: string;
  config: {
    title: string;
    description: string;
    showStyleSelector?: boolean;
    showAspectRatioSelector?: boolean;
  };
}
```

### Single Image Props

```tsx
interface SingleImageFeatureLayoutProps extends BaseLayoutProps {
  onSelectImage: () => Promise<string>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  onBeforeProcess?: () => Promise<boolean>;
}
```

### Dual Image Props

```tsx
interface DualImageFeatureLayoutProps extends BaseLayoutProps {
  onSelectSourceImage: () => Promise<string>;
  onSelectTargetImage: () => Promise<string>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  onBeforeProcess?: () => Promise<boolean>;
}
```

## Customization

### Custom Header

```tsx
<SingleImageFeatureLayout
  featureId="upscaling"
  userId="user-123"
  config={{
    title: 'AI Upscaling',
    description: 'Enhance image resolution',
  }}
  headerComponent={
    <View>
      <Image source={require('./assets/banner.png')} />
      <Text>Custom header content</Text>
    </View>
  }
  onSelectImage={handleSelectImage}
  onSaveImage={handleSaveImage}
/>
```

### Custom Options

```tsx
<SingleImageWithPromptFeatureLayout
  featureId="image-to-image"
  userId="user-123"
  config={{
    title: 'Transform Image',
    customOptions: (
      <View>
        <Slider
          value={intensity}
          onValueChange={setIntensity}
        />
        <Text>Intensity: {intensity}</Text>
      </View>
    ),
  }}
  onSelectImage={handleSelectImage}
  onSaveImage={handleSaveImage}
/>
```

### Custom Result Display

```tsx
<SingleImageFeatureLayout
  featureId="upscaling"
  userId="user-123"
  config={{
    title: 'AI Upscaling',
    customResultRender: (result) => (
      <View>
        <ImageComparison
          original={originalImage}
          result={result.imageUrl}
        />
        <Button onPress={() => saveResult(result.imageUrl)}>
          Save
        </Button>
      </View>
    ),
  }}
  onSelectImage={handleSelectImage}
  onSaveImage={handleSaveImage}
/>
```

## Translations

Layouts support custom translations:

```tsx
<SingleImageFeatureLayout
  featureId="upscaling"
  userId="user-123"
  translations={{
    uploadButton: 'Upload Photo',
    generateButton: 'Enhance Image',
    processing: 'Enhancing...',
    success: 'Image enhanced!',
    error: 'Enhancement failed',
  }}
  onSelectImage={handleSelectImage}
  onSaveImage={handleSaveImage}
/>
```

## Built-in Screens

### AIFeatureScreen

Unified AI feature screen:

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

This screen automatically:
- Detects feature type
- Shows appropriate layout
- Handles generation flow
- Displays results
- Manages errors

## Example Implementations

### Complete Upscaling Screen

```tsx
import { SingleImageFeatureLayout } from '@umituz/react-native-ai-generation-content';

function UpscalingScreen() {
  return (
    <SingleImageFeatureLayout
      featureId="upscaling"
      userId="user-123"
      config={{
        title: 'AI Upscaling',
        description: 'Increase image resolution while maintaining quality',
        showStyleSelector: false,
        showAspectRatioSelector: false,
        customOptions: (
          <GridSelector
            options={[
              { id: '2x', name: '2x', description: 'Double resolution' },
              { id: '4x', name: '4x', description: 'Quadruple resolution' },
            ]}
            selectedOption="2x"
          />
        ),
      }}
      onSelectImage={async () => {
        const result = await launchImageLibrary();
        if (result.assets) {
          return await convertToBase64(result.assets[0].uri);
        }
        throw new Error('No image selected');
      }}
      onSaveImage={async (imageUrl) => {
        await saveToGallery(imageUrl);
        Alert.alert('Success', 'Image saved to gallery');
      }}
      onBeforeProcess={async () => {
        // Show confirmation
        return new Promise((resolve) => {
          Alert.alert(
            'Confirm Upscaling',
            'This may take a moment. Continue?',
            [
              { text: 'Cancel', onPress: () => resolve(false) },
              { text: 'OK', onPress: () => resolve(true) },
            ]
          );
        });
      }}
    />
  );
}
```

## Best Practices

1. **Simplicity**: Use layouts for standard UI patterns
2. **Customization**: Extend layouts for custom needs
3. **Consistency**: Keep layouts consistent across features
4. **Accessibility**: Ensure layouts are accessible
5. **Performance**: Optimize layout rendering

## Related

- [Components](../components/) - UI components
- [Hooks](../hooks/) - Custom hooks
- [Screens](../screens/) - Screen components

## License

MIT
