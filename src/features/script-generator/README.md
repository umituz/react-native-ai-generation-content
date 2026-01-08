# Script Generator Feature

Generate scripts for videos, podcasts, and content using AI.

## 📍 Import Path

```typescript
import { useScriptGeneratorFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/script-generator/`

## 🎯 Feature Purpose

Generate professional scripts for various content types including videos, podcasts, social media, and presentations. Customize tone, duration, and format for high-quality content creation with visual cues and production notes.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Creating YouTube video scripts
- Generating podcast episode scripts
- Writing social media content (TikTok, Reels)
- Preparing presentation scripts
- Content ideation and planning

❌ **When NOT to Use:**
- Converting scripts to speech (use Text to Voice)
- Generating visual content (use Text to Image/Video)
- Real-time captioning
- Collaborative script editing

### Implementation Strategy

1. **Enter topic/description** for the script
2. **Choose script type** (video, podcast, social, presentation)
3. **Select tone** (casual, professional, humorous, dramatic)
4. **Set duration** target
5. **Generate script** with progress tracking
6. **Review and edit** generated script
7. **Save or export** final script

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Input Requirements
- **MUST** provide clear topic or description
- **MUST** specify script type
- **MUST** set duration target
- **MUST** select appropriate tone
- **MUST NOT** use copyrighted material in prompts

### 2. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** specify `scriptType` (video, podcast, social, presentation)
- **MUST** specify `tone` (casual, professional, humorous, dramatic)
- **MUST** implement `onError` callback
- **MUST** handle script display and export

### 3. State Management
- **MUST** check `isReady` before enabling generate button
- **MUST** validate topic and duration before generation
- **MUST** handle `isProcessing` state to prevent duplicate requests
- **MUST** display `error` state with clear messages
- **MUST** implement proper cleanup on unmount

### 4. Performance
- **MUST** implement progress indicators during generation
- **MUST** cache generated scripts locally
- **MUST** allow users to cancel long generations
- **MUST** handle long scripts efficiently
- **MUST NOT** generate multiple scripts simultaneously

### 5. Content Quality
- **MUST** provide editable script output
- **MUST** support visual cues (for video scripts)
- **MUST** handle various script formats
- **MUST** offer regeneration with different settings
- **MUST** implement copy/export functionality

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Empty Topics**
   - Always validate topic is provided
   - Never call generate() without description
   - Guide users with example topics

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
   - Never store multiple scripts unnecessarily
   - Clean up old scripts
   - Implement proper cleanup

6. **No Blocked UI**
   - Never block main thread with processing
   - Always show progress indicator
   - Allow cancellation

7. **No Copyright Infringement**
   - Never generate copyrighted content
   - Never use trademarked material without permission
   - Implement content moderation

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing a script generator feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the useScriptGeneratorFeature hook
3. Select script type (video, podcast, social, presentation)
4. Select tone (casual, professional, humorous, dramatic)
5. Implement topic/description input
6. Set duration target
7. Configure options (visual cues, production notes)
8. Validate input before generation
9. Display editable script output
10. Handle long processing times with progress
11. Implement proper error handling
12. Implement cleanup on unmount

CRITICAL RULES:
- MUST validate topic and duration before calling generate()
- MUST display script in editable format
- MUST handle script type selection
- MUST handle tone selection
- MUST implement debouncing (300ms)
- MUST allow regeneration with different settings
- MUST implement copy/export functionality

CONFIGURATION:
- Provide valid userId (string)
- Set scriptType: 'video' | 'podcast' | 'social' | 'presentation'
- Set tone: 'casual' | 'professional' | 'humorous' | 'dramatic'
- Set duration: number (target duration in seconds)
- Set includeVisuals?: boolean (include visual cues, default: true for video)
- Set includeNotes?: boolean (include production notes, default: false)
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

SCRIPT TYPES:
- video: Video scripts with visual cues and scene descriptions
- podcast: Conversational podcast scripts
- social: Short-form social media content (TikTok, Reels, etc.)
- presentation: Professional presentation scripts

TONES:
- casual: Conversational and friendly tone
- professional: Formal and business-appropriate
- humorous: Funny and entertaining
- dramatic: Emotional and engaging

OPTIONS:
- includeVisuals: Include visual cues for video (default: true)
- includeNotes: Include production notes (default: false)
- language: Script language (default: 'en')

STRICTLY FORBIDDEN:
- No empty topic validation
- No auto-generation without user action
- No hardcoded API keys
- No unhandled errors
- No memory leaks
- No blocking UI
- No copyright infringement

