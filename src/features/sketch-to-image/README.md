# Sketch to Image Feature

Convert hand-drawn sketches and doodles into realistic images using AI.

## 📍 Import Path

```typescript
import { useSketchToImageFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/sketch-to-image/`

## 🎯 Feature Purpose

Transform rough sketches into detailed, realistic images using AI. Supports multiple output styles including realistic, artistic, anime, and 3D render. Automatically adds color, details, and textures to bring drawings to life.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Creating concept art from sketches
- Turning doodles into illustrations
- Transforming storyboard sketches
- Converting design sketches to mockups
- Quick prototyping and ideation

❌ **When NOT to Use:**
- Generating images from text only (use Text to Image)
- Applying artistic styles to photos (use Style Transfer)
- Image-to-image transformation (use Image to Image)
- Creating detailed artwork from scratch

### Implementation Strategy

1. **Select or draw sketch** to convert
2. **Choose output style** (realistic, artistic, anime, 3D)
3. **Add prompt** (optional) describing the sketch
4. **Configure options** (add color, add details)
5. **Generate image** with progress tracking
6. **Preview result** and offer regeneration
7. **Save or share** final image

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Sketch Requirements
- **MUST** provide ONE sketch image
- **MUST** use clear, readable sketches
- **MUST** have visible line work
- **MUST NOT** exceed file size limits (10MB max)
- **MUST** be in a common image format

### 2. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** specify `outputStyle` (realistic, artistic, anime, 3D)
- **MUST** implement `onError` callback
- **MUST** implement `onSelectSketch` callback
- **MUST** provide optional prompt input

### 3. State Management
- **MUST** check `isReady` before enabling generate button
- **MUST** display progress during generation
- **MUST** handle long processing times
- **MUST** display `error` state with clear messages
- **MUST** implement proper cleanup on unmount

### 4. Performance
- **MUST** implement image compression before upload
- **MUST** show progress indicator for processing
- **MUST** cache results locally
- **MUST** allow users to cancel processing
- **MUST NOT** generate multiple images simultaneously

### 5. Content Quality
- **MUST** provide sketch-to-result comparison
- **MUST** allow style adjustment
- **MUST** handle various sketch types
- **MUST** support descriptive prompts
- **MUST** offer regeneration with different settings

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Missing Sketches**
   - Always validate sketch is selected
   - Never call process() without sketch

2. **No Auto-Processing**
   - Never start conversion without user action
   - Always require explicit "Convert" button press
   - Show preview before processing

3. **No Hardcoded Credentials**
   - Never store API keys in component files
   - Use environment variables or secure storage

4. **No Unhandled Errors**
   - Never ignore conversion failures
   - Always explain what went wrong
   - Provide retry or alternative options

5. **No Memory Leaks**
   - Never store both sketch and result simultaneously
   - Clean up temporary images
   - Implement proper image disposal

6. **No Blocked UI**
   - Never block main thread with image processing
   - Always show progress indicator
   - Allow cancellation

7. **No Poor Sketch Quality**
   - Never use unreadable or extremely messy sketches
   - Always provide guidance on sketch quality
   - Show examples of good sketches

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing a sketch to image feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the useSketchToImageFeature hook
3. Select output style (realistic, artistic, anime, 3d)
4. Implement sketch selection/upload UI
5. Add optional prompt input for description
6. Configure options (addColor, addDetails)
7. Validate sketch before conversion
8. Show sketch-to-result comparison
9. Handle long processing times with progress
10. Implement proper error handling
11. Implement cleanup on unmount

CRITICAL RULES:
- MUST validate sketch before calling convert()
- MUST show sketch-to-result comparison
- MUST handle output style selection
- MUST handle prompt input
- MUST implement debouncing (300ms)
- MUST allow regeneration with different settings

CONFIGURATION:
- Provide valid userId (string)
- Set outputStyle: 'realistic' | 'artistic' | 'anime' | '3d'
- Set prompt: string (optional description)
- Set addColor: boolean (add color to sketch)
- Set addDetails: boolean (enhance with details)
- Implement onSelectSketch callback
- Implement onSaveResult callback
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

OUTPUT STYLES:
- realistic: Photorealistic output
- artistic: Artistic interpretation
- anime: Anime/manga style
- 3d: 3D rendered look

OPTIONS:
- addColor: Add color to sketch (default: true)
- addDetails: Enhance with details (default: true)
- prompt: Optional description of sketch content

