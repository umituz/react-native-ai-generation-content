# Anime Selfie Feature

Convert photos to anime/manga style using AI.

## 📍 Import Path

```typescript
import { useAnimeSelfieFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/anime-selfie/`

## 🎯 Feature Purpose

Transform photos into anime/manga style artwork using AI. Supports various anime styles with customizable intensity levels while preserving facial features.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Creating anime avatars
- Generating manga-style portraits
- Artistic photo transformations
- Social media profile pictures
- Fan art and creative projects

❌ **When NOT to Use:**
- General artistic style transfer (use Style Transfer)
- Face swapping (use Face Swap)
- Image editing and filters (use image editing software)
- Copyrighted character replication

### Implementation Strategy

1. **Select photo** to convert to anime
2. **Choose anime style** (shonen, shojo, chibi, etc.)
3. **Adjust intensity** level (0.0 to 1.0)
4. **Generate anime version** with progress tracking
5. **Preview and compare** with original
6. **Save or share** result

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Image Requirements
- **MUST** provide ONE image to convert
- **MUST** use clear, well-lit photos
- **MUST** have visible faces (for best results)
- **MUST** use reasonable resolution (min 512x512)
- **MUST NOT** exceed file size limits (10MB max)

### 2. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** specify `style` (anime style type)
- **MUST** set `intensity` level (0.0 to 1.0)
- **MUST** implement `onError` callback
- **MUST** implement `onSelectPhoto` callback

### 3. State Management
- **MUST** check `isReady` before enabling convert button
- **MUST** display progress during conversion
- **MUST** handle long processing times
- **MUST** display `error` state with clear messages
- **MUST** implement proper cleanup on unmount

### 4. Performance
- **MUST** implement image compression before upload
- **MUST** show progress indicator for processing
- **MUST** cache results locally
- **MUST** allow users to cancel processing
- **MUST NOT** convert multiple images simultaneously

### 5. Content Quality
- **MUST** provide before/after comparison
- **MUST** allow intensity adjustment
- **MUST** handle various photo types
- **MUST** preserve facial features when enabled
- **MUST** offer style regeneration

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Missing Images**
   - Always validate image is selected
   - Never call process() without image

2. **No Auto-Processing**
   - Never start conversion without user action
   - Always require explicit "Convert" button press
   - Show preview before processing

3. **No Hardcoded Credentials**
   - Never store API keys in component files
   - Use environment variables or secure storage

4. **No Unhandled Errors**
   - Never ignore conversion failures
   - Always explain what went wrong
   - Provide retry or alternative options

5. **No Memory Leaks**
   - Never store both original and converted large images simultaneously
   - Clean up temporary images
   - Implement proper image disposal

6. **No Blocked UI**
   - Never block main thread with image processing
   - Always show progress indicator
   - Allow cancellation

7. **No Copyright Violations**
   - Never replicate copyrighted anime characters exactly
   - Allow style transformation only
   - Implement content moderation

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing an anime selfie feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the useAnimeSelfieFeature hook
3. Select anime style type
4. Implement image selection UI
5. Adjust intensity level (0.0 to 1.0)
6. Validate image before conversion
7. Show before/after comparison
8. Handle long processing times with progress
9. Implement proper error handling
10. Implement cleanup on unmount

CRITICAL RULES:
- MUST validate image before calling convert()
- MUST show before/after comparison
- MUST handle intensity adjustment
- MUST preserve facial features when enabled
- MUST implement debouncing (300ms)
- MUST allow style regeneration

CONFIGURATION:
- Provide valid userId (string)
- Set style: 'shonen' | 'shojo' | 'chibi' | 'realistic'
- Set intensity: 0.0 to 1.0 (default: 0.8)
- Implement onSelectPhoto callback
- Implement onSaveResult callback
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

OPTIONS:
- style: Select anime style type
- intensity: 0.0 (subtle) to 1.0 (full transformation)
- preserveFaces: boolean (maintain facial features)

STRICTLY FORBIDDEN:
- No missing image validation
- No auto-processing without user action
- No hardcoded API keys
- No unhandled errors
- No memory leaks
- No blocking UI
- No copyright violations

