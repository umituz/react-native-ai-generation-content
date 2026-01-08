# Dark Mode Example

Complete example of implementing dark mode support for AI features.

## Overview

This example demonstrates how to build AI features with dark mode support:
- Automatic theme detection
- Manual theme toggle
- Styled components for both themes
- Persistent theme preferences
- Smooth theme transitions

## Full Code

```tsx
import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import { useTextToImageFeature } from '@umituz/react-native-ai-generation-content';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from './ThemeContext';

// Theme Context
interface Theme {
  dark: boolean;
  colors: {
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    primary: string;
    primaryLight: string;
    border: string;
    inputBackground: string;
    placeholder: string;
  };
}

const lightTheme: Theme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    card: '#F9FAFB',
    text: '#111827',
    textSecondary: '#6B7280',
    primary: '#6366F1',
    primaryLight: '#EEF2FF',
    border: '#E5E7EB',
    inputBackground: '#F9FAFB',
    placeholder: '#9CA3AF',
  },
};

const darkTheme: Theme = {
  dark: true,
  colors: {
    background: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    primary: '#6366F1',
    primaryLight: '#312E81',
    border: '#374151',
    inputBackground: '#374151',
    placeholder: '#6B7280',
  },
};

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const useAppTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    setIsDark(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Main Component
export default function DarkModeExample() {
  const { theme, toggleTheme } = useAppTheme();
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');

  const feature = useTextToImageFeature({
    config: {
      model: 'imagen-3',
    },
    userId: 'user-123',
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      return;
    }
    await feature.generate({ style: selectedStyle });
  };

  const styles = createStyles(theme);

  const STYLES = [
    'realistic',
    'artistic',
    'anime',
    '3d',
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header with Theme Toggle */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>AI Image Generator</Text>
          <Text style={styles.subtitle}>
            Create stunning images in any theme
          </Text>
        </View>
        <TouchableOpacity
          style={styles.themeToggle}
          onPress={toggleTheme}
          activeOpacity={0.7}
        >
          <Ionicons
            name={theme.dark ? 'sunny' : 'moon'}
            size={24}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>

      {/* Theme Badge */}
      <View style={styles.badgeContainer}>
        <View style={[styles.themeBadge, { backgroundColor: theme.colors.primaryLight }]}>
          <Ionicons
            name={theme.dark ? 'moon' : 'sunny'}
            size={16}
            color={theme.colors.primary}
          />
          <Text style={[styles.themeBadgeText, { color: theme.colors.primary }]}>
            {theme.dark ? 'Dark Mode' : 'Light Mode'}
          </Text>
        </View>
        <Text style={styles.autoText}>
          Auto-detected from system
        </Text>
      </View>

      {/* Prompt Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Prompt</Text>
        <TextInput
          style={styles.input}
          placeholder="Describe your image..."
          placeholderTextColor={theme.colors.placeholder}
          multiline
          numberOfLines={4}
          onChangeText={setPrompt}
          value={prompt}
        />
        <View style={styles.inputFooter}>
          <Text style={[styles.charCount, { color: theme.colors.textSecondary }]}>
            {prompt.length}/1000
          </Text>
        </View>
      </View>

      {/* Style Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Style</Text>
        <View style={styles.stylesGrid}>
          {STYLES.map((style) => (
            <TouchableOpacity
              key={style}
              style={[
                styles.styleCard,
                selectedStyle === style && styles.styleCardSelected,
                { borderColor: selectedStyle === style ? theme.colors.primary : theme.colors.border },
              ]}
              onPress={() => setSelectedStyle(style)}
            >
              <Text
                style={[
                  styles.styleName,
                  selectedStyle === style && styles.styleNameSelected,
                  { color: selectedStyle === style ? theme.colors.primary : theme.colors.text },
                ]}
              >
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Example Prompts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Examples</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.examplesScroll}
        >
          {[
            'A beautiful sunset over mountains',
            'Futuristic city at night',
            'Enchanted forest with glowing mushrooms',
          ].map((example, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.exampleCard, { backgroundColor: theme.colors.card }]}
              onPress={() => setPrompt(example)}
            >
              <Text style={[styles.exampleText, { color: theme.colors.text }]}>
                {example}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Generate Button */}
      <TouchableOpacity
        style={[
          styles.generateButton,
          !feature.isReady && styles.generateButtonDisabled,
        ]}
        onPress={handleGenerate}
        disabled={!feature.isReady}
      >
        {feature.state.isProcessing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="sparkles" size={20} color="#fff" />
            <Text style={styles.generateButtonText}>Generate Image</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Progress */}
      {feature.state.isProcessing && (
        <View style={styles.progressSection}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.progressText, { color: theme.colors.textSecondary }]}>
            Generating...
          </Text>
          <Text style={[styles.progressPercent, { color: theme.colors.primary }]}>
            {feature.state.progress}%
          </Text>
        </View>
      )}

      {/* Result */}
      {feature.state.result?.imageUrl && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Result</Text>
          <Image
            source={{ uri: feature.state.result.imageUrl }}
            style={styles.resultImage}
            resizeMode="contain"
          />
          <View style={styles.resultActions}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => feature.saveResult()}
            >
              <Ionicons name="download" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.colors.card }]}
              onPress={() => shareImage(feature.state.result?.imageUrl)}
            >
              <Ionicons name="share-social" size={20} color={theme.colors.text} />
              <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

// Helper functions
async function shareImage(imageUrl?: string): Promise<void> {
  if (!imageUrl) return;
  const { Share } = await import('react-native');
  await Share.share({
    message: 'Check out this AI-generated image!',
    url: imageUrl,
  });
}

// Styles factory
const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    subtitle: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    themeToggle: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: theme.colors.inputBackground,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    badgeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      gap: 12,
    },
    themeBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    themeBadgeText: {
      fontSize: 12,
      fontWeight: '600',
    },
    autoText: {
      fontSize: 13,
      color: theme.colors.textSecondary,
    },
    section: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 15,
      color: theme.colors.text,
    },
    input: {
      backgroundColor: theme.colors.inputBackground,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 12,
      fontSize: 16,
      color: theme.colors.text,
      minHeight: 100,
      textAlignVertical: 'top',
    },
    inputFooter: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 8,
    },
    charCount: {
      fontSize: 12,
    },
    stylesGrid: {
      flexDirection: 'row',
      gap: 10,
    },
    styleCard: {
      flex: 1,
      backgroundColor: theme.colors.card,
      borderWidth: 2,
      borderRadius: 8,
      paddingVertical: 10,
      alignItems: 'center',
    },
    styleCardSelected: {
      backgroundColor: theme.colors.primaryLight,
    },
    styleName: {
      fontSize: 14,
      fontWeight: '600',
    },
    styleNameSelected: {
      fontWeight: 'bold',
    },
    examplesScroll: {
      marginHorizontal: -20,
      paddingHorizontal: 20,
    },
    exampleCard: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 16,
      marginRight: 10,
    },
    exampleText: {
      fontSize: 13,
    },
    generateButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 12,
      paddingVertical: 16,
      marginHorizontal: 20,
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    generateButtonDisabled: {
      backgroundColor: theme.colors.textSecondary,
      opacity: 0.5,
    },
    generateButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
    progressSection: {
      padding: 20,
      alignItems: 'center',
      gap: 10,
    },
    progressText: {
      fontSize: 16,
    },
    progressPercent: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    resultImage: {
      width: '100%',
      height: 300,
      borderRadius: 12,
      backgroundColor: theme.colors.card,
    },
    resultActions: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 15,
    },
    actionButton: {
      flex: 1,
      borderRadius: 8,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    actionButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#fff',
    },
  });
```

