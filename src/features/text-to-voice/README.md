# Text to Voice Feature

Convert text to natural-sounding speech using AI.

## 📍 Import Path

```typescript
import { useTextToVoiceFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/text-to-voice/`

## 🎯 Feature Purpose

Convert written text into lifelike speech using AI-powered text-to-speech technology. Support for multiple voices, languages, adjustable speed and pitch, with natural intonation and expression for audiobooks, accessibility, voice assistants, and more.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Creating audiobooks and narration
- Building voice assistants
- Accessibility features for visually impaired
- Voiceovers for videos and presentations
- Podcast and content creation

❌ **When NOT to Use:**
- Generating audio from descriptions (use Audio Generation)
- Real-time translation (use translation services)
- Voice cloning or impersonation
- Music generation

### Implementation Strategy

1. **Enter text** to convert to speech
2. **Select voice** from available options
3. **Adjust settings** (speed, pitch)
4. **Generate speech** with progress tracking
5. **Preview audio** with playback controls
6. **Save or share** final audio file

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Input Requirements
- **MUST** provide text to convert
- **MUST** select valid voice
- **MUST** keep text under character limits (5000 chars recommended)
- **MUST NOT** use copyrighted material without permission
- **MUST NOT** generate offensive or harmful content

### 2. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** specify voice selection
- **MUST** implement `onError` callback
- **MUST** implement audio playback controls
- **MUST** handle file saving locally

### 3. State Management
- **MUST** check `isReady` before enabling generate button
- **MUST** validate text and voice before generation
- **MUST** handle `isProcessing` state to prevent duplicate requests
- **MUST** display `error` state with clear messages
- **MUST** implement proper cleanup on unmount (dispose audio)

### 4. Performance
- **MUST** implement progress indicators during generation
- **MUST** cache generated audio locally
- **MUST** allow users to cancel long generations
- **MUST** implement proper audio file disposal
- **MUST NOT** generate multiple audio files simultaneously

### 5. Audio Quality
- **MUST** provide audio preview with playback controls
- **MUST** support common audio formats (MP3, WAV)
- **MUST** handle large audio file sizes
- **MUST** implement play/pause/stop controls
- **MUST** offer regeneration with different settings

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Empty Text**
   - Always validate text is provided
   - Never call generate() without text
   - Guide users with example texts

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
   - Implement proper audio disposal (unloadAsync)

6. **No Blocked UI**
   - Never block main thread with audio processing
   - Always show progress indicator
   - Allow cancellation

7. **No Copyright Infringement**
   - Never generate copyrighted content without permission
   - Never use for voice cloning or impersonation
   - Implement content moderation

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing a text to voice feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the useTextToVoiceFeature hook
3. Select voice from available options
4. Implement text input for speech content
5. Adjust settings (speed, pitch)
6. Validate text and voice before generation
7. Implement audio playback for preview
8. Handle long processing times with progress
9. Implement proper error handling
10. Implement cleanup on unmount (CRITICAL: dispose audio)

CRITICAL RULES:
- MUST validate text and voice before calling generate()
- MUST implement audio playback controls (play, pause, stop)
- MUST handle voice selection
- MUST handle speed and pitch adjustments
- MUST implement debouncing (300ms)
- MUST allow regeneration with different settings
- MUST properly dispose audio on unmount (useEffect cleanup)

CONFIGURATION:
- Provide valid userId (string)
- Set voice: string (voice ID)
- Set speed?: number (speech rate 0.25 - 4.0, default: 1.0)
- Set pitch?: number (pitch adjustment -20.0 - 20.0, default: 0)
- Set language?: string (language code, default: 'en-US')
- Implement onSaveAudio callback
- Configure callbacks: onTextChange, onProcessingStart, onProcessingComplete, onError

VOICE OPTIONS:
- English: Multiple male/female voices (US, UK, etc.)
- Multi-language: Spanish, French, German, Italian, Japanese, Korean, Chinese
- Default voice: Set in config

SETTINGS:
- speed: Speech rate (0.25 - 4.0, default: 1.0)
- pitch: Pitch adjustment (-20.0 - 20.0, default: 0)
- language: Language code (e.g., 'en-US', 'es-ES')

AUDIO CONTROLS:
- Play: Start audio playback
- Pause: Pause current playback
- Stop: Stop and reset playback
- Unload: Dispose audio resource (CRITICAL for cleanup)

STRICTLY FORBIDDEN:
- No empty text validation
- No auto-generation without user action
- No hardcoded API keys
- No unhandled errors
- No memory leaks (especially audio)
- No blocking UI
- No copyright infringement

CLEANUP CHECKLIST:
- [ ] Audio unloaded on unmount
- [ ] Sound reference nullified
- [ ] Event listeners removed
- [ ] No memory leaks

