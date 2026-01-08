# HD Touch Up Feature

Apply high-detail enhancements to images using AI.

## 📍 Import Path

```typescript
import { useHDTouchUpFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/hd-touch-up/`

## 🎯 Feature Purpose

Enhance image quality with AI-powered improvements including sharpening, noise reduction, facial enhancement, color adjustment, and contrast optimization. Professional-quality touch-ups for portraits, product photos, landscapes, and more.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Enhancing portrait photographs
- Improving product photo quality
- Sharpening landscape details
- Reducing noise in low-light photos
- Professional photo polishing

❌ **When NOT to Use:**
- Restoring damaged photos (use Photo Restoration)
- Adding color to B&W photos (use Colorization)
- Upscaling resolution (use Upscaling)
- Applying artistic filters (use Style Transfer)

### Implementation Strategy

1. **Select image** to enhance
2. **Choose enhancement level** (low, medium, high)
3. **Configure options** (enhance faces, denoise, sharpen, etc.)
4. **Process enhancement** with progress tracking
5. **Preview and compare** with original
6. **Save or share** enhanced image

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Image Requirements
- **MUST** provide ONE image to enhance
- **MUST** use reasonably high-quality images (min 512x512)
- **MUST** have clear, visible content
- **MUST NOT** exceed file size limits (10MB max)
- **MUST NOT** use extremely blurry or unusable photos

### 2. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** specify `enhancementLevel` (low, medium, high)
- **MUST** configure enhancement options
- **MUST** implement `onError` callback
- **MUST** implement `onSelectImage` callback

### 3. State Management
- **MUST** check `isReady` before enabling enhance button
- **MUST** display progress during enhancement
- **MUST** handle long processing times
- **MUST** display `error` state with clear messages
- **MUST** implement proper cleanup on unmount

### 4. Performance
- **MUST** implement image compression before upload
- **MUST** show progress indicator for processing
- **MUST** cache results locally
- **MUST** allow users to cancel processing
- **MUST NOT** enhance multiple images simultaneously

### 5. Enhancement Options
- **MUST** provide enhancement level control
- **MUST** support facial enhancement toggle
- **MUST** support denoise option
- **MUST** support sharpen option
- **MUST** support color and contrast adjustments

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Missing Images**
   - Always validate image is selected
   - Never call process() without image

2. **No Auto-Processing**
   - Never start enhancement without user action
   - Always require explicit "Enhance" button press
   - Show preview before processing

3. **No Hardcoded Credentials**
   - Never store API keys in component files
   - Use environment variables or secure storage

4. **No Unhandled Errors**
   - Never ignore enhancement failures
   - Always explain what went wrong
   - Provide retry or alternative options

5. **No Memory Leaks**
   - Never store both original and enhanced simultaneously
   - Clean up temporary images
   - Implement proper image disposal

6. **No Blocked UI**
   - Never block main thread with image processing
   - Always show progress indicator
   - Allow cancellation

7. **No Over-Enhancement**
   - Never apply maximum enhancement by default
   - Always start with moderate levels
   - Allow user to adjust intensity

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing an HD touch up feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the useHDTouchUpFeature hook
3. Select enhancement level (low, medium, high)
4. Implement image selection UI
5. Configure enhancement options (faces, denoise, sharpen, colors, contrast)
6. Validate image before enhancement
7. Show before/after comparison
8. Handle long processing times with progress
9. Implement proper error handling
10. Implement cleanup on unmount

CRITICAL RULES:
- MUST validate image before calling enhance()
- MUST show before/after comparison
- MUST handle enhancement level selection
- MUST handle individual enhancement toggles
- MUST implement debouncing (300ms)
- MUST allow regeneration with different settings

CONFIGURATION:
- Provide valid userId (string)
- Set enhancementLevel: 'low' | 'medium' | 'high'
- Set enhanceFaces: boolean (portrait enhancement)
- Set denoise: boolean (reduce noise)
- Set sharpen: boolean (sharpen details)
- Set adjustColors: boolean (improve vibrancy)
- Set adjustContrast: boolean (enhance tones)
- Implement onSelectImage callback
- Implement onSaveResult callback
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

ENHANCEMENT LEVELS:
- low: Subtle improvements, natural look
- medium: Balanced enhancements (recommended)
- high: Strong enhancements, professional quality

