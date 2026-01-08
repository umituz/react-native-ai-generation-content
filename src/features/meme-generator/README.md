# Meme Generator Feature

Create memes from images with AI-generated text and styling.

## 📍 Import Path

```typescript
import { useMemeGeneratorFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/meme-generator/`

## 🎯 Feature Purpose

Generate memes from images with customizable text, templates, and styling. Supports classic top/bottom text format, modern styling, minimal design, and bold impact templates with font and color customization.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Creating humorous memes
- Generating shareable social media content
- Creating marketing memes
- Making reaction images
- Personalized content creation

❌ **When NOT to Use:**
- Complex image editing (use image editing software)
- Graphic design work (use design tools)
- Text-to-image generation (use Text to Image)
- Adding artistic effects (use Style Transfer)

### Implementation Strategy

1. **Select image** for meme background
2. **Choose template** (classic, modern, minimal, bold)
3. **Add text** (top and/or bottom)
4. **Customize style** (font, size, colors)
5. **Generate meme** with progress tracking
6. **Preview result** and offer regeneration
7. **Save or share** final meme

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Image Requirements
- **MUST** provide ONE image for meme
- **MUST** use clear, appropriate images
- **MUST** have visible content
- **MUST NOT** exceed file size limits (10MB max)
- **MUST** respect copyright and usage rights

### 2. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** specify `template` (classic, modern, minimal, bold)
- **MUST** implement `onError` callback
- **MUST** implement `onSelectImage` callback
- **MUST** provide text input fields

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
- **MUST NOT** generate multiple memes simultaneously

### 5. Content Quality
- **MUST** provide text preview
- **MUST** allow font and color customization
- **MUST** handle various text lengths
- **MUST** ensure text readability
- **MUST** offer template switching

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Missing Images**
   - Always validate image is selected
   - Never call process() without image

2. **No Auto-Processing**
   - Never start generation without user action
   - Always require explicit "Create" button press
   - Show preview before processing

3. **No Hardcoded Credentials**
   - Never store API keys in component files
   - Use environment variables or secure storage

4. **No Unhandled Errors**
   - Never ignore generation failures
   - Always explain what went wrong
   - Provide retry or alternative options

5. **No Memory Leaks**
   - Never store both original and meme simultaneously
   - Clean up temporary images
   - Implement proper image disposal

6. **No Blocked UI**
   - Never block main thread with image processing
   - Always show progress indicator
   - Allow cancellation

7. **No Offensive Content**
   - Never generate hate speech or offensive content
   - Implement content moderation
   - Provide content guidelines

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing a meme generator feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the useMemeGeneratorFeature hook
3. Select meme template (classic, modern, minimal, bold)
4. Implement image selection UI
5. Add text input fields (top and bottom)
6. Customize style (font, size, colors)
7. Validate image and text before generation
8. Show result preview
9. Handle long processing times with progress
10. Implement proper error handling
11. Implement cleanup on unmount

CRITICAL RULES:
- MUST validate image and text before calling generate()
- MUST show result preview with quality check
- MUST handle template selection
- MUST handle text input (top and bottom)
- MUST implement debouncing (300ms)
- MUST allow regeneration with different settings

CONFIGURATION:
- Provide valid userId (string)
- Set template: 'classic' | 'modern' | 'minimal' | 'bold'
- Set topText: string (optional)
- Set bottomText: string (optional)
- Set fontSize: number (font size)
- Set textColor: string (text color)
- Set strokeColor: string (text outline color)
- Implement onSelectImage callback
- Implement onSaveResult callback
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

MEME TEMPLATES:
- classic: Top/bottom text format
- modern: Contemporary styling
- minimal: Clean, simple design
- bold: Big, impactful text

OPTIONS:
- fontSize: Adjust text size
- textColor: Text color
- strokeColor: Text outline color
- font: Font family selection

STRICTLY FORBIDDEN:
- No missing image validation
- No auto-processing without user action
- No hardcoded API keys
- No unhandled errors
- No memory leaks
- No blocking UI
- No offensive content generation

