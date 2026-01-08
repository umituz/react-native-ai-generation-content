# Image to Video Example

Complete example of animating static images into dynamic videos.

## Overview

This example demonstrates how to build an image-to-video feature:
- Animate static photos
- Multiple animation styles
- Control motion and duration
- Bring photos to life

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
  useImageToVideoFeature,
  GenerationProgressModal,
} from '@umituz/react-native-ai-generation-content';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';

type AnimationStyle = 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right' | 'parallax' | '3d-motion';

export default function ImageToVideoExample() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [animationStyle, setAnimationStyle] = useState<AnimationStyle>('zoom-in');
  const [duration, setDuration] = useState(3);
  const [motionIntensity, setMotionIntensity] = useState(50);

  const feature = useImageToVideoFeature({
    config: {
      animationStyle: animationStyle,
      duration: duration,
      motionIntensity: motionIntensity,
      videoQuality: 'high',
      onProcessingComplete: (result) => {
        if (result.success) {
          Alert.alert('Success', 'Video created successfully!');
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

  const handleGenerate = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    await feature.generate(selectedImage);
  };

  const handleSave = async () => {
    if (feature.state.result?.videoUrl) {
      await saveToGallery(feature.state.result.videoUrl);
      Alert.alert('Saved', 'Video saved to gallery!');
    }
  };

  const ANIMATION_STYLES = [
    {
      id: 'zoom-in' as AnimationStyle,
      name: 'Zoom In',
      icon: 'search',
      description: 'Gradual zoom in',
    },
    {
      id: 'zoom-out' as AnimationStyle,
      name: 'Zoom Out',
      icon: 'expand',
      description: 'Gradual zoom out',
    },
    {
      id: 'pan-left' as AnimationStyle,
      name: 'Pan Left',
      icon: 'arrow-back',
      description: 'Pan to the left',
    },
    {
      id: 'pan-right' as AnimationStyle,
      name: 'Pan Right',
      icon: 'arrow-forward',
      description: 'Pan to the right',
    },
    {
      id: 'parallax' as AnimationStyle,
      name: 'Parallax',
      icon: 'layers',
      description: '3D depth effect',
    },
    {
      id: '3d-motion' as AnimationStyle,
      name: '3D Motion',
      icon: 'cube',
      description: '3D rotation effect',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🎬</Text>
        <Text style={styles.title}>Image to Video</Text>
        <Text style={styles.subtitle}>
          Animate your photos into stunning videos
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

      {/* Animation Style */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Animation Style</Text>
        <View style={styles.stylesGrid}>
          {ANIMATION_STYLES.map((style) => (
            <TouchableOpacity
              key={style.id}
              style={[
                styles.styleCard,
                animationStyle === style.id && styles.styleCardSelected,
              ]}
              onPress={() => setAnimationStyle(style.id)}
            >
              <Ionicons
                name={style.icon as any}
                size={24}
                color={animationStyle === style.id ? '#8B5CF6' : '#6B7280'}
              />
              <Text
                style={[
                  styles.styleName,
                  animationStyle === style.id && styles.styleNameSelected,
                ]}
              >
                {style.name}
              </Text>
              <Text style={styles.styleDescription}>{style.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Duration */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Duration: {duration}s</Text>
        <View style={styles.durationContainer}>
          {[2, 3, 4, 5].map((secs) => (
            <TouchableOpacity
              key={secs}
              style={[
                styles.durationButton,
                duration === secs && styles.durationButtonSelected,
              ]}
              onPress={() => setDuration(secs)}
            >
              <Text
                style={[
                  styles.durationText,
                  duration === secs && styles.durationTextSelected,
                ]}
              >
                {secs}s
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Motion Intensity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Motion Intensity</Text>
        <View style={styles.intensityContainer}>
          <View style={styles.intensityLabels}>
            <Text style={styles.intensityLabel}>Subtle</Text>
            <Text style={styles.intensityValue}>{motionIntensity}%</Text>
            <Text style={styles.intensityLabel}>Strong</Text>
          </View>
          <View style={styles.intensityBar}>
            <View
              style={[
                styles.intensityFill,
                { width: `${motionIntensity}%` },
              ]}
            />
          </View>
          <View style={styles.intensityButtons}>
            {[25, 50, 75, 100].map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.intensityButton,
                  motionIntensity === value && styles.intensityButtonSelected,
                ]}
                onPress={() => setMotionIntensity(value)}
              >
                <Text
                  style={[
                    styles.intensityButtonText,
                    motionIntensity === value && styles.intensityButtonTextSelected,
                  ]}
                >
                  {value}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Preview */}
      {selectedImage && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preview</Text>
          <View style={styles.previewContainer}>
            <View style={styles.previewInfo}>
              <Ionicons name="information-circle" size={20} color="#8B5CF6" />
              <Text style={styles.previewText}>
                {ANIMATION_STYLES.find((s) => s.id === animationStyle)?.name} • {duration}s • {motionIntensity}% intensity
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tips</Text>
        <View style={styles.tipsContainer}>
          {[
            { icon: '🖼️', text: 'High-resolution images work best' },
            { icon: '🎯', text: 'Images with clear focal points' },
            { icon: '⏱️', text: 'Shorter videos loop better' },
            { icon: '✨', text: 'Portraits and landscapes both work' },
          ].map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipIcon}>{tip.icon}</Text>
              <Text style={styles.tipText}>{tip.text}</Text>
            </View>
          ))}
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
            <Ionicons name="videocam" size={24} color="#fff" />
            <Text style={styles.generateButtonText}>Generate Video</Text>
            <Text style={styles.generateButtonSubtext}>
              {animationStyle} • {duration}s
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* Progress Modal */}
      <GenerationProgressModal
        visible={feature.state.isProcessing}
        progress={feature.state.progress}
        status="Creating your video..."
      />

      {/* Result */}
      {feature.state.result?.videoUrl && (
        <View style={styles.section}>
          <View style={styles.resultHeader}>
            <Ionicons name="checkmark-circle" size={32} color="#10B981" />
            <Text style={styles.resultTitle}>Video Ready!</Text>
          </View>

          {/* Video Player */}
          <View style={styles.videoContainer}>
            <Video
              source={{ uri: feature.state.result.videoUrl }}
              style={styles.videoPlayer}
              useNativeControls
              resizeMode="contain"
            />
          </View>

          {/* Video Info */}
          <View style={styles.videoInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Duration</Text>
              <Text style={styles.infoValue}>{duration} seconds</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Style</Text>
              <Text style={styles.infoValue}>
                {ANIMATION_STYLES.find((s) => s.id === animationStyle)?.name}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Intensity</Text>
              <Text style={styles.infoValue}>{motionIntensity}%</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Quality</Text>
              <Text style={styles.infoValue}>HD</Text>
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
async function saveToGallery(videoUrl: string): Promise<void> {
  const { CameraRoll } = await import('react-native');
  // Download and save
}

async function shareVideo(videoUrl?: string): Promise<void> {
  if (!videoUrl) return;
  const { Share } = await import('react-native');
  await Share.share({
    message: 'Check out this animated video I created! 🎬',
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
  stylesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  styleCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 6,
  },
  styleCardSelected: {
    backgroundColor: '#EDE9FE',
    borderColor: '#8B5CF6',
  },
  styleName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  styleNameSelected: {
    color: '#7C3AED',
  },
  styleDescription: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  durationContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  durationButton: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  durationButtonSelected: {
    backgroundColor: '#EDE9FE',
    borderColor: '#8B5CF6',
  },
  durationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  durationTextSelected: {
    color: '#7C3AED',
  },
  intensityContainer: {
    gap: 15,
  },
  intensityLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
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
  intensityBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  intensityFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 4,
  },
  intensityButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  intensityButton: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  intensityButtonSelected: {
    backgroundColor: '#EDE9FE',
    borderColor: '#8B5CF6',
  },
  intensityButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  intensityButtonTextSelected: {
    color: '#7C3AED',
  },
  previewContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 15,
  },
  previewInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  previewText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
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
  generateButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 18,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    gap: 8,
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
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#111827',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  videoInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    gap: 15,
  },
  infoRow: {
    flex: 1,
    minWidth: '45%',
  },
  infoLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
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

1. **Image Selection** - Choose photos to animate
2. **Animation Styles** - 6 different motion effects
3. **Duration Control** - 2-5 seconds
4. **Motion Intensity** - Adjust animation strength
5. **Video Playback** - Play generated videos
6. **Save & Share** - Save to gallery and share

## Usage

1. Select a photo to animate
2. Choose animation style (zoom-in/zoom-out/pan-left/pan-right/parallax/3d-motion)
3. Set duration (2-5 seconds)
4. Adjust motion intensity
5. Tap "Generate Video"
6. Wait for processing
7. Play, save, or share

## Animation Styles

### Zoom In
- Gradual zoom into focal point
- Draws viewer into the image
- Great for portraits

### Zoom Out
- Gradual zoom out from center
- Reveals full context
- Good for landscapes

### Pan Left
- Smooth horizontal movement left
- Cinematic feel
- Dynamic motion

### Pan Right
- Smooth horizontal movement right
- Classic camera movement
- Natural flow

### Parallax
- 3D depth effect
- Layers move at different speeds
- Professional look

### 3D Motion
- 3D rotation effect
- Dynamic perspective change
- Eye-catching result

## Best Practices

1. **High Resolution**: Use higher quality images
2. **Clear Subject**: Images with clear focal points
3. **Good Lighting**: Well-lit photos work better
4. **Short Duration**: 2-3 seconds loop better
5. **Moderate Motion**: 50% intensity often best

## Tips

- **Portraits**: Use zoom-in for faces
- **Landscapes**: Try parallax for depth
- **Action**: Pan for dynamic scenes
- **Still Life**: Subtle motion for elegance
- **Experiment**: Try different styles

## Use Cases

- **Social Media**: Eye-catching content
- **Presentations**: Dynamic slides
- **Marketing**: Animated product photos
- **Memories**: Bring old photos to life
- **Creative Projects**: Unique visual content

## Related Examples

- [Text to Video](../text-to-video/)
- [AI Hug](../ai-hug/)
- [AI Kiss](../ai-kiss/)

---

Last updated: 2025-01-08