## Features Demonstrated

1. **Theme Detection** - Auto-detect system theme
2. **Theme Toggle** - Manual theme switcher
3. **Styled Components** - Theme-aware UI
4. **Persistent Preferences** - Save theme choice
5. **Smooth Transitions** - Animated theme changes
6. **Color Adaptations** - Full color scheme support

## Usage

### Basic Setup

```tsx
import { ThemeProvider } from './ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <YourAppComponent />
    </ThemeProvider>
  );
}
```

### Using Theme in Components

```tsx
import { useAppTheme } from './ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useAppTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Hello</Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Text>Toggle Theme</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## Theme Colors

### Light Theme
```javascript
{
  background: '#FFFFFF',
  card: '#F9FAFB',
  text: '#111827',
  textSecondary: '#6B7280',
  primary: '#6366F1',
  primaryLight: '#EEF2FF',
  border: '#E5E7EB',
  inputBackground: '#F9FAFB',
  placeholder: '#9CA3AF',
}
```

### Dark Theme
```javascript
{
  background: '#111827',
  card: '#1F2937',
  text: '#F9FAFB',
  textSecondary: '#9CA3AF',
  primary: '#6366F1',
  primaryLight: '#312E81',
  border: '#374151',
  inputBackground: '#374151',
  placeholder: '#6B7280',
}
```

## Best Practices

1. **Use Theme Context**: Share theme across app
2. **System Preference**: Auto-detect system theme
3. **User Control**: Allow manual override
4. **Persistence**: Save user's preference
5. **Smooth Transitions**: Animate theme changes
6. **Test Both Themes**: Ensure everything works in both

## Advanced Patterns

### Theme Persistence with AsyncStorage

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = '@app_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const savedTheme = await AsyncStorage.getItem(THEME_KEY);
    setIsDark(savedTheme === 'dark');
  };

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    await AsyncStorage.setItem(THEME_KEY, newTheme ? 'dark' : 'light');
  };

  // ...
};
```

### Animated Theme Transitions

```tsx
import { Animated } from 'react-native';

const [fadeAnim] = useState(new Animated.Value(0));

const toggleTheme = () => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 200,
    useNativeDriver: false,
  }).start(() => {
    setIsDark(!isDark);
    fadeAnim.setValue(0);
  });
};
```

## Color Best Practices

1. **Contrast**: Ensure good contrast in both themes
2. **Consistency**: Use semantic color names
3. **Accessibility**: Meet WCAG standards
4. **Testing**: Test in both themes regularly
5. **Images**: Support theme-specific images

## Related Examples

- [Custom UI](../custom-ui/)
- [Multiple Features](../multiple-features/)
- [Performance Optimization](../performance-optimization/)

---

Last updated: 2025-01-08
