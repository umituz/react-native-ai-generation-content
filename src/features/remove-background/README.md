# Remove Background Feature

Remove backgrounds from images using AI with precision.

## 📍 Import Path

```typescript
import { useRemoveBackgroundFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/remove-background/`

## 🎯 Feature Purpose

Automatically detect and remove backgrounds from images using AI. Keeps main subjects while removing backgrounds, handling complex edges like hair, fur, and transparent objects.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Product photography for e-commerce
- Creating transparent images for design
- Profile picture background removal
- Preparing images for marketing materials
- Isolating subjects for compositing
- Creating stickers and overlays

❌ **When NOT to Use:**
- Manual background selection (use image editing software)
- Background replacement (use Replace Background)
- Object removal from photos (use Remove Object)
- Photo restoration (use Photo Restoration)

### Implementation Strategy

1. **Upload image** with clear subject
2. **Preview detection** before processing
3. **Choose edge smoothness** level
4. **Show before/after comparison** with transparency
5. **Provide download** as transparent PNG
6. **Offer fine-tuning** options for edges

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Image Requirements
- **MUST** provide ONE image to process
- **MUST** have clear subject in image
- **MUST** use reasonable resolution (min 512x512)
- **MUST** use supported formats (JPEG, PNG)
- **MUST NOT** exceed file size limits (10MB max)

### 2. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** specify `edgeSmoothness` (low, medium, high)
- **MUST** implement `onError` callback
- **MUST** implement `onSelectImage` callback
- **MUST** handle transparent PNG output

### 3. State Management
- **MUST** check `isReady` before enabling remove button
- **MUST** display progress during processing
- **MUST** handle transparency display properly
- **MUST** display `error` state with clear messages
- **MUST** implement proper cleanup on unmount

### 4. Performance
- **MUST** implement image compression before upload
- **MUST** show progress indicator for processing
- **MUST** cache results locally
- **MUST** handle large output images
- **MUST NOT** process multiple images simultaneously

### 5. User Experience
- **MUST** show background preview with transparency grid
- **MUST** provide before/after comparison
- **MUST** offer edge smoothness options
- **MUST** handle complex subjects (hair, fur)
- **MUST** provide download as PNG

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Missing Images**
   - Always validate image is selected
   - Never call process() without image

2. **No Auto-Processing**
   - Never start removal without user action
   - Always require explicit "Remove Background" button press
   - Provide clear preview before processing

3. **No Hardcoded Credentials**
   - Never store API keys in component files
   - Use environment variables or secure storage

4. **No Unhandled Errors**
   - Never ignore detection failures
   - Always explain what went wrong
   - Provide retry or alternative options

5. **No Memory Leaks**
   - Never store large images unnecessarily
   - Clean up temporary images
   - Implement proper image disposal

6. **No Blocking UI**
   - Never block main thread with image processing
   - Always show progress indicator
   - Allow cancellation

7. **No Poor Quality Output**
   - Never compress PNG output excessively
   - Preserve transparency quality
   - Use appropriate edge settings

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing a background removal feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the useRemoveBackgroundFeature hook
3. Select edge smoothness level
4. Implement image selection UI
5. Validate image before processing
6. Show before/after comparison with transparency
7. Display result on transparency grid
8. Implement proper error handling
9. Provide PNG download
10. Implement cleanup on unmount

CRITICAL RULES:
- MUST validate image before calling remove()
- MUST show before/after comparison
- MUST display transparency grid properly
- MUST handle complex subjects (hair, fur)
- MUST implement debouncing (300ms)
- MUST provide PNG format output

CONFIGURATION:
- Provide valid userId (string)
- Set edgeSmoothness: 'low' | 'medium' | 'high'
- Implement onSelectImage callback
- Implement onSaveImage callback
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

OPTIONS:
- edgeSmoothness: 'low' | 'medium' | 'high'
  - Low: Sharper edges, better for objects
  - Medium: Balanced (recommended)
  - High: Smoother edges, better for hair/fur

STRICTLY FORBIDDEN:
- No missing image validation
- No auto-processing without user action
- No hardcoded API keys
- No unhandled errors
- No memory leaks
- No blocking UI
- No poor quality PNG output

