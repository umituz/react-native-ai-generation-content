# Photo Restoration Feature

Restore and enhance old, blurry, or damaged photos using AI.

## 📍 Import Path

```typescript
import { usePhotoRestoreFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/photo-restoration/`

## 🎯 Feature Purpose

Repair and enhance damaged, old, or low-quality photographs using AI. Removes scratches, fixes blur, colorizes black & white photos, and restores facial details.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Restoring old family photographs
- Repairing scratched or torn photos
- Fixing blurry or out-of-focus images
- Colorizing black and white photos
- Enhancing vintage photograph quality
- Preserving historical images

❌ **When NOT to Use:**
- Simple brightness/contrast adjustments (use basic image editing)
- Background removal (use Remove Background feature)
- Face swapping (use Face Swap feature)
- artistic style changes (use Style Transfer)

### Implementation Strategy

1. **Select restoration type** (auto or specific)
2. **Upload photo** with clear issues visible
3. **Preview before/after** comparison
4. **Allow re-processing** with different settings
5. **Save high-resolution result**
6. **Provide quality feedback** mechanism

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Image Requirements
- **MUST** provide ONE image to restore
- **MUST** use high-quality scan (min 1024x1024 recommended)
- **MUST** ensure photo has visible issues to fix
- **MUST** use supported formats (JPEG, PNG)
- **MUST NOT** exceed file size limits (20MB max)

### 2. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** specify `restorationType` (auto or specific)
- **MUST** implement `onError` callback
- **MUST** implement `onSelectPhoto` callback
- **MUST** handle all restoration states

### 3. State Management
- **MUST** check `isReady` before enabling restore button
- **MUST** display progress during restoration
- **MUST** handle long processing times (show progress)
- **MUST** display `error` state with clear messages
- **MUST** implement proper cleanup on unmount

### 4. Performance
- **MUST** implement image compression before upload
- **MUST** show progress indicator for long operations
- **MUST** cache restored images locally
- **MUST** allow users to cancel processing
- **MUST NOT** restore multiple images simultaneously

### 5. User Experience
- **MUST** provide before/after comparison
- **MUST** allow re-processing with different settings
- **MUST** show estimated processing time
- **MUST** handle restoration failures gracefully
- **MUST** provide download/share options

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Missing Images**
   - Always validate image is selected
   - Never call process() without image

2. **No Auto-Processing**
   - Never start restoration without user action
   - Always require explicit "Restore" button press
   - Provide clear preview before processing

3. **No Hardcoded Credentials**
   - Never store API keys in component files
   - Use environment variables or secure storage

4. **No Unhandled Errors**
   - Never ignore restoration failures
   - Always explain what went wrong
   - Provide retry or alternative options

5. **No Memory Leaks**
   - Never store large original and restored images simultaneously
   - Clean up temporary images
   - Implement proper image disposal

6. **No Blocking UI**
   - Never block main thread with image processing
   - Always show progress indicator
   - Allow cancellation of long operations

7. **No Loss of Original**
   - Never overwrite original photo
   - Always keep original for comparison
   - Store both versions separately

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing a photo restoration feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the usePhotoRestoreFeature hook
3. Select restoration type (auto or specific)
4. Implement photo selection UI
5. Validate photo before restoration
6. Show before/after comparison
7. Handle long processing times with progress
8. Implement proper error handling
9. Allow re-processing with different settings
10. Implement cleanup on unmount

CRITICAL RULES:
- MUST validate photo before calling restore()
- MUST show before/after comparison
- MUST never overwrite original photo
- MUST handle long processing times
- MUST allow re-processing
- MUST implement debouncing (300ms)

CONFIGURATION:
- Provide valid userId (string)
- Set restorationType: 'auto' | 'scratches' | 'blur' | 'colorize' | 'all'
- Implement onSelectPhoto callback
- Implement onSaveResult callback
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

RESTORATION OPTIONS:
- removeScratches: boolean (remove scratches and tears)
- fixBlur: boolean (fix blurry photos)
- colorize: boolean (add color to B&W photos)
- enhanceFaces: boolean (restore facial details)
- adjustContrast: boolean (improve contrast and brightness)

STRICTLY FORBIDDEN:
- No missing photo validation
- No auto-processing without user action
- No hardcoded API keys
- No unhandled errors
- No memory leaks
- No overwriting original photo
- No blocking UI

