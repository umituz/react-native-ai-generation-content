# Inpainting Feature

Fill in missing or hidden parts of images using AI.

## 📍 Import Path

```typescript
import { useInpaintingFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/inpainting/`

## 🎯 Feature Purpose

Intelligently fill in missing areas, remove unwanted objects, or extend image boundaries using AI-powered content-aware fill. Supports smart reconstruction, contextual filling, and pattern matching for natural-looking results.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Removing unwanted objects from photos
- Repairing damaged or torn areas
- Extending image boundaries
- Filling in missing parts of images
- Cleaning up sensor dust or scratches

❌ **When NOT to Use:**
- Simple background removal (use Remove Background)
- General object removal without precise masking (use Remove Object)
- Photo restoration (use Photo Restoration)
- Adding new elements not present in image

### Implementation Strategy

1. **Select image** with missing or unwanted areas
2. **Create mask** by painting over areas to fill
3. **Choose fill method** (smart, contextual, pattern)
4. **Configure options** (edge blending, context preservation)
5. **Process inpainting** with progress tracking
6. **Preview and compare** with original
7. **Save or adjust** result

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Image Requirements
- **MUST** provide ONE image to inpaint
- **MUST** use high-quality images (min 512x512 recommended)
- **MUST** have clear areas to fill
- **MUST NOT** exceed file size limits (10MB max)
- **MUST** create accurate mask for areas to fill

### 2. Mask Requirements
- **MUST** provide valid mask image
- **MUST** paint mask carefully over areas to fill
- **MUST** ensure mask covers entire area to inpaint
- **MUST** include mask creation interface
- **MUST** validate mask before processing

### 3. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** specify `fillMethod` (smart, contextual, pattern)
- **MUST** implement `onError` callback
- **MUST** implement `onSelectImage` callback
- **MUST** implement `onCreateMask` callback

### 4. State Management
- **MUST** check `isReady` before enabling fill button
- **MUST** verify both image and mask are provided
- **MUST** display progress during inpainting
- **MUST** display `error` state with clear messages
- **MUST** implement proper cleanup on unmount

### 5. Performance
- **MUST** implement image compression before upload
- **MUST** show progress indicator for processing
- **MUST** cache results locally
- **MUST** allow users to cancel processing
- **MUST NOT** inpaint multiple areas simultaneously

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Missing Mask**
   - Always validate mask is created
   - Never call process() without mask

2. **No Auto-Processing**
   - Never start inpainting without user action
   - Always require explicit "Fill" button press
   - Show mask preview before processing

3. **No Hardcoded Credentials**
   - Never store API keys in component files
   - Use environment variables or secure storage

4. **No Unhandled Errors**
   - Never ignore inpainting failures
   - Always explain what went wrong
   - Provide retry or alternative options

5. **No Memory Leaks**
   - Never store both original and result simultaneously
   - Clean up temporary mask images
   - Implement proper image disposal

6. **No Blocked UI**
   - Never block main thread with mask processing
   - Always show progress indicator
   - Allow cancellation

7. **No Imprecise Masking**
   - Never use rough or inaccurate masks
   - Always provide tools for precise mask creation
   - Allow mask adjustment before processing

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing an inpainting feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the useInpaintingFeature hook
3. Implement image selection UI
4. Implement mask creation UI with drawing tools
5. Select fill method (smart, contextual, pattern)
6. Configure options (preserveContext, blendEdges)
7. Validate both image and mask before processing
8. Show before/after comparison
9. Handle long processing times with progress
10. Implement proper error handling
11. Implement cleanup on unmount

CRITICAL RULES:
- MUST validate both image and mask before calling process()
- MUST provide mask drawing/creation interface
- MUST show before/after comparison
- MUST handle fill method selection
- MUST implement debouncing (300ms)
- MUST allow multiple inpainting attempts

CONFIGURATION:
- Provide valid userId (string)
- Set fillMethod: 'smart' | 'contextual' | 'pattern'
- Set preserveContext: boolean (maintain surroundings)
- Set blendEdges: boolean (seamless integration)
- Implement onSelectImage callback
- Implement onCreateMask callback
- Implement onSaveResult callback
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

FILL METHODS:
- smart: AI-powered intelligent reconstruction
- contextual: Fill based on surrounding content
- pattern: Fill with detected patterns

OPTIONS:
- preserveContext: Maintain surrounding context (default: true)
- blendEdges: Blend filled area with surroundings (default: true)

STRICTLY FORBIDDEN:
- No missing mask validation
- No auto-processing without user action
- No hardcoded API keys
- No unhandled errors
- No memory leaks
- No blocking UI
- No imprecise masking

