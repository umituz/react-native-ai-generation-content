# Upscaling Feature

Increase image resolution while maintaining quality using AI.

## 📍 Import Path

```typescript
import { useUpscaleFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/upscaling/`

## 🎯 Feature Purpose

Increase image resolution by 2x or 4x while maintaining and enhancing quality using AI. Removes noise and artifacts during the upscaling process.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Enhancing low-resolution photos
- Preparing images for print
- Improving image quality for presentations
- Upscaling for large format displays
- Increasing resolution for cropping
- Enhancing old digital photos

❌ **When NOT to Use:**
- Simple resizing without quality enhancement (use basic image resizing)
- Photo restoration with scratches (use Photo Restoration)
- Image sharpening only (use HD Touch Up)
- Artistic style changes (use Style Transfer)

### Implementation Strategy

1. **Select image** to upscale
2. **Choose scale factor** (2x or 4x)
3. **Select enhancement options** (denoise, enhance)
4. **Show file size warning** for 4x upscaling
5. **Display before/after comparison**
6. **Provide download in multiple formats**

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Image Requirements
- **MUST** provide ONE image to upscale
- **MUST** use reasonable resolution (min 256x256)
- **MUST** consider file size limits (original < 10MB recommended)
- **MUST** use supported formats (JPEG, PNG, WebP)
- **MUST NOT** exceed output dimensions limits

### 2. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** specify `scaleFactor` (2 or 4)
- **MUST** implement `onError` callback
- **MUST** implement `onSelectImage` callback
- **MUST** warn about file size increase

### 3. State Management
- **MUST** check `isReady` before enabling upscale button
- **MUST** display progress during upscaling
- **MUST** handle very large file sizes (4x can be 16x larger)
- **MUST** display `error` state with clear messages
- **MUST** implement proper cleanup on unmount

### 4. Performance
- **MUST** warn about 4x file sizes (can be very large)
- **MUST** show progress indicator for long operations
- **MUST** implement timeout (180s for 4x upscaling)
- **MUST** allow users to cancel processing
- **MUST** cache results locally to avoid re-processing

### 5. User Experience
- **MUST** show before/after comparison
- **MUST** display estimated output file size
- **MUST** warn about processing time
- **MUST** provide quality settings
- **MUST** handle large result downloads

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Missing Images**
   - Always validate image is selected
   - Never call process() without image

2. **No Auto-Processing**
   - Never start upscaling without user action
   - Always require explicit "Upscale" button press
   - Show preview before processing

3. **No Ignoring File Sizes**
   - Never hide file size warnings for 4x upscaling
   - Always display estimated output size
   - Warn about download times

4. **No Unhandled Errors**
   - Never ignore upscaling failures
   - Always explain what went wrong
   - Provide retry or alternative options

5. **No Memory Leaks**
   - Never keep both original and 4x upscaled in memory
   - Clean up temporary images
   - Implement proper image disposal

6. **No Blocking UI**
   - Never block main thread with image processing
   - Always show progress indicator
   - Allow cancellation of long operations

7. **No Quality Loss**
   - Never compress upscaled image excessively
   - Use appropriate quality settings
   - Preserve enhancement benefits

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing an image upscaling feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the useUpscaleFeature hook
3. Select scale factor (2x or 4x)
4. Implement image selection UI
5. Validate image before upscaling
6. Show before/after comparison
7. Warn about file sizes (especially 4x)
8. Handle long processing times with progress
9. Implement proper error handling
10. Implement cleanup on unmount

CRITICAL RULES:
- MUST validate image before calling upscale()
- MUST warn about 4x file sizes (can be 16x larger)
- MUST show before/after comparison
- MUST handle very large result files
- MUST implement debouncing (300ms)
- MUST allow cancellation of long operations

CONFIGURATION:
- Provide valid userId (string)
- Set scaleFactor: 2 | 4 (2 = double, 4 = quadruple)
- Implement onSelectImage callback
- Implement onSaveImage callback
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

UPSCALING OPTIONS:
- scaleFactor: 2 | 4 (resolution multiplier)
- enhance: boolean (improve details during upscaling)
- denoise: boolean (remove noise and artifacts)

STRICTLY FORBIDDEN:
- No missing image validation
- No auto-processing without user action
- No ignoring file size warnings
- No unhandled errors
- No memory leaks with large images
- No blocking UI
- No excessive compression of results

