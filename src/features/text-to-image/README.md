# Text to Image Feature

Generate images from text prompts using AI models.

## 📍 Import Path

```typescript
import { useTextToImageFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/text-to-image/`

## 🎯 Feature Purpose

Convert natural language text descriptions into AI-generated images. Supports various aspect ratios, styles, and quality settings.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Generating original images from text descriptions
- Creating visual content for marketing materials
- Generating concept art and prototypes
- Creating social media visuals
- Product visualization from descriptions
- Storyboarding and creative planning

❌ **When NOT to Use:**
- Image manipulation of existing photos (use Image-to-Image)
- Photo restoration (use Photo Restoration)
- Style transfer on existing images (use Style Transfer)
- Face swapping (use Face Swap)

### Implementation Strategy

1. **Use the feature hook** at component level
2. **Initialize with config** before first render
3. **Handle all states** - loading, success, error
4. **Implement progress tracking** for better UX
5. **Store generated images** for later use

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Prompt Engineering
- **MUST** use descriptive, specific prompts
- **MUST** include subject, action, and context
- **MUST** specify art style if important
- **MUST** use English for best results
- **MUST NOT** exceed character limits (check model limits)

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
- **MUST** handle `result.imageUrl` existence check
- **MUST** implement proper cleanup on unmount

### 4. Performance
- **MUST** implement debouncing for prompt inputs (>500ms)
- **MUST** limit concurrent requests (max 1 per user)
- **MUST** cache generated images locally
- **MUST** implement retry logic (max 3 attempts)
- **MUST NOT** generate multiple images simultaneously

### 5. Security & Privacy
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
   - Minimum 10 characters recommended

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
   - Use web workers or background tasks for processing

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing a text-to-image generation feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the useTextToImageFeature hook
3. Implement all state handlers (loading, success, error)
4. Add debouncing for prompt input
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

CONFIGURATION:
- Provide valid userId (string)
- Set model (default: 'imagen-3')
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

GENERATION OPTIONS:
- aspectRatio: '1:1' | '16:9' | '9:16' | '4:3' | '3:4'
- numberOfImages: 1-4
- style: 'realistic' | 'artistic' | 'anime' | '3d' | 'painting'
- negativePrompt: string (optional)

STRICTLY FORBIDDEN:
- No empty prompts
- No concurrent generation calls
- No hardcoded API keys
- No unhandled errors
- No memory leaks
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
- [ ] Image caching configured

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
   - Default: `imagen-3`
   - Fastest: `imagen-2-fast`
   - Highest quality: `imagen-3`

2. **Generation Options**
   - Aspect Ratio: Match your UI layout
   - Number of Images: 1-2 for speed, 3-4 for variety
   - Style: Choose based on use case

3. **Performance Settings**
   - Enable image caching
   - Set reasonable timeouts (30s default)
   - Implement retry with backoff

---

## 📊 State Management

### Feature States

**isReady**: boolean
- Feature initialized and ready to use
- Check before enabling generate button

**isProcessing**: boolean
- Generation in progress
- Show loading indicator
- Disable generate button

**progress**: number (0-100)
- Generation progress percentage
- Update progress bar

**error**: string | null
- Error message if generation failed
- Display to user with clear message

**result**: {
  imageUrl: string
  imageUrls?: string[]
  metadata?: any
}

---

## 🔐 Security Considerations

### Content Moderation

- **MUST** implement prompt content filtering
- **MUST** check for inappropriate content
- **MUST** block harmful or illegal prompts
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
   - Good: "A majestic lion standing on a rock at sunset, detailed fur, dramatic lighting"
   - Bad: "A lion"

2. **Include Style**
   - Specify art style, mood, atmosphere
   - Example: "in the style of oil painting, dramatic mood"

3. **Add Technical Details**
   - Lighting, camera angle, composition
   - Example: "golden hour lighting, wide angle shot"

4. **Use Negative Prompts**
   - Specify what to avoid
   - Example: "blurry, low quality, distorted"

### Performance Optimization

1. **Debounce Input**
   - Wait 500ms after user stops typing
   - Prevents unnecessary validations

2. **Lazy Loading**
   - Load images on demand
   - Use pagination for multiple results

3. **Cache Results**
   - Store generated images locally
   - Implement cache invalidation strategy

4. **Progressive Enhancement**
   - Show placeholder while loading
   - Display low-res first, then high-res

---

## 🐛 Common Pitfalls

### Memory Issues

❌ **Problem**: Storing all generated images in state
✅ **Solution**: Implement pagination or virtualized lists

### Performance Issues

❌ **Problem**: Re-generating on every prompt change
✅ **Solution**: Require explicit user action to generate

### UX Issues

❌ **Problem**: No feedback during generation
✅ **Solution**: Always show progress indicator

### Error Handling

❌ **Problem**: Generic error messages
✅ **Solution**: Provide specific, actionable error messages

---

## 📦 Related Components

Use these components from the library:

- **GenerationProgressModal**: Progress display
- **StyleSelector**: Style selection UI
- **AspectRatioSelector**: Aspect ratio picker
- **ImageGallery**: Display multiple results
- **PromptInput**: Enhanced text input

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
- Examples: `/docs/examples/basic/text-to-image/`
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
