# Replace Background Feature

Replace image backgrounds with new scenes using AI.

## 📍 Import Path

```typescript
import { useReplaceBackgroundFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/replace-background/`

## 🎯 Feature Purpose

Remove existing backgrounds from images and replace them with custom backgrounds or built-in templates. Features automatic subject detection, natural edge blending, and optional lighting/color matching for seamless results.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Creating professional photos with studio backgrounds
- Adding travel backgrounds to portraits
- Creating product photos with clean backgrounds
- Creative background replacements for social media
- Replacing distracting backgrounds

❌ **When NOT to Use:**
- Simple background removal (use Remove Background)
- Removing objects from images (use Remove Object)
- Background removal without replacement (use Remove Background)

### Implementation Strategy

1. **Select foreground image** with subject
2. **Select new background** (upload or template)
3. **Configure options** (edge smoothness, lighting, colors)
4. **Process replacement** with progress tracking
5. **Preview result** and offer regeneration
6. **Save or share** final image

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Image Requirements
- **MUST** provide TWO images (foreground + background)
- **MUST** use high-quality images (min 512x512 recommended)
- **MUST** have clear subject in foreground
- **MUST NOT** exceed file size limits (10MB each)
- **MUST** validate both images before processing

### 2. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** specify `edgeSmoothness` (low, medium, high)
- **MUST** implement `onError` callback
- **MUST** implement `onSelectForeground` callback
- **MUST** implement `onSelectBackground` callback

### 3. State Management
- **MUST** check `isReady` before enabling replace button
- **MUST** verify both images are selected
- **MUST** display progress during replacement
- **MUST** display `error` state with clear messages
- **MUST** implement proper cleanup on unmount

### 4. Performance
- **MUST** implement image compression before upload
- **MUST** show progress indicator for processing
- **MUST** cache results locally
- **MUST** allow users to cancel processing
- **MUST NOT** replace multiple backgrounds simultaneously

### 5. Quality Options
- **MUST** provide edge smoothness control
- **MUST** support lighting adjustment
- **MUST** support color matching
- **MUST** offer background blur option
- **MUST** handle various image types

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Missing Images**
   - Always validate both foreground and background are selected
   - Never call process() without both images

2. **No Auto-Processing**
   - Never start replacement without user action
   - Always require explicit "Replace" button press
   - Show preview before processing

3. **No Hardcoded Credentials**
   - Never store API keys in component files
   - Use environment variables or secure storage

4. **No Unhandled Errors**
   - Never ignore replacement failures
   - Always explain what went wrong
   - Provide retry or alternative options

5. **No Memory Leaks**
   - Never store all images simultaneously in state
   - Clean up temporary images
   - Implement proper image disposal

6. **No Blocked UI**
   - Never block main thread with image processing
   - Always show progress indicator
   - Allow cancellation

7. **No Perspective Mismatch**
   - Never warn about perspective mismatches between images
   - Always provide guidance on background selection
   - Show preview before final processing

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing a replace background feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the useReplaceBackgroundFeature hook
3. Implement dual image selection (foreground + background)
4. Provide background templates or custom upload
5. Set edge smoothness level (low, medium, high)
6. Configure options (adjustLighting, adjustColors, blurBackground)
7. Validate both images before processing
8. Show result preview
9. Handle long processing times with progress
10. Implement proper error handling
11. Implement cleanup on unmount

CRITICAL RULES:
- MUST validate both foreground and background images before calling process()
- MUST provide clear UI for foreground vs background selection
- MUST show result preview with quality check
- MUST handle edge smoothness adjustment
- MUST implement debouncing (300ms)
- MUST allow background regeneration

CONFIGURATION:
- Provide valid userId (string)
- Set edgeSmoothness: 'low' | 'medium' | 'high'
- Set adjustLighting: boolean (match foreground/background lighting)
- Set adjustColors: boolean (color-grade foreground to match background)
- Set blurBackground: boolean (add blur for depth effect)
- Implement onSelectForeground callback
- Implement onSelectBackground callback
- Implement onSaveResult callback
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

OPTIONS:
- edgeSmoothness: Edge blending quality
- adjustLighting: Match lighting between images
- adjustColors: Harmonize colors
- blurBackground: Add depth with background blur

STRICTLY FORBIDDEN:
- No missing image validation (both images required)
- No auto-processing without user action
- No hardcoded API keys
- No unhandled errors
- No memory leaks
- No blocking UI
- No perspective mismatch warnings

