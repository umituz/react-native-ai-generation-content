# Script Generator

Generate scripts for videos, podcasts, and content using AI.

## Features

- Generate video scripts
- Podcast script templates
- Social media content scripts
- Customizable script formats
- Multiple tone and style options

## Installation

This feature is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using the Hook

```tsx
import { useScriptGenerator } from '@umituz/react-native-ai-generation-content';

function ScriptGeneratorScreen() {
  const [prompt, setPrompt] = useState('');

  const feature = useScriptGenerator({
    config: {
      scriptType: 'video',
      tone: 'casual',
      duration: 60, // seconds
      onProcessingStart: () => console.log('Generating script...'),
      onProcessingComplete: (result) => console.log('Complete:', result),
      onError: (error) => console.error('Error:', error),
    },
  });

  return (
    <View>
      <TextInput
        placeholder="What's your script about?"
        value={prompt}
        onChangeText={setPrompt}
        multiline
        numberOfLines={4}
      />

      <ScriptTypeSelector
        selectedType={feature.state.scriptType}
        onSelectType={feature.setScriptType}
      />

      <ToneSelector
        selectedTone={feature.state.tone}
        onSelectTone={feature.setTone}
      />

      <DurationInput
        value={feature.state.duration}
        onChange={feature.setDuration}
      />

      <Button
        title="Generate Script"
        onPress={() => feature.generate(prompt)}
        disabled={!prompt || feature.state.isProcessing}
      />

      {feature.state.isProcessing && (
        <ActivityIndicator />
      )}

      {feature.state.result && (
        <ScriptDisplay
          script={feature.state.result.script}
          onSave={() => saveScript(feature.state.result.script)}
          onShare={() => shareScript(feature.state.result.script)}
        />
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
      featureId="script-generator"
      userId="user-123"
    />
  );
}
```

## Configuration Options

### Feature Config

```tsx
interface ScriptGeneratorFeatureConfig {
  scriptType?: 'video' | 'podcast' | 'social' | 'presentation';
  tone?: 'casual' | 'professional' | 'humorous' | 'dramatic';
  duration?: number; // Target duration in seconds
  language?: string; // Script language (default: 'en')
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: ScriptGeneratorResult) => void;
  onError?: (error: string) => void;
}
```

### Generation Options

```tsx
interface ScriptGeneratorOptions {
  scriptType: 'video' | 'podcast' | 'social' | 'presentation';
  tone: 'casual' | 'professional' | 'humorous' | 'dramatic';
  duration: number; // Target duration in seconds
  includeVisuals?: boolean; // Include visual cues (default: true for video)
  includeNotes?: boolean; // Include production notes (default: false)
}
```

## Script Types

### Video Script

Scripts for videos with visual cues:

```tsx
const result = await feature.generate(prompt, {
  scriptType: 'video',
  tone: 'casual',
  duration: 120,
  includeVisuals: true,
});
```

### Podcast Script

Conversational scripts for podcasts:

```tsx
const result = await feature.generate(prompt, {
  scriptType: 'podcast',
  tone: 'casual',
  duration: 1800, // 30 minutes
});
```

### Social Media Script

Short scripts for social platforms:

```tsx
const result = await feature.generate(prompt, {
  scriptType: 'social',
  tone: 'casual',
  duration: 60, // 1 minute
});
```

### Presentation Script

Professional presentation scripts:

```tsx
const result = await feature.generate(prompt, {
  scriptType: 'presentation',
  tone: 'professional',
  duration: 600, // 10 minutes
});
```

## Tones

### Casual

Conversational and friendly:

```tsx
const result = await feature.generate(prompt, {
  tone: 'casual',
});
```

### Professional

Formal and business-appropriate:

```tsx
const result = await feature.generate(prompt, {
  tone: 'professional',
});
```

### Humorous

Funny and entertaining:

```tsx
const result = await feature.generate(prompt, {
  tone: 'humorous',
});
```

### Dramatic

Emotional and engaging:

```tsx
const result = await feature.generate(prompt, {
  tone: 'dramatic',
});
```

## Usage Flow

1. Enter **Topic** - Describe what the script is about
2. Choose **Script Type** - Select the format
3. Choose **Tone** - Select the tone/style
4. Set **Duration** - Target length
5. Tap **Generate** - Create the script
6. View Result - Read and edit the script
7. Save or Export - Save or export the script

## Component Examples

### Script Type Selector

```tsx
import { GridSelector } from '@umituz/react-native-ai-generation-content';

const scriptTypes = [
  { id: 'video', name: 'Video', description: 'With visual cues' },
  { id: 'podcast', name: 'Podcast', description: 'Conversational' },
  { id: 'social', name: 'Social Media', description: 'Short & engaging' },
  { id: 'presentation', name: 'Presentation', description: 'Professional' },
];

<GridSelector
  options={scriptTypes}
  selectedOption={selectedType}
  onSelectOption={setSelectedType}
/>
```

### Tone Selector

```tsx
import { GridSelector } from '@umituz/react-native-ai-generation-content';

const tones = [
  { id: 'casual', name: 'Casual', description: 'Friendly & relaxed' },
  { id: 'professional', name: 'Professional', description: 'Formal & business' },
  { id: 'humorous', name: 'Humorous', description: 'Funny & entertaining' },
  { id: 'dramatic', name: 'Dramatic', description: 'Emotional & engaging' },
];

<GridSelector
  options={tones}
  selectedOption={selectedTone}
  onSelectOption={setSelectedTone}
/>
```

### Duration Input

```tsx
import { TextInput } from 'react-native';

<TextInput
  placeholder="Duration (seconds)"
  value={String(duration)}
  onChangeText={(value) => setDuration(parseInt(value) || 60)}
  keyboardType="numeric"
/>
```

### Script Display

```tsx
import { ScrollView, Text } from 'react-native';

<ScrollView style={{ padding: 16 }}>
  <Text style={{ fontSize: 16, lineHeight: 24 }}>
    {script}
  </Text>
</ScrollView>
```

## Use Cases

### YouTube Videos

```tsx
// Generate YouTube video scripts
const result = await feature.generate('How to cook pasta', {
  scriptType: 'video',
  tone: 'casual',
  duration: 600, // 10 minutes
});
```

### Podcast Episodes

```tsx
// Generate podcast episode scripts
const result = await feature.generate('The future of AI', {
  scriptType: 'podcast',
  tone: 'casual',
  duration: 3600, // 1 hour
});
```

### TikTok/Reels

```tsx
// Generate short-form content
const result = await feature.generate('Quick workout tips', {
  scriptType: 'social',
  tone: 'energetic',
  duration: 60,
});
```

### Business Presentations

```tsx
// Generate presentation scripts
const result = await feature.generate('Q4 business review', {
  scriptType: 'presentation',
  tone: 'professional',
  duration: 1200, // 20 minutes
});
```

## Best Practices

1. **Clear Prompts**: Be specific about the topic and key points
2. **Duration**: Set realistic duration targets
3. **Tone Matching**: Match tone to your audience and purpose
4. **Editing**: Always review and edit generated scripts
5. **Visual Cues**: Use visual cues for video scripts

## Related Features

- [Text to Voice](../text-to-voice) - Convert script to speech
- [Text to Video](../text-to-video) - Generate video from script
- [Audio Generation](../audio-generation) - Generate audio content

## License

MIT
