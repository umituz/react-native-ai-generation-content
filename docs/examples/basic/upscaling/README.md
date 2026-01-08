# Upscaling Example

Complete example of upscaling and enhancing image resolution with AI.

## Overview

This example demonstrates how to build an image upscaling feature that can:
- Increase image resolution (2x, 4x)
- Enhance image details
- Remove noise and artifacts
- Maintain quality during enlargement

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
  useUpscalingFeature,
  GenerationProgressModal,
} from '@umituz/react-native-ai-generation-content';

type UpscaleFactor = '2x' | '4x';
type EnhancementMode = 'standard' | 'denoise' | 'detail';

export default function UpscalingExample() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [upscaleFactor, setUpscaleFactor] = useState<UpscaleFactor>('2x');
  const [enhancementMode, setEnhancementMode] = useState<EnhancementMode>('standard');

  const feature = useUpscalingFeature({
    config: {
      scaleFactor: upscaleFactor,
      enhancementMode: enhancementMode,
      onProcessingComplete: (result) => {
        if (result.success) {
          Alert.alert('Success', `Image upscaled ${upscaleFactor} successfully!`);
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
      quality: 1.0,
    });

    if (result.assets && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleUpscale = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    await feature.upscale(selectedImage);
  };

  const getImageInfo = () => {
    if (!feature.state.result) return null;

    const { originalWidth, originalHeight, newWidth, newHeight } = feature.state.result;

    return (
      <View style={styles.imageInfo}>
        <Text style={styles.infoTitle}>Image Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Original Size:</Text>
          <Text style={styles.infoValue}>
            {originalWidth} × {originalHeight}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Upscaled Size:</Text>
          <Text style={styles.infoValue}>
            {newWidth} × {newHeight}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Scale Factor:</Text>
          <Text style={styles.infoValue}>{upscaleFactor}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AI Image Upscaler</Text>
        <Text style={styles.subtitle}>
          Enhance image quality and resolution
        </Text>
      </View>

      {/* Image Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Image</Text>

        {selectedImage ? (
          <View style={styles.imagePreviewContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.previewImage}
              resizeMode="contain"
            />
            <View style={styles.imageActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleSelectImage}
              >
                <Text style={styles.actionButtonText}>Change Image</Text>
              </TouchableOpacity>
            </View>
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

      {/* Upscale Factor */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upscale Factor</Text>
        <View style={styles.factorContainer}>
          {(['2x', '4x'] as UpscaleFactor[]).map((factor) => (
            <TouchableOpacity
              key={factor}
              style={[
                styles.factorCard,
                upscaleFactor === factor && styles.factorCardSelected,
              ]}
              onPress={() => setUpscaleFactor(factor)}
            >
              <Text
                style={[
                  styles.factorValue,
                  upscaleFactor === factor && styles.factorValueSelected,
                ]}
              >
                {factor}
              </Text>
              <Text style={styles.factorDescription}>
                {factor === '2x' ? 'Double resolution' : 'Quadruple resolution'}
              </Text>
              <Text style={styles.factorExample}>
                Example: 1000×1000 → {factor === '2x' ? '2000×2000' : '4000×4000'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Enhancement Mode */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Enhancement Mode</Text>
        <View style={styles.modeContainer}>
          {(['standard', 'denoise', 'detail'] as EnhancementMode[]).map((mode) => (
            <TouchableOpacity
              key={mode}
              style={[
                styles.modeCard,
                enhancementMode === mode && styles.modeCardSelected,
              ]}
              onPress={() => setEnhancementMode(mode)}
            >
              <Text
                style={[
                  styles.modeName,
                  enhancementMode === mode && styles.modeNameSelected,
                ]}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Text>
              <Text style={styles.modeDescription}>
                {getModeDescription(mode)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            AI upscaling uses machine learning to intelligently increase image
            resolution while maintaining or improving quality. Unlike traditional
            upscaling, AI can add realistic details and remove artifacts.
          </Text>
        </View>
      </View>

      {/* Upscale Button */}
      <TouchableOpacity
        style={[
          styles.upscaleButton,
          (!feature.isReady || feature.state.isProcessing) &&
            styles.upscaleButtonDisabled,
        ]}
        onPress={handleUpscale}
        disabled={!feature.isReady || feature.state.isProcessing}
      >
        {feature.state.isProcessing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text style={styles.upscaleButtonText}>Upscale Image</Text>
            <Text style={styles.upscaleButtonSubtext}>
              {upscaleFactor} with {enhancementMode} enhancement
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* Progress Modal */}
      <GenerationProgressModal
        visible={feature.state.isProcessing}
        progress={feature.state.progress}
        status={`Upscaling image ${upscaleFactor}...`}
      />

      {/* Result */}
      {feature.state.result?.imageUrl && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upscaled Image</Text>

          {getImageInfo()}

          <Image
            source={{ uri: feature.state.result.imageUrl }}
            style={styles.resultImage}
            resizeMode="contain"
          />

          <View style={styles.resultActions}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => feature.saveResult()}
            >
              <Text style={styles.saveButtonText}>💾 Save to Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => shareImage(feature.state.result?.imageUrl)}
            >
              <Text style={styles.shareButtonText}>📤 Share</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.newImageButton}
            onPress={() => {
              setSelectedImage(null);
              feature.reset();
            }}
          >
            <Text style={styles.newImageButtonText}>Upscale Another Image</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

// Helper functions
function getModeDescription(mode: EnhancementMode): string {
  switch (mode) {
    case 'standard':
      return 'Balanced enhancement for general use';
    case 'denoise':
      return 'Removes noise and artifacts';
    case 'detail':
      return 'Maximum detail enhancement';
  }
}

async function shareImage(imageUrl?: string): Promise<void> {
  if (!imageUrl) return;
  const { Share } = await import('react-native');
  await Share.share({
    message: 'Check out this upscaled image!',
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
  imageActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#F59E0B',
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
  factorContainer: {
    gap: 10,
  },
  factorCard: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 15,
  },
  factorCardSelected: {
    backgroundColor: '#FFFBEB',
    borderColor: '#F59E0B',
  },
  factorValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 5,
  },
  factorValueSelected: {
    color: '#D97706',
  },
  factorDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 5,
  },
  factorExample: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  modeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  modeCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  modeCardSelected: {
    backgroundColor: '#FFFBEB',
    borderColor: '#F59E0B',
  },
  modeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 5,
    textAlign: 'center',
  },
  modeNameSelected: {
    color: '#D97706',
  },
  modeDescription: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#FFFBEB',
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    borderRadius: 8,
    padding: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  upscaleButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    paddingVertical: 18,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  upscaleButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  upscaleButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  upscaleButtonSubtext: {
    fontSize: 14,
    color: '#FEF3C7',
    marginTop: 4,
  },
  imageInfo: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
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
    marginBottom: 15,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#F59E0B',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F59E0B',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
  },
  newImageButton: {
    borderWidth: 1,
    borderColor: '#F59E0B',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  newImageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
  },
});
```

## Features Demonstrated

1. **Image Selection** - Pick images from gallery
2. **Upscale Factors** - Choose 2x or 4x scaling
3. **Enhancement Modes** - Standard, denoise, or detail enhancement
4. **Image Information** - See original and upscaled dimensions
5. **Progress Tracking** - Real-time upscaling progress
6. **Result Display** - View upscaled image
7. **Save & Share** - Save upscaled images

## Usage

1. Select an image to upscale
2. Choose upscale factor (2x or 4x)
3. Select enhancement mode
4. Tap "Upscale Image"
5. View image information
6. Save or share result

## Upscale Factors

### 2x (Double Resolution)
- Best for general upscaling
- Faster processing
- Good for most use cases
- Example: 1000×1000 → 2000×2000

### 4x (Quadruple Resolution)
- Maximum quality
- Best for large prints
- Longer processing time
- Example: 1000×1000 → 4000×4000

## Enhancement Modes

### Standard
- Balanced enhancement
- Good for most images
- Maintains natural look

### Denoise
- Removes noise and artifacts
- Best for low-quality images
- Smoother results

### Detail
- Maximum detail enhancement
- Best for high-quality source images
- Sharper results

## Best Practices

1. **Source Quality**: Higher quality originals produce better results
2. **Factor Selection**: Use 2x for general use, 4x for prints
3. **Mode Selection**: Match mode to image type
4. **File Size**: 4x upscaling creates much larger files
5. **Processing Time**: Higher factors and modes take longer

## Use Cases

- **Print Media**: Upscale images for high-quality prints
- **Digital Art**: Increase resolution for digital artwork
- **Photo Restoration**: Enhance old or low-quality photos
- **Social Media**: Create higher resolution posts
- **Professional Use**: Prepare images for professional projects

## Related Examples

- [Photo Restoration](../photo-restoration/)
- [HD Touch Up](../)
- [Custom UI](../../advanced/custom-ui/)

---

Last updated: 2025-01-08