QUALITY CHECKLIST:
- [ ] Topic/description input implemented
- [ ] Script type selector added
- [ ] Tone selector added
- [ ] Duration input included
- [ ] Validation before generate()
- [ ] Editable script display
- [ ] Visual cues display (for video)
- [ ] Progress indicator during processing
- [ ] Error display with retry option
- [ ] Copy/export functionality
- [ ] Regeneration with different settings
```

#### AI Implementation Checklist

Use this checklist when generating code:

- [ ] Feature imported from correct path
- [ ] Topic input implemented
- [ ] Script type selector added
- [ ] Tone selector added
- [ ] Duration input implemented
- [ ] Options toggles (visual cues, notes)
- [ ] Validation before generate()
- [ ] Editable script display
- [ ] Progress indicator during processing
- [ ] Error display with user-friendly message
- [ ] Copy to clipboard button
- [ ] Export functionality
- [ ] Regeneration option
- [ ] Cleanup on unmount

---

## 🛠️ Configuration Strategy

### Essential Configuration

```typescript
// Required fields
{
  userId: string
  scriptType: 'video' | 'podcast' | 'social' | 'presentation'
  tone: 'casual' | 'professional' | 'humorous' | 'dramatic'
  prompt: string
  duration: number
}

// Optional callbacks
{
  includeVisuals?: boolean
  includeNotes?: boolean
  onProcessingStart?: () => void
  onProcessingComplete?: (result) => void
  onError?: (error: string) => void
}
```

### Recommended Settings

1. **Script Types**
   - Video: YouTube, tutorials, vlogs (with visual cues)
   - Podcast: Conversational, interviews, storytelling
   - Social: TikTok, Reels, Shorts (short-form)
   - Presentation: Business, educational, formal

2. **Tones**
   - Casual: Conversational content (vlogs, lifestyle)
   - Professional: Business and educational content
   - Humorous: Entertainment and comedy
   - Dramatic: Storytelling and narratives

3. **Duration Targets**
   - Social: 15-60 seconds
   - Short video: 60-180 seconds (1-3 minutes)
   - Medium video: 180-600 seconds (3-10 minutes)
   - Long video: 600-3600 seconds (10-60 minutes)
   - Podcast: 1800-3600 seconds (30-60 minutes)

---

## 📊 State Management

### Feature States

**isReady**: boolean
- Topic provided and duration set
- Check before enabling generate button

**isProcessing**: boolean
- Script generation in progress
- Show loading/progress indicator
- Disable generate button

**progress**: number (0-100)
- Generation progress percentage
- Update progress bar

**error**: string | null
- Error message if generation failed
- Display to user with clear message

**result**: {
  script: string
  scriptType?: string
  tone?: string
  duration?: number
  includeVisuals?: boolean
  includeNotes?: boolean
  metadata?: any
}

---

## 🎨 Best Practices

### Topic Writing

1. **Be Specific**
   - Good: "How to cook pasta from scratch, including ingredients and step-by-step instructions"
   - Bad: "Pasta"

2. **Include Key Points**
   - Mention important topics to cover
   - Specify target audience
   - Include format preferences

3. **Set Realistic Duration**
   - Social: 60 seconds maximum
   - YouTube: 5-10 minutes typical
   - Podcast: 30-60 minutes

### Script Type Selection

1. **Video**
   - Use for: YouTube, tutorials, vlogs
   - Features: Visual cues, scene descriptions
   - Best: High-quality, structured content

2. **Podcast**
   - Use for: Audio content, interviews, discussions
   - Features: Conversational format
   - Best: Engaging, natural dialogue

3. **Social**
   - Use for: TikTok, Reels, Shorts
   - Features: Short-form, punchy
   - Best: Quick, engaging content

4. **Presentation**
   - Use for: Business, educational, formal
   - Features: Structured, professional
   - Best: Clear, informative content

---

## 🐛 Common Pitfalls

### Quality Issues

❌ **Problem**: Script doesn't match expectations
✅ **Solution**: Be more specific in topic, try different tone

### Duration Issues

❌ **Problem**: Script too long/short
✅ **Solution**: Adjust duration target, be more specific about scope

### Format Issues

❌ **Problem**: Wrong format for platform
✅ **Solution**: Match script type to use case

### Editing Issues

❌ **Problem**: Can't edit generated script
✅ **Solution**: Always provide editable text area

---

## 📦 Related Components

Use these components from the library:

- **TextInput**: For topic/description
- **ScriptTypeSelector**: Choose script type
- **ToneSelector**: Choose tone
- **DurationInput**: Set target duration
- **OptionsToggles**: Enable/disable visual cues, notes
- **ScriptDisplay**: Editable script display
- **ProgressBar**: Progress display

Located at: `src/presentation/components/`

---

## 🔄 Migration Strategy

If migrating from previous implementation:

1. **Update imports** to new path
2. **Add script type selector**
3. **Add tone selector**
4. **Implement duration input**
5. **Add visual cues options**
6. **Update state handling** for new structure
7. **Implement export functionality**
8. **Test all script types**

---

## 📚 Additional Resources

- Main documentation: `/docs/`
- API reference: `/docs/api/`
- Examples: `/docs/examples/basic/script-generator/`
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
