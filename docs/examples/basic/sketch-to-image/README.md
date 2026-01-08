# Sketch to Image Example

Complete example of converting sketches into realistic images using AI.

## Overview

This example demonstrates how to build a sketch-to-image feature:
- Convert hand-drawn sketches to realistic images
- Multiple output styles
- Colorize black and white drawings
- Bring your artwork to life

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
  useSketchToImageFeature,
  GenerationProgressModal,
} from '@umituz/react-native-ai-generation-content';
import { Ionicons } from '@expo/vector-icons';

type OutputStyle = 'realistic' | 'artistic' | 'anime' | 'watercolor';

export default function SketchToImageExample() {
  const [selectedSketch, setSelectedSketch] = useState<string | null>(null);
  const [outputStyle, setOutputStyle] = useState<OutputStyle>('realistic');
  const [colorize, setColorize] = useState(true);
  const [comparisonMode, setComparisonMode] = useState(false);

  const feature = useSketchToImageFeature({
    config: {
      outputStyle: outputStyle,
      colorize: colorize,
      enhanceDetails: true,
      onProcessingComplete: (result) => {
        if (result.success) {
          Alert.alert('Success', 'Sketch converted successfully!');
        }
      },
      onError: (error) => {
        Alert.alert('Error', error);
      },
    },
    userId: 'user-123',
  });

  const handleSelectSketch = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      quality: 0.9,
    });

    if (result.assets && result.assets[0]) {
      setSelectedSketch(result.assets[0].uri);
    }
  };

  const handleConvert = async () => {
    if (!selectedSketch) {
      Alert.alert('Error', 'Please select a sketch first');
      return;
    }

    await feature.convert(selectedSketch);
  };

  const handleSave = async () => {
    if (feature.state.result?.imageUrl) {
      await saveToGallery(feature.state.result.imageUrl);
      Alert.alert('Saved', 'Image saved to gallery!');
    }
  };

  const OUTPUT_STYLES = [
    {
      id: 'realistic' as OutputStyle,
      name: 'Realistic',
      icon: '📷',
      description: 'Photorealistic output',
    },
    {
      id: 'artistic' as OutputStyle,
      name: 'Artistic',
      icon: '🎨',
      description: 'Artistic interpretation',
    },
    {
      id: 'anime' as OutputStyle,
      name: 'Anime',
      icon: '✨',
      description: 'Anime-style rendering',
    },
    {
      id: 'watercolor' as OutputStyle,
      name: 'Watercolor',
      icon: '💧',
      description: 'Watercolor painting',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>✏️</Text>
        <Text style={styles.title}>Sketch to Image</Text>
        <Text style={styles.subtitle}>
          Transform your sketches into realistic images
        </Text>
      </View>

      {/* Sketch Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upload Your Sketch</Text>

        {selectedSketch ? (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: selectedSketch }}
              style={styles.previewImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.changeButton}
              onPress={handleSelectSketch}
            >
              <Ionicons name="create" size={18} color="#F59E0B" />
              <Text style={styles.changeButtonText}>Change Sketch</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={handleSelectSketch}>
            <View style={styles.uploadContent}>
              <Ionicons name="brush" size={48} color="#F59E0B" />
              <Text style={styles.uploadText}>Upload Sketch</Text>
              <Text style={styles.uploadSubtext}>
                Take a photo or select from gallery
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Output Style */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Output Style</Text>
        <View style={styles.stylesGrid}>
          {OUTPUT_STYLES.map((style) => (
            <TouchableOpacity
              key={style.id}
              style={[
                styles.styleCard,
                outputStyle === style.id && styles.styleCardSelected,
              ]}
              onPress={() => setOutputStyle(style.id)}
            >
              <Text style={styles.styleIcon}>{style.icon}</Text>
              <Text
                style={[
                  styles.styleName,
                  outputStyle === style.id && styles.styleNameSelected,
                ]}
              >
                {style.name}
              </Text>
              <Text style={styles.styleDescription}>{style.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Colorize Toggle */}
      <View style={styles.section}>
        <View style={styles.toggleContainer}>
          <View style={styles.toggleInfo}>
            <Text style={styles.toggleTitle}>Colorize Sketch</Text>
            <Text style={styles.toggleDescription}>
              Add colors to black and white sketches
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.toggleButton, colorize && styles.toggleButtonActive]}
            onPress={() => setColorize(!colorize)}
            activeOpacity={0.7}
          >
            <View style={[styles.toggleKnob, colorize && styles.toggleKnobActive]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tips Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tips for Best Results</Text>
        <View style={styles.tipsContainer}>
          {[
            {
              icon: '☀️',
              title: 'Good Lighting',
              text: 'Capture sketches in well-lit conditions',
            },
            {
              icon: '📐',
              title: 'Clear Lines',
              text: 'Bold, clear lines work best',
            },
            {
              icon: '🎯',
              title: 'Simple Backgrounds',
              text: 'Plain backgrounds focus on the sketch',
            },
            {
              icon: '✏️',
              title: 'High Contrast',
              text: 'Dark lines on light paper',
            },
          ].map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <View style={styles.tipIconContainer}>
                <Text style={styles.tipIcon}>{tip.icon}</Text>
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipText}>{tip.text}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Convert Button */}
      <TouchableOpacity
        style={[
          styles.convertButton,
          (!feature.isReady || feature.state.isProcessing) &&
            styles.convertButtonDisabled,
        ]}
        onPress={handleConvert}
        disabled={!feature.isReady || feature.state.isProcessing}
      >
        {feature.state.isProcessing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="magic" size={24} color="#fff" />
            <Text style={styles.convertButtonText}>Convert to Image</Text>
            <Text style={styles.convertButtonSubtext}>
              {outputStyle} style • {colorize ? 'Colorized' : 'B&W'}
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* Progress Modal */}
      <GenerationProgressModal
        visible={feature.state.isProcessing}
        progress={feature.state.progress}
        status="Converting your sketch..."
      />

      {/* Result */}
      {feature.state.result?.imageUrl && (
        <View style={styles.section}>
          <View style={styles.resultHeader}>
            <Ionicons name="sparkles" size={32} color="#F59E0B" />
            <Text style={styles.resultTitle}>Your Creation!</Text>
          </View>

          {/* Comparison Toggle */}
          <TouchableOpacity
            style={styles.comparisonToggle}
            onPress={() => setComparisonMode(!comparisonMode)}
          >
            <Ionicons
              name={comparisonMode ? 'eye-off' : 'eye'}
              size={20}
              color="#F59E0B"
            />
            <Text style={styles.comparisonToggleText}>
              {comparisonMode ? 'Hide Sketch' : 'Show Sketch'}
            </Text>
          </TouchableOpacity>

          {/* Result Display */}
          <View style={styles.resultDisplay}>
            {comparisonMode && selectedSketch && (
              <View style={styles.resultImage}>
                <Text style={styles.resultLabel}>Original Sketch</Text>
                <Image
                  source={{ uri: selectedSketch }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            )}
            <View style={styles.resultImage}>
              <Text style={styles.resultLabel}>Converted Image</Text>
              <Image
                source={{ uri: feature.state.result.imageUrl }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Result Info */}
          <View style={styles.resultInfo}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Style</Text>
              <Text style={styles.infoValue}>{outputStyle}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Color</Text>
              <Text style={styles.infoValue}>{colorize ? 'Yes' : 'No'}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Enhanced</Text>
              <Text style={styles.infoValue}>Yes</Text>
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
                setSelectedSketch(null);
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
async function saveToGallery(imageUrl: string): Promise<void> {
  const { CameraRoll } = await import('react-native');
  // Download and save
}

async function shareImage(imageUrl?: string): Promise<void> {
  if (!imageUrl) return;
  const { Share } = await import('react-native');
  await Share.share({
    message: 'Check out this sketch-to-image conversion! ✏️✨',
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
    color: '#FEF3C7',
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
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  changeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
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
    padding: 15,
    alignItems: 'center',
    gap: 8,
  },
  styleCardSelected: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
  },
  styleIcon: {
    fontSize: 28,
  },
  styleName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  styleNameSelected: {
    color: '#D97706',
  },
  styleDescription: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 15,
  },
  toggleInfo: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 13,
    color: '#6B7280',
  },
  toggleButton: {
    width: 56,
    height: 32,
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    padding: 4,
  },
  toggleButtonActive: {
    backgroundColor: '#F59E0B',
  },
  toggleKnob: {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleKnobActive: {
    transform: [{ translateX: 24 }],
  },
  tipsContainer: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipIcon: {
    fontSize: 20,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  tipText: {
    fontSize: 13,
    color: '#6B7280',
  },
  convertButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    paddingVertical: 18,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    gap: 8,
  },
  convertButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  convertButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  convertButtonSubtext: {
    fontSize: 14,
    color: '#FEF3C7',
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
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  comparisonToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
  },
  resultDisplay: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 15,
  },
  resultImage: {
    flex: 1,
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  resultInfo: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
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
    backgroundColor: '#F59E0B',
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

1. **Sketch Upload** - Upload hand-drawn sketches
2. **Output Styles** - Realistic, artistic, anime, watercolor
3. **Colorize Option** - Add colors to B&W sketches
4. **Before/After** - Compare sketch and converted image
5. **Progress Tracking** - Real-time conversion progress
6. **Save & Share** - Save and share results

## Usage

1. Upload your sketch (take photo or select from gallery)
2. Choose output style (realistic/artistic/anime/watercolor)
3. Toggle colorize option
4. Tap "Convert to Image"
5. Wait for AI processing
6. Compare sketch and result
7. Save or share your creation

## Output Styles

### Realistic
- Photorealistic output
- Natural colors and textures
- Looks like a real photo

### Artistic
- Artistic interpretation
- Painterly effects
- Creative rendering

### Anime
- Anime-style rendering
- Bold colors
- Manga-like appearance

### Watercolor
- Watercolor painting effect
- Soft, flowing colors
- Artistic brushstrokes

## Best Practices

1. **Clear Lines**: Bold, dark lines work best
2. **Good Lighting**: Capture in bright, even lighting
3. **Simple Background**: Plain backgrounds focus on sketch
4. **High Contrast**: Dark lines on light paper
5. **Complete Sketch**: Fully drawn sketches convert better

## Tips for Sketching

- Use dark pencil or pen for bold lines
- Draw on white or light-colored paper
- Avoid complex backgrounds
- Keep lines clean and crisp
- Add enough detail for context

## Use Cases

- **Art Creation**: Bring sketches to life
- **Concept Art**: Quick visualization
- **Storyboarding**: Convert storyboards to scenes
- **Design Work**: Transform rough sketches
- **Creative Projects**: Add unique visual elements

## Related Examples

- [Text to Image](../text-to-image/)
- [Style Transfer](../style-transfer/)
- [Anime Selfie](../anime-selfie/)

---

Last updated: 2025-01-08
