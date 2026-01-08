# Audio Generation Feature

Generate audio content using AI.

## 📍 Import Path

```typescript
import { useAudioGenerationFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/audio-generation/`

## 🎯 Feature Purpose

Generate various audio content types including music, sound effects, ambient backgrounds, and voice content using AI. Customize genre, mood, tempo, and duration for professional-quality audio creation.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Creating background music for videos
- Generating sound effects for games/apps
- Producing ambient background audio
- Creating voice content
- Podcast intro/outro music

❌ **When NOT to Use:**
- Converting text to speech (use Text to Voice)
- Generating voiceovers (use Text to Voice)
- Audio editing or mixing (use audio editing software)
- Music composition assistance

### Implementation Strategy

1. **Enter prompt** describing desired audio
2. **Choose audio type** (music, sfx, ambient, voice)
3. **Set duration** for audio length
4. **Configure options** (genre, mood, tempo for music)
5. **Generate audio** with progress tracking
6. **Preview result** and offer regeneration
7. **Save or share** final audio

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Input Requirements
- **MUST** provide descriptive text prompt
- **MUST** specify audio type
- **MUST** set valid duration (5-120 seconds recommended)
- **MUST NOT** exceed maximum duration limits
- **MUST NOT** use copyrighted material in prompts

### 2. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** specify `audioType` (music, sfx, ambient, voice)
- **MUST** implement `onError` callback
- **MUST** implement audio playback functionality
- **MUST** handle file saving locally

### 3. State Management
- **MUST** check `isReady` before enabling generate button
- **MUST** validate prompt and duration before generation
- **MUST** handle `isProcessing` state to prevent duplicate requests
- **MUST** display `error` state with clear messages
- **MUST** implement proper cleanup on unmount

### 4. Performance
- **MUST** implement progress indicators during generation
- **MUST** cache generated audio locally
- **MUST** allow users to cancel long generations
- **MUST** implement proper audio file disposal
- **MUST NOT** generate multiple audio files simultaneously

### 5. Audio Quality
- **MUST** provide audio preview before saving
- **MUST** support common audio formats (MP3, WAV)
- **MUST** handle large audio file sizes
- **MUST** implement proper audio playback controls
- **MUST** offer regeneration with different settings

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Empty Prompts**
   - Always validate prompt is provided
   - Never call generate() without description
   - Guide users with example prompts

2. **No Auto-Generation**
   - Never start generation without user action
   - Always require explicit "Generate" button press
   - Show preview before processing

3. **No Hardcoded Credentials**
   - Never store API keys in component files
   - Use environment variables or secure storage

4. **No Unhandled Errors**
   - Never ignore generation failures
   - Always explain what went wrong
   - Provide retry or alternative options

5. **No Memory Leaks**
   - Never store multiple audio files in memory
   - Always cleanup audio references on unmount
   - Implement proper audio disposal

6. **No Blocked UI**
   - Never block main thread with audio processing
   - Always show progress indicator
   - Allow cancellation

7. **No Copyright Infringement**
   - Never generate copyrighted material
   - Never use artist names or copyrighted songs in prompts
   - Implement content moderation

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing an audio generation feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the useAudioGenerationFeature hook
3. Select audio type (music, sfx, ambient, voice)
4. Implement text input for audio description
5. Set duration (5-120 seconds recommended)
6. Configure options (genre, mood, tempo for music)
7. Validate prompt and duration before generation
8. Implement audio playback for preview
9. Handle long processing times with progress
10. Implement proper error handling
11. Implement cleanup on unmount

CRITICAL RULES:
- MUST validate prompt and duration before calling generate()
- MUST implement audio playback controls (play, pause, stop)
- MUST handle audio type selection
- MUST handle music-specific options (genre, mood, tempo)
- MUST implement debouncing (300ms)
- MUST allow regeneration with different settings

CONFIGURATION:
- Provide valid userId (string)
- Set audioType: 'music' | 'sfx' | 'ambient' | 'voice'
- Set duration: number (5-120 seconds recommended)
- Set genre: string (for music type: rock, pop, jazz, etc.)
- Set mood: string (happy, sad, energetic, calm, etc.)
- Set tempo: number (BPM for music, default: 120)
- Implement onSaveAudio callback
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

AUDIO TYPES:
- music: Musical compositions with genre, mood, tempo options
- sfx: Sound effects and foley sounds
- ambient: Background ambient audio
- voice: Voice content and narration

OPTIONS:
- genre: Music genre (rock, pop, jazz, electronic, classical, etc.)
- mood: Audio mood (happy, sad, energetic, calm, dramatic, etc.)
- tempo: Beats per minute for music (default: 120)

STRICTLY FORBIDDEN:
- No empty prompt validation
- No auto-generation without user action
- No hardcoded API keys
- No unhandled errors
- No memory leaks
- No blocking UI
- No copyright infringement

