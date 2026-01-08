# Remove Object Feature

Remove unwanted objects from images using AI.

## 📍 Import Path

```typescript
import { useRemoveObjectFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/remove-object/`

## 🎯 Feature Purpose

Intelligently remove unwanted objects from photos with automatic background reconstruction. Uses AI to fill in the removed area with natural-looking content that matches the surroundings.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Removing photobombers from photos
- Cleaning up distracting elements
- Removing text, logos, or watermarks
- Eliminating trash or signs from nature photos
- Removing unwanted objects from backgrounds

❌ **When NOT to Use:**
- Background removal (use Remove Background)
- Filling missing areas (use Inpainting)
- Photo restoration (use Photo Restoration)
- Replacing background (use Replace Background)

### Implementation Strategy

1. **Select image** with unwanted objects
2. **Create mask** by painting over objects to remove
3. **Choose fill method** (smart, blur, color)
4. **Configure options** (edge feathering, context preservation)
5. **Process removal** with progress tracking
6. **Preview and compare** with original
7. **Save or adjust** result

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Image Requirements
- **MUST** provide ONE image with objects to remove
- **MUST** use high-quality images (min 512x512 recommended)
- **MUST** have clear, visible objects to remove
- **MUST NOT** exceed file size limits (10MB max)
- **MUST** create accurate mask for objects

### 2. Mask Requirements
- **MUST** provide valid mask image
- **MUST** paint mask completely over objects
- **MUST** ensure mask covers entire object
- **MUST** include mask creation interface
- **MUST** validate mask before processing

### 3. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** specify `fillMethod` (smart, blur, color)
- **MUST** implement `onError` callback
- **MUST** implement `onSelectImage` callback
- **MUST** implement `onCreateMask` callback

### 4. State Management
- **MUST** check `isReady` before enabling remove button
- **MUST** verify both image and mask are provided
- **MUST** display progress during removal
- **MUST** display `error` state with clear messages
- **MUST** implement proper cleanup on unmount

### 5. Performance
- **MUST** implement image compression before upload
- **MUST** show progress indicator for processing
- **MUST** cache results locally
- **MUST** allow users to cancel processing
- **MUST NOT** remove multiple objects simultaneously (combine masks)

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Missing Mask**
   - Always validate mask is created
   - Never call process() without mask

2. **No Auto-Processing**
   - Never start removal without user action
   - Always require explicit "Remove" button press
   - Show mask preview before processing

3. **No Hardcoded Credentials**
   - Never store API keys in component files
   - Use environment variables or secure storage

4. **No Unhandled Errors**
   - Never ignore removal failures
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

7. **No Incomplete Masking**
   - Never use partial masks that don't cover entire object
   - Always provide tools for complete object coverage
   - Allow mask adjustment before processing

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing a remove object feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the useRemoveObjectFeature hook
3. Implement image selection UI
4. Implement mask creation UI with drawing tools
5. Select fill method (smart, blur, color)
6. Configure options (featherEdges, preserveContext)
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
- MUST allow multiple removal attempts

CONFIGURATION:
- Provide valid userId (string)
- Set fillMethod: 'smart' | 'blur' | 'color'
- Set featherEdges: boolean (soften edges)
- Set preserveContext: boolean (maintain surroundings)
- Implement onSelectImage callback
- Implement onCreateMask callback
- Implement onSaveResult callback
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

FILL METHODS:
- smart: AI-powered intelligent reconstruction (recommended)
- blur: Blur and blend surrounding area
- color: Fill with average surrounding color

OPTIONS:
- featherEdges: Soften edges for natural look (default: true)
- preserveContext: Maintain surrounding context (default: true)

STRICTLY FORBIDDEN:
- No missing mask validation
- No auto-processing without user action
- No hardcoded API keys
- No unhandled errors
- No memory leaks
- No blocking UI
- No incomplete masking

QUALITY CHECKLIST:
- [ ] Image selection implemented
- [ ] Mask creation/drawing interface added
- [ ] Fill method selector included
- [ ] Mask validation before processing
- [ ] Before/after comparison view
- [ ] Progress indicator during processing
- [ ] Error display with retry option
- [ ] Download/share functionality
- [ ] Multiple removal attempts supported
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
- [ ] Multiple removal attempts option
- [ ] Cleanup on unmount
- [ ] Original image preserved

---

## 🛠️ Configuration Strategy

### Essential Configuration

```typescript
// Required fields
{
  userId: string
  fillMethod: 'smart' | 'blur' | 'color'
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
   - Blur: Blurred fill for simple backgrounds
   - Color: Solid color fill for uniform areas

2. **Options**
   - featherEdges: Soften edges for natural look (default: true)
   - preserveContext: Maintain surrounding context (default: true)

3. **Image Quality**
   - Minimum: 512x512 resolution
   - Recommended: 1024x1024 or higher
   - Format: JPEG or PNG
   - Max size: 10MB

4. **Mask Quality**
   - Complete coverage of object
   - Slight margin around object edges
   - Semi-transparent for preview

---

## 📊 State Management

### Feature States

**isReady**: boolean
- Image selected and mask created
- Check before enabling remove button

**isProcessing**: boolean
- Object removal in progress
- Show loading/progress indicator
- Disable remove button

**progress**: number (0-100)
- Removal progress percentage
- Update progress bar

**error**: string | null
- Error message if removal failed
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

1. **Object Coverage**
   - Good: Complete coverage with slight margin
   - Bad: Incomplete coverage, missing edges

2. **Background Complexity**
   - Simple backgrounds: Easier removal
   - Complex backgrounds: May require multiple attempts
   - Smart fill works best for most cases

3. **Multiple Objects**
   - Combine multiple objects into single mask
   - Process all at once for consistency

### User Experience

1. **Mask Drawing Tools**
   - Adjustable brush size
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

❌ **Problem**: Object not fully removed
✅ **Solution**: Ensure mask covers entire object completely

### Background Issues

❌ **Problem**: Unnatural looking fill
✅ **Solution**: Try smart fill, enable context preservation

### Edge Issues

❌ **Problem**: Visible edges around removed area
✅ **Solution**: Enable edge feathering, improve mask precision

### Complex Objects

❌ **Problem**: Difficult to remove complex objects
✅ **Solution**: Use smart fill, may require multiple attempts

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
- Examples: `/docs/examples/basic/remove-object/`
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