QUALITY CHECKLIST:
- [ ] Foreground selection implemented
- [ ] Background selection/template picker added
- [ ] Edge smoothness selector included
- [ ] Lighting/color adjustment toggles
- [ ] Validation before process() (both images)
- [ ] Result preview display
- [ ] Progress indicator during processing
- [ ] Error display with retry option
- [ ] Download/share functionality
- [ ] Background template library
```

#### AI Implementation Checklist

Use this checklist when generating code:

- [ ] Feature imported from correct path
- [ ] Dual image selection implemented
- [ ] Background templates provided
- [ ] Edge smoothness selector added
- [ ] Lighting/color adjustment toggles
- [ ] Validation before process() (both images)
- [ ] Result preview display
- [ ] Progress indicator during processing
- [ ] Error display with user-friendly message
- [ ] Download/share buttons
- [ ] Cleanup on unmount
- [ ] Original images preserved

---

## 🛠️ Configuration Strategy

### Essential Configuration

```typescript
// Required fields
{
  userId: string
  edgeSmoothness: 'low' | 'medium' | 'high'
  onSelectForeground: () => Promise<string | null>
  onSelectBackground: () => Promise<string | null>
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
   - Low: Sharp, precise edges (products, objects)
   - Medium: Balanced edges (portraits, general use)
   - High: Soft, blended edges (artistic effects)

2. **Quality Options**
   - adjustLighting: Match foreground/background lighting
   - adjustColors: Color-grade foreground to match background
   - blurBackground: Add blur for depth effect

3. **Image Quality**
   - Minimum: 512x512 resolution
   - Recommended: 1024x1024 or higher
   - Format: JPEG or PNG
   - Max size: 10MB each

4. **Background Selection**
   - Use backgrounds with similar perspective
   - Match lighting direction when possible
   - Consider color harmony

---

## 📊 State Management

### Feature States

**isReady**: boolean
- Both images selected and validated
- Check before enabling replace button

**isProcessing**: boolean
- Background replacement in progress
- Show loading/progress indicator
- Disable replace button

**progress**: number (0-100)
- Replacement progress percentage
- Update progress bar

**error**: string | null
- Error message if replacement failed
- Display to user with clear message

**result**: {
  imageUrl: string
  foregroundImageUrl?: string
  backgroundImageUrl?: string
  edgeSmoothness?: string
  metadata?: any
}

---

## 🎨 Best Practices

### Background Selection

1. **Perspective Matching**
   - Good: Similar perspective and angle
   - Bad: Conflicting perspectives

2. **Lighting Considerations**
   - Enable adjustLighting for natural results
   - Match lighting direction when possible
   - Consider time of day

3. **Color Harmony**
   - Use adjustColors for better integration
   - Consider complementary colors
   - Test different backgrounds

### User Experience

1. **Background Templates**
   - Provide curated background options
   - Categorize by use case (studio, travel, nature, etc.)
   - Show previews before selection

2. **Preview**
   - Show combined result before saving
   - Allow option adjustment
   - Compare with original

3. **Quality Settings**
   - Explain edge smoothness options
   - Provide presets (portrait, product, creative)
   - Allow fine-tuning

---

## 🐛 Common Pitfalls

### Perspective Issues

❌ **Problem**: Unnatural looking result due to perspective mismatch
✅ **Solution**: Choose background with similar perspective

### Edge Issues

❌ **Problem**: Visible edges around subject
✅ **Solution**: Adjust edge smoothness, enable lighting/color adjustment

### Quality Issues

❌ **Problem**: Poor subject detection
✅ **Solution**: Use higher quality foreground image with clear subject

### Lighting Issues

❌ **Problem**: Lighting doesn't match between images
✅ **Solution**: Enable adjustLighting and adjustColors options

---

## 📦 Related Components

Use these components from the library:

- **PhotoUploadCard**: Upload image interface
- **DualImagePicker**: Select foreground and background
- **BackgroundTemplates**: Pre-made background options
- **EdgeSmoothnessSelector**: Choose edge quality
- **ResultDisplay**: Show combined result
- **ProgressBar**: Progress display

Located at: `src/presentation/components/`

---

## 🔄 Migration Strategy

If migrating from previous implementation:

1. **Update imports** to new path
2. **Add dual image selection** (foreground + background)
3. **Implement edge smoothness control**
4. **Add quality options** (lighting, color, blur)
5. **Update state handling** for both images
6. **Test all edge smoothness levels**

---

## 📚 Additional Resources

- Main documentation: `/docs/`
- API reference: `/docs/api/`
- Examples: `/docs/examples/basic/replace-background/`
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
