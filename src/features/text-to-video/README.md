# Text to Video Feature

Generate videos from text descriptions using AI.

## 📍 Import Path

```typescript
import { useTextToVideoFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/text-to-video/`

## 🎯 Feature Purpose

Generate AI-powered videos from natural language text descriptions. Supports various durations, aspect ratios, and cinematic styles.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Creating marketing videos
- Generating social media content
- Producing promotional materials
- Creating concept videos
- Video prototyping and storyboarding

❌ **When NOT to Use:**
- Simple image generation (use Text to Image)
- Video editing of existing footage (use video editing software)
- Adding text overlays to video (use video editing tools)
- Animated text videos (use animation software)

### Implementation Strategy

1. **Input text description** of desired video
2. **Select duration** and aspect ratio
3. **Choose cinematic style** (optional)
4. **Generate video** with progress tracking
5. **Preview result** and offer regeneration
6. **Download or share** final video

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Prompt Requirements
- **MUST** use descriptive, specific prompts
- **MUST** include subject, action, and scene details
- **MUST** specify camera movements if important
- **MUST** use English for best results
- **MUST NOT** exceed character limits (check model limits)
- **MUST NOT** include copyrighted characters or brands

### 2. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** implement `onError` callback
- **MUST** handle `isProcessing` state to prevent duplicate requests
- **MUST** validate prompts before generation
- **MUST NOT** call `generate()` when `isReady` is false

### 3. State Management
- **MUST** check `isReady` before enabling generate button
- **MUST** handle `isProcessing` state with loading indicators
- **MUST** display `error` state to users
- **MUST** handle `result.videoUrl` existence check
- **MUST** implement proper cleanup on unmount

### 4. Performance
- **MUST** implement debouncing for prompt inputs (>500ms)
- **MUST** limit concurrent requests (max 1 per user)
- **MUST** cache generated videos locally
- **MUST** implement retry logic (max 3 attempts)
- **MUST NOT** generate multiple videos simultaneously

### 5. Content Safety
- **MUST** validate and sanitize user prompts
- **MUST** implement content moderation
- **MUST** check for inappropriate content
- **MUST** store userId securely
- **MUST NOT** expose API keys in client code

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Empty Prompts**
   - Always validate prompt has meaningful content
   - Minimum 20 characters recommended for video generation

2. **No Concurrent Generation**
   - Never call `generate()` while `isProcessing === true`
   - Always disable generate button during processing

3. **No Hardcoded Credentials**
   - Never store API keys in component files
   - Use environment variables or secure storage

4. **No Unhandled Errors**
   - Never ignore error states
   - Always implement error boundaries

5. **No Memory Leaks**
   - Never forget cleanup on unmount
   - Always cancel pending requests

6. **No Excessive Re-renders**
   - Never pass new config objects on each render
   - Always memoize configuration objects

7. **No Blocked Main Thread**
   - Never perform heavy operations in render
   - Use background tasks for video processing

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing a text-to-video generation feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the useTextToVideoFeature hook
3. Implement all state handlers (loading, success, error)
4. Add debouncing for prompt input (500ms minimum)
5. Validate prompts before generation
6. Handle isReady and isProcessing states correctly
7. Implement proper error handling with user feedback
8. Add loading indicators during generation
9. Display results safely with null checks
10. Implement cleanup on unmount

CRITICAL RULES:
- NEVER call generate() when isProcessing is true
- ALWAYS validate prompt before calling generate()
- MUST handle error state with user-friendly message
- MUST disable generate button during processing
- MUST implement debouncing (500ms minimum)
- MUST validate for copyrighted content

CONFIGURATION:
- Provide valid userId (string)
- Set model (default: 'veo-3')
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

GENERATION OPTIONS:
- duration: 4 | 8 | 16 (seconds)
- aspectRatio: '16:9' | '9:16' | '1:1'
- style: 'cinematic' | 'anime' | '3d' | 'artistic'

STRICTLY FORBIDDEN:
- No empty prompts
- No concurrent generation calls
- No hardcoded API keys
- No unhandled errors
- No memory leaks
- No copyright violations

