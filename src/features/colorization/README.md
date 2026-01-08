# Colorization Feature

Add color to black and white photos using AI.

## 📍 Import Path

```typescript
import { useColorizationFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/colorization/`

## 🎯 Feature Purpose

Automatically add realistic color to black and white photos using AI. Supports multiple colorization styles including vintage for historical accuracy, vibrant for rich colors, natural for subtle tones, and auto for intelligent detection.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Colorizing old family photographs
- Adding color to historical images
- Creating artistic colorized versions
- Restoring faded color photos
- Creative visual effects

❌ **When NOT to Use:**
- Photo restoration with damage (use Photo Restoration)
- Image enhancement without colorization (use HD Touch Up)
- Color correction of existing color photos (use image editing software)
- Adding artistic filters (use Style Transfer)

### Implementation Strategy

1. **Select black & white photo** to colorize
2. **Choose colorization type** (auto, vintage, vibrant, natural)
3. **Adjust saturation level** (0.5 to 1.5)
4. **Generate colorized version** with progress tracking
5. **Preview and compare** with original
6. **Save or share** result

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Image Requirements
- **MUST** provide ONE black & white photo
- **MUST** use high-quality scans or photos (min 512x512)
- **MUST** have clear, recognizable content
- **MUST NOT** exceed file size limits (10MB max)
- **MUST** be actual B&W or desaturated photos

### 2. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** specify `colorizationType` (auto, vintage, vibrant, natural)
- **MUST** set `saturation` level (0.5 to 1.5)
- **MUST** implement `onError` callback
- **MUST** implement `onSelectPhoto` callback

### 3. State Management
- **MUST** check `isReady` before enabling colorize button
- **MUST** display progress during colorization
- **MUST** handle long processing times
- **MUST** display `error` state with clear messages
- **MUST** implement proper cleanup on unmount

### 4. Performance
- **MUST** implement image compression before upload
- **MUST** show progress indicator for processing
- **MUST** cache results locally
- **MUST** allow users to cancel processing
- **MUST NOT** colorize multiple photos simultaneously

### 5. Content Quality
- **MUST** provide before/after comparison
- **MUST** allow saturation adjustment
- **MUST** handle various photo types
- **MUST** preserve photo texture when enabled
- **MUST** offer regeneration with different settings

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Color Images**
   - Always validate input is B&W or desaturated
   - Never attempt to colorize already color photos

2. **No Auto-Processing**
   - Never start colorization without user action
   - Always require explicit "Colorize" button press
   - Show preview before processing

3. **No Hardcoded Credentials**
   - Never store API keys in component files
   - Use environment variables or secure storage

4. **No Unhandled Errors**
   - Never ignore colorization failures
   - Always explain what went wrong
   - Provide retry or alternative options

5. **No Memory Leaks**
   - Never store both original and colorized simultaneously
   - Clean up temporary images
   - Implement proper image disposal

6. **No Blocked UI**
   - Never block main thread with image processing
   - Always show progress indicator
   - Allow cancellation

7. **No Historical Inaccuracy**
   - Never claim colorized versions are historically accurate
   - Provide disclaimer about AI interpretation
   - Allow manual color adjustments for accuracy

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing a colorization feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the useColorizationFeature hook
3. Select colorization type (auto, vintage, vibrant, natural)
4. Implement photo selection UI
5. Adjust saturation level (0.5 to 1.5)
6. Validate photo is black & white
7. Show before/after comparison
8. Handle long processing times with progress
9. Implement proper error handling
10. Implement cleanup on unmount

CRITICAL RULES:
- MUST validate photo is black & white before colorizing
- MUST show before/after comparison
- MUST handle saturation adjustment
- MUST preserve photo texture when enabled
- MUST implement debouncing (300ms)
- MUST allow colorization regeneration

CONFIGURATION:
- Provide valid userId (string)
- Set colorizationType: 'auto' | 'vintage' | 'vibrant' | 'natural'
- Set saturation: 0.5 to 1.5 (default: 1.0)
- Set preserveTexture: boolean (maintain photo texture)
- Implement onSelectPhoto callback
- Implement onSaveResult callback
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

COLORIZATION TYPES:
- auto: Automatic color detection and application
- vintage: Historically accurate vintage tones
- vibrant: Rich, saturated colors
- natural: Subtle, natural-looking colors

OPTIONS:
- saturation: Color intensity (0.5 muted to 1.5 vibrant)
- preserveTexture: Maintain photo texture (default: true)

