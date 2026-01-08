# Image to Video Feature

Convert static images into animated videos using AI.

## 📍 Import Path

```typescript
import { useImageToVideoFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/image-to-video/`

## 🎯 Feature Purpose

Transform static photos into dynamic animated videos using AI. Supports multiple motion types including zoom in/out, pan, and 3D parallax effects for creating engaging video content from still images.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Creating social media content from photos
- Adding motion to product images
- Creating photo slideshows
- Enhancing storytelling with movement
- Dynamic video presentations

❌ **When NOT to Use:**
- Video from text descriptions (use Text to Video)
- Video editing of existing footage (use video editing software)
- Complex video effects (use professional video tools)
- Adding overlays/text to video (use video editing tools)

### Implementation Strategy

1. **Select static image** to animate
2. **Choose motion type** (zoom-in, zoom-out, pan-left, pan-right, 3D)
3. **Set duration** and intensity level
4. **Generate animated video** with progress tracking
5. **Preview result** and offer regeneration
6. **Save or share** final video

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Image Requirements
- **MUST** provide ONE image to animate
- **MUST** use high-quality images (min 512x512 recommended)
- **MUST** have clear focal point for best motion results
- **MUST NOT** exceed file size limits (10MB max)
- **MUST NOT** use extremely blurry or low-resolution images

### 2. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** specify `motionType` (zoom-in, zoom-out, pan-left, pan-right, 3D)
- **MUST** set `duration` in seconds (2-8 range)
- **MUST** implement `onError` callback
- **MUST** implement `onSelectImage` callback

### 3. State Management
- **MUST** check `isReady` before enabling generate button
- **MUST** display progress during video generation
- **MUST** handle long processing times
- **MUST** display `error` state with clear messages
- **MUST** implement proper cleanup on unmount

### 4. Performance
- **MUST** implement image compression before upload
- **MUST** show progress indicator for processing
- **MUST** cache generated videos locally
- **MUST** allow users to cancel processing
- **MUST NOT** generate multiple videos simultaneously

### 5. Content Quality
- **MUST** provide video preview before save
- **MUST** allow duration adjustment
- **MUST** support various motion types
- **MUST** handle intensity adjustment
- **MUST** offer motion regeneration

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Missing Images**
   - Always validate image is selected
   - Never call process() without image

2. **No Auto-Processing**
   - Never start animation without user action
   - Always require explicit "Create Video" button press
   - Show preview before processing

3. **No Hardcoded Credentials**
   - Never store API keys in component files
   - Use environment variables or secure storage

4. **No Unhandled Errors**
   - Never ignore generation failures
   - Always explain what went wrong
   - Provide retry or alternative options

5. **No Memory Leaks**
   - Never store both original and video simultaneously
   - Clean up temporary video files
   - Implement proper video disposal

6. **No Blocked UI**
   - Never block main thread with video processing
   - Always show progress indicator
   - Allow cancellation

7. **No Copyright Issues**
   - Never claim copyrighted content as original
   - Allow only user-provided images
   - Implement proper attribution

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing an image to video feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the useImageToVideoFeature hook
3. Select motion type (zoom-in, zoom-out, pan-left, pan-right, 3D)
4. Implement image selection UI
5. Set duration (2-8 seconds)
6. Adjust intensity level (0.0 to 1.0)
7. Validate image before generation
8. Show video preview with playback controls
9. Handle long processing times with progress
10. Implement proper error handling
11. Implement cleanup on unmount

CRITICAL RULES:
- MUST validate image before calling generate()
- MUST show video preview with playback controls
- MUST handle motion type selection
- MUST adjust duration appropriately
- MUST implement debouncing (300ms)
- MUST allow motion regeneration

CONFIGURATION:
- Provide valid userId (string)
- Set motionType: 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right' | '3d'
- Set duration: 2-8 (seconds)
- Set intensity: 0.0 to 1.0 (default: 0.7)
- Set fps: 30 (frames per second)
- Implement onSelectImage callback
- Implement onSaveVideo callback
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

