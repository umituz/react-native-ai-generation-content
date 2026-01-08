# State Management Integration

Integrating AI generation features with Redux, MobX, and Zustand.

## Overview

This example shows how to integrate AI features with popular state management solutions:
- Redux Toolkit
- MobX
- Zustand

## Redux Toolkit Integration

### Store Setup

```tsx
// store/features/aiGenerationSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TextToImageFeature, GenerationResult } from '@umituz/react-native-ai-generation-content';

interface AIGenerationState {
  textToImage: {
    prompt: string;
    selectedStyle: string;
    result: GenerationResult | null;
    isProcessing: boolean;
    progress: number;
    error: string | null;
  };
}

const initialState: AIGenerationState = {
  textToImage: {
    prompt: '',
    selectedStyle: 'realistic',
    result: null,
    isProcessing: false,
    progress: 0,
    error: null,
  },
};

// Async thunks
export const generateImage = createAsyncThunk(
  'aiGeneration/generateImage',
  async (
    { prompt, style }: { prompt: string; style: string },
    { rejectWithValue }
  ) => {
    try {
      const feature = new TextToImageFeature({
        userId: 'user-123',
        config: { model: 'imagen-3' },
      });

      const result = await feature.generate({ prompt, style });
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const aiGenerationSlice = createSlice({
  name: 'aiGeneration',
  initialState,
  reducers: {
    setPrompt: (state, action) => {
      state.textToImage.prompt = action.payload;
    },
    setStyle: (state, action) => {
      state.textToImage.selectedStyle = action.payload;
    },
    setProgress: (state, action) => {
      state.textToImage.progress = action.payload;
    },
    resetResult: (state) => {
      state.textToImage.result = null;
      state.textToImage.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Generate image
      .addCase(generateImage.pending, (state) => {
        state.textToImage.isProcessing = true;
        state.textToImage.error = null;
        state.textToImage.progress = 0;
      })
      .addCase(generateImage.fulfilled, (state, action) => {
        state.textToImage.isProcessing = false;
        state.textToImage.result = action.payload;
        state.textToImage.progress = 100;
      })
      .addCase(generateImage.rejected, (state, action) => {
        state.textToImage.isProcessing = false;
        state.textToImage.error = action.payload as string;
      });
  },
});

export const { setPrompt, setStyle, setProgress, resetResult } =
  aiGenerationSlice.actions;

export default aiGenerationSlice.reducer;

// Selectors
export const selectTextToImage = (state: RootState) =>
  state.aiGeneration.textToImage;
export const selectIsProcessing = (state: RootState) =>
  state.aiGeneration.textToImage.isProcessing;
export const selectResult = (state: RootState) =>
  state.aiGeneration.textToImage.result;
```

### Component Integration

```tsx
// components/ReduxTextToImage.tsx
import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { generateImage, setPrompt, setStyle, resetResult, selectTextToImage, selectIsProcessing, selectResult } from '../store/features/aiGenerationSlice';

export default function ReduxTextToImage() {
  const dispatch = useDispatch();
  const { prompt, selectedStyle, result, isProcessing, progress, error } =
    useSelector(selectTextToImage);

  const handleGenerate = () => {
    dispatch(generateImage({ prompt, style: selectedStyle }));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your prompt..."
        onChangeText={(text) => dispatch(setPrompt(text))}
        value={prompt}
      />

      <View style={styles.styleSelector}>
        {['realistic', 'artistic', 'anime'].map((style) => (
          <TouchableOpacity
            key={style}
            style={[
              styles.styleButton,
              selectedStyle === style && styles.styleButtonSelected,
            ]}
            onPress={() => dispatch(setStyle(style))}
          >
            <Text style={styles.styleText}>{style}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, isProcessing && styles.buttonDisabled]}
        onPress={handleGenerate}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Generate</Text>
        )}
      </TouchableOpacity>

      {isProcessing && (
        <Text style={styles.progressText}>Progress: {progress}%</Text>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {result?.imageUrl && (
        <View style={styles.resultContainer}>
          <Image source={{ uri: result.imageUrl }} style={styles.resultImage} />
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => dispatch(resetResult())}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
```

## MobX Integration

### Store Setup

```tsx
// stores/AIGenerationStore.ts
import { makeAutoObservable, runInAction } from 'mobx';
import { TextToImageFeature, GenerationResult } from '@umituz/react-native-ai-generation-content';

class AIGenerationStore {
  prompt = '';
  selectedStyle = 'realistic';
  result: GenerationResult | null = null;
  isProcessing = false;
  progress = 0;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setPrompt(prompt: string) {
    this.prompt = prompt;
  }

  setStyle(style: string) {
    this.selectedStyle = style;
  }

  setProgress(progress: number) {
    this.progress = progress;
  }

  async generate() {
    try {
      runInAction(() => {
        this.isProcessing = true;
        this.error = null;
        this.progress = 0;
      });

      const feature = new TextToImageFeature({
        userId: 'user-123',
        config: { model: 'imagen-3' },
      });

      const result = await feature.generate({
        prompt: this.prompt,
        style: this.selectedStyle,
      });

      runInAction(() => {
        this.result = result;
        this.isProcessing = false;
        this.progress = 100;
      });
    } catch (error: any) {
      runInAction(() => {
        this.isProcessing = false;
        this.error = error.message;
      });
    }
  }

  reset() {
    this.prompt = '';
    this.result = null;
    this.error = null;
    this.progress = 0;
  }
}

export const aiGenerationStore = new AIGenerationStore();
```

