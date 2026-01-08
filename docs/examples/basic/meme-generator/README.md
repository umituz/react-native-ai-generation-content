# Meme Generator Example

Complete example of creating memes with AI-generated captions.

## Overview

This example demonstrates how to build a meme generator feature:
- Add AI-generated captions to images
- Multiple meme styles
- Custom text options
- Create shareable memes

## Full Code

```tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {
  useMemeGeneratorFeature,
  GenerationProgressModal,
} from '@umituz/react-native-ai-generation-content';
import { Ionicons } from '@expo/vector-icons';

type MemeStyle = 'classic' | 'modern' | 'minimal' | 'bold';

export default function MemeGeneratorExample() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [customCaption, setCustomCaption] = useState('');
  const [memeStyle, setMemeStyle] = useState<MemeStyle>('classic');
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);

  const feature = useMemeGeneratorFeature({
    config: {
      style: memeStyle,
      textColor: '#FFFFFF',
      strokeColor: '#000000',
      fontSize: 'large',
      onProcessingComplete: (result) => {
        if (result.success && result.captions) {
          setGeneratedCaptions(result.captions);
        }
      },
      onError: (error) => {
        Alert.alert('Error', error);
      },
    },
    userId: 'user-123',
  });

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      quality: 0.9,
    });

    if (result.assets && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
      setGeneratedCaptions([]);
      setCustomCaption('');
    }
  };

  const handleGenerateCaptions = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    await feature.generateCaptions(selectedImage);
  };

  const handleCreateMeme = async (caption: string) => {
    if (!selectedImage || !caption) {
      Alert.alert('Error', 'Please select image and caption');
      return;
    }

    await feature.createMeme(selectedImage, caption);
  };

  const handleSave = async () => {
    if (feature.state.result?.imageUrl) {
      await saveToGallery(feature.state.result.imageUrl);
      Alert.alert('Saved', 'Meme saved to gallery!');
    }
  };

  const MEME_STYLES = [
    {
      id: 'classic' as MemeStyle,
      name: 'Classic',
      icon: '⚡',
      description: 'Impact font meme style',
    },
    {
      id: 'modern' as MemeStyle,
      name: 'Modern',
      icon: '✨',
      description: 'Clean modern look',
    },
    {
      id: 'minimal' as MemeStyle,
      name: 'Minimal',
      icon: '◽',
      description: 'Simple and clean',
    },
    {
      id: 'bold' as MemeStyle,
      name: 'Bold',
      icon: '🔥',
      description: 'Bold statement',
    },
  ];

  const POPULAR_TEMPLATES = [
    'When you finally understand the code',
    'Me explaining to my boss why it works',
    'POV: You fixed a bug but broke everything else',
    'My face when the code runs on the first try',
    'That feeling when you deploy on Friday',
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>😂</Text>
        <Text style={styles.title}>Meme Generator</Text>
        <Text style={styles.subtitle}>
          Create hilarious memes with AI
        </Text>
      </View>

      {/* Image Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Select Image</Text>

        {selectedImage ? (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.previewImage}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.changeButton}
              onPress={handleSelectImage}
            >
              <Ionicons name="refresh" size={18} color="#F59E0B" />
              <Text style={styles.changeButtonText}>Change Image</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={handleSelectImage}>
            <View style={styles.uploadContent}>
              <Ionicons name="image" size={48} color="#F59E0B" />
              <Text style={styles.uploadText}>Choose Image</Text>
              <Text style={styles.uploadSubtext}>
                Select from your gallery
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Meme Style */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Choose Meme Style</Text>
        <View style={styles.stylesGrid}>
          {MEME_STYLES.map((style) => (
            <TouchableOpacity
              key={style.id}
              style={[
                styles.styleCard,
                memeStyle === style.id && styles.styleCardSelected,
              ]}
              onPress={() => setMemeStyle(style.id)}
            >
              <Text style={styles.styleIcon}>{style.icon}</Text>
              <Text
                style={[
                  styles.styleName,
                  memeStyle === style.id && styles.styleNameSelected,
                ]}
              >
                {style.name}
              </Text>
              <Text style={styles.styleDescription}>{style.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Caption Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Add Caption</Text>

        {/* Generate AI Captions */}
        {selectedImage && (
          <TouchableOpacity
            style={[
              styles.generateButton,
              feature.state.isProcessing && styles.generateButtonDisabled,
            ]}
            onPress={handleGenerateCaptions}
            disabled={feature.state.isProcessing}
          >
            {feature.state.isProcessing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="sparkles" size={20} color="#fff" />
                <Text style={styles.generateButtonText}>Generate AI Captions</Text>
              </>
            )}
          </TouchableOpacity>
        )}

        {/* Generated Captions */}
        {generatedCaptions.length > 0 && (
          <View style={styles.captionsContainer}>
            <Text style={styles.captionsTitle}>AI Generated Captions</Text>
            {generatedCaptions.map((caption, index) => (
              <TouchableOpacity
                key={index}
                style={styles.captionCard}
                onPress={() => setCustomCaption(caption)}
              >
                <Text style={styles.captionText}>{caption}</Text>
                <Ionicons name="chevron-forward" size={20} color="#F59E0B" />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Popular Templates */}
        <View style={styles.templatesContainer}>
          <Text style={styles.templatesTitle}>Popular Templates</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.templatesScroll}
          >
            {POPULAR_TEMPLATES.map((template, index) => (
              <TouchableOpacity
                key={index}
                style={styles.templateCard}
                onPress={() => setCustomCaption(template)}
              >
                <Text style={styles.templateText}>{template}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Custom Caption */}
        <View style={styles.customCaptionContainer}>
          <Text style={styles.customCaptionLabel}>Or Write Your Own</Text>
          <TextInput
            style={styles.customCaptionInput}
            placeholder="Enter your caption..."
            placeholderTextColor="#9CA3AF"
            value={customCaption}
            onChangeText={setCustomCaption}
            maxLength={100}
          />
          <Text style={styles.charCount}>{customCaption.length}/100</Text>
        </View>
      </View>

      {/* Preview */}
      {selectedImage && customCaption && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Preview</Text>
          <View style={styles.previewContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.memePreview}
              resizeMode="cover"
            />
            <View style={[styles.captionOverlay, { captionStyle: memeStyle }]}>
              <Text style={styles.previewCaption}>{customCaption}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Create Meme Button */}
      {selectedImage && customCaption && (
        <TouchableOpacity
          style={[
            styles.createButton,
            (!feature.isReady || feature.state.isProcessing) &&
              styles.createButtonDisabled,
          ]}
          onPress={() => handleCreateMeme(customCaption)}
          disabled={!feature.isReady || feature.state.isProcessing}
        >
          {feature.state.isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.createButtonText}>Create Meme</Text>
              <Text style={styles.createButtonSubtext}>
                {memeStyle} style
              </Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {/* Progress Modal */}
      <GenerationProgressModal
        visible={feature.state.isProcessing}
        progress={feature.state.progress}
        status="Creating your meme..."
      />

      {/* Result */}
      {feature.state.result?.imageUrl && (
        <View style={styles.section}>
          <View style={styles.resultHeader}>
            <Ionicons name="checkmark-circle" size={32} color="#10B981" />
            <Text style={styles.resultTitle}>Your Meme!</Text>
          </View>

          <Image
            source={{ uri: feature.state.result.imageUrl }}
            style={styles.resultImage}
            resizeMode="contain"
          />

          {/* Actions */}
          <View style={styles.resultActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSave}
            >
              <Ionicons name="download" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => shareImage(feature.state.result?.imageUrl)}
            >
              <Ionicons name="share-social" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.newButton]}
              onPress={() => {
                setSelectedImage(null);
                setCustomCaption('');
                setGeneratedCaptions([]);
                feature.reset();
              }}
            >
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>New Meme</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

// Helper functions
async function saveToGallery(imageUrl: string): Promise<void> {
  const { CameraRoll } = await import('react-native');
  // Download and save
}

async function shareImage(imageUrl?: string): Promise<void> {
  if (!imageUrl) return;
  const { Share } = await import('react-native');
  await Share.share({
    message: 'Check out this meme I made! 😂',
    url: imageUrl,
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#FEF3C7',
    textAlign: 'center',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#111827',
  },
  imageContainer: {
    alignItems: 'center',
  },
  previewImage: {
    width: 250,
    height: 250,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    marginBottom: 15,
  },
  changeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  changeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
  },
  uploadButton: {
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
  },
  uploadContent: {
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 12,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  stylesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  styleCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 6,
  },
  styleCardSelected: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
  },
  styleIcon: {
    fontSize: 24,
  },
  styleName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  styleNameSelected: {
    color: '#D97706',
  },
  styleDescription: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  generateButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 15,
  },
  generateButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  generateButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  captionsContainer: {
    gap: 10,
    marginBottom: 15,
  },
  captionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 10,
  },
  captionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 10,
  },
  captionText: {
    flex: 1,
    fontSize: 13,
    color: '#374151',
  },
  templatesContainer: {
    marginBottom: 15,
  },
  templatesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 10,
  },
  templatesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  templateCard: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 16,
    marginRight: 10,
  },
  templateText: {
    fontSize: 12,
    color: '#374151',
  },
  customCaptionContainer: {
    gap: 8,
  },
  customCaptionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  customCaptionInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'right',
  },
  previewContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  memePreview: {
    width: '100%',
    height: 300,
  },
  captionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  previewCaption: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  createButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    paddingVertical: 18,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  createButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  createButtonSubtext: {
    fontSize: 14,
    color: '#FEF3C7',
    marginTop: 4,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 15,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  resultImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    marginBottom: 15,
  },
  resultActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#F59E0B',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 6,
  },
  newButton: {
    backgroundColor: '#10B981',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});
```

