# Quick Start Guide

Get started with `@umituz/react-native-ai-generation-content` in 5 minutes.

## 🚀 Quick Setup

### 1. Install

```bash
npm install @umituz/react-native-ai-generation-content
```

### 2. Configure

```tsx
// App.tsx
import { configureAppServices } from '@umituz/react-native-ai-generation-content';
import { AIFeatureScreen } from '@umituz/react-native-ai-generation-content';

export default function App() {
  useEffect(() => {
    configureAppServices({
      networkService: {
        baseUrl: 'https://your-api.com',
        apiKey: 'your-api-key',
      },
    });
  }, []);

  return (
    <AIFeatureScreen
      featureId="text-to-image"
      userId="user-123"
    />
  );
}
```

### 3. Run

```bash
npm run ios
# or
npm run android
```

That's it! You now have a working AI image generator. 🎉

## 📝 Your First Generation

### Using the Unified Screen

The simplest way to get started:

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

### Using Hooks

For more control, use hooks directly:

```tsx
import { useTextToImageFeature } from '@umituz/react-native-ai-generation-content';
import { View, Button, Image, Text, TextInput } from 'react-native';

function CustomTextToImageScreen() {
  const feature = useTextToImageFeature({
    config: {
      model: 'imagen-3',
    },
    userId: 'user-123',
  });

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Describe the image..."
        onChangeText={feature.setPrompt}
        value={feature.state.prompt}
        style={{ height: 100, borderWidth: 1, marginBottom: 10 }}
      />

      <Button
        title="Generate"
        onPress={() => feature.generate()}
        disabled={!feature.isReady || feature.state.isProcessing}
      />

      {feature.state.isProcessing && (
        <Text style={{ marginTop: 10 }}>Generating...</Text>
      )}

      {feature.state.result?.imageUrl && (
        <Image
          source={{ uri: feature.state.result.imageUrl }}
          style={{ width: '100%', height: 300, marginTop: 10 }}
        />
      )}
    </View>
  );
}
```

## 🎨 Other Features

### Face Swap

```tsx
<AIFeatureScreen
  featureId="face-swap"
  userId="user-123"
/>
```

### Photo Restoration

```tsx
<AIFeatureScreen
  featureId="photo-restoration"
  userId="user-123"
/>
```

### Text to Video

```tsx
<AIFeatureScreen
  featureId="text-to-video"
  userId="user-123"
/>
```

## 🔐 Required Configuration

### Environment Setup

Create `.env` file:

```env
AI_API_KEY=your_api_key_here
AI_BASE_URL=https://api.example.com
```

Load and configure:

```tsx
import { configureAppServices } from '@umituz/react-native-ai-generation-content';
import ENV from '@env';

configureAppServices({
  networkService: {
    baseUrl: ENV.AI_BASE_URL,
    apiKey: ENV.AI_API_KEY,
  },
  creditService: {
    checkCredits: async (userId, cost) => {
      // Your credit check logic
      return true;
    },
    deductCredits: async (userId, cost) => {
      // Your deduction logic
    },
  },
});
```

## ✨ Next Steps

### Learn More

- [Installation Guide](./installation.md) - Detailed installation
- [Features](../src/features/) - All available features
- [Examples](./examples/) - Code examples
- [Architecture](../ARCHITECTURE.md) - System architecture

### Explore Features

- [Text to Image](../src/features/text-to-image/README.md)
- [Face Swap](../src/features/face-swap/README.md)
- [Photo Restoration](../src/features/photo-restoration/README.md)
- [All 37+ Features](../src/features/)

### Build Your App

1. **Custom UI** - Use hooks to build custom interfaces
2. **Multiple Features** - Combine multiple AI features
3. **Background Processing** - Handle long-running operations
4. **Content Moderation** - Add content filtering
5. **Credit System** - Implement usage tracking

## 🎯 Common Use Cases

### Social Media App

```tsx
function SocialMediaApp() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Generate" component={() => (
        <AIFeatureScreen featureId="text-to-image" userId={userId} />
      )} />
      <Tab.Screen name="Edit" component={() => (
        <AIFeatureScreen featureId="style-transfer" userId={userId} />
      )} />
    </Tab.Navigator>
  );
}
```

### Photo Editor

```tsx
function PhotoEditor() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Restore"
        component={() => (
          <AIFeatureScreen featureId="photo-restoration" userId={userId} />
        )}
      />
      <Stack.Screen
        name="Upscale"
        component={() => (
          <AIFeatureScreen featureId="upscaling" userId={userId} />
        )}
      />
    </Stack.Navigator>
  );
}
```

### Entertainment App

```tsx
function EntertainmentApp() {
  return (
    <AIFeatureScreen
      featureId="face-swap"
      userId={userId}
    />
  );
}
```

## 💡 Tips

1. **Start Simple**: Use `AIFeatureScreen` for quick setup
2. **Add Services**: Configure credit system for production
3. **Handle Errors**: Always handle errors gracefully
4. **Show Progress**: Display progress to users
5. **Test**: Test thoroughly before deployment

## 🆘 Need Help?

- [FAQ](../FAQ.md) - Frequently asked questions
- [Support](../SUPPORT.md) - Get support
- [Issues](https://github.com/umituz/react-native-ai-generation-content/issues) - Report issues

## 📚 More Resources

- [Full Documentation](./README.md)
- [API Reference](./api/)
- [Examples](./examples/)
- [Tutorials](./tutorials/)

---

Ready to build amazing AI-powered apps! 🚀

Last updated: 2025-01-08
