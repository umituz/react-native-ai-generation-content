# Building Your First AI Feature

A complete step-by-step tutorial for creating your first AI-powered feature.

## Overview

In this tutorial, you'll learn how to build a complete text-to-image generation feature from scratch. By the end, you'll have a working AI image generator in your React Native app.

## What You'll Build

- ✅ Text-to-image generation screen
- ✅ Style and aspect ratio selectors
- ✅ Progress tracking with modal
- ✅ Result display with save/share
- ✅ Error handling
- ✅ Loading states

## Prerequisites

- React Native development environment set up
- Node.js and npm/yarn installed
- Basic React and React Native knowledge
- API key for AI service (get one at [example.com](https://example.com))

## Step 1: Installation

First, install the package:

```bash
npm install @umituz/react-native-ai-generation-content
# or
yarn add @umituz/react-native-ai-generation-content
```

Install required peer dependencies:

```bash
npm install react react-native expo-file-system expo-image-manipulator
```

## Step 2: Basic Setup

Create a new file `AIGeneratorScreen.tsx`:

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTextToImageFeature } from '@umituz/react-native-ai-generation-content';

export default function AIGeneratorScreen() {
  const feature = useTextToImageFeature({
    config: {
      model: 'imagen-3',
    },
    userId: 'user-123', // Replace with actual user ID
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Image Generator</Text>
      <Text style={styles.status}>
        {feature.state.isProcessing ? 'Processing...' : 'Ready'}
      </Text>
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
  },
  status: {
    fontSize: 16,
    color: '#666',
  },
});
```

## Step 3: Add Prompt Input

Add a text input for the prompt:

```tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function AIGeneratorScreen() {
  const [prompt, setPrompt] = useState('');

  const feature = useTextToImageFeature({
    config: {
      model: 'imagen-3',
    },
    userId: 'user-123',
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt');
      return;
    }

    try {
      await feature.generate({ prompt });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Image Generator</Text>

      <TextInput
        style={styles.input}
        placeholder="Describe the image you want to create..."
        value={prompt}
        onChangeText={setPrompt}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity
        style={[styles.button, !feature.isReady && styles.buttonDisabled]}
        onPress={handleGenerate}
        disabled={!feature.isReady}
      >
        <Text style={styles.buttonText}>
          {feature.state.isProcessing ? 'Generating...' : 'Generate Image'}
        </Text>
      </TouchableOpacity>

      {feature.state.result?.imageUrl && (
        <Image
          source={{ uri: feature.state.result.imageUrl }}
          style={styles.resultImage}
          resizeMode="contain"
        />
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
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#6366F1',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultImage: {
    width: '100%',
    height: 300,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
});
```

## Step 4: Add Style Selector

Add style selection options:

```tsx
const STYLES = [
  { id: 'realistic', name: 'Realistic' },
  { id: 'artistic', name: 'Artistic' },
  { id: 'anime', name: 'Anime' },
  { id: '3d', name: '3D Render' },
];

export default function AIGeneratorScreen() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');

  // ... previous code

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt');
      return;
    }

    try {
      await feature.generate({
        prompt,
        style: selectedStyle,
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* ... previous UI ... */}

      {/* Style Selector */}
      <Text style={styles.sectionTitle}>Style</Text>
      <View style={styles.stylesContainer}>
        {STYLES.map((style) => (
          <TouchableOpacity
            key={style.id}
            style={[
              styles.styleCard,
              selectedStyle === style.id && styles.styleCardSelected,
            ]}
            onPress={() => setSelectedStyle(style.id)}
          >
            <Text
              style={[
                styles.styleText,
                selectedStyle === style.id && styles.styleTextSelected,
              ]}
            >
              {style.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ... rest of UI ... */}
    </View>
  );
}

const styles = StyleSheet.create({
  // ... previous styles ...
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  stylesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  styleCard: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  styleCardSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  styleText: {
    fontSize: 14,
    color: '#666',
  },
  styleTextSelected: {
    color: '#6366F1',
    fontWeight: 'bold',
  },
});
```

## Step 5: Add Progress Modal

Add a modal to show generation progress:

```tsx
import { Modal, ActivityIndicator } from 'react-native';

export default function AIGeneratorScreen() {
  // ... previous code

  return (
    <View style={styles.container}>
      {/* ... previous UI ... */}

      {/* Progress Modal */}
      <Modal
        visible={feature.state.isProcessing}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#6366F1" />
            <Text style={styles.modalTitle}>Generating...</Text>
            <Text style={styles.modalProgress}>
              {feature.state.progress}%
            </Text>
            <Text style={styles.modalMessage}>
              Creating your masterpiece
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... previous styles ...
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  modalProgress: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6366F1',
    marginTop: 10,
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
});
```

## Step 6: Add Error Handling

Implement proper error handling:

```tsx
export default function AIGeneratorScreen() {
  // ... previous code

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt');
      return;
    }

    try {
      await feature.generate({
        prompt,
        style: selectedStyle,
      });

      if (feature.state.error) {
        Alert.alert('Error', feature.state.error);
      }
    } catch (error) {
      Alert.alert(
        'Generation Failed',
        error.message || 'An error occurred while generating the image'
      );
    }
  };

  // ... rest of code
}
```

## Step 7: Add Save and Share

Add functionality to save and share generated images:

```tsx
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

export default function AIGeneratorScreen() {
  // ... previous code

  const handleSave = async () => {
    if (!feature.state.result?.imageUrl) return;

    try {
      const downloadResult = await FileSystem.downloadAsync(
        feature.state.result.imageUrl,
        FileSystem.documentDirectory() + 'ai_image.jpg'
      );

      if (downloadResult.status === 200) {
        const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
        Alert.alert('Success', 'Image saved to gallery!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save image');
    }
  };

  const handleShare = async () => {
    if (!feature.state.result?.imageUrl) return;

    try {
      await Sharing.shareAsync(feature.state.result.imageUrl);
    } catch (error) {
      Alert.alert('Error', 'Failed to share image');
    }
  };

  return (
    <View style={styles.container}>
      {/* ... previous UI ... */}

      {feature.state.result?.imageUrl && (
        <View style={styles.resultActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleSave}
          >
            <Text style={styles.actionButtonText}>💾 Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleShare}
          >
            <Text style={styles.actionButtonText}>📤 Share</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // ... previous styles ...
  resultActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#6366F1',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
```

## Step 8: Complete Code

Here's the complete, production-ready code:

```tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTextToImageFeature } from '@umituz/react-native-ai-generation-content';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

const STYLES = [
  { id: 'realistic', name: 'Realistic' },
  { id: 'artistic', name: 'Artistic' },
  { id: 'anime', name: 'Anime' },
  { id: '3d', name: '3D Render' },
];

export default function AIGeneratorScreen() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');

  const feature = useTextToImageFeature({
    config: {
      model: 'imagen-3',
    },
    userId: 'user-123',
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt');
      return;
    }

    try {
      await feature.generate({ prompt, style: selectedStyle });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSave = async () => {
    if (!feature.state.result?.imageUrl) return;

    try {
      const downloadResult = await FileSystem.downloadAsync(
        feature.state.result.imageUrl,
        FileSystem.documentDirectory() + 'ai_image.jpg'
      );

      if (downloadResult.status === 200) {
        await MediaLibrary.createAssetAsync(downloadResult.uri);
        Alert.alert('Success', 'Image saved!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save');
    }
  };

  const handleShare = async () => {
    if (!feature.state.result?.imageUrl) return;

    try {
      await Sharing.shareAsync(feature.state.result.imageUrl);
    } catch (error) {
      Alert.alert('Error', 'Failed to share');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI Image Generator</Text>

      <TextInput
        style={styles.input}
        placeholder="Describe your image..."
        value={prompt}
        onChangeText={setPrompt}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.sectionTitle}>Style</Text>
      <View style={styles.stylesContainer}>
        {STYLES.map((style) => (
          <TouchableOpacity
            key={style.id}
            style={[
              styles.styleCard,
              selectedStyle === style.id && styles.styleCardSelected,
            ]}
            onPress={() => setSelectedStyle(style.id)}
          >
            <Text
              style={[
                styles.styleText,
                selectedStyle === style.id && styles.styleTextSelected,
              ]}
            >
              {style.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, !feature.isReady && styles.buttonDisabled]}
        onPress={handleGenerate}
        disabled={!feature.isReady}
      >
        <Text style={styles.buttonText}>
          {feature.state.isProcessing ? 'Generating...' : 'Generate Image'}
        </Text>
      </TouchableOpacity>

      {feature.state.result?.imageUrl && (
        <>
          <Image
            source={{ uri: feature.state.result.imageUrl }}
            style={styles.resultImage}
            resizeMode="contain"
          />
          <View style={styles.resultActions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
              <Text style={styles.actionButtonText}>💾 Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Text style={styles.actionButtonText}>📤 Share</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Modal visible={feature.state.isProcessing} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#6366F1" />
            <Text style={styles.modalTitle}>Generating...</Text>
            <Text style={styles.modalProgress}>{feature.state.progress}%</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stylesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  styleCard: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  styleCardSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  styleText: {
    fontSize: 14,
    color: '#666',
  },
  styleTextSelected: {
    color: '#6366F1',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultImage: {
    width: '100%',
    height: 300,
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  },
  resultActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#6366F1',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  modalProgress: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6366F1',
    marginTop: 10,
  },
});
```

## Next Steps

### Customization

- **Add more styles**: Extend the style options
- **Add aspect ratio**: Allow users to select image dimensions
- **Add presets**: Create preset prompt templates
- **Add history**: Save recent generations

### Advanced Features

- **Batch generation**: Generate multiple images at once
- **Image editing**: Edit generated images
- **Favorites**: Save favorite generations
- **Social sharing**: Share directly to social platforms

## Complete Examples

For more complete examples, check out:
- [Text to Image Example](../examples/basic/text-to-image/)
- [Custom UI Example](../examples/advanced/custom-ui/)
- [Multiple Features](../examples/advanced/multiple-features/)

## Troubleshooting

### Common Issues

**Issue**: Generation fails immediately
- **Solution**: Check your API key and internet connection

**Issue**: Images take too long to generate
- **Solution**: Try shorter prompts or different style

**Issue**: Low quality results
- **Solution**: Use more descriptive, detailed prompts

## Conclusion

Congratulations! You've built your first AI-powered feature. You now have:

✅ Working text-to-image generation
✅ Style selection
✅ Progress tracking
✅ Error handling
✅ Save and share functionality

You can now customize and expand this feature to fit your needs!

## Related Tutorials

- [Building Custom UI](./building-custom-ui.md)
- [Handling Results](./handling-results.md)
- [Error Handling](./error-handling.md)

---

Last updated: 2025-01-08
