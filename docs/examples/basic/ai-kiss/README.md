# AI Kiss Example

Complete example of generating AI kiss videos from two photos.

## Overview

This example demonstrates how to create romantic AI kiss videos by combining two photos:
- Select two people from different photos
- Generate an animated kiss video
- Create romantic content for couples
- Perfect for special occasions and social media

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
  useAIKissFeature,
  DualImagePicker,
  GenerationProgressModal,
} from '@umituz/react-native-ai-generation-content';
import { Ionicons } from '@expo/vector-icons';

export default function AIKissExample() {
  const [person1Image, setPerson1Image] = useState<string | null>(null);
  const [person2Image, setPerson2Image] = useState<string | null>(null);
  const [kissStyle, setKissStyle] = useState<'romantic' | 'cute' | 'passionate'>('romantic');

  const feature = useAIKissFeature({
    config: {
      kissStyle: kissStyle,
      videoDuration: 3,
      videoQuality: 'high',
      onProcessingComplete: (result) => {
        if (result.success) {
          Alert.alert('Success', 'AI kiss video generated successfully!');
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
        <Ionicons name="heart" size={40} color="#fff" />
        <Text style={styles.title}>AI Kiss Generator</Text>
        <Text style={styles.subtitle}>
          Create romantic kiss videos from two photos
        </Text>
      </View>

      {/* Dual Image Picker */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Photos</Text>

        <View style={styles.photosContainer}>
          {/* Person 1 */}
          <TouchableOpacity
            style={styles.photoCard}
            onPress={handleSelectPerson1}
            activeOpacity={0.7}
          >
            {person1Image ? (
              <Image
                source={{ uri: person1Image }}
                style={styles.photoPreview}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="person-add" size={48} color="#EC4899" />
                <Text style={styles.placeholderText}>Add Person 1</Text>
              </View>
            )}
            {person1Image && (
              <View style={styles.photoOverlay}>
                <Ionicons name="refresh" size={20} color="#fff" />
                <Text style={styles.overlayText}>Change</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Kiss Icon */}
          <View style={styles.kissIconContainer}>
            <Text style={styles.kissIcon}>💋</Text>
          </View>

          {/* Person 2 */}
          <TouchableOpacity
            style={styles.photoCard}
            onPress={handleSelectPerson2}
            activeOpacity={0.7}
          >
            {person2Image ? (
              <Image
                source={{ uri: person2Image }}
                style={styles.photoPreview}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="person-add" size={48} color="#EC4899" />
                <Text style={styles.placeholderText}>Add Person 2</Text>
              </View>
            )}
            {person2Image && (
              <View style={styles.photoOverlay}>
                <Ionicons name="refresh" size={20} color="#fff" />
                <Text style={styles.overlayText}>Change</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Kiss Style Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kiss Style</Text>
        <View style={styles.stylesContainer}>
          {[
            { id: 'romantic' as const, name: 'Romantic', icon: '🌹', description: 'Soft and romantic' },
            { id: 'cute' as const, name: 'Cute', icon: '😊', description: 'Sweet and playful' },
            { id: 'passionate' as const, name: 'Passionate', icon: '🔥', description: 'Intense and passionate' },
          ].map((style) => (
            <TouchableOpacity
              key={style.id}
              style={[
                styles.styleCard,
                kissStyle === style.id && styles.styleCardSelected,
              ]}
              onPress={() => setKissStyle(style.id)}
            >
              <Text style={styles.styleIcon}>{style.icon}</Text>
              <Text
                style={[
                  styles.styleName,
                  kissStyle === style.id && styles.styleNameSelected,
                ]}
              >
                {style.name}
              </Text>
              <Text style={styles.styleDescription}>{style.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Video Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Video Settings</Text>

        <View style={styles.settingsContainer}>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Duration</Text>
            <View style={styles.settingValue}>
              <Ionicons name="time" size={16} color="#6B7280" />
              <Text style={styles.settingText}>3 seconds</Text>
            </View>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Quality</Text>
            <View style={styles.settingValue}>
              <Ionicons name="videocam" size={16} color="#6B7280" />
              <Text style={styles.settingText}>HD</Text>
            </View>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Format</Text>
            <View style={styles.settingValue}>
              <Ionicons name="document" size={16} color="#6B7280" />
              <Text style={styles.settingText}>MP4</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tips Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tips for Best Results</Text>
        <View style={styles.tipsContainer}>
          <View style={styles.tipItem}>
            <View style={styles.tipIconContainer}>
              <Ionicons name="bulb" size={20} color="#F59E0B" />
            </View>
            <Text style={styles.tipText}>
              Use high-quality photos with good lighting
            </Text>
          </View>
          <View style={styles.tipItem}>
            <View style={styles.tipIconContainer}>
              <Ionicons name="bulb" size={20} color="#F59E0B" />
            </View>
            <Text style={styles.tipText}>
              Choose photos where faces are clearly visible
            </Text>
          </View>
          <View style={styles.tipItem}>
            <View style={styles.tipIconContainer}>
              <Ionicons name="bulb" size={20} color="#F59E0B" />
            </View>
            <Text style={styles.tipText}>
              Front-facing photos work best
            </Text>
          </View>
          <View style={styles.tipItem}>
            <View style={styles.tipIconContainer}>
              <Ionicons name="bulb" size={20} color="#F59E0B" />
            </View>
            <Text style={styles.tipText}>
              Similar lighting in both photos produces natural results
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
            <Ionicons name="heart" size={24} color="#fff" />
            <Text style={styles.generateButtonText}>Generate Kiss Video</Text>
            <Text style={styles.generateButtonSubtext}>
              {kissStyle} style • 3 seconds
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* Progress Modal */}
      <GenerationProgressModal
        visible={feature.state.isProcessing}
        progress={feature.state.progress}
        status="Creating your romantic kiss video..."
      />

      {/* Result */}
      {feature.state.result?.videoUrl && (
        <View style={styles.section}>
          <View style={styles.resultHeader}>
            <Ionicons name="checkmark-circle" size={32} color="#10B981" />
            <Text style={styles.resultTitle}>Your Kiss Video is Ready!</Text>
          </View>

          <View style={styles.resultContainer}>
            {/* Video Player Placeholder */}
            <TouchableOpacity
              style={styles.videoPlayer}
              activeOpacity={0.9}
            >
              <View style={styles.playButton}>
                <Ionicons name="play" size={32} color="#EC4899" />
              </View>
            </TouchableOpacity>

            {/* Video Details */}
            <View style={styles.videoDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Style</Text>
                <Text style={styles.detailValue}>{kissStyle}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Duration</Text>
                <Text style={styles.detailValue}>3 seconds</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Quality</Text>
                <Text style={styles.detailValue}>HD (720p)</Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.resultActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleSave}
              >
                <Ionicons name="download" size={22} color="#fff" />
                <Text style={styles.actionButtonText}>Save to Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => shareVideo(feature.state.result?.videoUrl)}
              >
                <Ionicons name="share-social" size={22} color="#fff" />
                <Text style={styles.actionButtonText}>Share</Text>
              </TouchableOpacity>
            </View>

            {/* Create New */}
            <TouchableOpacity
              style={styles.newButton}
              onPress={() => {
                setPerson1Image(null);
                setPerson2Image(null);
                feature.reset();
              }}
            >
              <Ionicons name="heart-outline" size={20} color="#EC4899" />
              <Text style={styles.newButtonText}>Create Another</Text>
            </TouchableOpacity>
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
    message: 'Check out this romantic AI kiss video! 💕',
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
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#FCE7F3',
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
  photosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  photoCard: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#FCE7F3',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF2F8',
  },
  placeholderText: {
    fontSize: 12,
    color: '#EC4899',
    fontWeight: '600',
    marginTop: 8,
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(236, 72, 153, 0.9)',
    paddingVertical: 8,
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    marginTop: 2,
  },
  kissIconContainer: {
    padding: 10,
  },
  kissIcon: {
    fontSize: 36,
  },
  stylesContainer: {
    gap: 12,
  },
  styleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 15,
    gap: 12,
  },
  styleCardSelected: {
    backgroundColor: '#FDF2F8',
    borderColor: '#EC4899',
  },
  styleIcon: {
    fontSize: 28,
  },
  styleName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  styleNameSelected: {
    color: '#EC4899',
  },
  styleDescription: {
    fontSize: 13,
    color: '#6B7280',
  },
  settingsContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 15,
    gap: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  settingText: {
    fontSize: 14,
    color: '#6B7280',
  },
  tipsContainer: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  generateButton: {
    backgroundColor: '#EC4899',
    borderRadius: 16,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    gap: 8,
  },
  generateButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  generateButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  generateButtonSubtext: {
    fontSize: 14,
    color: '#FCE7F3',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  resultContainer: {
    alignItems: 'center',
  },
  videoPlayer: {
    width: '100%',
    aspectRatio: 9 / 16,
    backgroundColor: '#111827',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoDetails: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  resultActions: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginBottom: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#EC4899',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: '#EC4899',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  newButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#EC4899',
  },
});
```

## Features Demonstrated

1. **Dual Photo Selection** - Select two people for the kiss video
2. **Kiss Style Options** - Romantic, cute, or passionate styles
3. **Video Generation** - Create animated kiss videos
4. **Video Settings** - Duration, quality, and format options
5. **Progress Tracking** - Real-time generation progress
6. **Video Playback** - Play generated videos
7. **Save & Share** - Save to gallery and share on social media

## Usage

1. Select photo of first person
2. Select photo of second person
3. Choose kiss style (romantic/cute/passionate)
4. Tap "Generate Kiss Video"
5. Wait for AI processing
6. Play, save, or share the romantic video

## Best Practices

1. **Photo Quality**: Use high-resolution photos for best results
2. **Face Clarity**: Ensure faces are clearly visible and in focus
3. **Lighting**: Good, even lighting produces natural results
4. **Front-Facing**: Forward-facing photos work best
5. **Matching Styles**: Similar photo styles blend better

## Kiss Styles

### Romantic
- Soft, gentle kiss
- Warm and intimate
- Perfect for couples

### Cute
- Sweet and playful
- Light and fun
- Great for social media

### Passionate
- Intense and dramatic
- Bold expression
- For special moments

## Use Cases

- **Anniversaries**: Create romantic content for anniversaries
- **Weddings**: Generate unique wedding content
- **Social Media**: Viral content for Instagram, TikTok
- **Valentine's Day**: Perfect Valentine's content
- **Personal**: Create romantic memories

## Related Examples

- [AI Hug](../ai-hug/)
- [Face Swap](../face-swap/)
- [Image to Video](../)

---

Last updated: 2025-01-08