STRICTLY FORBIDDEN:
- No missing sketch validation
- No auto-processing without user action
- No hardcoded API keys
- No unhandled errors
- No memory leaks
- No blocking UI
- No poor sketch quality acceptance

QUALITY CHECKLIST:
- [ ] Sketch selection/upload implemented
- [ ] Output style selector added
- [ ] Prompt input included
- [ ] Validation before convert()
- [ ] Sketch-to-result comparison view
- [ ] Progress indicator during processing
- [ ] Error display with retry option
- [ ] Download/share functionality
- [ ] Regeneration with different styles
```

#### AI Implementation Checklist

Use this checklist when generating code:

- [ ] Feature imported from correct path
- [ ] Sketch selection implemented
- [ ] Output style selector added
- [ ] Prompt input implemented
- [ ] Validation before convert()
- [ ] Sketch-to-result comparison view
- [ ] Progress indicator during processing
- [ ] Error display with user-friendly message
- [ ] Download/share buttons
- [ ] Regeneration option
- [ ] Cleanup on unmount
- [ ] Original sketch preserved

---

## 🛠️ Configuration Strategy

### Essential Configuration

```typescript
// Required fields
{
  userId: string
  outputStyle: 'realistic' | 'artistic' | 'anime' | '3d'
  onSelectSketch: () => Promise<string | null>
}

// Optional callbacks
{
  onProcessingStart?: () => void
  onProcessingComplete?: (result) => void
  onError?: (error: string) => void
}
```

### Recommended Settings

1. **Output Styles**
   - Realistic: Photorealistic output (recommended for concept art)
   - Artistic: Artistic interpretation (creative projects)
   - Anime: Anime/manga style (illustrations)
   - 3D: 3D rendered look (product mockups)

2. **Options**
   - addColor: Add color to sketch (default: true)
   - addDetails: Enhance with AI-generated details (default: true)

3. **Sketch Quality**
   - Clear, readable line work
   - Visible shapes and forms
   - Good contrast
   - Max size: 10MB

---

## 📊 State Management

### Feature States

**isReady**: boolean
- Sketch selected and validated
- Check before enabling generate button

**isProcessing**: boolean
- Conversion in progress
- Show loading/progress indicator
- Disable generate button

**progress**: number (0-100)
- Conversion progress percentage
- Update progress bar

**error**: string | null
- Error message if conversion failed
- Display to user with clear message

**result**: {
  imageUrl: string
  sketchImageUrl?: string
  outputStyle?: string
  prompt?: string
  metadata?: any
}

---

## 🎨 Best Practices

### Sketch Creation

1. **Sketch Quality**
   - Good: Clear lines, readable shapes
   - Bad: Extremely messy, unreadable

2. **Style Selection**
   - Match style to use case
   - Consider final application
   - Test different styles

3. **Prompt Writing**
   - Be descriptive about content
   - Include important details
   - Mention style preferences

### User Experience

1. **Sketch Upload**
   - Support multiple upload methods
   - Allow camera capture
   - Provide sketch guidelines

2. **Preview**
   - Show sketch preview before conversion
   - Compare different output styles
   - Display prompt examples

---

## 🐛 Common Pitfalls

### Quality Issues

❌ **Problem**: Poor conversion results
✅ **Solution**: Use clearer sketch, try different style, add descriptive prompt

### Style Issues

❌ **Problem**: Output doesn't match expectations
✅ **Solution**: Try different output style, improve prompt

### Content Issues

❌ **Problem**: AI misinterprets sketch
✅ **Solution**: Add descriptive prompt, use clearer sketch

---

## 📦 Related Components

Use these components from the library:

- **PhotoUploadCard**: Upload sketch interface
- **OutputStyleSelector**: Choose output style
- **PromptInput**: Enter sketch description
- **ResultDisplay**: Sketch-to-result comparison
- **ProgressBar**: Progress display

Located at: `src/presentation/components/`

---

## 🔄 Migration Strategy

If migrating from previous implementation:

1. **Update imports** to new path
2. **Add output style selector**
3. **Implement prompt input**
4. **Update state handling** for new structure
5. **Add sketch-to-result comparison**
6. **Test all output styles**

---

## 📚 Additional Resources

- Main documentation: `/docs/`
- API reference: `/docs/api/`
- Examples: `/docs/examples/basic/sketch-to-image/`
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