QUALITY CHECKLIST:
- [ ] Image selection implemented
- [ ] Template selector added
- [ ] Text inputs included (top/bottom)
- [ ] Style customization (font, colors)
- [ ] Validation before generate()
- [ ] Result preview display
- [ ] Progress indicator during processing
- [ ] Error display with retry option
- [ ] Download/share functionality
- [ ] Template switching option
```

#### AI Implementation Checklist

Use this checklist when generating code:

- [ ] Feature imported from correct path
- [ ] Image selection implemented
- [ ] Template selector added
- [ ] Text inputs implemented (top/bottom)
- [ ] Style customization added
- [ ] Validation before generate()
- [ ] Result preview display
- [ ] Progress indicator during processing
- [ ] Error display with user-friendly message
- [ ] Download/share buttons
- [ ] Template switching option
- [ ] Cleanup on unmount
- [ ] Original image preserved

---

## 🛠️ Configuration Strategy

### Essential Configuration

```typescript
// Required fields
{
  userId: string
  template: 'classic' | 'modern' | 'minimal' | 'bold'
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

1. **Meme Templates**
   - Classic: Traditional top/bottom text format
   - Modern: Contemporary styling with flexible placement
   - Minimal: Clean, simple design
   - Bold: Big, impactful text

2. **Text Options**
   - Top text: Primary message
   - Bottom text: Secondary message or punchline
   - Keep text short and punchy

3. **Style Customization**
   - Font size: Adjust based on image size
   - Text color: Ensure good contrast
   - Stroke color: Add outline for readability

4. **Image Quality**
   - Minimum: 512x512 resolution
   - Recommended: 1024x1024 or higher
   - Format: JPEG or PNG
   - Max size: 10MB

---

## 📊 State Management

### Feature States

**isReady**: boolean
- Image selected and text provided (optional)
- Check before enabling generate button

**isProcessing**: boolean
- Meme generation in progress
- Show loading/progress indicator
- Disable generate button

**progress**: number (0-100)
- Generation progress percentage
- Update progress bar

**error**: string | null
- Error message if generation failed
- Display to user with clear message

**result**: {
  imageUrl: string
  originalImageUrl?: string
  template?: string
  topText?: string
  bottomText?: string
  metadata?: any
}

---

## 🎨 Best Practices

### Meme Creation

1. **Text Quality**
   - Keep text short and punchy
   - Ensure good readability
   - Match text to image content

2. **Template Selection**
   - Classic: Traditional memes
   - Modern: Contemporary content
   - Minimal: Subtle messages
   - Bold: Impactful statements

3. **Style Customization**
   - Ensure text contrasts well
   - Adjust font size appropriately
   - Use stroke for readability

### User Experience

1. **Template Preview**
   - Show examples of each template
   - Preview before generating
   - Explain template characteristics

2. **Text Input**
   - Provide clear input fields
   - Show character limits
   - Suggest text examples

---

## 🐛 Common Pitfalls

### Readability Issues

❌ **Problem**: Text is hard to read
✅ **Solution**: Adjust font size, add stroke, improve contrast

### Template Issues

❌ **Problem**: Wrong template for content
✅ **Solution**: Try different template, adjust text placement

### Content Issues

❌ **Problem**: Text doesn't match image
✅ **Solution**: Ensure text relevance to image content

---

## 📦 Related Components

Use these components from the library:

- **PhotoUploadCard**: Upload image interface
- **MemeTemplateSelector**: Choose meme template
- **TextInputFields**: Top/bottom text input
- **ColorPicker**: Select text and stroke colors
- **ResultDisplay**: Show generated meme
- **ProgressBar**: Progress display

Located at: `src/presentation/components/`

---

## 🔄 Migration Strategy

If migrating from previous implementation:

1. **Update imports** to new path
2. **Add template selector**
3. **Implement text input fields**
4. **Add style customization options**
5. **Update state handling** for new structure
6. **Test all meme templates**

---

## 📚 Additional Resources

- Main documentation: `/docs/`
- API reference: `/docs/api/`
- Examples: `/docs/examples/basic/meme-generator/`
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