QUALITY CHECKLIST:
- [ ] Image selection implemented
- [ ] Style selector added
- [ ] Intensity slider included
- [ ] Before/after comparison view
- [ ] Progress indicator during processing
- [ ] Error display with retry option
- [ ] Download/share functionality
- [ ] Style regeneration option
```

#### AI Implementation Checklist

Use this checklist when generating code:

- [ ] Feature imported from correct path
- [ ] Image selection implemented
- [ ] Style selector added
- [ ] Intensity control implemented
- [ ] Validation before convert()
- [ ] Before/after comparison view
- [ ] Progress indicator during processing
- [ ] Error display with user-friendly message
- [ ] Download/share buttons
- [ ] Style regeneration option
- [ ] Cleanup on unmount
- [ ] Original image preserved

---

## 🛠️ Configuration Strategy

### Essential Configuration

```typescript
// Required fields
{
  userId: string
  style: 'shonen' | 'shojo' | 'chibi' | 'realistic'
  intensity: number  // 0.0 to 1.0
  onSelectPhoto: () => Promise<string | null>
}

// Optional callbacks
{
  onProcessingStart?: () => void
  onProcessingComplete?: (result) => void
  onError?: (error: string) => void
}
```

### Recommended Settings

1. **Anime Styles**
   - Shonen: Action-oriented, bold lines
   - Shojo: Elegant, detailed features
   - Chibi: Cute, exaggerated proportions
   - Realistic: Anime-style but realistic proportions

2. **Intensity Levels**
   - 0.3-0.5: Subtle anime influence
   - 0.6-0.8: Balanced transformation (recommended)
   - 0.9-1.0: Full anime style

3. **Image Quality**
   - Minimum: 512x512 resolution
   - Recommended: 1024x1024 or higher
   - Format: JPEG or PNG
   - Max size: 10MB

---

## 📊 State Management

### Feature States

**isReady**: boolean
- Photo selected and validated
- Check before enabling convert button

**isProcessing**: boolean
- Anime conversion in progress
- Show loading/progress indicator
- Disable convert button

**progress**: number (0-100)
- Conversion progress percentage
- Update progress bar

**error**: string | null
- Error message if conversion failed
- Display to user with clear message

**result**: {
  imageUrl: string
  originalImageUrl?: string
  style?: string
  intensity?: number
  metadata?: any
}

---

## 🎨 Best Practices

### Photo Selection

1. **Image Quality**
   - Good: Clear, well-lit photos
   - Bad: Blurry, dark images

2. **Subject Clarity**
   - Good: Clear facial features visible
   - Bad: Occluded or distant faces

3. **Style Matching**
   - Match style to photo content
   - Consider gender and age for style

4. **Intensity**
   - Start with moderate intensity (0.7-0.8)
   - Adjust based on results

### User Experience

1. **Before/After Comparison**
   - Side-by-side comparison
   - Slider or toggle for easy comparison
   - Zoom capability for detail inspection

2. **Style Preview**
   - Show examples of each style
   - Preview style before conversion
   - Explain style characteristics

3. **Progress Feedback**
   - Show estimated time remaining
   - Update progress regularly
   - Allow cancellation

---

## 🐛 Common Pitfalls

### Quality Issues

❌ **Problem**: Poor anime conversion
✅ **Solution**: Use higher quality photos, try different style or intensity

### Style Issues

❌ **Problem**: Anime style doesn't match photo
✅ **Solution**: Try different style, adjust intensity

### Performance Issues

❌ **Problem**: Slow conversion
✅ **Solution**: Compress images, show progress, allow cancellation

### Memory Issues

❌ **Problem**: App crashes with large images
✅ **Solution**: Compress images, clean up properly, optimize memory

---

## 📦 Related Components

Use these components from the library:

- **PhotoUploadCard**: Upload photo interface
- **ResultDisplay**: Before/after comparison
- **StyleSelector**: Choose anime style
- **IntensitySlider**: Adjust intensity
- **ProgressBar**: Progress display

Located at: `src/presentation/components/`

---

## 🔄 Migration Strategy

If migrating from previous implementation:

1. **Update imports** to new path
2. **Add style selector**
3. **Implement intensity control**
4. **Update state handling** for new structure
5. **Add before/after comparison**
6. **Test all anime styles**

---

## 📚 Additional Resources

- Main documentation: `/docs/`
- API reference: `/docs/api/`
- Examples: `/docs/examples/basic/anime-selfie/`
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
