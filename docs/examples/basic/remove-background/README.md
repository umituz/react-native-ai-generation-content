# Remove Background Example

Complete example of removing backgrounds from images with AI.

## Overview

This example demonstrates how to build a background removal feature that can:
- Remove backgrounds from any image
- Handle complex backgrounds
- Process portraits and objects
- Provide transparent PNG output

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
  useRemoveBackgroundFeature,
  GenerationProgressModal,
} from '@umituz/react-native-ai-generation-content';
import { Ionicons } from '@expo/vector-icons';

export default function RemoveBackgroundExample() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [comparisonMode, setComparisonMode] = useState(false);

  const feature = useRemoveBackgroundFeature({
    config: {
      outputFormat: 'png',
      edgeSmoothing: true,
      onProcessingComplete: (result) => {
        if (result.success) {
          Alert.alert('Success', 'Background removed successfully!');
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

  const handleRemoveBackground = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    await feature.removeBackground(selectedImage);
  };

  const handleSave = async () => {
    if (feature.state.result?.imageUrl) {
      await saveToGallery(feature.state.result.imageUrl);
      Alert.alert('Saved', 'Image saved to gallery!');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Background Remover</Text>
        <Text style={styles.subtitle}>
          Remove backgrounds from any image
        </Text>
      </View>

      {/* Image Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Image</Text>

        {selectedImage ? (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.previewImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.changeButton}
              onPress={handleSelectImage}
            >
              <Text style={styles.changeButtonText}>Change Image</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={handleSelectImage}>
            <View style={styles.uploadContent}>
              <Text style={styles.uploadIcon}>🖼️</Text>
              <Text style={styles.uploadText}>Choose Image</Text>
              <Text style={styles.uploadSubtext}>
                Select from your gallery
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Tips Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tips for Best Results</Text>
        <View style={styles.tipsContainer}>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>✓</Text>
            <Text style={styles.tipText}>
              Use images with clear subject separation
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>✓</Text>
            <Text style={styles.tipText}>
              Good lighting improves accuracy
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>✓</Text>
            <Text style={styles.tipText}>
              Portraits and objects work best
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>✓</Text>
            <Text style={styles.tipText}>
              Avoid complex backgrounds when possible
            </Text>
          </View>
        </View>
      </View>

      {/* Features Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🎯</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Smart Detection</Text>
              <Text style={styles.featureDescription}>
                AI accurately identifies subjects
              </Text>
            </View>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔧</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Edge Smoothing</Text>
              <Text style={styles.featureDescription}>
                Clean, professional edges
              </Text>
            </View>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>💾</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Transparent Output</Text>
              <Text style={styles.featureDescription}>
                PNG format with transparency
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Remove Background Button */}
      <TouchableOpacity
        style={[
          styles.processButton,
          (!feature.isReady || feature.state.isProcessing) &&
            styles.processButtonDisabled,
        ]}
        onPress={handleRemoveBackground}
        disabled={!feature.isReady || feature.state.isProcessing}
      >
        {feature.state.isProcessing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text style={styles.processButtonText}>Remove Background</Text>
            <Text style={styles.processButtonSubtext}>
              AI-powered removal
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* Progress Modal */}
      <GenerationProgressModal
        visible={feature.state.isProcessing}
        progress={feature.state.progress}
        status="Removing background..."
      />

      {/* Result */}
      {feature.state.result?.imageUrl && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Result</Text>

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
              {comparisonMode ? 'Hide Original' : 'Show Original'}
            </Text>
          </TouchableOpacity>

          {/* Before/After View */}
          <View style={styles.comparisonContainer}>
            {comparisonMode && selectedImage && (
              <View style={styles.comparisonImage}>
                <Text style={styles.comparisonLabel}>Before</Text>
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.comparisonImageSize}
                  resizeMode="contain"
                />
              </View>
            )}
            <View style={styles.comparisonImage}>
              <Text style={styles.comparisonLabel}>After</Text>
              <Image
                source={{ uri: feature.state.result.imageUrl }}
                style={styles.comparisonImageSize}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Result Actions */}
          <View style={styles.resultActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSave}
            >
              <Text style={styles.actionButtonText}>💾 Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => shareImage(feature.state.result?.imageUrl)}
            >
              <Text style={styles.actionButtonText}>📤 Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.newButton]}
              onPress={() => {
                setSelectedImage(null);
                feature.reset();
              }}
            >
              <Text style={styles.actionButtonText}>🔄 New Image</Text>
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
    message: 'Check out this image with removed background!',
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
    backgroundColor: '#EF4444',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#FEE2E2',
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
    color: '#EF4444',
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
    fontWeight: 'bold',
    color: '#10B981',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
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
  processButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 18,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  processButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  processButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  processButtonSubtext: {
    fontSize: 14,
    color: '#FEE2E2',
    marginTop: 4,
  },
  comparisonToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  comparisonToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  },
  comparisonContainer: {
    gap: 15,
  },
  comparisonImage: {
    width: '100%',
  },
  comparisonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  comparisonImageSize: {
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
    backgroundColor: '#EF4444',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
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

1. **Image Selection** - Pick images from gallery
2. **Background Removal** - AI-powered background removal
3. **Before/After Comparison** - Compare original and processed images
4. **Edge Smoothing** - Clean, professional edges
5. **Transparent Output** - PNG format with transparency
6. **Save & Share** - Save and share results

## Usage

1. Select an image with a background to remove
2. Tap "Remove Background"
3. Wait for AI processing
4. Compare before/after
5. Save or share the result

## Best Practices

1. **Subject Separation**: Clear separation between subject and background
2. **Good Lighting**: Well-lit images produce better results
3. **Simple Backgrounds**: Complex backgrounds may require manual touch-ups
4. **High Quality**: Use higher quality images for better edge detection
5. **Portraits**: People and objects work best

## Use Cases

- **Product Photography**: Remove backgrounds for e-commerce
- **Profile Pictures**: Create clean profile photos
- **Design Work**: Prepare images for graphic design
- **Presentations**: Create clean visuals
- **Social Media**: Eye-catching content

## Related Examples

- [Photo Restoration](../photo-restoration/)
- [Face Swap](../face-swap/)
- [Style Transfer](../../)

---

Last updated: 2025-01-08
