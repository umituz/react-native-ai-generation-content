# Inpainting Example

Complete example of filling missing or unwanted parts of images using AI.

## Overview

This example demonstrates how to build an inpainting feature:
- Remove unwanted objects from photos
- Fill missing parts of images
- Smart content-aware filling
- Restore damaged image areas

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
  useInpaintingFeature,
  GenerationProgressModal,
} from '@umituz/react-native-ai-generation-content';
import { Ionicons } from '@expo/vector-icons';

type BrushSize = 'small' | 'medium' | 'large';

export default function InpaintingExample() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [brushSize, setBrushSize] = useState<BrushSize>('medium');
  const [maskImage, setMaskImage] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const feature = useInpaintingFeature({
    config: {
      brushSize: brushSize,
      fillMode: 'smart',
      blendEdges: true,
      onProcessingComplete: (result) => {
        if (result.success) {
          Alert.alert('Success', 'Inpainting completed!');
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
      setMaskImage(null);
    }
  };

  const handleInpaint = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    if (!maskImage) {
      Alert.alert('Error', 'Please mark the area to inpaint');
      return;
    }

    await feature.inpaint(selectedImage, maskImage);
  };

  const handleSave = async () => {
    if (feature.state.result?.imageUrl) {
      await saveToGallery(feature.state.result.imageUrl);
      Alert.alert('Saved', 'Image saved to gallery!');
    }
  };

  const BRUSH_SIZES = [
    { id: 'small' as BrushSize, name: 'Small', size: 20, icon: '●' },
    { id: 'medium' as BrushSize, name: 'Medium', size: 40, icon: '●●' },
    { id: 'large' as BrushSize, name: 'Large', size: 60, icon: '●●●' },
  ];

  const USE_CASES = [
    {
      icon: '🗑️',
      title: 'Remove Objects',
      description: 'Delete unwanted elements from photos',
    },
    {
      icon: '🔧',
      title: 'Fix Damages',
      description: 'Repair torn or scratched areas',
    },
    {
      icon: '✨',
      title: 'Fill Missing Parts',
      description: 'Complete incomplete images',
    },
    {
      icon: '🎨',
      title: 'Replace Content',
      description: 'Swap out unwanted sections',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🖌️</Text>
        <Text style={styles.title}>Inpainting</Text>
        <Text style={styles.subtitle}>
          Remove or fill any part of your image
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
              <Ionicons name="refresh" size={18} color="#6366F1" />
              <Text style={styles.changeButtonText}>Change Image</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={handleSelectImage}>
            <View style={styles.uploadContent}>
              <Ionicons name="image" size={48} color="#6366F1" />
              <Text style={styles.uploadText}>Choose Image</Text>
              <Text style={styles.uploadSubtext}>
                Select from your gallery
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Brush Size */}
      {selectedImage && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Brush Size</Text>
          <View style={styles.brushContainer}>
            {BRUSH_SIZES.map((size) => (
              <TouchableOpacity
                key={size.id}
                style={[
                  styles.brushCard,
                  brushSize === size.id && styles.brushCardSelected,
                ]}
                onPress={() => setBrushSize(size.id)}
              >
                <Text style={styles.brushIcon}>{size.icon}</Text>
                <Text
                  style={[
                    styles.brushName,
                    brushSize === size.id && styles.brushNameSelected,
                  ]}
                >
                  {size.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Drawing Area */}
      {selectedImage && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mark Area to Inpaint</Text>

          <View style={styles.drawingArea}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.drawingImage}
              resizeMode="contain"
            />

            {/* Drawing overlay */}
            <TouchableOpacity
              style={styles.drawingOverlay}
              activeOpacity={1}
              onStartShouldSetResponder={() => true}
              onMoveShouldSetResponder={() => true}
              onPressIn={() => setIsDrawing(true)}
              onPressOut={() => setIsDrawing(false)}
            >
              <View style={styles.drawingBrush} />
            </TouchableOpacity>

            <View style={styles.drawingControls}>
              <TouchableOpacity
                style={styles.undoButton}
                onPress={() => setMaskImage(null)}
              >
                <Ionicons name="arrow-undo" size={20} color="#6366F1" />
                <Text style={styles.undoButtonText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.drawingTip}>
            💡 Draw over the area you want to remove or fill
          </Text>
        </View>
      )}

      {/* Use Cases */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What You Can Do</Text>
        <View style={styles.useCasesContainer}>
          {USE_CASES.map((useCase, index) => (
            <View key={index} style={styles.useCaseCard}>
              <Text style={styles.useCaseIcon}>{useCase.icon}</Text>
              <View style={styles.useCaseContent}>
                <Text style={styles.useCaseTitle}>{useCase.title}</Text>
                <Text style={styles.useCaseDescription}>
                  {useCase.description}
                </Text>
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
            { icon: '🎯', text: 'Mark slightly larger than the object' },
            { icon: '🌟', text: 'Use appropriate brush size' },
            { icon: '📐', text: 'Include surrounding context' },
            { icon: '✅', text: 'Clean edges blend better' },
          ].map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipIcon}>{tip.icon}</Text>
              <Text style={styles.tipText}>{tip.text}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Inpaint Button */}
      {selectedImage && maskImage && (
        <TouchableOpacity
          style={[
            styles.inpaintButton,
            (!feature.isReady || feature.state.isProcessing) &&
              styles.inpaintButtonDisabled,
          ]}
          onPress={handleInpaint}
          disabled={!feature.isReady || feature.state.isProcessing}
        >
          {feature.state.isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="brush" size={24} color="#fff" />
              <Text style={styles.inpaintButtonText}>Apply Inpainting</Text>
              <Text style={styles.inpaintButtonSubtext}>
                Smart fill with {brushSize} brush
              </Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {/* Progress Modal */}
      <GenerationProgressModal
        visible={feature.state.isProcessing}
        progress={feature.state.progress}
        status="Inpainting your image..."
      />

      {/* Result */}
      {feature.state.result?.imageUrl && (
        <View style={styles.section}>
          <View style={styles.resultHeader}>
            <Ionicons name="sparkles" size={32} color="#10B981" />
            <Text style={styles.resultTitle}>Complete!</Text>
          </View>

          {/* Comparison */}
          <View style={styles.comparisonContainer}>
            <View style={styles.comparisonItem}>
              <Text style={styles.comparisonLabel}>Before</Text>
              <Image
                source={{ uri: selectedImage }}
                style={styles.comparisonImage}
                resizeMode="contain"
              />
            </View>
            <Ionicons name="arrow-forward" size={24} color="#9CA3AF" />
            <View style={styles.comparisonItem}>
              <Text style={styles.comparisonLabel}>After</Text>
              <Image
                source={{ uri: feature.state.result.imageUrl }}
                style={styles.comparisonImage}
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
                setMaskImage(null);
                feature.reset();
              }}
            >
              <Ionicons name="add" size={20} color="#fff" />
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
    message: 'Check out this inpainted image! ✨',
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
    backgroundColor: '#6366F1',
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
    color: '#E0E7FF',
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
    width: '100%',
    height: 250,
    borderRadius: 12,
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
  brushContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  brushCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 6,
  },
  brushCardSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  brushIcon: {
    fontSize: 20,
  },
  brushName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  brushNameSelected: {
    color: '#4F46E5',
  },
  drawingArea: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    marginBottom: 10,
  },
  drawingImage: {
    width: '100%',
    height: 300,
  },
  drawingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  drawingBrush: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.5)',
  },
  drawingControls: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    gap: 10,
  },
  undoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  undoButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366F1',
  },
  drawingTip: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 10,
  },
  useCasesContainer: {
    gap: 12,
  },
  useCaseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
  },
  useCaseIcon: {
    fontSize: 24,
  },
  useCaseContent: {
    flex: 1,
  },
  useCaseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  useCaseDescription: {
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
    fontSize: 14,
    color: '#374151',
  },
  inpaintButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 18,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    gap: 8,
  },
  inpaintButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  inpaintButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  inpaintButtonSubtext: {
    fontSize: 14,
    color: '#E0E7FF',
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
  comparisonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  comparisonItem: {
    flex: 1,
    alignItems: 'center',
  },
  comparisonLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  comparisonImage: {
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
    backgroundColor: '#6366F1',
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

1. **Image Selection** - Choose photos to edit
2. **Brush Size** - Small, medium, large options
3. **Drawing Tool** - Mark areas to inpaint
4. **Smart Fill** - AI-powered content filling
5. **Before/After** - Compare results
6. **Save & Share** - Save and share edited images

## Usage

1. Select an image with unwanted elements
2. Choose brush size (small/medium/large)
3. Draw over area to remove/fill
4. Tap "Apply Inpainting"
5. Wait for AI processing
6. Compare before/after
7. Save or share result

## Use Cases

### Remove Objects
- Delete unwanted people
- Remove text or logos
- Eliminate distractions
- Clean up backgrounds

### Fix Damages
- Repair tears
- Fix scratches
- Fill missing areas
- Restore damaged photos

### Fill Missing Parts
- Complete cropped images
- Extend backgrounds
- Add missing elements
- Fix composition

## Best Practices

1. **Mark Slightly Larger**: Include some surrounding context
2. **Appropriate Brush**: Match brush size to object
3. **Clean Edges**: Smooth edges blend better
4. **Good Lighting**: Well-lit images work better
5. **Simple Backgrounds**: Easier to fill complex areas

## Tips

- Use small brush for precise work
- Large brush for big areas
- Draw complete around object
- Include surrounding texture
- Zoom in for accuracy

## Related Examples

- [Remove Background](../remove-background/)
- [Photo Restoration](../photo-restoration/)
- [Remove Object](../)

---

Last updated: 2025-01-08
