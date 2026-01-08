# Image to Image Feature

Transform images using AI with various operations and styles.

## 📍 Import Path

```typescript
import {
  useSingleImageFeature,
  useDualImageFeature,
  useImageWithPromptFeature
} from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/image-to-image/`

## 🎯 Feature Purpose

Flexible framework for transforming images using AI. Supports three modes: single image operations (style transfer, enhancement), dual image operations (face swap, blend), and image with prompt transformations (guided editing).

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Style transfer and artistic transformations
- Face swapping between images
- Image blending and compositing
- Guided image editing with prompts
- Custom image transformations

❌ **When NOT to Use:**
- Background removal (use Remove Background)
- Object removal (use Remove Object)
- Photo restoration (use Photo Restoration)
- Image upscaling (use Upscaling)

### Implementation Strategy

#### Single Image Mode
1. **Select image** to transform
2. **Choose operation type** (style transfer, filter, etc.)
3. **Configure options** for the operation
4. **Process transformation** with progress tracking
5. **Preview and compare** with original
6. **Save or share** result

#### Dual Image Mode
1. **Select source image** (primary subject)
2. **Select target image** (reference or source)
3. **Choose operation** (face swap, blend, etc.)
4. **Configure options** for the operation
5. **Process transformation** with progress tracking
6. **Preview and compare** result
7. **Save or share** result

#### Image with Prompt Mode
1. **Select base image** to transform
2. **Enter text prompt** describing desired changes
3. **Configure strength** and other options
4. **Process transformation** with progress tracking
5. **Preview and compare** with original
6. **Save or share** result

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Image Requirements
- **MUST** provide appropriate number of images for mode (1 or 2)
- **MUST** use high-quality images (min 512x512 recommended)
- **MUST** have clear, recognizable content
- **MUST NOT** exceed file size limits (10MB each)
- **MUST** validate images before processing

### 2. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** specify operation mode (single, dual, or with prompt)
- **MUST** implement `buildInput` function for mode
- **MUST** implement `onError` callback
- **MUST** implement appropriate `onSelect*` callbacks

### 3. State Management
- **MUST** check `isReady` before enabling process button
- **MUST** verify all required inputs are provided
- **MUST** display progress during processing
- **MUST** display `error` state with clear messages
- **MUST** implement proper cleanup on unmount

### 4. Performance
- **MUST** implement image compression before upload
- **MUST** show progress indicator for processing
- **MUST** cache results locally
- **MUST** allow users to cancel processing
- **MUST NOT** process multiple transformations simultaneously

### 5. Build Input Function
- **MUST** properly structure input based on API requirements
- **MUST** include all required parameters
- **MUST** validate inputs before API call
- **MUST** handle mode-specific parameters correctly

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Missing Images**
   - Always validate all required images are selected
   - Never call process() without complete inputs

2. **No Auto-Processing**
   - Never start transformation without user action
   - Always require explicit "Transform" button press
   - Show preview before processing

3. **No Hardcoded Credentials**
   - Never store API keys in component files
   - Use environment variables or secure storage

4. **No Unhandled Errors**
   - Never ignore transformation failures
   - Always explain what went wrong
   - Provide retry or alternative options

5. **No Memory Leaks**
   - Never store large image sets unnecessarily
   - Clean up temporary images
   - Implement proper image disposal

6. **No Wrong Mode**
   - Never use single image mode for dual image operations
   - Always select appropriate hook for operation
   - Validate mode matches use case

7. **No Invalid Build Input**
   - Never forget to implement buildInput function
   - Always structure input correctly for API
   - Validate all required parameters

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing an image to image transformation feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Choose appropriate hook based on operation:
   - useSingleImageFeature for single image operations
   - useDualImageFeature for two image operations
   - useImageWithPromptFeature for image + prompt operations
3. Implement image selection UI (1 or 2 images based on mode)
4. Implement buildInput function to structure API inputs
5. Configure operation-specific options
6. Validate images before processing
7. Show before/after comparison
8. Handle long processing times with progress
9. Implement proper error handling
10. Implement cleanup on unmount

CRITICAL RULES:
- MUST select correct hook for operation type
- MUST implement buildInput function properly
- MUST validate all required images are selected
- MUST show before/after comparison
- MUST implement debouncing (300ms)
- MUST allow transformation regeneration

HOOK SELECTION:
- useSingleImageFeature: Style transfer, filters, single image edits
- useDualImageFeature: Face swap, blending, two image composites
- useImageWithPromptFeature: Guided editing with text descriptions

CONFIGURATION:
- Provide valid userId (string)
- Implement onSelectImage (single mode) or onSelectSourceImage/onSelectTargetImage (dual mode)
- Implement onSaveImage callback
- Implement buildInput function to structure API call
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

BUILD INPUT FUNCTION:
- Single Image: (imageBase64, config) => API input
- Dual Image: (sourceBase64, targetBase64, config) => API input
- With Prompt: (imageBase64, prompt, config) => API input

STRICTLY FORBIDDEN:
- No missing image validation
- No auto-processing without user action
- No hardcoded API keys
- No unhandled errors
- No memory leaks
- No blocking UI
- No missing buildInput function

