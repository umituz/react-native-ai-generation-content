# AI Hug Example

Complete example of generating AI hug videos from two photos.

## Overview

This example demonstrates how to create heartwarming AI hug videos by combining two photos:
- Select two people from different photos
- Generate an animated hug video
- Create emotional content for social media
- Perfect for couples, family, and friends

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
  useAIHugFeature,
  DualImagePicker,
  GenerationProgressModal,
} from '@umituz/react-native-ai-generation-content';
import { Ionicons } from '@expo/vector-icons';

export default function AIHugExample() {
  const [person1Image, setPerson1Image] = useState<string | null>(null);
  const [person2Image, setPerson2Image] = useState<string | null>(null);

  const feature = useAIHugFeature({
    config: {
      hugStyle: 'romantic',
      videoDuration: 3,
      videoQuality: 'high',
      onProcessingComplete: (result) => {
        if (result.success) {
          Alert.alert('Success', 'AI hug video generated successfully!');
        }
      },
      onError: (error) => {
        Alert.alert('Error', error);
      },
    },
    userId: 'user-123',
  });

  const handleSelectPerson1 = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      quality: 0.9,
    });

    if (result.assets && result.assets[0]) {
      setPerson1Image(result.assets[0].uri);
    }
  };

  const handleSelectPerson2 = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      quality: 0.9,
    });

    if (result.assets && result.assets[0]) {
      setPerson2Image(result.assets[0].uri);
    }
  };

  const handleGenerate = async () => {
    if (!person1Image || !person2Image) {
      Alert.alert('Error', 'Please select both photos');
      return;
    }

    await feature.generate({
      person1Image: person1Image,
      person2Image: person2Image,
    });
  };

  const handleSave = async () => {
    if (feature.state.result?.videoUrl) {
      await saveToGallery(feature.state.result.videoUrl);
      Alert.alert('Saved', 'Video saved to gallery!');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AI Hug Generator</Text>
        <Text style={styles.subtitle}>
          Create beautiful hug videos from two photos
        </Text>
      </View>

      {/* Dual Image Picker */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Photos</Text>

        <View style={styles.photosContainer}>
          {/* Person 1 */}
          <View style={styles.photoSection}>
            <Text style={styles.photoLabel}>Person 1</Text>
            {person1Image ? (
              <Image
                source={{ uri: person1Image }}
                style={styles.photoPreview}
                resizeMode="cover"
              />
            ) : (
              <TouchableOpacity
                style={styles.photoPlaceholder}
                onPress={handleSelectPerson1}
              >
                <Ionicons name="person-add" size={48} color="#9CA3AF" />
                <Text style={styles.placeholderText}>Add Person 1</Text>
              </TouchableOpacity>
            )}
            {person1Image && (
              <TouchableOpacity
                style={styles.changePhotoButton}
                onPress={handleSelectPerson1}
              >
                <Text style={styles.changePhotoButtonText}>Change</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Heart Icon */}
          <View style={styles.heartContainer}>
            <Text style={styles.heartIcon}>❤️</Text>
          </View>

          {/* Person 2 */}
          <View style={styles.photoSection}>
            <Text style={styles.photoLabel}>Person 2</Text>
            {person2Image ? (
              <Image
                source={{ uri: person2Image }}
                style={styles.photoPreview}
                resizeMode="cover"
              />
            ) : (
              <TouchableOpacity
                style={styles.photoPlaceholder}
                onPress={handleSelectPerson2}
              >
                <Ionicons name="person-add" size={48} color="#9CA3AF" />
                <Text style={styles.placeholderText}>Add Person 2</Text>
              </TouchableOpacity>
            )}
            {person2Image && (
              <TouchableOpacity
                style={styles.changePhotoButton}
                onPress={handleSelectPerson2}
              >
                <Text style={styles.changePhotoButtonText}>Change</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Hug Style Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hug Style</Text>
        <View style={styles.stylesContainer}>
          {[
            { id: 'romantic', name: 'Romantic', icon: '❤️' },
            { id: 'friendly', name: 'Friendly', icon: '🤗' },
            { id: 'playful', name: 'Playful', icon: '😄' },
          ].map((style) => (
            <TouchableOpacity
              key={style.id}
              style={styles.styleCard}
              onPress={() => feature.setConfig({ hugStyle: style.id })}
            >
              <Text style={styles.styleIcon}>{style.icon}</Text>
              <Text style={styles.styleName}>{style.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Tips Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tips for Best Results</Text>
        <View style={styles.tipsContainer}>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.tipText}>
              Use clear, well-lit photos
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.tipText}>
              Choose photos facing forward
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.tipText}>
              Ensure faces are clearly visible
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={styles.tipText}>
              High-quality images work best
            </Text>
          </View>
        </View>
      </View>

      {/* Generate Button */}
      <TouchableOpacity
        style={[
          styles.generateButton,
          (!feature.isReady || feature.state.isProcessing) &&
            styles.generateButtonDisabled,
        ]}
        onPress={handleGenerate}
        disabled={!feature.isReady || feature.state.isProcessing}
      >
        {feature.state.isProcessing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text style={styles.generateButtonText}>Generate Hug Video</Text>
            <Text style={styles.generateButtonSubtext}>
              Create your AI hug
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* Progress Modal */}
      <GenerationProgressModal
        visible={feature.state.isProcessing}
        progress={feature.state.progress}
        status="Creating your hug video..."
      />

      {/* Result */}
      {feature.state.result?.videoUrl && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Hug Video</Text>

          <View style={styles.resultContainer}>
            {/* Video Player Placeholder */}
            <View style={styles.videoPlayer}>
              <Ionicons name="play-circle" size={64} color="#fff" />
              <Text style={styles.videoPlayerText}>Tap to Play</Text>
            </View>

            {/* Video Info */}
            <View style={styles.videoInfo}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Duration</Text>
                <Text style={styles.infoValue}>3 seconds</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Quality</Text>
                <Text style={styles.infoValue}>HD</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Format</Text>
                <Text style={styles.infoValue}>MP4</Text>
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
                onPress={() => shareVideo(feature.state.result?.videoUrl)}
              >
                <Ionicons name="share" size={20} color="#fff" />
                <Text style={styles.actionButtonText}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.newButton]}
                onPress={() => {
                  setPerson1Image(null);
                  setPerson2Image(null);
                  feature.reset();
                }}
              >
                <Ionicons name="refresh" size={20} color="#fff" />
                <Text style={styles.actionButtonText}>New</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

// Helper functions
async function saveToGallery(videoUrl: string): Promise<void> {
  // Implement save to gallery logic
  const { CameraRoll } = await import('react-native');
  // Download and save
}

async function shareVideo(videoUrl?: string): Promise<void> {
  if (!videoUrl) return;
  const { Share } = await import('react-native');
  await Share.share({
    message: 'Check out this AI hug video!',
    url: videoUrl,
  });
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
  photosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  photoSection: {
    flex: 1,
    alignItems: 'center',
  },
  photoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 10,
  },
  photoPreview: {
    width: 140,
    height: 140,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  photoPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
  },
  changePhotoButton: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
  },
  changePhotoButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EC4899',
  },
  heartContainer: {
    paddingHorizontal: 10,
  },
  heartIcon: {
    fontSize: 32,
  },
  stylesContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  styleCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  styleIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  styleName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  tipsContainer: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
  },
  generateButton: {
    backgroundColor: '#EC4899',
    borderRadius: 12,
    paddingVertical: 18,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  generateButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  generateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  generateButtonSubtext: {
    fontSize: 14,
    color: '#FCE7F3',
    marginTop: 4,
  },
  resultContainer: {
    alignItems: 'center',
  },
  videoPlayer: {
    width: '100%',
    aspectRatio: 9 / 16,
    backgroundColor: '#111827',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  videoPlayerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginTop: 12,
  },
  videoInfo: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  resultActions: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#EC4899',
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

1. **Dual Photo Selection** - Select two people for the hug
2. **Hug Style Options** - Romantic, friendly, or playful styles
3. **Video Generation** - Create animated hug videos
4. **Progress Tracking** - Real-time generation progress
5. **Video Playback** - Play generated videos
6. **Save & Share** - Save to gallery and share

## Usage

1. Select photo of first person
2. Select photo of second person
3. Choose hug style (romantic/friendly/playful)
4. Tap "Generate Hug Video"
5. Wait for AI processing
6. Play, save, or share the video

## Best Practices

1. **Photo Quality**: Use high-quality, well-lit photos
2. **Face Visibility**: Ensure faces are clearly visible
3. **Front-Facing**: Forward-facing photos work best
4. **Simple Backgrounds**: Clean backgrounds produce better results
5. **Similar Lighting**: Similar lighting conditions in both photos

## Use Cases

- **Social Media**: Create viral content for Instagram, TikTok
- **Personal Use**: Create memories with loved ones
- **Gifts**: Make personalized gifts for couples
- **Entertainment**: Fun content for friends and family
- **Creative Projects**: Add to videos and presentations

## Related Examples

- [AI Kiss](../ai-kiss/)
- [Face Swap](../face-swap/)
- [Image to Video](../)

---

Last updated: 2025-01-08