QUALITY CHECKLIST:
- [ ] Image selection implemented
- [ ] Scale factor selector (2x, 4x)
- [ ] File size warning displayed
- [ ] Before/after comparison view
- [ ] Progress indicator for long operations
- [ ] Error display with retry option
- [ ] Download with format options
- [ ] Cancellation capability
- [ ] Original image preserved
```

#### AI Implementation Checklist

Use this checklist when generating code:

- [ ] Feature imported from correct path
- [ ] Image selection implemented
- [ ] Scale factor selector added (2x, 4x)
- [ ] Validation before upscale()
- [ ] File size warning displayed
- [ ] Before/after comparison view
- [ ] Progress indicator during processing
- [ ] Error display with user-friendly message
- [ ] Download functionality for large files
- [ ] Cancellation button available
- [ ] Cleanup on unmount
- [ ] Original image preserved

---

## 🛠️ Configuration Strategy

### Essential Configuration

```typescript
// Required fields
{
  userId: string
  scaleFactor: 2 | 4
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

1. **Scale Factors**
   - 2x: Double resolution (file size ~4x larger)
   - 4x: Quadruple resolution (file size ~16x larger)
   - Start with 2x, try 4x if needed

2. **Image Quality**
   - Minimum input: 256x256 resolution
   - Recommended input: 1024x1024 or higher
   - Format: JPEG, PNG, or WebP
   - Max input size: 10MB

3. **Performance Settings**
   - Timeout: 180s for 4x upscaling
   - Show progress for long operations
   - Enable result caching
   - Warn about download times

---

## 📊 State Management

### Feature States

**isReady**: boolean
- Image selected and validated
- Check before enabling upscale button

**isProcessing**: boolean
- Upscaling in progress
- Show loading/progress indicator
- Disable upscale button

**progress**: number (0-100)
- Upscaling progress percentage
- Update progress bar

**error**: string | null
- Error message if upscaling failed
- Display to user with clear message

**result**: {
  imageUrl: string
  originalImageUrl?: string
  scaleFactor?: number
  outputSize?: { width: number; height: number }
  metadata?: any
}

---

## 🎨 Best Practices

### Image Selection

1. **Input Quality**
   - Good: Reasonable quality source images
   - Bad: Extremely low resolution (<256px) or very compressed

2. **Scale Factor Choice**
   - Start with 2x for most cases
   - Use 4x for print or large displays
   - Consider file size implications

3. **Enhancement Options**
   - Enable enhance for better detail preservation
   - Use denoise for noisy source images
   - Both options recommended for best quality

### User Experience

1. **File Size Warnings**
   - Clearly show estimated output file size
   - Warn about download times for 4x
   - Provide quality vs size options

2. **Progress Feedback**
   - Show estimated time remaining
   - Update progress regularly
   - Allow cancellation for long operations

3. **Comparison Tools**
   - Side-by-side comparison
   - Zoom capability for detail inspection
   - Pixel-level comparison (optional)

---

## 🐛 Common Pitfalls

### Quality Issues

❌ **Problem**: Upscaled image looks blurry
✅ **Solution**: Enable enhance option, try higher quality source

### File Size Issues

❌ **Problem**: 4x file too large to handle
✅ **Solution**: Warn users, allow 2x option, compress appropriately

### Performance Issues

❌ **Problem**: Very slow upscaling
✅ **Solution**: Show progress, allow cancellation, implement timeout

### Memory Issues

❌ **Problem**: App crashes with large upscales
✅ **Solution**: Clean up original image, stream download, optimize memory

---

## 📦 Related Components

Use these components from the library:

- **PhotoUploadCard**: Upload image interface
- **ResultDisplay**: Before/after comparison
- **ScaleFactorSelector**: Choose 2x or 4x
- **ProgressBar**: Progress display
- **ImageComparison**: Side-by-side comparison

Located at: `src/presentation/components/`

---

## 🔄 Migration Strategy

If migrating from previous implementation:

1. **Update imports** to new path
2. **Add scale factor selector** (2x, 4x)
3. **Implement file size warnings**
4. **Update state handling** for new structure
5. **Add before/after comparison**
6. **Test with large files**

---

## 📚 Additional Resources

- Main documentation: `/docs/`
- API reference: `/docs/api/`
- Examples: `/docs/examples/basic/upscaling/`
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
- Added file size handling guidelines

### v1.0.0 - Initial Release
- Initial feature documentation
