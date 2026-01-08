# Code Examples

Practical code examples for `@umituz/react-native-ai-generation-content`.

## 📂 Example Structure

```
examples/
├── README.md (this file)
├── basic/              # Simple examples
│   ├── text-to-image/
│   ├── face-swap/
│   ├── photo-restoration/
│   └── upscaling/
├── advanced/           # Advanced usage
│   ├── custom-ui/
│   ├── multiple-features/
│   ├── error-handling/
│   ├── background-processing/
│   └── performance-optimization/
├── integrations/       # Integrations
│   ├── navigation/
│   └── state-management/
└── full-apps/          # Complete apps
    └── social-media/
```

## 🚀 Quick Start Examples

### Basic Text to Image

```tsx
import { useTextToImageFeature } from '@umituz/react-native-ai-generation-content';

function BasicExample() {
  const feature = useTextToImageFeature({
    config: {},
    userId: 'user-123',
  });

  return (
    <>
      <TextInput
        onChangeText={feature.setPrompt}
        value={feature.state.prompt}
        placeholder="Describe your image..."
      />
      <Button
        onPress={() => feature.generate()}
        title="Generate"
      />
      {feature.state.result?.imageUrl && (
        <Image source={{ uri: feature.state.result.imageUrl }} />
      )}
    </>
  );
}
```

### Face Swap

```tsx
import { useFaceSwapFeature } from '@umituz/react-native-ai-generation-content';

function FaceSwapExample() {
  const feature = useFaceSwapFeature({
    config: {},
    onSelectSourceImage: async () => {
      // Your image selection logic
      return selectedImageBase64;
    },
    onSelectTargetImage: async () => {
      // Your image selection logic
      return selectedImageBase64;
    },
    onSaveImage: async (imageUrl) => {
      // Your save logic
    },
  });

  return (
    <>
      <DualImagePicker
        sourceImage={feature.state.sourceImage}
        targetImage={feature.state.targetImage}
        onSelectSource={feature.selectSourceImage}
        onSelectTarget={feature.selectTargetImage}
      />
      <Button onPress={feature.process} title="Swap Faces" />
      {feature.state.result?.imageUrl && (
        <Image source={{ uri: feature.state.result.imageUrl }} />
      )}
    </>
  );
}
```

## 📚 More Examples

### Basic Examples

See [basic/](./basic/) directory for:
- **[Text to Image](./basic/text-to-image/)** - Generate images from text with style selection
- **[Face Swap](./basic/face-swap/)** - Swap faces between two photos with dual image picker
- **[Photo Restoration](./basic/photo-restoration/)** - Restore old and damaged photos with quality levels
- **[Upscaling](./basic/upscaling/)** - Enhance image resolution with scale factors
- **[Remove Background](./basic/remove-background/)** - Remove image backgrounds with AI
- **[AI Hug](./basic/ai-hug/)** - Generate AI hug videos from two photos
- **[AI Kiss](./basic/ai-kiss/)** - Create romantic kiss videos
- **[Text to Video](./basic/text-to-video/)** - Generate videos from text descriptions
- **[Anime Selfie](./basic/anime-selfie/)** - Transform photos into anime artwork
- **[Style Transfer](./basic/style-transfer/)** - Apply artistic styles to photos
- **[Sketch to Image](./basic/sketch-to-image/)** - Convert sketches to realistic images
- **[Image to Video](./basic/image-to-video/)** - Animate static photos into videos

### Advanced Examples

See [advanced/](./advanced/) directory for:
- **[Custom UI](./advanced/custom-ui/)** - Build completely custom UI with animations and dark mode
- **[Multiple Features](./advanced/multiple-features/)** - Integrate multiple AI features in one app
- **[Error Handling](./advanced/error-handling/)** - Comprehensive error handling patterns with retry logic
- **[Background Processing](./advanced/background-processing/)** - Run AI tasks in background with notifications
- **[Performance Optimization](./advanced/performance-optimization/)** - Optimize for performance with caching and memoization

### Integration Examples

See [integrations/](./integrations/) directory for:
- **[Navigation](./integrations/navigation/)** - React Navigation integration with stack, tab, and drawer navigators
- **[State Management](./integrations/state-management/)** - Redux, MobX, and Zustand integration examples

### Full App Examples

See [full-apps/](./full-apps/) directory for:
- **[Social Media App](./full-apps/social-media/)** - Complete social media app with AI features, feed, profiles, and more

## 🎯 By Feature

### Text Generation

- [Text to Image](./basic/text-to-image/)
- [Text to Video](./basic/text-to-video/)
- [Text to Voice](./basic/text-to-voice/)

### Image Processing

- [Face Swap](./basic/face-swap/)
- [Photo Restoration](./basic/photo-restoration/)
- [Upscaling](./basic/upscaling/)
- [Style Transfer](./basic/style-transfer/)

### Special Effects

- [AI Hug](./basic/ai-hug/)
- [AI Kiss](./basic/ai-kiss/)
- [Anime Selfie](./basic/anime-selfie/)

## 💡 Tips

1. **Start Simple**: Begin with basic examples
2. **Experiment**: Modify and experiment
3. **Read Docs**: Check feature documentation
4. **Ask Questions**: Join Discord for help
5. **Share**: Share your creations

## 🤝 Contributing

Have an example to share?

1. Fork the repository
2. Add your example
3. Submit a PR

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for details.

## 📖 Learn More

- [Documentation](../README.md)
- [Tutorials](../tutorials/)
- [API Reference](./api/)

---

Last updated: 2025-01-08