QUALITY CHECKLIST:
- [ ] Image selection implemented
- [ ] Edge smoothness selector
- [ ] Transparency grid display
- [ ] Before/after comparison view
- [ ] Progress indicator during processing
- [ ] Error display with retry option
- [ ] PNG download functionality
- [ ] Original image preserved
```

#### AI Implementation Checklist

Use this checklist when generating code:

- [ ] Feature imported from correct path
- [ ] Image selection implemented
- [ ] Edge smoothness selector added
- [ ] Validation before remove()
- [ ] Transparency grid for result display
- [ ] Before/after comparison view
- [ ] Progress indicator during processing
- [ ] Error display with user-friendly message
- [ ] PNG download with transparency
- [ ] Cleanup on unmount
- [ ] Original image preserved
- [ ] Complex subject handling

---

## 🛠️ Configuration Strategy

### Essential Configuration

```typescript
// Required fields
{
  userId: string
  edgeSmoothness: 'low' | 'medium' | 'high'
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

1. **Edge Smoothness**
   - Low: Sharp edges, best for simple objects
   - Medium: Balanced (recommended for most cases)
   - High: Smooth edges, best for hair, fur, complex subjects

2. **Image Quality**
   - Minimum: 512x512 resolution
   - Recommended: 1024x1024 or higher
   - Format: JPEG or PNG
   - Max size: 10MB

3. **Performance Settings**
   - Compress images before upload
   - Show progress for operations
   - Implement timeout (60s default)
   - Enable result caching

---

## 📊 State Management

### Feature States

**isReady**: boolean
- Image selected and validated
- Check before enabling remove button

**isProcessing**: boolean
- Background removal in progress
- Show loading/progress indicator
- Disable remove button

**progress**: number (0-100)
- Processing progress percentage
- Update progress bar

**error**: string | null
- Error message if processing failed
- Display to user with clear message

**result**: {
  imageUrl: string  // Transparent PNG
  originalImageUrl?: string
  edgeSmoothness?: string
  metadata?: any
}

---

## 🎨 Best Practices

### Image Selection

1. **Subject Clarity**
   - Good: Clear separation between subject and background
   - Bad: Similar colors, low contrast between subject and background

2. **Lighting**
   - Good: Even lighting on subject
   - Bad: Harsh shadows, complex backgrounds

3. **Edge Complexity**
   - Simple objects: Use low edge smoothness
   - Hair/fur: Use high edge smoothness
   - Mixed: Use medium edge smoothness

### User Experience

1. **Transparency Display**
   - Show checkerboard pattern for transparency
   - Allow background color preview
   - Provide zoom for edge inspection

2. **Comparison Tools**
   - Before/after slider
   - Toggle original/removed
   - Edge detail zoom

3. **Output Quality**
   - Always provide PNG format
   - Preserve edge quality
   - Offer multiple resolution options

---

## 🐛 Common Pitfalls

### Detection Issues

❌ **Problem**: Background not fully removed
✅ **Solution**: Ensure good subject-background contrast, try different edge smoothness

### Edge Quality Issues

❌ **Problem**: Jagged or unnatural edges
✅ **Solution**: Adjust edge smoothness, use higher setting for hair/fur

### Transparency Issues

❌ **Problem**: Transparency not visible
✅ **Solution**: Display with checkerboard pattern, offer background preview

### Performance Issues

❌ **Problem**: Slow processing
✅ **Solution**: Compress images, show progress, implement timeout

---

## 📦 Related Components

Use these components from the library:

- **PhotoUploadCard**: Upload image interface
- **ResultDisplay**: Before/after comparison
- **TransparencyGrid**: Display transparent images
- **EdgeSmoothnessSelector**: Choose edge quality
- **ProgressBar**: Progress display

Located at: `src/presentation/components/`

---

## 🔄 Migration Strategy

If migrating from previous implementation:

1. **Update imports** to new path
2. **Add edge smoothness selector**
3. **Implement transparency grid display**
4. **Update state handling** for new structure
5. **Add before/after comparison**
6. **Test with complex subjects**

---

## 📚 Additional Resources

- Main documentation: `/docs/`
- API reference: `/docs/api/`
- Examples: `/docs/examples/basic/remove-background/`
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
- Added transparency handling guidelines

### v1.0.0 - Initial Release
- Initial feature documentation
