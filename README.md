# @umituz/react-native-ai-generation-content

> Provider-agnostic AI generation orchestration for React Native

A comprehensive React Native library for AI-powered content generation, supporting multiple providers and offering a wide range of AI features including image generation, video creation, text-to-speech, face swap, and much more.

## 🚀 Features

- **🎨 Text to Image**: Generate stunning images from text descriptions
- **🎬 Text to Video**: Create videos from text prompts
- **🎤 Text to Voice**: Convert text to natural-sounding speech
- **🔄 Face Swap**: Swap faces between images with AI
- **🖼️ Style Transfer**: Apply artistic styles to photos
- **✨ Photo Restoration**: Restore and enhance old photos
- **🔍 Upscaling**: Increase image resolution while maintaining quality
- **🎭 AI Hug & Kiss**: Generate creative AI-powered interactions
- **🌅 Background Removal/Replacement**: Remove or replace image backgrounds
- **🎪 Anime Selfie**: Convert photos to anime style
- **📝 Image Captioning**: Generate descriptive captions for images
- **🎵 Audio Generation**: Create audio content with AI
- **📜 Script Generator**: Generate scripts for videos and podcasts
- **🔮 Future Prediction**: See yourself in future scenarios

## 📦 Installation

```bash
npm install @umituz/react-native-ai-generation-content
```

or

```bash
yarn add @umituz/react-native-ai-generation-content
```

## 🏁 Quick Start

### 1. Configure App Services

```tsx
import { configureAppServices } from '@umituz/react-native-ai-generation-content';

// Configure required services
configureAppServices({
  networkService: {
    baseUrl: 'https://your-api.com',
    apiKey: 'your-api-key',
  },
  creditService: {
    checkCredits: async (userId, cost) => {
      // Check if user has enough credits
      return true;
    },
    deductCredits: async (userId, cost) => {
      // Deduct credits from user
    },
  },
  paywallService: {
    showPaywall: async () => {
      // Show paywall if needed
      return true;
    },
  },
});
```

### 2. Use a Feature Hook

```tsx
import { useTextToImageFeature } from '@umituz/react-native-ai-generation-content';

function TextToImageScreen() {
  const feature = useTextToImageFeature({
    config: {
      model: 'imagen-3',
      onProcessingComplete: (result) => {
        console.log('Image generated:', result.imageUrl);
      },
    },
    userId: 'user-123',
  });

  return (
    <View>
      <TextInput
        placeholder="Describe the image you want..."
        onChangeText={feature.setPrompt}
        value={feature.state.prompt}
      />

      <Button
        title="Generate Image"
        onPress={() => feature.generate()}
        disabled={!feature.isReady}
      />

      {feature.state.isProcessing && (
        <Text>Generating... {feature.state.progress}%</Text>
      )}

      {feature.state.imageUrl && (
        <Image source={{ uri: feature.state.imageUrl }} />
      )}
    </View>
  );
}
```

### 3. Or Use the Unified AI Feature Screen

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

## 📚 Available Features

### Text Generation
- [Text to Image](./src/features/text-to-image/README.md)
- [Text to Video](./src/features/text-to-video/README.md)
- [Text to Voice](./src/features/text-to-voice/README.md)

### Image Processing
- [Face Swap](./src/features/face-swap/README.md)
- [Photo Restoration](./src/features/photo-restoration/README.md)
- [Upscaling](./src/features/upscaling/README.md)
- [Style Transfer](./src/features/style-transfer/README.md)
- [HD Touch Up](./src/features/hd-touch-up/README.md)
- [Colorization](./src/features/colorization/README.md)
- [Image to Image](./src/features/image-to-image/README.md)

### Background & Object Manipulation
- [Remove Background](./src/features/remove-background/README.md)
- [Replace Background](./src/features/replace-background/README.md)
- [Remove Object](./src/features/remove-object/README.md)
- [Inpainting](./src/features/inpainting/README.md)

### Special Effects
- [AI Hug](./src/features/ai-hug/README.md)
- [AI Kiss](./src/features/ai-kiss/README.md)
- [Anime Selfie](./src/features/anime-selfie/README.md)
- [Meme Generator](./src/features/meme-generator/README.md)
- [Couple Future](./src/features/couple-future/README.md)
- [Future Prediction](./src/features/future-prediction/README.md)
- [Sketch to Image](./src/features/sketch-to-image/README.md)

