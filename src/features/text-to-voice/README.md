# Text to Voice

Convert text to natural-sounding speech using AI.

## Features

- Convert text to lifelike speech
- Multiple voice options and languages
- Adjustable speed and pitch
- Support for long-form text
- Natural intonation and expression

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useTextToVoiceFeature } from '@umituz/react-native-ai-generation-content';

function TextToVoiceScreen() {
  const feature = useTextToVoiceFeature({
    config: {
      model: 'chirp-3',
      onTextChange: (text) => console.log('Text changed:', text),
      onProcessingStart: () => console.log('Starting generation...'),
      onProcessingComplete: (result) => console.log('Complete:', result),
      onError: (error) => console.error('Error:', error),
    },
    userId: 'user-123',
  });

  const [sound, setSound] = useState<Sound | null>(null);

  const playAudio = async () => {
    if (feature.state.audioUrl) {
      const { sound } = await Audio.Sound.createAsync(
        { uri: feature.state.audioUrl },
        { shouldPlay: true }
      );
      setSound(sound);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter text to convert to speech..."
        onChangeText={feature.setText}
        value={feature.state.text}
        multiline
        numberOfLines={4}
      />

      <VoiceSelector
        selectedVoice={feature.state.voice}
        onSelectVoice={feature.setVoice}
      />

      <Button
        title="Generate Speech"
        onPress={() => feature.generate()}
        disabled={!feature.isReady}
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
      featureId="text-to-voice"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface TextToVoiceFeatureConfig {
  model?: string; // AI model to use (default: 'chirp-3')
  defaultVoice?: string; // Default voice ID
  defaultSpeed?: number; // Speech speed (0.25 - 4.0, default: 1.0)
  defaultPitch?: number; // Pitch adjustment (-20.0 - 20.0, default: 0)
  onTextChange?: (text: string) => void;
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: TextToVoiceResult) => void;
  onError?: (error: string) => void;
}
```

### Generation Options

```tsx
interface TextToVoiceOptions {
  voice: string; // Voice ID
  speed?: number; // Speech rate (0.25 - 4.0)
  pitch?: number; // Pitch adjustment (-20.0 - 20.0)
  language?: string; // Language code (e.g., 'en-US', 'es-ES')
}
```

## Available Voices

### English Voices

```tsx
const englishVoices = [
  { id: 'en-US-Neural2-A', name: 'Female (American)', gender: 'female' },
  { id: 'en-US-Neural2-B', name: 'Male (American)', gender: 'male' },
  { id: 'en-GB-Neural2-A', name: 'Female (British)', gender: 'female' },
  { id: 'en-GB-Neural2-B', name: 'Male (British)', gender: 'male' },
];
```

### Multi-Language Voices

```tsx
const voices = [
  { id: 'es-ES-Neural2-A', name: 'Spanish (Female)', language: 'es-ES' },
  { id: 'fr-FR-Neural2-A', name: 'French (Female)', language: 'fr-FR' },
  { id: 'de-DE-Neural2-A', name: 'German (Female)', language: 'de-DE' },
  { id: 'it-IT-Neural2-A', name: 'Italian (Female)', language: 'it-IT' },
  { id: 'ja-JP-Neural2-A', name: 'Japanese (Female)', language: 'ja-JP' },
  { id: 'ko-KR-Neural2-A', name: 'Korean (Female)', language: 'ko-KR' },
  { id: 'zh-CN-Neural2-A', name: 'Chinese (Female)', language: 'zh-CN' },
];
```

## Component Examples

### Voice Selector

```tsx
import { GridSelector } from '@umituz/react-native-ai-generation-content';

const voices = [
  { id: 'voice-1', name: 'Sarah', description: 'American English (Female)' },
  { id: 'voice-2', name: 'John', description: 'American English (Male)' },
  { id: 'voice-3', name: 'Emma', description: 'British English (Female)' },
];

<GridSelector
  options={voices}
  selectedOption={selectedVoice}
  onSelectOption={setSelectedVoice}
/>
```

### Speed Control

```tsx
import { Slider } from 'react-native';

<Slider
  minimumValue={0.25}
  maximumValue={4.0}
  step={0.25}
  value={speed}
  onValueChange={setSpeed}
/>

<Text>Speed: {speed}x</Text>
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

useEffect(() => {
  return sound ? () => sound.unloadAsync() : undefined;
}, [sound]);
```

## Example Texts

```tsx
const exampleTexts = [
  'Welcome to our amazing product! We\'re excited to have you here.',
  'Once upon a time, in a land far away, there lived a wise old wizard.',
  'Breaking news: Scientists have made a groundbreaking discovery.',
  'The sun was setting over the horizon, painting the sky in orange and pink.',
  'Transform your business with our innovative solutions.',
];
```

## Advanced Usage

### Custom Voice Options

```tsx
const result = await feature.generate({
  voice: 'en-US-Neural2-A',
  speed: 1.2,
  pitch: 2.0,
  language: 'en-US',
});
```

### Long-Form Text

```tsx
// For long texts, consider chunking
const longText = '...'; // Your long text
const chunks = longText.match(/.{1,5000}/g) || [];

for (const chunk of chunks) {
  const result = await feature.generate({ text: chunk });
  // Process each chunk
}
```

### SSML Support

```tsx
// Some models support SSML for advanced control
const ssmlText = `
  <speak>
    <p>Hello <break time="1s"/> world!</p>
    <p>This is <emphasis level="strong">important</emphasis>.</p>
  </speak>
`;

const result = await feature.generate({ text: ssmlText, useSSML: true });
```

## Best Practices

1. **Text Length**: Keep text under 5000 characters for best results
2. **Voice Selection**: Choose voice that matches your content tone
3. **Speed**: Use 0.8-1.2 speed for most natural speech
4. **Punctuation**: Use proper punctuation for natural pauses
5. **Testing**: Test different voices to find the best match

## Use Cases

### Audiobook Narration

```tsx
const result = await feature.generate({
  voice: 'en-GB-Neural2-B',
  speed: 0.9,
  pitch: 0,
});
```

### Voice Assistant

```tsx
const result = await feature.generate({
  voice: 'en-US-Neural2-A',
  speed: 1.1,
  pitch: 1.0,
});
```

### Accessibility

```tsx
const result = await feature.generate({
  voice: 'en-US-Neural2-A',
  speed: 1.0,
  pitch: 0,
});
```

## Error Handling

```tsx
const { state, generate } = useTextToVoiceFeature({ ...config });

useEffect(() => {
  if (state.error) {
    Alert.alert('Generation Failed', state.error);
  }
}, [state.error]);
```

## Related Features

- [Text to Image](../text-to-image) - Generate images from text
- [Audio Generation](../audio-generation) - Generate audio content
- [Script Generator](../script-generator) - Generate scripts for voiceovers

## License

MIT