QUALITY CHECKLIST:
- [ ] Image selection implemented
- [ ] Mask creation/drawing interface added
- [ ] Fill method selector included
- [ ] Mask validation before processing
- [ ] Before/after comparison view
- [ ] Progress indicator during processing
- [ ] Error display with retry option
- [ ] Download/share functionality
- [ ] Multiple inpainting attempts supported
```

#### AI Implementation Checklist

Use this checklist when generating code:

- [ ] Feature imported from correct path
- [ ] Image selection implemented
- [ ] Mask drawing interface implemented
- [ ] Fill method selector added
- [ ] Validation before process() (image + mask)
- [ ] Before/after comparison view
- [ ] Progress indicator during processing
- [ ] Error display with user-friendly message
- [ ] Download/share buttons
- [ ] Multiple inpainting attempts option
- [ ] Cleanup on unmount
- [ ] Original image preserved

---

## 🛠️ Configuration Strategy

### Essential Configuration

```typescript
// Required fields
{
  userId: string
  fillMethod: 'smart' | 'contextual' | 'pattern'
  onSelectImage: () => Promise<string | null>
  onCreateMask: () => Promise<string | null>
}

// Optional callbacks
{
  onProcessingStart?: () => void
  onProcessingComplete?: (result) => void
  onError?: (error: string) => void
}
```

### Recommended Settings

1. **Fill Methods**
   - Smart: AI-powered intelligent reconstruction (recommended for most cases)
   - Contextual: Fill based on surrounding content (good for consistent backgrounds)
   - Pattern: Fill with detected patterns (good for repeating elements)

2. **Options**
   - preserveContext: Maintain surrounding context (default: true)
   - blendEdges: Blend filled area seamlessly (default: true)

3. **Image Quality**
   - Minimum: 512x512 resolution
   - Recommended: 1024x1024 or higher
   - Format: JPEG or PNG
   - Max size: 10MB

4. **Mask Quality**
   - Precise masking around edges
   - Complete coverage of area to fill
   - Semi-transparent for preview

---

## 📊 State Management

### Feature States

**isReady**: boolean
- Image selected and mask created
- Check before enabling fill button

**isProcessing**: boolean
- Inpainting in progress
- Show loading/progress indicator
- Disable fill button

**progress**: number (0-100)
- Inpainting progress percentage
- Update progress bar

**error**: string | null
- Error message if inpainting failed
- Display to user with clear message

**result**: {
  imageUrl: string
  originalImageUrl?: string
  fillMethod?: string
  metadata?: any
}

---

## 🎨 Best Practices

### Mask Creation

1. **Precision**
   - Good: Carefully painted edges around area
   - Bad: Rough, imprecise masking

2. **Coverage**
   - Ensure mask covers entire area to fill
   - Include some surrounding context
   - Avoid leaving gaps

3. **Fill Method Selection**
   - Use Smart Fill for most cases
   - Use Contextual for consistent backgrounds
   - Use Pattern for repeating elements

### User Experience

1. **Mask Drawing Tools**
   - Brush size adjustment
   - Eraser for corrections
   - Undo/redo support
   - Zoom for precision

2. **Preview**
   - Show mask overlay before processing
   - Allow mask adjustments
   - Preview fill method settings

3. **Before/After Comparison**
   - Side-by-side comparison
   - Slider for easy comparison
   - Zoom for detail inspection

---

## 🐛 Common Pitfalls

### Mask Issues

❌ **Problem**: Poor inpainting results
✅ **Solution**: Use precise mask, try different fill method

### Edge Issues

❌ **Problem**: Visible edges around filled area
✅ **Solution**: Enable blendEdges, improve mask precision

### Performance Issues

❌ **Problem**: Slow inpainting
✅ **Solution**: Compress images, show progress, allow cancellation

### Selection Issues

❌ **Problem**: Wrong fill method for content
✅ **Solution**: Try different fill method, adjust context preservation

---

## 📦 Related Components

Use these components from the library:

- **PhotoUploadCard**: Upload image interface
- **MaskEditor**: Create mask with drawing tools
- **FillMethodSelector**: Choose fill strategy
- **ResultDisplay**: Before/after comparison
- **ProgressBar**: Progress display

Located at: `src/presentation/components/`

---

## 🔄 Migration Strategy

If migrating from previous implementation:

1. **Update imports** to new path
2. **Add mask creation interface**
3. **Implement fill method selector**
4. **Update state handling** for new structure
5. **Add before/after comparison**
6. **Test all fill methods**

---

## 📚 Additional Resources

- Main documentation: `/docs/`
- API reference: `/docs/api/`
- Examples: `/docs/examples/basic/inpainting/`
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