QUALITY CHECKLIST:
- [ ] Correct hook selected for operation
- [ ] Image selection implemented (1 or 2 images)
- [ ] buildInput function implemented
- [ ] Validation before process()
- [ ] Before/after comparison view
- [ ] Progress indicator during processing
- [ ] Error display with retry option
- [ ] Download/share functionality
- [ ] Transformation regeneration option
```

#### AI Implementation Checklist

Use this checklist when generating code:

- [ ] Feature imported from correct path
- [ ] Correct hook selected (single/dual/prompt)
- [ ] Image selection(s) implemented
- [ ] buildInput function implemented correctly
- [ ] Validation before process()
- [ ] Before/after comparison view
- [ ] Progress indicator during processing
- [ ] Error display with user-friendly message
- [ ] Download/share buttons
- [ ] Transformation regeneration option
- [ ] Cleanup on unmount
- [ ] Original images preserved

---

## 🛠️ Configuration Strategy

### Hook Selection

```typescript
// Single Image Operations
useSingleImageFeature<Config, Result>({
  config,
  onSelectImage,
  onSaveImage,
  options: {
    buildInput: (imageBase64, config) => ({
      imageBase64,
      operation: config.operation,
      ...config.options
    }),
  },
})

// Dual Image Operations
useDualImageFeature<Config, Result>({
  config,
  onSelectSourceImage,
  onSelectTargetImage,
  onSaveImage,
  options: {
    buildInput: (sourceBase64, targetBase64, config) => ({
      imageBase64: sourceBase64,
      targetImageBase64: targetBase64,
      operation: config.operation,
      ...config.options
    }),
  },
})

// Image with Prompt Operations
useImageWithPromptFeature<Config, Result>({
  config,
  onSelectImage,
  onSaveImage,
  options: {
    buildInput: (imageBase64, prompt, config) => ({
      imageBase64,
      prompt,
      strength: config.strength,
      ...config.options
    }),
  },
})
```

### Common Operations

1. **Single Image**: Style transfer, filters, enhancements
2. **Dual Image**: Face swap, blending, compositing
3. **With Prompt**: Guided editing, semantic transformations

### Recommended Settings

1. **Image Quality**
   - Minimum: 512x512 resolution
   - Recommended: 1024x1024 or higher
   - Format: JPEG or PNG
   - Max size: 10MB each

2. **Prompt Strength (when applicable)**
   - 0.3-0.5: Subtle changes
   - 0.6-0.8: Balanced transformation (recommended)
   - 0.9-1.0: Strong transformation

---

## 📊 State Management

### Feature States

**isReady**: boolean
- All required images selected and validated
- Check before enabling process button

**isProcessing**: boolean
- Transformation in progress
- Show loading/progress indicator
- Disable process button

**progress**: number (0-100)
- Transformation progress percentage
- Update progress bar

**error**: string | null
- Error message if transformation failed
- Display to user with clear message

**result**: {
  imageUrl: string
  originalImageUrl?: string
  operation?: string
  metadata?: any
}

---

## 🎨 Best Practices

### Mode Selection

1. **Single Image Mode**
   - Use for: Filters, style transfer, adjustments
   - Good: Artistic transformations, enhancements
   - Bad: Multi-image operations

2. **Dual Image Mode**
   - Use for: Face swap, blending, compositing
   - Good: Combining elements from two images
   - Bad: Single image transformations

3. **Image with Prompt Mode**
   - Use for: Guided editing, semantic changes
   - Good: Specific, described modifications
   - Bad: Simple filters (use single image mode)

### Input Building

1. **Structure Inputs Properly**
   - Match API requirements exactly
   - Include all required fields
   - Validate before sending

2. **Parameter Handling**
   - Handle optional parameters gracefully
   - Provide sensible defaults
   - Document required vs optional

### User Experience

1. **Before/After Comparison**
   - Side-by-side comparison
   - Slider or toggle for easy comparison
   - Zoom capability for detail inspection

2. **Progress Feedback**
   - Show estimated time remaining
   - Update progress regularly
   - Allow cancellation

---

## 🐛 Common Pitfalls

### Wrong Mode

❌ **Problem**: Using single image mode for dual image operation
✅ **Solution**: Select appropriate hook (useDualImageFeature)

### Build Input Issues

❌ **Problem**: Transformation fails due to incorrect input structure
✅ **Solution**: Verify buildInput function matches API requirements

### Missing Images

❌ **Problem**: Process called without all required images
✅ **Solution**: Validate all images selected before processing

### Performance Issues

❌ **Problem**: Slow transformation
✅ **Solution**: Compress images, show progress, allow cancellation

---

## 📦 Related Components

Use these components from the library:

- **PhotoUploadCard**: Upload image interface
- **DualImagePicker**: Select two images for dual mode
- **PromptInput**: Text input for prompt mode
- **ResultDisplay**: Before/after comparison
- **ProgressBar**: Progress display

Located at: `src/presentation/components/`

---

## 🔄 Migration Strategy

If migrating from previous implementation:

1. **Select appropriate hook** for your operation
2. **Implement buildInput function** to structure API inputs
3. **Update state handling** for your mode (single/dual/prompt)
4. **Add before/after comparison**
5. **Test all operation modes**

---

## 📚 Additional Resources

- Main documentation: `/docs/`
- API reference: `/docs/api/`
- Examples: `/docs/examples/basic/image-to-image/`
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