QUALITY CHECKLIST:
- [ ] Text input for speech content
- [ ] Voice selector added
- [ ] Speed control implemented
- [ ] Pitch control implemented
- [ ] Validation before generate()
- [ ] Audio playback controls (play, pause, stop)
- [ ] Progress indicator during processing
- [ ] Error display with retry option
- [ ] Save/share functionality
- [ ] Regeneration with different settings
- [ ] Proper cleanup on unmount
```

#### AI Implementation Checklist

Use this checklist when generating code:

- [ ] Feature imported from correct path
- [ ] Text input for speech content implemented
- [ ] Voice selector added
- [ ] Speed control implemented
- [ ] Pitch control implemented
- [ ] Validation before generate()
- [ ] Audio playback controls (play, pause, stop)
- [ ] Progress indicator during processing
- [ ] Error display with user-friendly message
- [ ] Save/share buttons
- [ ] Regeneration option
- [ ] **CRITICAL**: Audio cleanup on unmount
- [ ] **CRITICAL**: Sound reference disposal
- [ ] **CRITICAL**: Event listener cleanup

---

## 🛠️ Configuration Strategy

### Essential Configuration

```typescript
// Required fields
{
  userId: string
  voice: string
  text: string
}

// Optional callbacks
{
  speed?: number // 0.25 - 4.0, default: 1.0
  pitch?: number // -20.0 - 20.0, default: 0
  language?: string // e.g., 'en-US', 'es-ES'
  onTextChange?: (text: string) => void
  onProcessingStart?: () => void
  onProcessingComplete?: (result) => void
  onError?: (error: string) => void
}
```

### Recommended Settings

1. **Voices**
   - English: Multiple options (male/female, US/UK)
   - Multi-language: Support for major languages
   - Default: Set in configuration

2. **Speed Settings**
   - 0.25 - 0.75: Slow (audiobooks, learning)
   - 0.8 - 1.2: Normal (most use cases)
   - 1.3 - 2.0: Fast (quick consumption)
   - 2.1 - 4.0: Very fast (skimming)

3. **Pitch Settings**
   - -20 to -5: Lower pitch
   - -5 to 5: Normal range (default: 0)
   - 5 to 20: Higher pitch

4. **Text Length**
   - Recommended: Under 5000 characters
   - Long texts: Consider chunking
   - Short texts: Better for performance

---

## 📊 State Management

### Feature States

**isReady**: boolean
- Text provided and voice selected
- Check before enabling generate button

**isProcessing**: boolean
- Speech generation in progress
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
  voice?: string
  text?: string
  speed?: number
  pitch?: number
  language?: string
  metadata?: any
}

---

## 🎨 Best Practices

### Text Preparation

1. **Text Length**
   - Keep under 5000 characters for best results
   - Consider chunking for long texts
   - Test with shorter texts first

2. **Punctuation**
   - Use proper punctuation for natural pauses
   - Include commas, periods, question marks
   - Use punctuation to control pacing

3. **Formatting**
   - Clear, readable text
   - Remove unnecessary whitespace
   - Use abbreviations consistently

### Voice Selection

1. **Match Content Type**
   - Audiobooks: Clear, pleasant voice
   - Presentations: Professional voice
   - Entertainment: Dynamic voice
   - Accessibility: Clear, neutral voice

2. **Language Matching**
   - Match voice to text language
   - Consider accent preferences
   - Test different voices

### Settings Optimization

1. **Speed**
   - 0.8-1.2: Most natural speech
   - Adjust based on content type
   - Test with playback before saving

2. **Pitch**
   - Keep near 0 for natural sound
   - Small adjustments (-5 to +5)
   - Avoid extreme values

---

## 🐛 Common Pitfalls

### Audio Playback Issues

❌ **Problem**: Audio won't play
✅ **Solution**: Check audio URL, format compatibility

### Memory Leaks

❌ **Problem**: App crashes after multiple generations
✅ **Solution**: Implement proper audio cleanup in useEffect

### Quality Issues

❌ **Problem**: Speech sounds unnatural
✅ **Solution**: Adjust speed and pitch, try different voice

### Long Text Issues

❌ **Problem**: Generation fails for long texts
✅ **Solution**: Chunk text into smaller segments

### Cleanup Issues

❌ **Problem**: Audio continues playing after unmount
✅ **Solution**: Implement proper cleanup with unloadAsync

---

## 📦 Related Components

Use these components from the library:

- **TextInput**: For speech content
- **VoiceSelector**: Choose voice
- **SpeedControl**: Adjust speech rate
- **PitchControl**: Adjust pitch
- **AudioPlayer**: Play generated audio
- **ProgressBar**: Progress display

Located at: `src/presentation/components/`

---

## 🔄 Migration Strategy

If migrating from previous implementation:

1. **Update imports** to new path
2. **Add voice selector**
3. **Implement speed/pitch controls**
4. **Add audio playback controls**
5. **Update state handling** for new structure
6. **Implement proper audio cleanup** (CRITICAL)
7. **Test all voices**

---

## 📚 Additional Resources

- Main documentation: `/docs/`
- API reference: `/docs/api/`
- Examples: `/docs/examples/basic/text-to-voice/`
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
- Added critical audio cleanup guidance

### v1.0.0 - Initial Release
- Initial feature documentation