QUALITY CHECKLIST:
- [ ] Text input for audio description
- [ ] Audio type selector added
- [ ] Duration input/slider included
- [ ] Music options (genre, mood, tempo) when type=music
- [ ] Validation before generate()
- [ ] Audio playback controls implemented
- [ ] Progress indicator during processing
- [ ] Error display with retry option
- [ ] Save/share functionality
- [ ] Regeneration with different settings
```

#### AI Implementation Checklist

Use this checklist when generating code:

- [ ] Feature imported from correct path
- [ ] Text input for audio description implemented
- [ ] Audio type selector added
- [ ] Duration input implemented
- [ ] Music-specific options (genre, mood, tempo)
- [ ] Validation before generate()
- [ ] Audio playback controls (play, pause, stop)
- [ ] Progress indicator during processing
- [ ] Error display with user-friendly message
- [ ] Save/share buttons
- [ ] Regeneration option
- [ ] Cleanup on unmount

---

## 🛠️ Configuration Strategy

### Essential Configuration

```typescript
// Required fields
{
  userId: string
  audioType: 'music' | 'sfx' | 'ambient' | 'voice'
  prompt: string
  duration: number
}

// Optional callbacks
{
  onProcessingStart?: () => void
  onProcessingComplete?: (result) => void
  onError?: (error: string) => void
}
```

### Recommended Settings

1. **Audio Types**
   - Music: Background music, themes, intros (genre, mood, tempo options)
   - SFX: Sound effects for games, apps, videos
   - Ambient: Background atmospheres and environments
   - Voice: Voice content and narration

2. **Music Options**
   - genre: rock, pop, jazz, electronic, classical, hiphop
   - mood: happy, sad, energetic, calm, dramatic, romantic
   - tempo: 60-180 BPM (default: 120)

3. **Duration Guidelines**
   - SFX: 3-10 seconds
   - Ambient: 30-120 seconds
   - Music: 15-60 seconds for loops
   - Voice: 5-30 seconds

---

## 📊 State Management

### Feature States

**isReady**: boolean
- Prompt provided and duration set
- Check before enabling generate button

**isProcessing**: boolean
- Audio generation in progress
- Show loading/progress indicator
- Disable generate button

**progress**: number (0-100)
- Generation progress percentage
- Update progress bar

**error**: string | null
- Error message if generation failed
- Display to user with clear message

**result**: {
  audioUrl: string
  audioType?: string
  prompt?: string
  duration?: number
  metadata?: any
}

---

## 🎨 Best Practices

### Prompt Writing

1. **Be Descriptive**
   - Good: "Upbeat pop music with energetic drums and synth melody"
   - Bad: "Music"

2. **Specify Elements**
   - Mention instruments, tempo, mood
   - Describe the sound characteristics
   - Include genre information

3. **Match Use Case**
   - Videos: Match video mood and pacing
   - Games: Loop-friendly, appropriate mood
   - Podcasts: Professional, not distracting

### Audio Type Selection

1. **Music**
   - Use for: Background music, themes, intros
   - Options: genre, mood, tempo
   - Best: High-quality, loopable clips

2. **SFX**
   - Use for: Sound effects, foley, impacts
   - Options: Duration mainly
   - Best: Short, focused sounds

3. **Ambient**
   - Use for: Background atmospheres
   - Options: Duration, mood
   - Best: Consistent, non-distracting

4. **Voice**
   - Use for: Narration, voice content
   - Consider: Use Text to Voice for better results

---

## 🐛 Common Pitfalls

### Quality Issues

❌ **Problem**: Audio doesn't match expectations
✅ **Solution**: Be more descriptive in prompt, try different settings

### Duration Issues

❌ **Problem**: Audio too short/long
✅ **Solution**: Set appropriate duration, consider use case

### Format Issues

❌ **Problem**: Audio won't play
✅ **Solution**: Ensure audio format is supported (MP3, WAV)

### Performance Issues

❌ **Problem**: Slow generation
✅ **Solution**: Use shorter durations, show progress

---

## 📦 Related Components

Use these components from the library:

- **TextInput**: For audio description
- **AudioTypeSelector**: Choose audio type
- **GenreSelector**: Music genre selection
- **MoodSelector**: Audio mood selection
- **DurationSlider**: Set audio duration
- **AudioPlayer**: Play generated audio
- **ProgressBar**: Progress display

Located at: `src/presentation/components/`

---

## 🔄 Migration Strategy

If migrating from previous implementation:

1. **Update imports** to new path
2. **Add audio type selector**
3. **Implement music-specific options** (genre, mood, tempo)
4. **Update state handling** for new structure
5. **Add audio playback controls**
6. **Test all audio types**

---

## 📚 Additional Resources

- Main documentation: `/docs/`
- API reference: `/docs/api/`
- Examples: `/docs/examples/basic/audio-generation/`
- Architecture: `/ARCHITECTURE.md`

---

**Last Updated**: 2025-01-08
**Version**: 2.0.0 (Strategy-based Documentation)

---

## 📝 Changelog

### v2.0.0 - 2025-01-08
- **BREAKING**: Documentation format changed to strategy-based
- Removed extensive code examples
- Added rules, prohibitions, and AI agent directions
- Focus on best practices and implementation guidance

### v1.0.0 - Initial Release
- Initial feature documentation
