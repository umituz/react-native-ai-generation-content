# Audio Generation

Generate audio content using AI.

## Features

- Generate various audio content types
- Music generation
- Sound effects creation
- Voice narration
- Customizable parameters

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useAudioGeneration } from '@umituz/react-native-ai-generation-content';

function AudioGenerationScreen() {
  const [prompt, setPrompt] = useState('');

  const feature = useAudioGeneration({
    config: {
      audioType: 'music',
      duration: 30, // seconds
      onProcessingStart: () => console.log('Generating audio...'),
      onProcessingComplete: (result) => console.log('Complete:', result),
      onError: (error) => console.error('Error:', error),
    },
  });

  const playAudio = async () => {
    if (feature.state.audioUrl) {
      const { sound } = await Audio.Sound.createAsync(
        { uri: feature.state.audioUrl },
        { shouldPlay: true }
      );
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Describe the audio you want to generate..."
        value={prompt}
        onChangeText={setPrompt}
        multiline
        numberOfLines={4}
      />

      <AudioTypeSelector
        selectedType={feature.state.audioType}
        onSelectType={feature.setAudioType}
      />

      <DurationSlider
        value={feature.state.duration}
        onChange={feature.setDuration}
      />

      <Button
        title="Generate Audio"
        onPress={() => feature.generate(prompt)}
        disabled={!prompt || feature.state.isProcessing}
      />

      {feature.state.isProcessing && (
        <ActivityIndicator />
      )}

      {feature.state.audioUrl && (
        <View>
          <Button title="Play Audio" onPress={playAudio} />
          <Button title="Save Audio" onPress={() => feature.saveAudio()} />
        </View>
      )}
    </View>
  );
}
```

### Using the Unified AI Feature Screen

```tsx
import { AIFeatureScreen } from '@umituz/react-native-ai-generation-content';

function App() {
  return (
    <AIFeatureScreen
      featureId="audio-generation"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface AudioGenerationFeatureConfig {
  audioType?: 'music' | 'sfx' | 'ambient' | 'voice';
  duration?: number; // Duration in seconds
  genre?: string; // Music genre (for music type)
  mood?: string; // Audio mood
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: AudioGenerationResult) => void;
  onError?: (error: string) => void;
}
```

### Generation Options

```tsx
interface AudioGenerationOptions {
  audioType: 'music' | 'sfx' | 'ambient' | 'voice';
  prompt: string; // Description of desired audio
  duration: number; // Duration in seconds
  genre?: string; // e.g., 'rock', 'jazz', 'electronic'
  mood?: string; // e.g., 'happy', 'sad', 'energetic'
  tempo?: number; // BPM for music (default: 120)
}
```

## Audio Types

### Music

Generate musical compositions:

```tsx
const result = await feature.generate('Upbeat background music', {
  audioType: 'music',
  genre: 'pop',
  mood: 'happy',
  tempo: 120,
  duration: 30,
});
```

### Sound Effects

Generate sound effects:

```tsx
const result = await feature.generate('Explosion sound', {
  audioType: 'sfx',
  duration: 5,
});
```

### Ambient

Generate ambient/background audio:

```tsx
const result = await feature.generate('Forest ambience with birds', {
  audioType: 'ambient',
  duration: 60,
});
```

### Voice

Generate voice content:

```tsx
const result = await feature.generate('Narrator voice introducing topic', {
  audioType: 'voice',
  duration: 10,
});
```

## Usage Flow

1. Enter **Description** - Describe the audio you want
2. Choose **Audio Type** - Select music, SFX, ambient, or voice
3. Set **Duration** - Choose length
4. Configure **Options** - Set genre, mood, tempo (for music)
5. Tap **Generate** - Create the audio
6. Play & Save - Listen to the result and save

## Component Examples

### Audio Type Selector

```tsx
import { GridSelector } from '@umituz/react-native-ai-generation-content';

const audioTypes = [
  { id: 'music', name: 'Music', description: 'Musical compositions' },
  { id: 'sfx', name: 'Sound Effects', description: 'SFX and foley' },
  { id: 'ambient', name: 'Ambient', description: 'Background audio' },
  { id: 'voice', name: 'Voice', description: 'Voice content' },
];

<GridSelector
  options={audioTypes}
  selectedOption={selectedType}
  onSelectOption={setSelectedType}
/>
```

### Genre Selector (for Music)

```tsx
import { GridSelector } from '@umituz/react-native-ai-generation-content';

const genres = [
  { id: 'rock', name: 'Rock' },
  { id: 'pop', name: 'Pop' },
  { id: 'jazz', name: 'Jazz' },
  { id: 'electronic', name: 'Electronic' },
  { id: 'classical', name: 'Classical' },
  { id: 'hiphop', name: 'Hip Hop' },
];

<GridSelector
  options={genres}
  selectedOption={selectedGenre}
  onSelectOption={setSelectedGenre}
/>
```

### Mood Selector

```tsx
import { GridSelector } from '@umituz/react-native-ai-generation-content';

const moods = [
  { id: 'happy', name: 'Happy' },
  { id: 'sad', name: 'Sad' },
  { id: 'energetic', name: 'Energetic' },
  { id: 'calm', name: 'Calm' },
  { id: 'dramatic', name: 'Dramatic' },
  { id: 'romantic', name: 'Romantic' },
];

<GridSelector
  options={moods}
  selectedOption={selectedMood}
  onSelectOption={setSelectedMood}
/>
```

### Duration Slider

```tsx
import { Slider } from 'react-native';

<Slider
  minimumValue={5}
  maximumValue={120}
  step={5}
  value={duration}
  onValueChange={setDuration}
/>

<Text>Duration: {duration} seconds</Text>
```

### Audio Player

```tsx
import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';

const [sound, setSound] = useState<Sound | null>(null);
const [isPlaying, setIsPlaying] = useState(false);

const playAudio = async () => {
  const { sound } = await Audio.Sound.createAsync(
    { uri: audioUrl },
    { shouldPlay: true }
  );
  setSound(sound);
  setIsPlaying(true);

  sound.setOnPlaybackStatusUpdate((status) => {
    if (status.isLoaded && status.didJustFinish) {
      setIsPlaying(false);
    }
  });
};

const stopAudio = async () => {
  if (sound) {
    await sound.stopAsync();
    setIsPlaying(false);
  }
};

useEffect(() => {
  return sound ? () => sound.unloadAsync() : undefined;
}, [sound]);
```

## Use Cases

### Background Music

```tsx
// Generate background music for videos
const result = await feature.generate('Upbeat background music', {
  audioType: 'music',
  genre: 'pop',
  mood: 'energetic',
  duration: 60,
});
```

### Sound Effects

```tsx
// Create sound effects for games or videos
const result = await feature.generate('Magic spell sound', {
  audioType: 'sfx',
  duration: 3,
});
```

### Ambient Sounds

```tsx
// Generate ambient backgrounds
const result = await feature.generate('Ocean waves with seagulls', {
  audioType: 'ambient',
  duration: 120,
});
```

### Podcast Intro

```tsx
// Generate podcast intro music
const result = await feature.generate('Podcast intro music', {
  audioType: 'music',
  genre: 'electronic',
  mood: 'energetic',
  duration: 15,
});
```

## Best Practices

1. **Descriptive Prompts**: Be specific about the audio you want
2. **Duration**: Start with shorter durations for testing
3. **Genre Matching**: Match genre to your use case
4. **Mood Selection**: Choose appropriate mood for your content
5. **Multiple Takes**: Generate multiple versions to choose from

## Related Features

- [Text to Voice](../text-to-voice) - Convert text to speech
- [Script Generator](../script-generator) - Generate audio scripts
- [Text to Video](../text-to-video) - Generate videos with audio

## License

MIT