STRICTLY FORBIDDEN:
- No color photo validation
- No auto-processing without user action
- No hardcoded API keys
- No unhandled errors
- No memory leaks
- No blocking UI
- No historical accuracy claims

QUALITY CHECKLIST:
- [ ] Photo selection implemented
- [ ] B&W photo validation added
- [ ] Colorization type selector included
- [ ] Saturation slider included
- [ ] Before/after comparison view
- [ ] Progress indicator during processing
- [ ] Error display with retry option
- [ ] Download/share functionality
- [ ] Regeneration with different settings
```

#### AI Implementation Checklist

Use this checklist when generating code:

- [ ] Feature imported from correct path
- [ ] Photo selection implemented
- [ ] B&W validation added
- [ ] Colorization type selector added
- [ ] Saturation control implemented
- [ ] Validation before colorize()
- [ ] Before/after comparison view
- [ ] Progress indicator during processing
- [ ] Error display with user-friendly message
- [ ] Download/share buttons
- [ ] Regeneration option
- [ ] Cleanup on unmount
- [ ] Original photo preserved

---

## 🛠️ Configuration Strategy

### Essential Configuration

```typescript
// Required fields
{
  userId: string
  colorizationType: 'auto' | 'vintage' | 'vibrant' | 'natural'
  saturation: number  // 0.5 to 1.5
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

1. **Colorization Types**
   - Auto: Automatic color detection (recommended for most photos)
   - Vintage: Historical accuracy for old photos
   - Vibrant: Rich, saturated colors for artistic effect
   - Natural: Subtle, natural-looking colors

2. **Saturation Levels**
   - 0.5-0.7: Muted colors (historical feel)
   - 0.8-1.0: Natural colors (recommended)
   - 1.1-1.5: Vibrant colors (artistic effect)

3. **Image Quality**
   - Minimum: 512x512 resolution
   - Recommended: 1024x1024 or higher
   - Format: JPEG or PNG
   - Max size: 10MB

---

## 📊 State Management

### Feature States

**isReady**: boolean
- Photo selected and validated as B&W
- Check before enabling colorize button

**isProcessing**: boolean
- Colorization in progress
- Show loading/progress indicator
- Disable colorize button

**progress**: number (0-100)
- Colorization progress percentage
- Update progress bar

**error**: string | null
- Error message if colorization failed
- Display to user with clear message

**result**: {
  imageUrl: string
  originalImageUrl?: string
  colorizationType?: string
  saturation?: number
  metadata?: any
}

---

## 🎨 Best Practices

### Photo Selection

1. **Photo Quality**
   - Good: High-quality scans, clear content
   - Bad: Blurry, low-resolution scans

2. **Type Selection**
   - Use Vintage for historical photos
   - Use Vibrant for artistic effect
   - Use Natural for subtle enhancement
   - Use Auto for general use

3. **Saturation**
   - Start with 1.0 for natural look
   - Lower for vintage/historical feel
   - Higher for vibrant colors

### User Experience

1. **Preview**
   - Show B&W preview before colorizing
   - Compare different colorization types
   - Allow saturation adjustment

2. **Before/After Comparison**
   - Side-by-side comparison
   - Slider for easy comparison
   - Zoom for detail inspection

---

## 🐛 Common Pitfalls

### Validation Issues

❌ **Problem**: Attempting to colorize color photos
✅ **Solution**: Validate photo is B&W before processing

### Quality Issues

❌ **Problem**: Poor colorization results
✅ **Solution**: Use higher quality scan, try different type

### Historical Accuracy

❌ **Problem**: Colors don't match historical reality
✅ **Solution**: Use vintage type, provide manual adjustment option

---

## 📦 Related Components

Use these components from the library:

- **PhotoUploadCard**: Upload photo interface
- **ColorizationTypeSelector**: Choose colorization style
- **SaturationSlider**: Adjust color intensity
- **ResultDisplay**: Before/after comparison
- **ProgressBar**: Progress display

Located at: `src/presentation/components/`

---

## 🔄 Migration Strategy

If migrating from previous implementation:

1. **Update imports** to new path
2. **Add B&W photo validation**
3. **Implement colorization type selector**
4. **Update state handling** for new structure
5. **Add before/after comparison**
6. **Test all colorization types**

---

## 📚 Additional Resources

- Main documentation: `/docs/`
- API reference: `/docs/api/`
- Examples: `/docs/examples/basic/colorization/`
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
