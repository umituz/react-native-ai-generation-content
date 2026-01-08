# Style Transfer Example

Complete example of applying artistic styles to photos using AI.

## Overview

This example demonstrates how to build a style transfer feature that can:
- Apply artistic styles to photos
- Choose from multiple art styles
- Adjust style intensity
- Transform photos into artwork

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
  useStyleTransferFeature,
  GenerationProgressModal,
} from '@umituz/react-native-ai-generation-content';
import { Ionicons } from '@expo/vector-icons';
import { Slider } from '@react-native-community/slider';

type ArtStyle = 'van-gogh' | 'picasso' | 'monet' | 'kandinsky' | 'warhol';

export default function StyleTransferExample() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [artStyle, setArtStyle] = useState<ArtStyle>('van-gogh');
  const [intensity, setIntensity] = useState(75);
  const [comparisonMode, setComparisonMode] = useState(false);

  const feature = useStyleTransferFeature({
    config: {
      style: artStyle,
      intensity: intensity,
      preserveColors: false,
      onProcessingComplete: (result) => {
        if (result.success) {
          Alert.alert('Success', 'Style applied successfully!');
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

  const handleApplyStyle = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    await feature.applyStyle(selectedImage);
  };

  const handleSave = async () => {
    if (feature.state.result?.imageUrl) {
      await saveToGallery(feature.state.result.imageUrl);
      Alert.alert('Saved', 'Artwork saved to gallery!');
    }
  };

  const ART_STYLES = [
    {
      id: 'van-gogh' as ArtStyle,
      name: 'Van Gogh',
      icon: '🎨',
      description: 'Starry night swirls',
      color: '#F59E0B',
    },
    {
      id: 'picasso' as ArtStyle,
      name: 'Picasso',
      icon: '🔷',
      description: 'Cubist geometry',
      color: '#3B82F6',
    },
    {
      id: 'monet' as ArtStyle,
      name: 'Monet',
      icon: '🌸',
      description: 'Impressionist softness',
      color: '#EC4899',
    },
    {
      id: 'kandinsky' as ArtStyle,
      name: 'Kandinsky',
      icon: '🔴',
      description: 'Abstract expression',
      color: '#EF4444',
    },
    {
      id: 'warhol' as ArtStyle,
      name: 'Warhol',
      icon: '🟠',
      description: 'Pop art colors',
      color: '#8B5CF6',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🖼️</Text>
        <Text style={styles.title}>Style Transfer</Text>
        <Text style={styles.subtitle}>
          Transform photos into artistic masterpieces
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
              <Ionicons name="camera-reverse" size={18} color="#8B5CF6" />
              <Text style={styles.changeButtonText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={handleSelectImage}>
            <View style={styles.uploadContent}>
              <Ionicons name="image" size={48} color="#8B5CF6" />
              <Text style={styles.uploadText}>Choose Photo</Text>
              <Text style={styles.uploadSubtext}>
                Select from your gallery
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Art Style Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Art Style</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.stylesScroll}
        >
          {ART_STYLES.map((style) => (
            <TouchableOpacity
              key={style.id}
              style={[
                styles.styleCard,
                artStyle === style.id && {
                  borderColor: style.color,
                  backgroundColor: `${style.color}10`,
                },
              ]}
              onPress={() => setArtStyle(style.id)}
            >
              <View style={[styles.styleIconContainer, { backgroundColor: style.color }]}>
                <Text style={styles.styleIcon}>{style.icon}</Text>
              </View>
              <Text
                style={[
                  styles.styleName,
                  { color: artStyle === style.id ? style.color : '#374151' },
                ]}
              >
                {style.name}
              </Text>
              <Text style={styles.styleDescription}>{style.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Intensity Slider */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Style Intensity</Text>
        <View style={styles.intensityContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={5}
            value={intensity}
            onValueChange={setIntensity}
            minimumTrackTintColor="#8B5CF6"
            maximumTrackTintColor="#E5E7EB"
            thumbTintColor="#8B5CF6"
          />
          <View style={styles.intensityLabels}>
            <Text style={styles.intensityLabel}>Subtle</Text>
            <Text style={styles.intensityValue}>{intensity}%</Text>
            <Text style={styles.intensityLabel}>Strong</Text>
          </View>
        </View>
      </View>

      {/* Style Preview */}
      {selectedImage && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preview</Text>
          <View style={styles.previewContainer}>
            <View style={styles.previewItem}>
              <Text style={styles.previewLabel}>Your Photo</Text>
              <Image
                source={{ uri: selectedImage }}
                style={styles.previewImage}
                resizeMode="cover"
              />
            </View>
            <Ionicons name="arrow-forward" size={24} color="#9CA3AF" />
            <View style={styles.previewItem}>
              <Text style={styles.previewLabel}>
                {ART_STYLES.find((s) => s.id === artStyle)?.name}
              </Text>
              <View style={styles.stylePreviewBox}>
                <Text style={styles.stylePreviewText}>
                  {ART_STYLES.find((s) => s.id === artStyle)?.icon}
                </Text>
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
            { icon: '📷', text: 'High-resolution photos work best' },
            { icon: '🎨', text: 'Try different styles for unique results' },
            { icon: '💡', text: 'Adjust intensity to fine-tune' },
            { icon: '✨', text: 'Portraits and landscapes both work great' },
          ].map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipIcon}>{tip.icon}</Text>
              <Text style={styles.tipText}>{tip.text}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Apply Button */}
      <TouchableOpacity
        style={[
          styles.applyButton,
          (!feature.isReady || feature.state.isProcessing) &&
            styles.applyButtonDisabled,
        ]}
        onPress={handleApplyStyle}
        disabled={!feature.isReady || feature.state.isProcessing}
      >
        {feature.state.isProcessing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text style={styles.applyButtonText}>Apply Art Style</Text>
            <Text style={styles.applyButtonSubtext}>
              {ART_STYLES.find((s) => s.id === artStyle)?.name} • {intensity}%
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* Progress Modal */}
      <GenerationProgressModal
        visible={feature.state.isProcessing}
        progress={feature.state.progress}
        status="Applying artistic style..."
      />

      {/* Result */}
      {feature.state.result?.imageUrl && (
        <View style={styles.section}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultEmoji}>✨</Text>
            <Text style={styles.resultTitle}>Your Artwork!</Text>
          </View>

          {/* Comparison Toggle */}
          <TouchableOpacity
            style={styles.comparisonToggle}
            onPress={() => setComparisonMode(!comparisonMode)}
          >
            <Ionicons
              name={comparisonMode ? 'eye-off' : 'eye'}
              size={20}
              color="#8B5CF6"
            />
            <Text style={styles.comparisonToggleText}>
              {comparisonMode ? 'Hide Original' : 'Show Original'}
            </Text>
          </TouchableOpacity>

          {/* Result Display */}
          <View style={styles.resultDisplay}>
            {comparisonMode && selectedImage && (
              <View style={styles.resultImage}>
                <Text style={styles.resultLabel}>Original</Text>
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            )}
            <View style={styles.resultImage}>
              <Text style={styles.resultLabel}>
                {ART_STYLES.find((s) => s.id === artStyle)?.name}
              </Text>
              <Image
                source={{ uri: feature.state.result.imageUrl }}
                style={styles.image}
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
  const { CameraRoll } = await import('react-native');
  // Download and save
}

async function shareImage(imageUrl?: string): Promise<void> {
  if (!imageUrl) return;
  const { Share } = await import('react-native');
  await Share.share({
    message: 'Check out my AI artwork! 🎨',
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
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  changeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
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
  stylesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  styleCard: {
    width: 140,
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginRight: 12,
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  styleDescription: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  intensityContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  intensityLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  intensityLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  intensityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B5CF6',
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
  },
  stylePreviewBox: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stylePreviewText: {
    fontSize: 40,
  },
  tipsContainer: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tipIcon: {
    fontSize: 20,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  applyButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 18,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  applyButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  applyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  applyButtonSubtext: {
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
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  comparisonToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  resultDisplay: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  resultImage: {
    flex: 1,
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  image: {
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

1. **Art Style Selection** - 5 famous art styles (Van Gogh, Picasso, Monet, Kandinsky, Warhol)
2. **Intensity Control** - Adjust how strongly the style is applied (0-100%)
3. **Before/After** - Compare original and stylized versions
4. **Progress Tracking** - Real-time application progress
5. **Save & Share** - Save and share artwork

## Usage

1. Select a photo to stylize
2. Choose an art style (Van Gogh/Picasso/Monet/Kandinsky/Warhol)
3. Adjust intensity with slider
4. Tap "Apply Art Style"
5. Wait for processing
6. Compare before/after
7. Save or share your artwork

## Art Styles

### Van Gogh
- Starry night swirls
- Bold brushstrokes
- Dramatic colors

### Picasso
- Cubist geometry
- Abstract shapes
- Multiple perspectives

### Monet
- Impressionist softness
- Light and color focus
- Dreamy atmosphere

### Kandinsky
- Abstract expression
- Geometric shapes
- Vibrant colors

### Warhol
- Pop art colors
- Bold contrasts
- Iconic style

## Best Practices

1. **High Resolution**: Use higher quality photos for better results
2. **Good Lighting**: Well-lit photos enhance style application
3. **Clear Subjects**: Distinct subjects work better
4. **Experiment**: Try different styles and intensities
5. **Portraits**: People photos work exceptionally well

## Use Cases

- **Art Creation**: Create unique artwork from photos
- **Social Media**: Eye-catching stylized content
- **Gifts**: Personalized art gifts
- **Creative Projects**: Add artistic flair to projects
- **Fun**: Transform everyday photos into art

## Related Examples

- [Anime Selfie](../anime-selfie/)
- [Photo Restoration](../photo-restoration/)
- [Text to Image](../text-to-image/)

---

Last updated: 2025-01-08