## Features Demonstrated

1. **Image Selection** - Choose photos for memes
2. **AI Caption Generation** - Generate funny captions
3. **Popular Templates** - Pre-written meme templates
4. **Custom Captions** - Write your own text
5. **Meme Styles** - Classic, modern, minimal, bold
6. **Preview** - See meme before creating
7. **Save & Share** - Share on social media

## Usage

1. Select an image for your meme
2. Choose meme style (classic/modern/minimal/bold)
3. Add caption:
   - Generate AI captions
   - Use popular templates
   - Write your own
4. Preview your meme
5. Tap "Create Meme"
6. Save or share

## Meme Styles

### Classic
- Impact font style
- Bold white text
- Black stroke
- Traditional meme look

### Modern
- Clean typography
- Sans-serif fonts
- Minimal borders
- Contemporary feel

### Minimal
- Simple text
- No background
- Clean layout
- Focus on image

### Bold
- Large text
- High contrast
- Statement style
- Attention-grabbing

## Best Practices

1. **Clear Images**: High-quality, uncluttered photos
2. **Short Captions**: Concise, punchy text
3. **Good Contrast**: Text should be readable
4. **Relatable Content**: Humor that resonates
5. **Timing**: Current events and trends

## Caption Tips

- Keep it short (under 100 characters)
- Use current internet slang
- Reference popular culture
- Make it relatable
- Test different captions

## Use Cases

- **Social Media**: Viral content
- **Marketing**: Engaging posts
- **Entertainment**: Fun with friends
- **Branding**: Memorable content
- **Personal Expression**: Creative outlet

## Related Examples

- [Text to Image](../text-to-image/)
- [Face Swap](../face-swap/)
- [Anime Selfie](../anime-selfie/)

---

Last updated: 2025-01-08
