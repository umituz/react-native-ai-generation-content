# Custom UI Example

Building a completely custom UI for AI features.

## Overview

This example demonstrates how to build a custom UI from scratch without using the pre-built components.

## Features

- Custom styled components
- Animated transitions
- Dark mode support
- Responsive design

## Full Code

```tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import {
  useTextToImageFeature,
  GenerationProgressContent,
} from '@umituz/react-native-ai-generation-content';
import { useTheme } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CustomUIExample() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const theme = useTheme();

  const feature = useTextToImageFeature({
    config: {
      model: 'imagen-3',
    },
    userId: 'user-123',
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt');
      return;
    }

    // Fade in progress
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    await feature.generate({ style: selectedStyle });

    // Fade out progress
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const isDark = theme.darkMode;

  return (
    <ScrollView
      style={[styles.container, isDark && styles.containerDark]}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Custom Header */}
      <View style={[styles.header, isDark && styles.headerDark]}>
        <Animated.View
          style={[
            styles.headerIcon,
            { opacity: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }) },
          ]}
        >
          <Text style={styles.headerIconText}>✨</Text>
        </Animated.View>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>
          AI Image Generator
        </Text>
        <Text style={[styles.headerSubtitle, isDark && styles.headerSubtitleDark]}>
          Create stunning images with AI
        </Text>
      </View>

      {/* Custom Input Section */}
      <View style={[styles.inputSection, isDark && styles.inputSectionDark]}>
        <Text style={[styles.label, isDark && styles.labelDark]}>Prompt</Text>
        <TextInput
          style={[styles.input, isDark && styles.inputDark]}
          placeholder="Describe your imagination..."
          placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
          multiline
          numberOfLines={4}
          value={prompt}
          onChangeText={setPrompt}
        />
        <View style={styles.inputActions}>
          <TouchableOpacity
            style={[styles.actionLink, isDark && styles.actionLinkDark]}
            onPress={() => setPrompt('A beautiful sunset over mountains')}
          >
            <Text style={styles.actionLinkText}>Try example</Text>
          </TouchableOpacity>
          <Text style={[styles.charCount, isDark && styles.charCountDark]}>
            {prompt.length}/1000
          </Text>
        </View>
      </View>

      {/* Custom Style Selector */}
      <View style={[styles.section, isDark && styles.sectionDark]}>
        <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
          Style
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {['realistic', 'artistic', 'anime', '3d'].map((style) => (
            <TouchableOpacity
              key={style}
              style={[
                styles.stylePill,
                selectedStyle === style && styles.stylePillSelected,
                isDark && styles.stylePillDark,
              ]}
              onPress={() => setSelectedStyle(style)}
            >
              <Text
                style={[
                  styles.stylePillText,
                  selectedStyle === style && styles.stylePillTextSelected,
                  isDark && styles.stylePillTextDark,
                ]}
              >
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Custom Generate Button */}
      <TouchableOpacity
        style={[
          styles.generateButton,
          !feature.isReady && styles.generateButtonDisabled,
        ]}
        onPress={handleGenerate}
        disabled={!feature.isReady}
      >
        <Animated.View
          style={{
            opacity: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.8],
            }),
          }}
        >
          {feature.state.isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.generateButtonText}>Generate</Text>
              <Text style={styles.generateButtonSubtext}>
                with {selectedStyle} style
              </Text>
            </>
          )}
        </Animated.View>
      </TouchableOpacity>

      {/* Progress Overlay */}
      {feature.state.isProcessing && (
        <Animated.View
          style={[
            styles.progressOverlay,
            {
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ]}
        >
          <View style={styles.progressContent}>
            <ActivityIndicator size="large" color="#6366F1" />
            <Text style={styles.progressText}>
              Generating your masterpiece...
            </Text>
            <Text style={styles.progressPercent}>
              {feature.state.progress}%
            </Text>
          </View>
        </Animated.View>
      )}

      {/* Result Display */}
      {feature.state.result?.imageUrl && (
        <View style={styles.resultSection}>
          <Text style={[styles.resultTitle, isDark && styles.resultTitleDark]}>
            Your Creation
          </Text>
          <Image
            source={{ uri: feature.state.result.imageUrl }}
            style={styles.resultImage}
            resizeMode="contain"
          />
          <View style={styles.resultActions}>
            <TouchableOpacity
              style={[styles.resultButton, isDark && styles.resultButtonDark]}
              onPress={() => {
                // Save logic
              }}
            >
              <Text style={styles.resultButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.resultButton, isDark && styles.resultButtonDark]}
              onPress={() => {
                // Share logic
              }}
            >
              <Text style={styles.resultButtonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.resultButton, styles.regenerateButton]}
              onPress={() => {
                // Regenerate with same prompt
              }}
            >
              <Text style={styles.resultButtonText}>Regenerate</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#111827',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerDark: {
    backgroundColor: '#1F2937',
  },
  headerIcon: {
    marginBottom: 10,
  },
  headerIconText: {
    fontSize: 48,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerTitleDark: {
    color: '#F9FAFB',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  headerSubtitleDark: {
    color: '#9CA3AF',
  },
  inputSection: {
    marginBottom: 30,
  },
  inputSectionDark: {
    backgroundColor: '#1F2937',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#111827',
  },
  labelDark: {
    color: '#F9FAFB',
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    height: 120,
    marginBottom: 10,
  },
  inputDark: {
    backgroundColor: '#374151',
    borderColor: '#4B5563',
    color: '#F9FAFB',
  },
  inputActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionLink: {
    marginTop: 10,
  },
  actionLinkDark: {
    color: '#818CF8',
  },
  actionLinkText: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '600',
  },
  charCount: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  charCountDark: {
    color: '#6B7280',
  },
  section: {
    marginBottom: 30,
  },
  sectionDark: {
    backgroundColor: '#1F2937',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#111827',
  },
  sectionTitleDark: {
    color: '#F9FAFB',
  },
  horizontalScroll: {
    marginHorizontal: -20,
  },
  stylePill: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  stylePillSelected: {
    backgroundColor: '#EEF2FF',
    borderWidth: 2,
    borderColor: '#6366F1',
  },
  stylePillDark: {
    backgroundColor: '#374151',
  },
  stylePillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  stylePillTextSelected: {
    color: '#4F46E5',
  },
  stylePillTextDark: {
    color: '#F9FAFB',
  },
  generateButton: {
    backgroundColor: '#6366F1',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  generateButtonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0,
  },
  generateButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  generateButtonSubtext: {
    fontSize: 14,
    color: '#E0E7FF',
    marginTop: 4,
  },
  progressOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 15,
  },
  progressPercent: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366F1',
    marginTop: 10,
  },
  resultSection: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 15,
  },
  resultTitleDark: {
    color: '#F9FAFB',
  },
  resultImage: {
    width: '100%',
    height: 400,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  resultActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  resultButton: {
    flex: 1,
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  resultButtonDark: {
    backgroundColor: '#4F46E5',
  },
  regenerateButton: {
    backgroundColor: '#10B981',
  },
  resultButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
```

## Customization Tips

### Colors

Customize the color scheme:

```tsx
const COLORS = {
  primary: '#YOUR_COLOR',
  secondary: '#YOUR_COLOR',
  background: '#YOUR_COLOR',
  text: '#YOUR_COLOR',
};
```

### Animations

Add custom animations:

```tsx
const scaleAnim = useRef(new Animated.Value(1)).current;

const pulseAnimation = Animated.loop(
  Animated.sequence([
    Animated.timing(scaleAnim, {
      toValue: 1.05,
      duration: 150,
      useNativeDriver: true,
    }),
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }),
  ])
);
```

### Responsive Design

Make responsive layouts:

```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SCREEN_WIDTH < 400 ? 15 : 20,
  },
  title: {
    fontSize: SCREEN_WIDTH < 400 ? 24 : 32,
  },
});
```

## Related Examples

- [Single Feature](../basic/text-to-image/)
- [Multiple Features](../../advanced/multiple-features/)
- [Dark Mode](../../advanced/dark-mode/)

---

Last updated: 2025-01-08