OPTIONS:
- enhanceFaces: Apply face-specific enhancements
- denoise: Remove noise and grain
- sharpen: Enhance edges and details
- adjustColors: Improve color vibrancy
- adjustContrast: Enhance contrast and tones

STRICTLY FORBIDDEN:
- No missing image validation
- No auto-processing without user action
- No hardcoded API keys
- No unhandled errors
- No memory leaks
- No blocking UI
- No over-enhancement

QUALITY CHECKLIST:
- [ ] Image selection implemented
- [ ] Enhancement level selector added
- [ ] Enhancement toggles included
- [ ] Validation before enhance()
- [ ] Before/after comparison view
- [ ] Progress indicator during processing
- [ ] Error display with retry option
- [ ] Download/share functionality
- [ ] Regeneration with different settings
```

#### AI Implementation Checklist

Use this checklist when generating code:

- [ ] Feature imported from correct path
- [ ] Image selection implemented
- [ ] Enhancement level selector added
- [ ] Enhancement toggles implemented
- [ ] Validation before enhance()
- [ ] Before/after comparison view
- [ ] Progress indicator during processing
- [ ] Error display with user-friendly message
- [ ] Download/share buttons
- [ ] Regeneration option
- [ ] Cleanup on unmount
- [ ] Original image preserved

---

## 🛠️ Configuration Strategy

### Essential Configuration

```typescript
// Required fields
{
  userId: string
  enhancementLevel: 'low' | 'medium' | 'high'
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

1. **Enhancement Levels**
   - Low: Subtle improvements for natural look
   - Medium: Balanced enhancements (recommended for most photos)
   - High: Maximum enhancements for professional quality

2. **Enhancement Options**
   - enhanceFaces: Apply face-specific enhancements (portraits)
   - denoise: Remove noise and grain (low-light, high-ISO photos)
   - sharpen: Enhance edges and details
   - adjustColors: Improve color vibrancy (faded/dull photos)
   - adjustContrast: Enhance contrast and tones

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
- Check before enabling enhance button

**isProcessing**: boolean
- Enhancement in progress
- Show loading/progress indicator
- Disable enhance button

**progress**: number (0-100)
- Enhancement progress percentage
- Update progress bar

**error**: string | null
- Error message if enhancement failed
- Display to user with clear message

**result**: {
  imageUrl: string
  originalImageUrl?: string
  enhancementLevel?: string
  metadata?: any
}

---

## 🎨 Best Practices

### Enhancement Selection

1. **Enhancement Level**
   - Start with Medium for most photos
   - Use Low for subtle improvements
   - Use High for professional quality

2. **Subject-Specific Options**
   - Portraits: Enable enhanceFaces
   - Landscapes: Enable sharpen and adjustContrast
   - Product photos: Enable sharpen and adjustColors
   - Low-light: Enable denoise

3. **Quality**
   - Good: Clear, well-composed photos
   - Bad: Extremely blurry or unusable photos

### User Experience

1. **Preview**
   - Show preview of enhancement settings
   - Compare different enhancement levels
   - Allow option toggles

2. **Before/After Comparison**
   - Side-by-side comparison
   - Slider for easy comparison
   - Zoom for detail inspection

---

## 🐛 Common Pitfalls

### Quality Issues

❌ **Problem**: Over-enhanced appearance
✅ **Solution**: Reduce enhancement level, disable unnecessary options

### Subject Issues

❌ **Problem**: Wrong options for subject type
✅ **Solution**: Match options to photo subject (portraits, landscapes, etc.)

### Performance Issues

❌ **Problem**: Slow enhancement
✅ **Solution**: Compress images, show progress, allow cancellation

---

## 📦 Related Components

Use these components from the library:

- **PhotoUploadCard**: Upload image interface
- **EnhancementLevelSelector**: Choose enhancement intensity
- **EnhancementToggles**: Toggle specific enhancements
- **ResultDisplay**: Before/after comparison
- **ProgressBar**: Progress display

Located at: `src/presentation/components/`

---

## 🔄 Migration Strategy

If migrating from previous implementation:

1. **Update imports** to new path
2. **Add enhancement level selector**
3. **Implement enhancement toggles**
4. **Update state handling** for new structure
5. **Add before/after comparison**
6. **Test all enhancement levels**

---

## 📚 Additional Resources

- Main documentation: `/docs/`
- API reference: `/docs/api/`
- Examples: `/docs/examples/basic/hd-touch-up/`
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
