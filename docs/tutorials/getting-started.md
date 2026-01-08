# Getting Started Tutorial

Your first AI generation with `@umituz/react-native-ai-generation-content`.

## What You'll Build

A simple app that generates images from text descriptions.

## Prerequisites

- React Native development environment
- Node.js 18+
- API key from an AI provider

## Steps

### 1. Create a New React Native App

```bash
npx react-native init MyAIApp
cd MyAIApp
```

### 2. Install the Library

```bash
npm install @umituz/react-native-ai-generation-content
```

### 3. Configure App Services

Create `src/config/services.ts`:

```tsx
import { configureAppServices } from '@umituz/react-native-ai-generation-content';

export const configureServices = () => {
  configureAppServices({
    networkService: {
      baseUrl: 'https://your-api.com',
      apiKey: 'your-api-key',
    },
  });
};
```

### 4. Create Generation Screen

Create `src/screens/GenerateScreen.tsx`:

```tsx
import React from 'react';
import { View, Text, TextInput, Button, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { useTextToImageFeature } from '@umituz/react-native-ai-generation-content';

export default function GenerateScreen() {
  const feature = useTextToImageFeature({
    config: {},
    userId: 'user-123',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Image Generator</Text>

      <TextInput
        style={styles.input}
        placeholder="Describe the image..."
        onChangeText={feature.setPrompt}
        value={feature.state.prompt}
        placeholderTextColor="#999"
      />

      <Button
        title="Generate Image"
        onPress={() => feature.generate()}
        disabled={!feature.isReady || feature.state.isProcessing}
      />

      {feature.state.isProcessing && (
        <View style={styles.progressContainer}>
          <ActivityIndicator size="large" color="#0000FF" />
          <Text style={styles.progressText}>Generating...</Text>
        </View>
      )}

      {feature.state.result?.imageUrl && (
        <Image
          source={{ uri: feature.state.result.imageUrl }}
          style={styles.resultImage}
        />
      )}

      {feature.state.error && (
        <Text style={styles.errorText}>{feature.state.error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  progressContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
  },
  resultImage: {
    width: '100%',
    height: 300,
    marginTop: 20,
    resizeMode: 'contain',
  },
  errorText: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
});
```

### 5. Update App.tsx

```tsx
import React, { useEffect } from 'react';
import { configureServices } from './src/config/services';
import GenerateScreen from './src/screens/GenerateScreen';

export default function App() {
  useEffect(() => {
    configureServices();
  }, []);

  return <GenerateScreen />;
}
```

### 6. Run Your App

```bash
npm run ios
# or
npm run android
```

## What's Next

### Try Different Prompts

- "A beautiful sunset over mountains"
- "A futuristic city at night"
- "A serene forest with glowing mushrooms"

### Explore Features

- [Text to Image](../../src/features/text-to-image/README.md) - Learn more
- [Face Swap](../../src/features/face-swap/README.md) - Try face swap
- [All Features](../../src/features/) - Explore all features

### Advanced

- [Custom Configuration](../custom-config.md) - Configure options
- [Building a UI](../building-ui.md) - Build custom UI
- [Error Handling](../error-handling.md) - Handle errors

## Troubleshooting

### "Network service not configured"

Make sure you called `configureAppServices()`:

```tsx
useEffect(() => {
  configureAppServices();
}, []);
```

### Generation Fails

Check your API key and network connection.

## Success! 🎉

You've built your first AI generation app!

---

Next: [Building a UI](../building-ui.md)
