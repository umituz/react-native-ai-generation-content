# Text to Video Example

Complete example of generating videos from text descriptions.

## Overview

This example demonstrates how to build a text-to-video generation feature:
- Generate videos from text prompts
- Select video duration and style
- Add camera movements and effects
- Create stunning visual content

## Full Code

```tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  useTextToVideoFeature,
  GenerationProgressModal,
} from '@umituz/react-native-ai-generation-content';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';

type VideoStyle = 'cinematic' | 'animated' | 'realistic' | 'artistic';
type CameraMovement = 'static' | 'pan' | 'zoom' | 'orbit';

export default function TextToVideoExample() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<VideoStyle>('cinematic');
  const [duration, setDuration] = useState(4);
  const [cameraMovement, setCameraMovement] = useState<CameraMovement>('pan');

  const feature = useTextToVideoFeature({
    config: {
      style: selectedStyle,
      duration: duration,
      cameraMovement: cameraMovement,
      resolution: '1080p',
      fps: 30,
      onProcessingComplete: (result) => {
        if (result.success) {
          Alert.alert('Success', 'Video generated successfully!');
        }
      },
      onError: (error) => {
        Alert.alert('Error', error);
      },
    },
    userId: 'user-123',
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt');
      return;
    }

    if (prompt.length < 20) {
      Alert.alert('Error', 'Prompt must be at least 20 characters');
      return;
    }

    await feature.generate({
      prompt: prompt,
      style: selectedStyle,
      duration: duration,
      cameraMovement: cameraMovement,
    });
  };

  const handleSave = async () => {
    if (feature.state.result?.videoUrl) {
      await saveToGallery(feature.state.result.videoUrl);
      Alert.alert('Saved', 'Video saved to gallery!');
    }
  };

  const EXAMPLE_PROMPTS = [
    'A majestic eagle soaring through snow-capped mountains at sunrise',
    'A futuristic city with flying cars and neon lights at night',
    'A peaceful forest with sunlight filtering through the trees',
    'Ocean waves crashing on a rocky beach during golden hour',
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AI Video Generator</Text>
        <Text style={styles.subtitle}>
          Create stunning videos from text descriptions
        </Text>
      </View>

      {/* Prompt Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Describe Your Video</Text>
        <TextInput
          style={styles.promptInput}
          placeholder="Describe the video you want to create..."
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={5}
          onChangeText={setPrompt}
          value={prompt}
          maxLength={500}
        />
        <View style={styles.promptFooter}>
          <Text style={styles.charCount}>{prompt.length}/500</Text>
          <TouchableOpacity
            style={styles.randomButton}
            onPress={() => {
              const random = EXAMPLE_PROMPTS[Math.floor(Math.random() * EXAMPLE_PROMPTS.length)];
              setPrompt(random);
            }}
          >
            <Ionicons name="shuffle" size={16} color="#6366F1" />
            <Text style={styles.randomButtonText}>Random</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Example Prompts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Example Prompts</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.examplesScroll}
        >
          {EXAMPLE_PROMPTS.map((examplePrompt, index) => (
            <TouchableOpacity
              key={index}
              style={styles.exampleCard}
              onPress={() => setPrompt(examplePrompt)}
            >
              <Text style={styles.exampleText}>{examplePrompt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Video Style */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Video Style</Text>
        <View style={styles.stylesGrid}>
          {[
            { id: 'cinematic' as VideoStyle, name: 'Cinematic', icon: 'film', description: 'Movie-like quality' },
            { id: 'animated' as VideoStyle, name: 'Animated', icon: 'sparkles', description: 'Animated style' },
            { id: 'realistic' as VideoStyle, name: 'Realistic', icon: 'camera', description: 'Real footage' },
            { id: 'artistic' as VideoStyle, name: 'Artistic', icon: 'color-palette', description: 'Artistic interpretation' },
          ].map((style) => (
            <TouchableOpacity
              key={style.id}
              style={[
                styles.styleCard,
                selectedStyle === style.id && styles.styleCardSelected,
              ]}
              onPress={() => setSelectedStyle(style.id)}
            >
              <Ionicons
                name={style.icon as any}
                size={28}
                color={selectedStyle === style.id ? '#6366F1' : '#9CA3AF'}
              />
              <Text
                style={[
                  styles.styleName,
                  selectedStyle === style.id && styles.styleNameSelected,
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
          {[3, 4, 5, 6].map((secs) => (
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

      {/* Camera Movement */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Camera Movement</Text>
        <View style={styles.movementContainer}>
          {[
            { id: 'static' as CameraMovement, name: 'Static', icon: 'aperture' },
            { id: 'pan' as CameraMovement, name: 'Pan', icon: 'swap-horizontal' },
            { id: 'zoom' as CameraMovement, name: 'Zoom', icon: 'resize' },
            { id: 'orbit' as CameraMovement, name: 'Orbit', icon: 'sync' },
          ].map((movement) => (
            <TouchableOpacity
              key={movement.id}
              style={[
                styles.movementCard,
                cameraMovement === movement.id && styles.movementCardSelected,
              ]}
              onPress={() => setCameraMovement(movement.id)}
            >
              <Ionicons
                name={movement.icon as any}
                size={24}
                color={cameraMovement === movement.id ? '#6366F1' : '#6B7280'}
              />
              <Text
                style={[
                  styles.movementName,
                  cameraMovement === movement.id && styles.movementNameSelected,
                ]}
              >
                {movement.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Video Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Video Settings</Text>
        <View style={styles.settingsGrid}>
          <View style={styles.settingItem}>
            <Ionicons name="videocam" size={20} color="#6B7280" />
            <Text style={styles.settingLabel}>Resolution</Text>
            <Text style={styles.settingValue}>1080p HD</Text>
          </View>
          <View style={styles.settingItem}>
            <Ionicons name="speedometer" size={20} color="#6B7280" />
            <Text style={styles.settingLabel}>Frame Rate</Text>
            <Text style={styles.settingValue}>30 FPS</Text>
          </View>
          <View style={styles.settingItem}>
            <Ionicons name="hourglass" size={20} color="#6B7280" />
            <Text style={styles.settingLabel}>Est. Time</Text>
            <Text style={styles.settingValue}>~2-5 min</Text>
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
            <Ionicons name="videocam" size={24} color="#fff" />
            <Text style={styles.generateButtonText}>Generate Video</Text>
            <Text style={styles.generateButtonSubtext}>
              {selectedStyle} • {duration}s • {cameraMovement}
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
          <View style={styles.videoPlayerContainer}>
            <Video
              source={{ uri: feature.state.result.videoUrl }}
              style={styles.videoPlayer}
              useNativeControls
              resizeMode="contain"
            />
          </View>

          {/* Video Info */}
          <View style={styles.resultInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Duration:</Text>
              <Text style={styles.infoValue}>{duration} seconds</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Style:</Text>
              <Text style={styles.infoValue}>{selectedStyle}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Camera:</Text>
              <Text style={styles.infoValue}>{cameraMovement}</Text>
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
              style={[styles.actionButton, styles.regenerateButton]}
              onPress={handleGenerate}
            >
              <Ionicons name="refresh" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Regenerate</Text>
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
    message: 'Check out this AI-generated video!',
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
    backgroundColor: '#6366F1',
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
  promptInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  promptFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  charCount: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  randomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
  },
  randomButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
  },
  examplesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  exampleCard: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  exampleText: {
    fontSize: 13,
    color: '#374151',
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
    padding: 15,
    alignItems: 'center',
    gap: 8,
  },
  styleCardSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  styleName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  styleNameSelected: {
    color: '#4F46E5',
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
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  durationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  durationTextSelected: {
    color: '#4F46E5',
  },
  movementContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  movementCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    gap: 6,
  },
  movementCardSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  movementName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  movementNameSelected: {
    color: '#4F46E5',
  },
  settingsGrid: {
    gap: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
  },
  settingLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  settingValue: {
    fontSize: 14,
    color: '#6B7280',
  },
  generateButton: {
    backgroundColor: '#6366F1',
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
    fontSize: 13,
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
  videoPlayerContainer: {
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
  resultInfo: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  regenerateButton: {
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

1. **Text Input** - Detailed prompt input with character count
2. **Video Styles** - Cinematic, animated, realistic, artistic
3. **Duration Selection** - Choose video length (3-6 seconds)
4. **Camera Movement** - Static, pan, zoom, orbit options
5. **Progress Tracking** - Real-time generation progress
6. **Video Playback** - Play generated videos
7. **Save & Share** - Save to gallery and share

## Usage

1. Enter detailed description of your video
2. Select video style (cinematic/animated/realistic/artistic)
3. Choose duration (3-6 seconds)
4. Select camera movement (static/pan/zoom/orbit)
5. Tap "Generate Video"
6. Wait for processing (2-5 minutes)
7. Play, save, or share your video

## Best Practices

1. **Be Descriptive**: Include details about scene, lighting, mood
2. **Use Visual Language**: Describe colors, textures, movements
3. **Set the Scene**: Include environment, atmosphere, time of day
4. **Keep it Focused**: One main subject works best
5. **Add Motion**: Describe movement and action

## Prompt Examples

**Good Prompts:**
- "A majestic eagle soaring through snow-capped mountains during golden hour, cinematic lighting, slow motion"
- "Futuristic city at night with flying cars and neon lights reflecting on wet streets, cyberpunk style"
- "Peaceful Japanese garden with cherry blossoms falling, koi fish swimming in pond, soft morning light"

**Poor Prompts:**
- "A video of a bird" (too vague)
- "Cool stuff" (no description)
- "Make something nice" (not specific enough)

## Camera Movements

- **Static**: Stationary camera, no movement
- **Pan**: Camera moves horizontally
- **Zoom**: Camera moves in/out
- **Orbit**: Camera circles around subject

## Related Examples

- [Text to Image](../text-to-image/)
- [Image to Video](../)
- [AI Hug](../ai-hug/)

---

Last updated: 2025-01-08
