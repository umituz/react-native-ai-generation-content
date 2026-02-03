# Face Swap Example

Complete example of face swap feature with dual image selection.

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
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {
  useFaceSwapFeature,
  DualImagePicker,
  GenerationProgressModal,
} from '@umituz/react-native-ai-generation-content';

export default function FaceSwapExample() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [targetImage, setTargetImage] = useState<string | null>(null);

  const feature = useFaceSwapFeature({
    config: {
      enhanceFace: true,
      matchSkinTone: true,
      onProcessingComplete: (result) => {
        if (result.success) {
          Alert.alert('Success', 'Face swap completed!');
        }
      },
      onError: (error) => {
        Alert.alert('Error', error);
      },
    },
    onSelectSourceImage: async () => {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });
      if (result.assets && result.assets[0]) {
        const base64 = await convertToBase64(result.assets[0].uri);
        setSourceImage(base64);
        return base64;
      }
      return null;
    },
    onSelectTargetImage: async () => {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });
      if (result.assets && result.assets[0]) {
        const base64 = await convertToBase64(result.assets[0].uri);
        setTargetImage(base64);
        return base64;
      }
      return null;
    },
    onSaveImage: async (imageUrl) => {
      await saveToGallery(imageUrl);
      Alert.alert('Saved', 'Image saved to gallery!');
    },
  });

  const handleSelectSource = async () => {
    await feature.selectSourceImage();
  };

  const handleSelectTarget = async () => {
    await feature.selectTargetImage();
  };

  const handleProcess = async () => {
    if (!sourceImage || !targetImage) {
      Alert.alert('Error', 'Please select both images');
      return;
    }
    await feature.process();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AI Face Swap</Text>
        <Text style={styles.subtitle}>
          Swap faces between two photos
        </Text>
      </View>

      {/* Dual Image Picker */}
      <DualImagePicker
        sourceImage={sourceImage}
        targetImage={targetImage}
        onSelectSourceImage={handleSelectSource}
        onSelectTargetImage={handleSelectTarget}
        sourceLabel="Face to Use"
        targetLabel="Face to Replace"
      />

      {/* Process Button */}
      <TouchableOpacity
        style={[
          styles.processButton,
          (!feature.isReady || feature.state.isProcessing) &&
            styles.processButtonDisabled,
        ]}
        onPress={handleProcess}
        disabled={!feature.isReady || feature.state.isProcessing}
      >
        {feature.state.isProcessing ? (
          <Text style={styles.processButtonText}>Processing...</Text>
        ) : (
          <Text style={styles.processButtonText}>Swap Faces</Text>
        )}
      </TouchableOpacity>

      {/* Progress Modal */}
      <GenerationProgressModal
        visible={feature.state.isProcessing}
        progress={feature.state.progress}
        status="Swapping faces..."
        onCancel={() => {
          // Handle cancel if needed
        }}
      />

      {/* Result */}
      {feature.state.result?.imageUrl && (
        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>Result</Text>
          <Image
            source={{ uri: feature.state.result.imageUrl }}
            style={styles.resultImage}
            resizeMode="contain"
          />
          <View style={styles.resultActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => feature.saveResult()}
            >
              <Text style={styles.actionButtonText}>Save to Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => shareImage(feature.state.result.imageUrl)}
            >
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#EC4899',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#FCE7F3',
  },
  processButton: {
    backgroundColor: '#EC4899',
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  processButtonDisabled: {
    backgroundColor: '#FCA5A5',
  },
  processButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  resultSection: {
    padding: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#111827',
  },
  resultImage: {
    width: '100%',
    height: 400,
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
    backgroundColor: '#EC4899',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

// Helper function
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
  // Implement save logic
  const { CameraRoll } = await import('react-native');
  // Download and save to camera roll
}

async function shareImage(imageUrl: string): Promise<void> {
  // Implement share logic
  const { Share } = await import('react-native');
  await Share.share({
    message: 'Check out this face swap!',
    url: imageUrl,
  });
}
```

## Features Demonstrated

1. **Dual Image Selection** - Pick source and target images
2. **Image Preview** - Show selected images
3. **Face Swap Processing** - Execute face swap
4. **Progress Tracking** - Show processing progress
5. **Result Display** - Show swapped image
6. **Save & Share** - Save to gallery, share with others

## Usage

1. Select source image (face to use)
2. Select target image (face to replace)
3. Tap "Swap Faces"
4. Wait for processing
5. View result
6. Save or share

## Best Practices

1. **Image Quality**: Use high-quality, well-lit photos
2. **Face Visibility**: Ensure faces are clearly visible
3. **Frontal Photos**: Forward-facing photos work best
4. **Single Face**: Photos with one clear face per image
5. **Similar Angles**: Similar head angles produce better results

## Related Examples

- [Image to Video](../image-to-video/)
- [Dual Image](../../shared/)

---

Last updated: 2025-01-08
