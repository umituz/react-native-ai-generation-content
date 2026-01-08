# Anime Selfie Example

Complete example of converting photos into anime-style artwork.

## Overview

This example demonstrates how to build an anime selfie feature:
- Convert photos to anime style
- Multiple anime art styles
- Portrait and full-body options
- Create unique avatar artwork

## Full Code

```tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {
  useAnimeSelfieFeature,
  GenerationProgressModal,
} from '@umituz/react-native-ai-generation-content';
import { Ionicons } from '@expo/vector-icons';

type AnimeStyle = 'classic' | 'modern' | 'chibi' | 'realistic';

export default function AnimeSelfieExample() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [animeStyle, setAnimeStyle] = useState<AnimeStyle>('modern');
  const [comparisonMode, setComparisonMode] = useState(false);

  const feature = useAnimeSelfieFeature({
    config: {
      style: animeStyle,
      enhanceDetails: true,
      backgroundStyle: 'original',
      onProcessingComplete: (result) => {
        if (result.success) {
          Alert.alert('Success', 'Anime selfie created!');
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
    }
  };

  const handleConvert = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select a photo first');
      return;
    }

    await feature.convert(selectedImage);
  };

  const handleSave = async () => {
    if (feature.state.result?.imageUrl) {
      await saveToGallery(feature.state.result.imageUrl);
      Alert.alert('Saved', 'Anime artwork saved to gallery!');
    }
  };

  const ANIME_STYLES = [
    {
      id: 'classic' as AnimeStyle,
      name: 'Classic',
      icon: '🎌',
      description: 'Traditional anime style',
      color: '#F59E0B',
    },
    {
      id: 'modern' as AnimeStyle,
      name: 'Modern',
      icon: '✨',
      description: 'Contemporary look',
      color: '#6366F1',
    },
    {
      id: 'chibi' as AnimeStyle,
      name: 'Chibi',
      icon: '🌸',
      description: 'Cute and small',
      color: '#EC4899',
    },
    {
      id: 'realistic' as AnimeStyle,
      name: 'Realistic',
      icon: '🎨',
      description: 'Anime realism',
      color: '#10B981',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🎨</Text>
        <Text style={styles.title}>Anime Selfie</Text>
        <Text style={styles.subtitle}>
          Transform your photos into anime artwork
        </Text>
      </View>

      {/* Image Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Photo</Text>

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
              <Ionicons name="camera-reverse" size={18} color="#6366F1" />
              <Text style={styles.changeButtonText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={handleSelectImage}>
            <View style={styles.uploadContent}>
              <Ionicons name="image" size={48} color="#6366F1" />
              <Text style={styles.uploadText}>Choose Photo</Text>
              <Text style={styles.uploadSubtext}>
                Select from your gallery
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Anime Style Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Anime Style</Text>
        <View style={styles.stylesGrid}>
          {ANIME_STYLES.map((style) => (
            <TouchableOpacity
              key={style.id}
              style={[
                styles.styleCard,
                { borderColor: animeStyle === style.id ? style.color : '#E5E7EB' },
                animeStyle === style.id && { backgroundColor: `${style.color}10` },
              ]}
              onPress={() => setAnimeStyle(style.id)}
            >
              <View style={[styles.styleIconContainer, { backgroundColor: style.color }]}>
                <Text style={styles.styleIcon}>{style.icon}</Text>
              </View>
              <Text
                style={[
                  styles.styleName,
                  { color: animeStyle === style.id ? style.color : '#374151' },
                ]}
              >
                {style.name}
              </Text>
              <Text style={styles.styleDescription}>{style.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Style Preview */}
      {selectedImage && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Style Preview</Text>
          <View style={styles.previewContainer}>
            <View style={styles.previewItem}>
              <Text style={styles.previewLabel}>Your Style</Text>
              <View style={[styles.previewBox, { borderColor: '#6366F1' }]}>
                <Text style={styles.previewEmoji}>👤</Text>
                <Text style={styles.previewText}>Original Photo</Text>
              </View>
            </View>
            <Ionicons name="arrow-forward" size={24} color="#9CA3AF" />
            <View style={styles.previewItem}>
              <Text style={styles.previewLabel}>Result</Text>
              <View
                style={[
                  styles.previewBox,
                  { borderColor: ANIME_STYLES.find((s) => s.id === animeStyle)?.color },
                ]}
              >
                <Text style={styles.previewEmoji}>✨</Text>
                <Text style={styles.previewText}>Anime Style</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tips for Best Results</Text>
        <View style={styles.tipsContainer}>
          {[
            { icon: '☀️', text: 'Use well-lit photos for better conversion' },
            { icon: '👤', text: 'Clear facial features work best' },
            { icon: '📷', text: 'High resolution images produce better details' },
            { icon: '😊', text: 'Front-facing photos recommended' },
          ].map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipEmoji}>{tip.icon}</Text>
              <Text style={styles.tipText}>{tip.text}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Convert Button */}
      <TouchableOpacity
        style={[
          styles.convertButton,
          (!feature.isReady || feature.state.isProcessing) &&
            styles.convertButtonDisabled,
        ]}
        onPress={handleConvert}
        disabled={!feature.isReady || feature.state.isProcessing}
      >
        {feature.state.isProcessing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text style={styles.convertButtonText}>Transform to Anime</Text>
            <Text style={styles.convertButtonSubtext}>
              {ANIME_STYLES.find((s) => s.id === animeStyle)?.name} style
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* Progress Modal */}
      <GenerationProgressModal
        visible={feature.state.isProcessing}
        progress={feature.state.progress}
        status="Creating your anime artwork..."
      />

      {/* Result */}
      {feature.state.result?.imageUrl && (
        <View style={styles.section}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultEmoji}>🎉</Text>
            <Text style={styles.resultTitle}>Your Anime Artwork!</Text>
          </View>

          {/* Comparison Toggle */}
          <TouchableOpacity
            style={styles.comparisonToggle}
            onPress={() => setComparisonMode(!comparisonMode)}
          >
            <Ionicons
              name={comparisonMode ? 'eye-off' : 'eye'}
              size={20}
              color="#6366F1"
            />
            <Text style={styles.comparisonToggleText}>
              {comparisonMode ? 'Hide Comparison' : 'Show Comparison'}
            </Text>
          </TouchableOpacity>

          {/* Result Display */}
          <View style={styles.resultDisplay}>
            {comparisonMode && selectedImage && (
              <View style={styles.comparisonView}>
                <Text style={styles.comparisonLabel}>Original</Text>
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.resultImage}
                  resizeMode="cover"
                />
              </View>
            )}
            <View style={styles.comparisonView}>
              <Text style={styles.comparisonLabel}>Anime Version</Text>
              <Image
                source={{ uri: feature.state.result.imageUrl }}
                style={styles.resultImage}
                resizeMode="cover"
              />
            </View>
          </View>

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
                feature.reset();
              }}
            >
              <Ionicons name="refresh" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>New</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

// Helper functions
async function saveToGallery(imageUrl: string): Promise<void> {
  // Implement save to gallery logic
  const { CameraRoll } = await import('react-native');
  // Download and save
}

async function shareImage(imageUrl?: string): Promise<void> {
  if (!imageUrl) return;
  const { Share } = await import('react-native');
  await Share.share({
    message: 'Check out my anime selfie! 🎨',
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
    backgroundColor: '#8B5CF6',
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
    color: '#EDE9FE',
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
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    marginBottom: 15,
  },
  changeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  changeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  },
  uploadButton: {
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 16,
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
    gap: 12,
  },
  styleCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    gap: 8,
  },
  styleIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  styleIcon: {
    fontSize: 24,
  },
  styleName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  styleDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  previewItem: {
    flex: 1,
    alignItems: 'center',
  },
  previewLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  previewBox: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  previewEmoji: {
    fontSize: 32,
  },
  previewText: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  tipsContainer: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tipEmoji: {
    fontSize: 20,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  convertButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 18,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  convertButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  convertButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  convertButtonSubtext: {
    fontSize: 14,
    color: '#EDE9FE',
    marginTop: 4,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 15,
  },
  resultEmoji: {
    fontSize: 32,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  comparisonToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  comparisonToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  },
  resultDisplay: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  comparisonView: {
    flex: 1,
  },
  comparisonLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  resultImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  resultActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#8B5CF6',
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

1. **Photo Selection** - Choose photos from gallery
2. **Anime Styles** - Classic, modern, chibi, realistic options
3. **Style Preview** - See what the transformation will look like
4. **Before/After** - Compare original and anime versions
5. **Progress Tracking** - Real-time conversion progress
6. **Save & Share** - Save and share anime artwork

## Usage

1. Select a photo to transform
2. Choose anime style (classic/modern/chibi/realistic)
3. Tap "Transform to Anime"
4. Wait for AI processing
5. Compare before/after
6. Save or share your anime artwork

## Anime Styles

### Classic
- Traditional anime appearance
- Bold lines and vibrant colors
- Perfect for manga fans

### Modern
- Contemporary anime style
- Softer features and details
- Great for social media

### Chibi
- Cute and small proportions
- Large eyes and head
- Adorable character style

### Realistic
- Anime with realistic details
- Balanced proportions
- Natural-looking results

## Best Practices

1. **Clear Faces**: Well-lit, visible facial features
2. **Front-Facing**: Forward-facing photos work best
3. **High Quality**: Higher resolution = better details
4. **Simple Backgrounds**: Clean backgrounds focus on subject
5. **Single Person**: One person per photo for best results

## Use Cases

- **Avatars**: Create unique anime avatars
- **Social Media**: Eye-catching profile pictures
- **Art Projects**: Anime-style artwork
- **Fun**: Transform friends and family
- **Creative Content**: Stand out online

## Related Examples

- [Text to Image](../text-to-image/)
- [Style Transfer](../)
- [Photo Restoration](../photo-restoration/)

---

Last updated: 2025-01-08