### Video & Audio
- [Image to Video](./src/features/image-to-video/README.md)
- [Audio Generation](./src/features/audio-generation/README.md)

### Content & Scripting
- [Image Captioning](./src/features/image-captioning/README.md)
- [Script Generator](./src/features/script-generator/README.md)

## 🏗️ Architecture

### Domain-Driven Design

The library follows clean architecture principles with clear separation of concerns:

```
src/
├── domain/              # Core business logic and types
├── infrastructure/      # External services and implementations
├── presentation/        # UI components and hooks
├── domains/             # Domain-specific modules
│   ├── prompts/        # AI prompt management
│   ├── content-moderation/  # Content moderation
│   ├── creations/      # AI-generated content gallery
│   └── face-detection/ # Face detection API
└── features/           # Individual AI features
```

### Core Modules

- **Prompts Domain**: AI prompt management and generation
- **Content Moderation**: Content safety and filtering
- **Creations**: Gallery for managing AI-generated content
- **Face Detection**: Face detection and analysis

## 🎨 UI Components

The library provides ready-to-use components:

```tsx
import {
  GenerationProgressModal,
  DualImagePicker,
  PromptInput,
  ResultDisplay,
  StyleSelector,
  AspectRatioSelector,
  AIGenerationForm,
} from '@umituz/react-native-ai-generation-content';
```

## 🔧 Configuration

### Provider Configuration

```tsx
import { providerRegistry } from '@umituz/react-native-ai-generation-content';

// Register a custom provider
providerRegistry.registerProvider({
  id: 'my-provider',
  name: 'My AI Provider',
  capabilities: {
    textToImage: true,
    textToVideo: false,
    // ...
  },
  execute: async (request) => {
    // Provider-specific implementation
  },
});
```

### Middleware

```tsx
import {
  createCreditCheckMiddleware,
  createHistoryTrackingMiddleware,
} from '@umituz/react-native-ai-generation-content';

// Add credit check middleware
const creditMiddleware = createCreditCheckMiddleware({
  creditCost: 1,
  paywallThreshold: 5,
});

// Add history tracking middleware
const historyMiddleware = createHistoryTrackingMiddleware({
  maxHistorySize: 100,
});
```

## 📖 Examples

### Face Swap

```tsx
import { useFaceSwapFeature } from '@umituz/react-native-ai-generation-content';

const feature = useFaceSwapFeature({
  config: {
    enhanceFace: true,
    matchSkinTone: true,
  },
  onSelectSourceImage: async () => { /* ... */ },
  onSelectTargetImage: async () => { /* ... */ },
  onSaveImage: async (url) => { /* ... */ },
});

await feature.process();
```

### Photo Restoration

```tsx
import { usePhotoRestoreFeature } from '@umituz/react-native-ai-generation-content';

const feature = usePhotoRestoreFeature({
  config: {
    restorationType: 'auto',
  },
  onSelectPhoto: async () => { /* ... */ },
  onSaveResult: async (url) => { /* ... */ },
});

await feature.process();
```

### Text to Video

```tsx
import { useTextToVideoFeature } from '@umituz/react-native-ai-generation-content';

const feature = useTextToVideoFeature({
  config: {
    model: 'veo-3',
  },
  userId: 'user-123',
});

await feature.generate({
  duration: 5,
  aspectRatio: '16:9',
});
```

## 🧪 Testing

```tsx
import { renderHook, waitFor } from '@testing-library/react-native';
import { useTextToImageFeature } from '@umituz/react-native-ai-generation-content';

test('generates image from prompt', async () => {
  const { result } = renderHook(() =>
    useTextToImageFeature({
      config: {},
      userId: 'test-user',
    })
  );

  await act(async () => {
    await result.current.generate({ prompt: 'Test prompt' });
  });

  await waitFor(() => {
    expect(result.current.state.imageUrl).toBeTruthy();
  });
});
```

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📄 License

MIT © [Umit Uz]

## 🔗 Links

- [Documentation](./docs)
- [Examples](./examples)
- [Changelog](./CHANGELOG.md)
- [Report Issues](https://github.com/umituz/react-native-ai-generation-content/issues)

## ⭐ Star Us

If you find this library helpful, please consider giving it a star on GitHub!

---

Made with ❤️ by [Umit Uz]
