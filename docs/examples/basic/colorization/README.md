# Colorization Example

Complete example of colorizing black and white photos with AI.

## Overview

This example demonstrates how to build a photo colorization feature:
- Convert black and white photos to color
- Smart color detection
- Multiple colorization options
- Restore vintage photos

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
  useColorizationFeature,
  GenerationProgressModal,
} from '@umituz/react-native-ai-generation-content';
import { Ionicons } from '@expo/vector-icons';

type ColorizationMode = 'automatic' | 'vintage' | 'vivid' | 'natural';

export default function ColorizationExample() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [colorizationMode, setColorizationMode] = useState<ColorizationMode>('automatic');
  const [saturation, setSaturation] = useState(50);
  const [comparisonMode, setComparisonMode] = useState(false);

  const feature = useColorizationFeature({
    config: {
      mode: colorizationMode,
      saturation: saturation,
      enhanceDetails: true,
      preserveTexture: true,
      onProcessingComplete: (result) => {
        if (result.success) {
          Alert.alert('Success', 'Photo colorized successfully!');
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

  const handleColorize = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    await feature.colorize(selectedImage);
  };

  const handleSave = async () => {
    if (feature.state.result?.imageUrl) {
      await saveToGallery(feature.state.result.imageUrl);
      Alert.alert('Saved', 'Colorized photo saved to gallery!');
    }
  };

  const MODES = [
    {
      id: 'automatic' as ColorizationMode,
      name: 'Automatic',
      icon: '🎯',
      description: 'AI determines colors',
    },
    {
      id: 'vintage' as ColorizationMode,
      name: 'Vintage',
      icon: '📷',
      description: 'Classic photo colors',
    },
    {
      id: 'vivid' as ColorizationMode,
      name: 'Vivid',
      icon: '🌈',
      description: 'Bold vibrant colors',
    },
    {
      id: 'natural' as ColorizationMode,
      name: 'Natural',
      icon: '🍃',
      description: 'Realistic tones',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🎨</Text>
        <Text style={styles.title}>Photo Colorization</Text>
        <Text style={styles.subtitle}>
          Bring black and white photos to life
        </Text>
      </View>

      {/* Image Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Black & White Photo</Text>

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
              <Ionicons name="refresh" size={18} color="#8B5CF6" />
              <Text style={styles.changeButtonText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={handleSelectImage}>
            <View style={styles.uploadContent}>
              <Ionicons name="image" size={48} color="#8B5CF6" />
              <Text style={styles.uploadText}>Choose Photo</Text>
              <Text style={styles.uploadSubtext}>
                Black and white photos work best
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Colorization Mode */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Colorization Mode</Text>
        <View style={styles.modesGrid}>
          {MODES.map((mode) => (
            <TouchableOpacity
              key={mode.id}
              style={[
                styles.modeCard,
                colorizationMode === mode.id && styles.modeCardSelected,
              ]}
              onPress={() => setColorizationMode(mode.id)}
            >
              <Text style={styles.modeIcon}>{mode.icon}</Text>
              <Text
                style={[
                  styles.modeName,
                  colorizationMode === mode.id && styles.modeNameSelected,
                ]}
              >
                {mode.name}
              </Text>
              <Text style={styles.modeDescription}>{mode.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Saturation Control */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color Saturation</Text>
        <View style={styles.saturationContainer}>
          <View style={styles.saturationLabels}>
            <Text style={styles.saturationLabel}>Subtle</Text>
            <Text style={styles.saturationValue}>{saturation}%</Text>
            <Text style={styles.saturationLabel}>Vivid</Text>
          </View>
          <View style={styles.saturationButtons}>
            {[25, 50, 75, 100].map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.saturationButton,
                  saturation === value && styles.saturationButtonSelected,
                ]}
                onPress={() => setSaturation(value)}
              >
                <Text
                  style={[
                    styles.saturationButtonText,
                    saturation === value && styles.saturationButtonTextSelected,
                  ]}
                >
                  {value}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featuresContainer}>
          {[
            { icon: '🤖', title: 'AI Color Detection', text: 'Smart color analysis' },
            { icon: '🎨', title: 'Natural Colors', text: 'Realistic tones' },
            { icon: '✨', title: 'Detail Enhancement', text: 'Sharpen details' },
            { icon: '🖼️', title: 'Texture Preservation', text: 'Maintains photo quality' },
          ].map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureText}>{feature.text}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tips for Best Results</Text>
        <View style={styles.tipsContainer}>
          {[
            { icon: '📷', text: 'Clear, well-focused black and white photos' },
            { icon: '🌟', text: 'High resolution images work better' },
            { icon: '🎯', text: 'Good contrast helps color accuracy' },
            { icon: '✅', text: 'Vintage photos colorize beautifully' },
          ].map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipIcon}>{tip.icon}</Text>
              <Text style={styles.tipText}>{tip.text}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Colorize Button */}
      <TouchableOpacity
        style={[
          styles.colorizeButton,
          (!feature.isReady || feature.state.isProcessing) &&
            styles.colorizeButtonDisabled,
        ]}
        onPress={handleColorize}
        disabled={!feature.isReady || feature.state.isProcessing}
      >
        {feature.state.isProcessing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="color-palette" size={24} color="#fff" />
            <Text style={styles.colorizeButtonText}>Colorize Photo</Text>
            <Text style={styles.colorizeButtonSubtext}>
              {MODES.find((m) => m.id === colorizationMode)?.name} mode
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* Progress Modal */}
      <GenerationProgressModal
        visible={feature.state.isProcessing}
        progress={feature.state.progress}
        status="Colorizing your photo..."
      />

      {/* Result */}
      {feature.state.result?.imageUrl && (
        <View style={styles.section}>
          <View style={styles.resultHeader}>
            <Ionicons name="sparkles" size={32} color="#8B5CF6" />
            <Text style={styles.resultTitle}>Your Colorized Photo!</Text>
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

          {/* Comparison View */}
          <View style={styles.comparisonContainer}>
            {comparisonMode && selectedImage && (
              <View style={styles.comparisonImage}>
                <Text style={styles.comparisonLabel}>Black & White</Text>
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            )}
            <View style={styles.comparisonImage}>
              <Text style={styles.comparisonLabel}>Colorized</Text>
              <Image
                source={{ uri: feature.state.result.imageUrl }}
                style={styles.image}
                resizeMode="contain"
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
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>New Photo</Text>
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
    message: 'Check out this colorized photo! 🎨',
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
    borderRadius: 12,
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
  modesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  modeCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 6,
  },
  modeCardSelected: {
    backgroundColor: '#EDE9FE',
    borderColor: '#8B5CF6',
  },
  modeIcon: {
    fontSize: 24,
  },
  modeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  modeNameSelected: {
    color: '#7C3AED',
  },
  modeDescription: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  saturationContainer: {
    gap: 12,
  },
  saturationLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  saturationLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  saturationValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  saturationButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  saturationButton: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  saturationButtonSelected: {
    backgroundColor: '#EDE9FE',
    borderColor: '#8B5CF6',
  },
  saturationButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  saturationButtonTextSelected: {
    color: '#7C3AED',
  },
  featuresContainer: {
    gap: 12,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  featureText: {
    fontSize: 12,
    color: '#6B7280',
  },
  tipsContainer: {
    gap: 10,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tipIcon: {
    fontSize: 18,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#374151',
  },
  colorizeButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 18,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    gap: 8,
  },
  colorizeButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  colorizeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  colorizeButtonSubtext: {
    fontSize: 14,
    color: '#EDE9FE',
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
  comparisonContainer: {
    gap: 12,
    marginBottom: 15,
  },
  comparisonImage: {
    flex: 1,
  },
  comparisonLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
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

1. **B&W to Color** - Convert black and white to color
2. **Multiple Modes** - Automatic, vintage, vivid, natural
3. **Saturation Control** - Adjust color intensity
4. **Before/After** - Compare original and colorized
5. **Smart Detection** - AI color analysis
6. **Detail Enhancement** - Sharpens and enhances

## Usage

1. Select a black and white photo
2. Choose colorization mode
3. Adjust saturation level
4. Tap "Colorize Photo"
5. Compare before/after
6. Save or share result

## Colorization Modes

### Automatic
- AI determines best colors
- Balanced and realistic
- Most versatile option

### Vintage
- Classic photo look
- Warm tones
- Nostalgic feel

### Vivid
- Bold vibrant colors
- High saturation
- Eye-catching results

### Natural
- Realistic tones
- True-to-life colors
- Subtle enhancement

## Best Practices

1. **B&W Photos**: Use genuine black and white images
2. **Good Quality**: Higher resolution = better color
3. **Clear Details**: Sharp details help AI
4. **Simple Scenes**: Easier to colorize accurately
5. **Good Lighting**: Well-lit photos work best

## Use Cases

- **Restore**: Colorize vintage family photos
- **Art**: Add color to artistic B&W photos
- **Nostalgia**: Bring memories to life
- **Creative**: Transform B&W to color
- **Preservation**: Make old photos accessible

## Related Examples

- [Photo Restoration](../photo-restoration/)
- [Upscaling](../upscaling/)
- [Style Transfer](../style-transfer/)

---

Last updated: 2025-01-08
