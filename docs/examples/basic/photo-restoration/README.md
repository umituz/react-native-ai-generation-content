# Photo Restoration Example

Complete example of restoring old or damaged photos with AI.

## Overview

This example demonstrates how to build a photo restoration feature that can:
- Restore old and damaged photos
- Remove scratches and tears
- Enhance faded colors
- Fix blurry images

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
  usePhotoRestorationFeature,
  GenerationProgressModal,
  ResultImageCard,
} from '@umituz/react-native-ai-generation-content';

type RestorationLevel = 'basic' | 'standard' | 'premium';

export default function PhotoRestorationExample() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [restorationLevel, setRestorationLevel] = useState<RestorationLevel>('standard');

  const feature = usePhotoRestorationFeature({
    config: {
      restorationLevel: restorationLevel,
      enhanceColors: true,
      removeScratches: true,
      fixBlur: true,
      onProcessingComplete: (result) => {
        if (result.success) {
          Alert.alert('Success', 'Photo restored successfully!');
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
      quality: 0.8,
    });

    if (result.assets && result.assets[0]) {
      const base64 = await convertToBase64(result.assets[0].uri);
      setSelectedImage(base64);
    }
  };

  const handleRestore = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    await feature.restore(selectedImage);
  };

  const handleSave = async () => {
    if (feature.state.result?.imageUrl) {
      await saveToGallery(feature.state.result.imageUrl);
      Alert.alert('Saved', 'Restored photo saved to gallery!');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AI Photo Restoration</Text>
        <Text style={styles.subtitle}>
          Bring your old photos back to life
        </Text>
      </View>

      {/* Before/After Preview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Photo</Text>

        {selectedImage ? (
          <View style={styles.imagePreviewContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.previewImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.changeButton}
              onPress={handleSelectImage}
            >
              <Text style={styles.changeButtonText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={handleSelectImage}>
            <View style={styles.uploadContent}>
              <Text style={styles.uploadIcon}>📷</Text>
              <Text style={styles.uploadText}>Select Photo to Restore</Text>
              <Text style={styles.uploadSubtext}>
                Choose from your gallery
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Restoration Level */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Restoration Level</Text>
        <View style={styles.levelContainer}>
          {(['basic', 'standard', 'premium'] as RestorationLevel[]).map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.levelCard,
                restorationLevel === level && styles.levelCardSelected,
              ]}
              onPress={() => setRestorationLevel(level)}
            >
              <Text
                style={[
                  styles.levelName,
                  restorationLevel === level && styles.levelNameSelected,
                ]}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
              <Text style={styles.levelDescription}>
                {getLevelDescription(level)}
              </Text>
              <Text style={styles.levelTime}>
                {getLevelTime(level)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Features Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What Gets Fixed</Text>
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✨</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Scratches & Tears</Text>
              <Text style={styles.featureDescription}>
                Removes physical damage
              </Text>
            </View>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🎨</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Faded Colors</Text>
              <Text style={styles.featureDescription}>
                Enhances and restores colors
              </Text>
            </View>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔍</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Blur & Focus</Text>
              <Text style={styles.featureDescription}>
                Sharpens and clarifies
              </Text>
            </View>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>👁️</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Facial Details</Text>
              <Text style={styles.featureDescription}>
                Restores facial features
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Restore Button */}
      <TouchableOpacity
        style={[
          styles.restoreButton,
          (!feature.isReady || feature.state.isProcessing) &&
            styles.restoreButtonDisabled,
        ]}
        onPress={handleRestore}
        disabled={!feature.isReady || feature.state.isProcessing}
      >
        {feature.state.isProcessing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text style={styles.restoreButtonText}>Restore Photo</Text>
            <Text style={styles.restoreButtonSubtext}>
              with {restorationLevel} quality
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* Progress Modal */}
      <GenerationProgressModal
        visible={feature.state.isProcessing}
        progress={feature.state.progress}
        status="Restoring your photo..."
        onCancel={() => {
          // Handle cancel if needed
        }}
      />

      {/* Result */}
      {feature.state.result?.imageUrl && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Restored Photo</Text>

          <View style={styles.resultContainer}>
            <Image
              source={{ uri: feature.state.result.imageUrl }}
              style={styles.resultImage}
              resizeMode="contain"
            />

            <View style={styles.resultActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleSave}
              >
                <Text style={styles.actionButtonText}>💾 Save to Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => shareImage(feature.state.result?.imageUrl)}
              >
                <Text style={styles.actionButtonText}>📤 Share</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.newPhotoButton}
              onPress={() => {
                setSelectedImage(null);
                feature.reset();
              }}
            >
              <Text style={styles.newPhotoButtonText}>Restore Another Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

// Helper functions
function getLevelDescription(level: RestorationLevel): string {
  switch (level) {
    case 'basic':
      return 'Quick fixes for minor issues';
    case 'standard':
      return 'Comprehensive restoration';
    case 'premium':
      return 'Maximum quality restoration';
  }
}

function getLevelTime(level: RestorationLevel): string {
  switch (level) {
    case 'basic':
      return '~30 seconds';
    case 'standard':
      return '~1 minute';
    case 'premium':
      return '~2 minutes';
  }
}

async function convertToBase64(uri: string): Promise<string> {
  const response = await fetch(uri);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function saveToGallery(imageUrl: string): Promise<void> {
  // Implement save to gallery logic
  const { CameraRoll } = await import('react-native');
  // Download and save
}

async function shareImage(imageUrl?: string): Promise<void> {
  if (!imageUrl) return;
  const { Share } = await import('react-native');
  await Share.share({
    message: 'Check out this restored photo!',
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
    backgroundColor: '#10B981',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#D1FAE5',
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
  imagePreviewContainer: {
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    marginBottom: 15,
  },
  changeButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  changeButtonText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '600',
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
  uploadIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 5,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  levelContainer: {
    gap: 10,
  },
  levelCard: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 15,
  },
  levelCardSelected: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  levelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 5,
  },
  levelNameSelected: {
    color: '#059669',
  },
  levelDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 5,
  },
  levelTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  featuresList: {
    gap: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 13,
    color: '#6B7280',
  },
  restoreButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 18,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  restoreButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  restoreButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  restoreButtonSubtext: {
    fontSize: 14,
    color: '#D1FAE5',
    marginTop: 4,
  },
  resultContainer: {
    alignItems: 'center',
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
    width: '100%',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  newPhotoButton: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#10B981',
    borderRadius: 8,
  },
  newPhotoButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
});
```

## Features Demonstrated

1. **Image Selection** - Pick photos from gallery
2. **Restoration Levels** - Choose quality level (basic/standard/premium)
3. **Feature Preview** - See what gets fixed
4. **Progress Tracking** - Real-time restoration progress
5. **Before/After** - Compare original and restored
6. **Save & Share** - Save restored photos

## Usage

1. Select an old or damaged photo
2. Choose restoration level
3. Tap "Restore Photo"
4. Wait for processing
5. View and save result

## Restoration Levels

### Basic
- Quick fixes for minor issues
- Best for slightly faded photos
- Processing time: ~30 seconds

### Standard
- Comprehensive restoration
- Good balance of quality and speed
- Processing time: ~1 minute

### Premium
- Maximum quality restoration
- Best for heavily damaged photos
- Processing time: ~2 minutes

## Best Practices

1. **Image Quality**: Higher quality originals produce better results
2. **Lighting**: Well-lit photos restore better
3. **Resolution**: Use highest resolution available
4. **Multiple Attempts**: Try different levels for different results
5. **Patience**: Higher quality levels take longer

## Related Examples

- [Upscaling](../upscaling/)
- [Face Swap](../face-swap/)
- [Custom UI](../../advanced/custom-ui/)

---

Last updated: 2025-01-08