QUALITY CHECKLIST:
- [ ] Feature imported from correct path
- [ ] Hook initialized with proper config
- [ ] All state handlers implemented
- [ ] Debouncing added to input
- [ ] Validation before generate()
- [ ] Loading indicator during processing
- [ ] Error display with user-friendly message
- [ ] Button disabled when processing
- [ ] Cleanup on unmount
- [ ] Null checks on result
- [ ] Retry logic implemented
- [ ] Video caching configured
```

#### AI Implementation Checklist

Use this checklist when generating code:

- [ ] Feature imported from correct path
- [ ] Hook initialized with proper config
- [ ] All state handlers implemented
- [ ] Debouncing added to input
- [ ] Validation before generate()
- [ ] Loading indicator during processing
- [ ] Error display with user-friendly message
- [ ] Button disabled when processing
- [ ] Cleanup on unmount
- [ ] Null checks on result
- [ ] Retry logic implemented
- [ ] Video caching configured

---

## 🛠️ Configuration Strategy

### Essential Configuration

```typescript
// Required fields
{
  userId: string  // User identifier for tracking
}

// Optional callbacks
{
  onProcessingStart?: () => void
  onProcessingComplete?: (result) => void
  onError?: (error: string) => void
}
```

### Recommended Settings

1. **Model Selection**
   - Default: `veo-3`
   - Fastest: `veo-2`
   - Highest quality: `veo-3`

2. **Generation Options**
   - Duration: 4s (standard), 8s (long), 16s (extended)
   - Aspect Ratio: 16:9 (landscape), 9:16 (portrait), 1:1 (square)
   - Style: Choose based on use case

3. **Performance Settings**
   - Enable video caching
   - Set reasonable timeouts (video generation can take 2-5 minutes)
   - Implement retry with backoff

---

## 📊 State Management

### Feature States

**isReady**: boolean
- Feature initialized and ready to use
- Check before enabling generate button

**isProcessing**: boolean
- Video generation in progress
- Show loading indicator
- Disable generate button

**progress**: number (0-100)
- Generation progress percentage
- Update progress bar

**error**: string | null
- Error message if generation failed
- Display to user with clear message

**result**: {
  videoUrl: string
  thumbnailUrl?: string
  duration?: number
  metadata?: any
}

---

## 🔐 Security Considerations

### Content Moderation

- **MUST** implement prompt content filtering
- **MUST** check for inappropriate content
- **MUST** block harmful or illegal prompts
- **MUST** check for copyright violations
- **MUST** log moderation actions

### API Security

- **MUST** use environment variables for API keys
- **MUST** implement rate limiting
- **MUST** validate all user inputs
- **MUST** use HTTPS for all API calls

### Data Privacy

- **MUST** comply with data protection regulations
- **MUST** obtain user consent for generation
- **MUST** provide privacy policy
- **MUST** allow data deletion requests

---

## 🎨 Best Practices

### Prompt Engineering

1. **Be Specific**
   - Good: "A sunset over mountains with birds flying, camera pans left, cinematic lighting"
   - Bad: "A sunset video"

2. **Include Camera Movement**
   - Specify: pans, zooms, tracking shots
   - Example: "camera slowly zooms in on subject"

3. **Add Technical Details**
   - Lighting, camera angle, composition
   - Example: "golden hour lighting, wide angle shot"

4. **Specify Style**
   - Genre, mood, atmosphere
   - Example: "cinematic, epic orchestral feel"

### Performance Optimization

1. **Debounce Input**
   - Wait 500ms after user stops typing
   - Prevents unnecessary validations

2. **Progress Feedback**
   - Show realistic time estimates
   - Video generation takes 2-5 minutes

3. **Cache Results**
   - Store generated videos locally
   - Implement cache invalidation strategy

4. **Thumbnail Generation**
   - Generate thumbnail for preview
   - Use first frame or midpoint

---

## 🐛 Common Pitfalls

### Prompt Issues

❌ **Problem**: Video doesn't match expectations
✅ **Solution**: Be more specific in prompt, include camera movements

### Performance Issues

❌ **Problem**: Very slow generation
✅ **Solution**: Show progress, allow cancellation, use shorter duration

### Memory Issues

❌ **Problem**: App crashes during generation
✅ **Solution**: Clean up properly, implement streaming, optimize memory

### Quality Issues

❌ **Problem**: Poor video quality
✅ **Solution**: Use higher quality model, better prompts

---

## 📦 Related Components

Use these components from the library:

- **GenerationProgressModal**: Progress display
- **StyleSelector**: Style selection UI
- **AspectRatioSelector**: Aspect ratio picker
- **DurationSelector**: Duration options
- **VideoPlayer**: Video playback component

Located at: `src/presentation/components/`

---

## 🔄 Migration Strategy

If migrating from previous implementation:

1. **Update imports** to new path
2. **Replace old config** with new structure
3. **Update state handling** to match new interface
4. **Test all error cases**
5. **Update UI components** for new state structure

---

## 📚 Additional Resources

- Main documentation: `/docs/`
- API reference: `/docs/api/`
- Examples: `/docs/examples/basic/text-to-video/`
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