QUALITY CHECKLIST:
- [ ] Photo selection implemented
- [ ] Restoration type selector
- [ ] Before/after comparison view
- [ ] Progress indicator for long operations
- [ ] Error display with retry option
- [ ] Re-processing with different settings
- [ ] Download/share functionality
- [ ] Original photo preserved
```

#### AI Implementation Checklist

Use this checklist when generating code:

- [ ] Feature imported from correct path
- [ ] Photo selection implemented
- [ ] Restoration type selector added
- [ ] Validation before restore()
- [ ] Before/after comparison view
- [ ] Progress indicator during processing
- [ ] Error display with user-friendly message
- [ ] Re-processing option available
- [ ] Original photo preserved
- [ ] Download/share buttons
- [ ] Cleanup on unmount
- [ ] Image compression configured

---

## 🛠️ Configuration Strategy

### Essential Configuration

```typescript
// Required fields
{
  userId: string
  restorationType: 'auto' | 'scratches' | 'blur' | 'colorize' | 'all'
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

1. **Restoration Types**
   - Auto: Let AI detect issues (recommended for most cases)
   - Scratches: Remove scratches, tears, stains
   - Blur: Fix blurry or out-of-focus images
   - Colorize: Add color to black & white photos
   - All: Apply all restoration techniques

2. **Image Quality**
   - Minimum scan: 1024x1024 resolution
   - Recommended: 2048x2048 or higher
   - Format: JPEG or PNG
   - Max size: 20MB

3. **Performance Settings**
   - Compress images before upload
   - Show progress for long operations
   - Implement timeout (120s default)
   - Enable result caching

---

## 📊 State Management

### Feature States

**isReady**: boolean
- Photo selected and validated
- Check before enabling restore button

**isProcessing**: boolean
- Restoration in progress
- Show loading/progress indicator
- Disable restore button

**progress**: number (0-100)
- Restoration progress percentage
- Update progress bar

**error**: string | null
- Error message if restoration failed
- Display to user with clear message

**result**: {
  imageUrl: string
  originalImageUrl?: string
  restorationType?: string
  metadata?: any
}

---

## 🎨 Best Practices

### Photo Selection

1. **Scan Quality**
   - Good: High-resolution scan (300 DPI or higher)
   - Bad: Low-quality photo of photo

2. **Lighting**
   - Good: Even, well-lit scans
   - Bad: Harsh shadows or glare

3. **Damage Assessment**
   - Start with auto mode to detect issues
   - Use specific restoration for targeted fixes

4. **Multiple Restorations**
   - Some photos benefit from multiple passes
   - Allow re-processing with different settings

### User Experience

1. **Before/After Comparison**
   - Show side-by-side comparison
   - Add slider or toggle for easy comparison
   - Zoom capability for detail inspection

2. **Progress Feedback**
   - Show estimated time remaining
   - Update progress regularly
   - Allow cancellation

3. **Quality Options**
   - Offer multiple restoration types
   - Show examples of each type
   - Recommend best option

---

## 🐛 Common Pitfalls

### Quality Issues

❌ **Problem**: Poor restoration quality
✅ **Solution**: Use higher resolution scans, try different restoration types

### Performance Issues

❌ **Problem**: Very slow processing
✅ **Solution**: Compress images, show progress, allow cancellation

### User Confusion

❌ **Problem**: Users don't see improvement
✅ **Solution**: Provide before/after comparison, zoom capability

### Memory Issues

❌ **Problem**: App crashes with large images
✅ **Solution**: Compress images, implement streaming, clean up properly

---

## 📦 Related Components

Use these components from the library:

- **PhotoUploadCard**: Upload photo interface
- **ResultDisplay**: Before/after comparison
- **RestorationTypeSelector**: Choose restoration type
- **ProgressBar**: Progress display
- **ImageComparison**: Side-by-side comparison

Located at: `src/presentation/components/`

---

## 🔄 Migration Strategy

If migrating from previous implementation:

1. **Update imports** to new path
2. **Add restoration type selector**
3. **Implement before/after comparison**
4. **Update state handling** for new structure
5. **Add re-processing capability**
6. **Test all restoration types**

---

## 📚 Additional Resources

- Main documentation: `/docs/`
- API reference: `/docs/api/`
- Examples: `/docs/examples/basic/photo-restoration/`
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
- Added before/after comparison guidelines

### v1.0.0 - Initial Release
- Initial feature documentation