### Component Integration

```tsx
// components/MobXTextToImage.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import { aiGenerationStore } from '../stores/AIGenerationStore';

export default observer(function MobXTextToImage() {
  const { prompt, selectedStyle, result, isProcessing, progress, error } = aiGenerationStore;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your prompt..."
        onChangeText={(text) => aiGenerationStore.setPrompt(text)}
        value={prompt}
      />

      <View style={styles.styleSelector}>
        {['realistic', 'artistic', 'anime'].map((style) => (
          <TouchableOpacity
            key={style}
            style={[
              styles.styleButton,
              selectedStyle === style && styles.styleButtonSelected,
            ]}
            onPress={() => aiGenerationStore.setStyle(style)}
          >
            <Text style={styles.styleText}>{style}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, isProcessing && styles.buttonDisabled]}
        onPress={() => aiGenerationStore.generate()}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Generate</Text>
        )}
      </TouchableOpacity>

      {isProcessing && (
        <Text style={styles.progressText}>Progress: {progress}%</Text>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {result?.imageUrl && (
        <View style={styles.resultContainer}>
          <Image source={{ uri: result.imageUrl }} style={styles.resultImage} />
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => aiGenerationStore.reset()}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
});
```

## Zustand Integration

### Store Setup

```tsx
// stores/useAIGenerationStore.ts
import { create } from 'zustand';
import { TextToImageFeature, GenerationResult } from '@umituz/react-native-ai-generation-content';

interface AIGenerationState {
  prompt: string;
  selectedStyle: string;
  result: GenerationResult | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;

  // Actions
  setPrompt: (prompt: string) => void;
  setStyle: (style: string) => void;
  setProgress: (progress: number) => void;
  generate: () => Promise<void>;
  reset: () => void;
}

export const useAIGenerationStore = create<AIGenerationState>((set, get) => ({
  prompt: '',
  selectedStyle: 'realistic',
  result: null,
  isProcessing: false,
  progress: 0,
  error: null,

  setPrompt: (prompt) => set({ prompt }),
  setStyle: (selectedStyle) => set({ selectedStyle }),
  setProgress: (progress) => set({ progress }),

  generate: async () => {
    const { prompt, selectedStyle } = get();

    try {
      set({ isProcessing: true, error: null, progress: 0 });

      const feature = new TextToImageFeature({
        userId: 'user-123',
        config: { model: 'imagen-3' },
      });

      const result = await feature.generate({ prompt, style: selectedStyle });

      set({ result, isProcessing: false, progress: 100 });
    } catch (error: any) {
      set({ isProcessing: false, error: error.message });
    }
  },

  reset: () => set({
    prompt: '',
    result: null,
    error: null,
    progress: 0,
  }),
}));
```

### Component Integration

```tsx
// components/ZustandTextToImage.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAIGenerationStore } from '../stores/useAIGenerationStore';

export default function ZustandTextToImage() {
  const { prompt, selectedStyle, result, isProcessing, progress, error, setPrompt, setStyle, generate, reset } = useAIGenerationStore();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your prompt..."
        onChangeText={setPrompt}
        value={prompt}
      />

      <View style={styles.styleSelector}>
        {['realistic', 'artistic', 'anime'].map((style) => (
          <TouchableOpacity
            key={style}
            style={[
              styles.styleButton,
              selectedStyle === style && styles.styleButtonSelected,
            ]}
            onPress={() => setStyle(style)}
          >
            <Text style={styles.styleText}>{style}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, isProcessing && styles.buttonDisabled]}
        onPress={generate}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Generate</Text>
        )}
      </TouchableOpacity>

      {isProcessing && (
        <Text style={styles.progressText}>Progress: {progress}%</Text>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {result?.imageUrl && (
        <View style={styles.resultContainer}>
          <Image source={{ uri: result.imageUrl }} style={styles.resultImage} />
          <TouchableOpacity
            style={styles.resetButton}
            onPress={reset}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
```

## Comparison

| Feature | Redux | MobX | Zustand |
|---------|-------|------|---------|
| Boilerplate | High | Low | Low |
| Learning Curve | Steep | Moderate | Easy |
| Performance | Excellent | Good | Excellent |
| DevTools | Excellent | Good | Good |
| Bundle Size | Large | Medium | Small |
| TypeScript | Excellent | Good | Excellent |

## Best Practices

1. **Store Organization**: Keep AI generation separate from other state
2. **Normalization**: Store results normalized by ID for large lists
3. **Optimistic Updates**: Update UI immediately, rollback on error
4. **Selective Subscriptions**: Only subscribe to needed state (Redux/Zustand)
5. **Persistence**: Persist results to AsyncStorage for offline viewing
6. **Cache Invalidation**: Implement cache invalidation strategy
7. **Error Boundaries**: Wrap components in error boundaries

## Persistence Example

```tsx
// Store persistence with AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'ai_generations';

export const persistGenerations = async (generations: GenerationResult[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(generations));
  } catch (error) {
    console.error('Failed to persist generations:', error);
  }
};

export const loadGenerations = async (): Promise<GenerationResult[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load generations:', error);
    return [];
  }
};
```

## Related Examples

- [Text to Image](../../basic/text-to-image/)
- [Multiple Features](../../advanced/multiple-features/)
- [Navigation](../navigation/)

---

Last updated: 2025-01-08
