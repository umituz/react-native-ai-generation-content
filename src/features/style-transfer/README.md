# Style Transfer Feature

Apply artistic styles to images using AI.

## 📍 Import Path

```typescript
import { useStyleTransferFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/style-transfer/`

## 🎯 Feature Purpose

Transform photos into artistic artwork using AI style transfer. Apply various artistic styles like oil painting, watercolor, sketch, and more while preserving image content.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Creating artistic versions of photos
- Applying famous painting styles
- Generating unique artwork
- Social media creative content
- Artistic experimentation

❌ **When NOT to Use:**
- Anime style conversion (use Anime Selfie)
- Photo restoration (use Photo Restoration)
- Image filters and basic edits (use image editing software)
- Background removal (use Remove Background)

### Implementation Strategy

1. **Select image** to stylize
2. **Choose artistic style** (painting, sketch, watercolor, etc.)
3. **Adjust intensity** level (0.0 to 1.0)
4. **Apply style transfer** with progress tracking
5. **Preview and compare** with original
6. **Save or share** artwork

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Image Requirements
- **MUST** provide ONE image to stylize
- **MUST** use clear, reasonably high-quality photos
- **MUST** have recognizable content
- **MUST** use reasonable resolution (min 512x512)
- **MUST NOT** exceed file size limits (10MB max)

### 2. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** specify `style` (artistic style type)
- **MUST** set `intensity` level (0.0 to 1.0)
- **MUST** implement `onError` callback
- **MUST** implement `onSelectImage` callback

### 3. State Management
- **MUST** check `isReady` before enabling apply button
- **MUST** display progress during style transfer
- **MUST** handle long processing times
- **MUST** display `error` state with clear messages
- **MUST** implement proper cleanup on unmount

### 4. Performance
- **MUST** implement image compression before upload
- **MUST** show progress indicator for processing
- **MUST** cache results locally
- **MUST** allow users to cancel processing
- **MUST NOT** stylize multiple images simultaneously

### 5. Content Quality
- **MUST** provide before/after comparison
- **MUST** allow intensity adjustment
- **MUST** handle various image types
- **MUST** preserve important details when enabled
- **MUST** offer style regeneration

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Missing Images**
   - Always validate image is selected
   - Never call process() without image

2. **No Auto-Processing**
   - Never start transfer without user action
   - Always require explicit "Apply Style" button press
   - Show preview before processing

3. **No Hardcoded Credentials**
   - Never store API keys in component files
   - Use environment variables or secure storage

4. **No Unhandled Errors**
   - Never ignore transfer failures
   - Always explain what went wrong
   - Provide retry or alternative options

5. **No Memory Leaks**
   - Never store both original and stylized large images simultaneously
   - Clean up temporary images
   - Implement proper image disposal

6. **No Blocked UI**
   - Never block main thread with image processing
   - Always show progress indicator
   - Allow cancellation

7. **No Copyright Issues**
   - Never claim copyrighted artwork as original
   - Allow artistic style transformation only
   - Implement proper attribution

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing a style transfer feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the useStyleTransferFeature hook
3. Select artistic style type
4. Implement image selection UI
5. Adjust intensity level (0.0 to 1.0)
6. Validate image before transfer
7. Show before/after comparison
8. Handle long processing times with progress
9. Implement proper error handling
10. Implement cleanup on unmount

CRITICAL RULES:
- MUST validate image before calling apply()
- MUST show before/after comparison
- MUST handle intensity adjustment
- MUST preserve important details when enabled
- MUST implement debouncing (300ms)
- MUST allow style regeneration

CONFIGURATION:
- Provide valid userId (string)
- Set style: 'oil-painting' | 'watercolor' | 'sketch' | 'impressionist' | 'pop-art'
- Set intensity: 0.0 to 1.0 (default: 0.8)
- Implement onSelectImage callback
- Implement onSaveResult callback
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

OPTIONS:
- style: Select artistic style type
- intensity: 0.0 (subtle) to 1.0 (full style)
- preserveDetails: boolean (maintain important details)

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
- [ ] Validation before apply()
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
  style: 'oil-painting' | 'watercolor' | 'sketch' | 'impressionist' | 'pop-art'
  intensity: number  // 0.0 to 1.0
  onSelectImage: () => Promise<string | null>
}

// Optional callbacks
{
  onProcessingStart?: () => void
  onProcessingComplete?: (result) => void
  onError?: (error: string) => void
}
```

### Recommended Settings

1. **Artistic Styles**
   - Oil Painting: Classic oil painting style
   - Watercolor: Soft, transparent watercolor
   - Sketch: Pencil or charcoal drawing
   - Impressionist: Impressionist painting style
   - Pop Art: Bold, colorful pop art

2. **Intensity Levels**
   - 0.3-0.5: Subtle artistic influence
   - 0.6-0.8: Balanced transformation (recommended)
   - 0.9-1.0: Full artistic style

3. **Image Quality**
   - Minimum: 512x512 resolution
   - Recommended: 1024x1024 or higher
   - Format: JPEG or PNG
   - Max size: 10MB

---

## 📊 State Management

### Feature States

**isReady**: boolean
- Image selected and validated
- Check before enabling apply button

**isProcessing**: boolean
- Style transfer in progress
- Show loading/progress indicator
- Disable apply button

**progress**: number (0-100)
- Transfer progress percentage
- Update progress bar

**error**: string | null
- Error message if transfer failed
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

### Image Selection

1. **Image Quality**
   - Good: Clear, well-composed photos
   - Bad: Blurry, cluttered images

2. **Style Matching**
   - Match style to image content
   - Consider subject matter for style
   - Landscape vs portrait considerations

3. **Intensity**
   - Start with moderate intensity (0.7-0.8)
   - Adjust based on results
   - Lower intensity for subtle effects

4. **Content Preservation**
   - Enable detail preservation for important elements
   - Consider focal points in image
   - Balance style vs content

### User Experience

1. **Before/After Comparison**
   - Side-by-side comparison
   - Slider or toggle for easy comparison
   - Zoom capability for detail inspection

2. **Style Preview**
   - Show examples of each style
   - Preview style before applying
   - Explain style characteristics

3. **Progress Feedback**
   - Show estimated time remaining
   - Update progress regularly
   - Allow cancellation

---

## 🐛 Common Pitfalls

### Quality Issues

❌ **Problem**: Poor style transfer
✅ **Solution**: Use higher quality photos, try different style or intensity

### Style Issues

❌ **Problem**: Artistic style doesn't match image
✅ **Solution**: Try different style, adjust intensity, consider image content

### Performance Issues

❌ **Problem**: Slow processing
✅ **Solution**: Compress images, show progress, allow cancellation

### Memory Issues

❌ **Problem**: App crashes with large images
✅ **Solution**: Compress images, clean up properly, optimize memory

---

## 📦 Related Components

Use these components from the library:

- **PhotoUploadCard**: Upload image interface
- **ResultDisplay**: Before/after comparison
- **StyleSelector**: Choose artistic style
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
6. **Test all artistic styles**

---

## 📚 Additional Resources

- Main documentation: `/docs/`
- API reference: `/docs/api/`
- Examples: `/docs/examples/basic/style-transfer/`
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