OPTIONS:
- motionType: Select animation style
- duration: 2-8 seconds
- intensity: 0.0 (subtle) to 1.0 (strong motion)
- fps: Frames per second (default: 30)

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
- [ ] Motion type selector added
- [ ] Duration control included
- [ ] Intensity slider added
- [ ] Video preview with playback
- [ ] Progress indicator during processing
- [ ] Error display with retry option
- [ ] Download/share functionality
- [ ] Motion regeneration option
```

#### AI Implementation Checklist

Use this checklist when generating code:

- [ ] Feature imported from correct path
- [ ] Image selection implemented
- [ ] Motion type selector added
- [ ] Duration control implemented
- [ ] Intensity slider included
- [ ] Validation before generate()
- [ ] Video preview with playback
- [ ] Progress indicator during processing
- [ ] Error display with user-friendly message
- [ ] Download/share buttons
- [ ] Motion regeneration option
- [ ] Cleanup on unmount
- [ ] Original image preserved

---

## 🛠️ Configuration Strategy

### Essential Configuration

```typescript
// Required fields
{
  userId: string
  motionType: 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right' | '3d'
  duration: number  // 2-8 seconds
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

1. **Motion Types**
   - Zoom In: Gradually zoom into focal point
   - Zoom Out: Gradually zoom out from image
   - Pan Left: Slowly pan image to the left
   - Pan Right: Slowly pan image to the right
   - 3D: Add depth with parallax effect

2. **Duration Settings**
   - Short: 2-3s (social media, quick views)
   - Medium: 4-5s (standard content)
   - Long: 6-8s (presentations, detailed views)

3. **Intensity Levels**
   - 0.3-0.5: Subtle motion
   - 0.6-0.8: Balanced animation (recommended)
   - 0.9-1.0: Strong motion effects

4. **Image Quality**
   - Minimum: 512x512 resolution
   - Recommended: 1024x1024 or higher
   - Format: JPEG or PNG
   - Max size: 10MB

---

## 📊 State Management

### Feature States

**isReady**: boolean
- Image selected and validated
- Check before enabling generate button

**isProcessing**: boolean
- Video generation in progress
- Show loading/progress indicator
- Disable generate button

**progress**: number (0-100)
- Generation progress percentage
- Update progress bar

**error**: string | null
- Error message if generation failed
- Display to user with clear message

**result**: {
  videoUrl: string
  thumbnailUrl?: string
  duration?: number
  motionType?: string
  intensity?: number
  metadata?: any
}

---

## 🎨 Best Practices

### Image Selection

1. **Image Quality**
   - Good: High-resolution, clear focal point
   - Bad: Blurry, cluttered images

2. **Motion Matching**
   - Match motion to image content
   - Consider subject for motion direction
   - Landscape vs portrait considerations

3. **Duration**
   - Start with medium duration (4-5s)
   - Adjust based on content complexity
   - Shorter for social media
   - Longer for presentations

4. **Intensity**
   - Use moderate intensity (0.6-0.8) for natural motion
   - Lower intensity for subtle effects
   - Higher intensity for dramatic motion

### User Experience

1. **Motion Preview**
   - Show examples of each motion type
   - Preview motion before applying
   - Explain motion characteristics

2. **Progress Feedback**
   - Show estimated time remaining
   - Update progress regularly
   - Allow cancellation

3. **Video Playback**
   - Support standard video controls
   - Loop preview for continuous viewing
   - Show video metadata

---

## 🐛 Common Pitfalls

### Quality Issues

❌ **Problem**: Poor animation quality
✅ **Solution**: Use higher quality images, try different motion type or intensity

### Motion Issues

❌ **Problem**: Motion doesn't match image content
✅ **Solution**: Try different motion type, adjust intensity, consider focal point

### Performance Issues

❌ **Problem**: Slow generation
✅ **Solution**: Compress images, show progress, allow cancellation

### Memory Issues

❌ **Problem**: App crashes with large images
✅ **Solution**: Compress images, clean up properly, optimize memory

---

## 📦 Related Components

Use these components from the library:

- **PhotoUploadCard**: Upload image interface
- **MotionTypeSelector**: Choose animation style
- **DurationSelector**: Set video length
- **IntensitySlider**: Adjust motion intensity
- **ProgressBar**: Progress display
- **VideoPlayer**: Video playback component

Located at: `src/presentation/components/`

---

## 🔄 Migration Strategy

If migrating from previous implementation:

1. **Update imports** to new path
2. **Add motion type selector**
3. **Implement duration control**
4. **Update state handling** for new structure
5. **Add video preview component**
6. **Test all motion types**

---

## 📚 Additional Resources

- Main documentation: `/docs/`
- API reference: `/docs/api/`
- Examples: `/docs/examples/basic/image-to-video/`
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
