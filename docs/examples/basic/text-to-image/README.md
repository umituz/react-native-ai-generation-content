# Text to Image Example

Complete example of text-to-image generation feature.

## Overview

This example demonstrates how to build a complete text-to-image generation screen with:
- Custom UI
- Style selection
- Aspect ratio selection
- Progress tracking
- Result display

## Full Code

```tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  useTextToImageFeature,
  StyleSelector,
  AspectRatioSelector,
  ExamplePrompts,
  GenerationProgressContent,
  ResultImageCard,
} from '@umituz/react-native-ai-generation-content';

const STYLES = [
  { id: 'realistic', name: 'Realistic', preview: 'https://example.com/realistic.jpg' },
  { id: 'artistic', name: 'Artistic', preview: 'https://example.com/artistic.jpg' },
  { id: 'anime', name: 'Anime', preview: 'https://example.com/anime.jpg' },
  { id: '3d', name: '3D Render', preview: 'https://example.com/3d.jpg' },
];

const ASPECT_RATIOS = [
  { id: '1:1', name: '1:1', description: 'Square' },
  { id: '16:9', name: '16:9', description: 'Landscape' },
  { id: '9:16', name: '9:16', description: 'Portrait' },
];

const EXAMPLE_PROMPTS = [
  'A beautiful sunset over mountains',
  'Futuristic city at night',
  'Enchanted forest with glowing mushrooms',
  'Cozy coffee shop interior',
];

export default function TextToImageExample() {
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('16:9');

  const feature = useTextToImageFeature({
    config: {
      model: 'imagen-3',
      onProcessingComplete: (result) => {
        if (result.success) {
          Alert.alert('Success', 'Image generated successfully!');
        }
      },
      onError: (error) => {
        Alert.alert('Error', error);
      },
    },
    userId: 'user-123',
  });

  const handleGenerate = async () => {
    if (!feature.state.prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt');
      return;
    }

    await feature.generate({
      style: selectedStyle,
      aspectRatio: selectedAspectRatio,
    });
  };

  const handleSave = async () => {
    if (feature.state.result?.imageUrl) {
      Alert.alert('Saved', 'Image saved to gallery!');
    }
  };

  const handleShare = async () => {
    if (feature.state.result?.imageUrl) {
      Alert.alert('Share', 'Share functionality coming soon!');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AI Image Generator</Text>
        <Text style={styles.subtitle}>
          Create stunning images from text descriptions
        </Text>
      </View>

      {/* Style Selector */}
      <View style={styles.section}>
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
              <Text style={[
                styles.styleName,
                selectedStyle === style.id && styles.styleNameSelected,
              ]}>
                {style.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Aspect Ratio Selector */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aspect Ratio</Text>
        <View style={styles.aspectRatiosContainer}>
          {ASPECT_RATIOS.map((ratio) => (
            <TouchableOpacity
              key={ratio.id}
              style={[
                styles.ratioCard,
                selectedAspectRatio === ratio.id && styles.ratioCardSelected,
              ]}
              onPress={() => setSelectedAspectRatio(ratio.id)}
            >
              <Text style={[
                styles.ratioName,
                selectedAspectRatio === ratio.id && styles.ratioNameSelected,
              ]}>
                {ratio.name}
              </Text>
              <Text style={styles.ratioDescription}>{ratio.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Prompt Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Prompt</Text>
        <TextInput
          style={styles.promptInput}
          placeholder="Describe the image you want to create..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
          onChangeText={feature.setPrompt}
          value={feature.state.prompt}
        />
        <Text style={styles.charCount}>
          {feature.state.prompt.length}/1000
        </Text>
      </View>

      {/* Example Prompts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Examples</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {EXAMPLE_PROMPTS.map((prompt, index) => (
            <TouchableOpacity
              key={index}
              style={styles.exampleCard}
              onPress={() => feature.setPrompt(prompt)}
            >
              <Text style={styles.exampleText}>{prompt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Generate Button */}
      <TouchableOpacity
        style={[
          styles.generateButton,
          !feature.isReady && styles.generateButtonDisabled,
        ]}
        onPress={handleGenerate}
        disabled={!feature.isReady || feature.state.isProcessing}
      >
        {feature.state.isProcessing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.generateButtonText}>Generate Image</Text>
        )}
      </TouchableOpacity>

      {/* Progress */}
      {feature.state.isProcessing && (
        <View style={styles.progressSection}>
          <Text style={styles.progressText}>
            Generating... {feature.state.progress}%
          </Text>
          <ActivityIndicator size="large" color="#6366F1" />
        </View>
      )}

      {/* Result */}
      {feature.state.result?.imageUrl && (
        <View style={styles.resultSection}>
          <Text style={styles.sectionTitle}>Result</Text>
          <Image
            source={{ uri: feature.state.result.imageUrl }}
            style={styles.resultImage}
            resizeMode="contain"
          />
          <View style={styles.resultActions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
              <Text style={styles.actionButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Error */}
      {feature.state.error && (
        <View style={styles.errorSection}>
          <Text style={styles.errorText}>{feature.state.error}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#6366F1',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#E0E7FF',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: #F3F4F6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#111827',
  },
  stylesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  styleCard: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  styleCardSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  styleName: {
    fontSize: 14,
    color: '#374151',
  },
  styleNameSelected: {
    color: '#4F46E5',
    fontWeight: '600',
  },
  aspectRatiosContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  ratioCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  ratioCardSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  ratioName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  ratioNameSelected: {
    color: '#4F46E5',
  },
  ratioDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  promptInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    minHeight: 100,
  },
  charCount: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
    marginTop: 5,
  },
  exampleCard: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  exampleText: {
    fontSize: 14,
    color: '#374151',
  },
  generateButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  generateButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  generateButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  progressSection: {
    padding: 20,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 10,
  },
  resultSection: {
    padding: 20,
  },
  resultImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  resultActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#6366F1',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  errorSection: {
    padding: 20,
    backgroundColor: '#FEE2E2',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
  },
});
```

## Features Demonstrated

1. **Style Selection** - Choose from predefined styles
2. **Aspect Ratio** - Select image dimensions
3. **Prompt Input** - Text input with character count
4. **Example Prompts** - Quick-fill from examples
5. **Progress Tracking** - Real-time progress display
6. **Result Display** - Show generated image
7. **Actions** - Save and share functionality
8. **Error Handling** - Graceful error display

## Usage

Copy the code into your project and run:

```bash
npm run ios
# or
npm run android
```

## Customization

### Custom Styles

Replace `STYLES` with your own:

```tsx
const STYLES = [
  { id: 'my-style', name: 'My Style', preview: 'https://...' },
];
```

### Custom Aspect Ratios

Replace `ASPECT_RATIOS` with your own:

```tsx
const ASPECT_RATIOS = [
  { id: '4:3', name: '4:3', description: 'Standard' },
];
```

### Custom Example Prompts

Replace `EXAMPLE_PROMPTS` with your own:

```tsx
const EXAMPLE_PROMPTS = [
  'Your custom prompt 1',
  'Your custom prompt 2',
];
```

## Next Steps

- [Full Documentation](../../README.md)
- [Feature Docs](../../src/features/text-to-image/README.md)
- [More Examples](../)

---

Last updated: 2025-01-08
