# Image Captioning Feature

Generate descriptive captions for images using AI.

## 📍 Import Path

```typescript
import { useImageCaptioningFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/image-captioning/`

## 🎯 Feature Purpose

Generate detailed, descriptive captions for images using AI. Supports multiple caption styles (detailed, brief, creative, factual) with keyword extraction, object recognition, and scene description capabilities.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Generating social media captions
- Creating alt text for accessibility
- Auto-generating image descriptions for CMS
- SEO-friendly image descriptions
- Content management and organization

❌ **When NOT to Use:**
- Generating images from descriptions (use Text to Image)
- Detailed image analysis beyond captions (use image analysis tools)
- Real-time video captioning
- Multi-image comparisons

### Implementation Strategy

1. **Select image** to caption
2. **Choose caption style** (detailed, brief, creative, factual)
3. **Configure options** (keywords, objects, scene)
4. **Generate caption** with progress tracking
5. **Review result** with metadata
6. **Copy or share** caption

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Image Requirements
- **MUST** provide ONE image to caption
- **MUST** use clear, appropriate images
- **MUST** have visible content
- **MUST NOT** exceed file size limits (10MB max)
- **MUST** respect copyright and usage rights

### 2. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** specify `captionStyle` (detailed, brief, creative, factual)
- **MUST** implement `onError` callback
- **MUST** implement `onSelectImage` callback
- **MUST** handle caption display and copying

### 3. State Management
- **MUST** check `isReady` before enabling generate button
- **MUST** display progress during generation
- **MUST** handle `isProcessing` state to prevent duplicate requests
- **MUST** display `error` state with clear messages
- **MUST** implement proper cleanup on unmount

### 4. Performance
- **MUST** implement image compression before upload
- **MUST** show progress indicator for processing
- **MUST** cache results locally
- **MUST** allow users to cancel processing
- **MUST NOT** generate multiple captions simultaneously

### 5. Content Quality
- **MUST** provide caption with confidence score
- **MUST** support optional metadata (keywords, objects, scene)
- **MUST** handle various image types
- **MUST** support multiple caption styles
- **MUST** offer regeneration with different styles

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Missing Images**
   - Always validate image is selected
   - Never call process() without image
   - Show clear upload prompt

2. **No Auto-Processing**
   - Never start captioning without user action
   - Always require explicit "Generate" button press
   - Show preview before processing

3. **No Hardcoded Credentials**
   - Never store API keys in component files
   - Use environment variables or secure storage

4. **No Unhandled Errors**
   - Never ignore captioning failures
   - Always explain what went wrong
   - Provide retry or alternative options

5. **No Memory Leaks**
   - Never store both image and caption unnecessarily
   - Clean up temporary images
   - Implement proper image disposal

6. **No Blocked UI**
   - Never block main thread with image processing
   - Always show progress indicator
   - Allow cancellation

7. **No Copyright Issues**
   - Never claim copyright on generated captions
   - Respect image usage rights
   - Provide attribution when needed

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing an image captioning feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the useImageCaptioningFeature hook
3. Select caption style (detailed, brief, creative, factual)
4. Implement image selection UI
5. Configure options (keywords, objects, scene)
6. Validate image before captioning
7. Display caption with metadata
8. Handle long processing times with progress
9. Implement proper error handling
10. Implement cleanup on unmount

CRITICAL RULES:
- MUST validate image before calling process()
- MUST display caption with confidence score
- MUST handle caption style selection
- MUST handle optional metadata options
- MUST implement debouncing (300ms)
- MUST allow regeneration with different styles
- MUST implement copy to clipboard functionality

CONFIGURATION:
- Provide valid userId (string)
- Set captionStyle: 'detailed' | 'brief' | 'creative' | 'factual'
- Set language?: string (caption language, default: 'en')
- Set includeKeywords?: boolean (include extracted keywords)
- Set maxCaptionLength?: number (maximum caption length)
- Implement onSelectImage callback
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

CAPTION STYLES:
- detailed: Comprehensive, descriptive captions
- brief: Short, concise captions
- creative: Artistic and creative descriptions
- factual: Objective, factual descriptions

OPTIONS:
- includeKeywords: Extract and include keywords (default: false)
- includeObjects: List detected objects (default: false)
- includeScene: Describe scene setting (default: false)
- maxCaptionLength: Limit caption length (default: unlimited)
- language: Caption language (default: 'en')

STRICTLY FORBIDDEN:
- No missing image validation
- No auto-processing without user action
- No hardcoded API keys
- No unhandled errors
- No memory leaks
- No blocking UI
- No copyright issues

QUALITY CHECKLIST:
- [ ] Image selection implemented
- [ ] Caption style selector added
- [ ] Optional metadata toggles included
- [ ] Validation before process()
- [ ] Caption display with confidence score
- [ ] Keywords/objects/scene display (when enabled)
- [ ] Progress indicator during processing
- [ ] Error display with retry option
- [ ] Copy to clipboard functionality
- [ ] Regeneration with different styles
```

#### AI Implementation Checklist

Use this checklist when generating code:

- [ ] Feature imported from correct path
- [ ] Image selection implemented
- [ ] Caption style selector added
- [ ] Metadata toggles implemented
- [ ] Validation before process()
- [ ] Caption display with confidence
- [ ] Keywords display (when enabled)
- [ ] Objects display (when enabled)
- [ ] Scene display (when enabled)
- [ ] Progress indicator during processing
- [ ] Error display with user-friendly message
- [ ] Copy to clipboard button
- [ ] Regeneration option
- [ ] Cleanup on unmount

---

## 🛠️ Configuration Strategy

### Essential Configuration

```typescript
// Required fields
{
  userId: string
  captionStyle: 'detailed' | 'brief' | 'creative' | 'factual'
  onSelectImage: () => Promise<string | null>
}

// Optional callbacks
{
  includeKeywords?: boolean
  includeObjects?: boolean
  includeScene?: boolean
  maxCaptionLength?: number
  onProcessingStart?: () => void
  onProcessingComplete?: (result) => void
  onError?: (error: string) => void
}
```

### Recommended Settings

1. **Caption Styles**
   - Detailed: Comprehensive descriptions (recommended for CMS)
   - Brief: Short captions (social media, alt text)
   - Creative: Artistic descriptions (marketing, storytelling)
   - Factual: Objective descriptions (accessibility, documentation)

2. **Metadata Options**
   - includeKeywords: Extract key terms for categorization
   - includeObjects: List detected objects
   - includeScene: Describe environment/setting

3. **Length Limits**
   - Alt text: 125 characters recommended
   - Instagram: 2200 characters maximum
   - Twitter: 280 characters maximum
   - No limit for CMS/documentation

---

## 📊 State Management

### Feature States

**isReady**: boolean
- Image selected and validated
- Check before enabling generate button

**isProcessing**: boolean
- Caption generation in progress
- Show loading/progress indicator
- Disable generate button

**progress**: number (0-100)
- Generation progress percentage
- Update progress bar

**error**: string | null
- Error message if generation failed
- Display to user with clear message

**result**: {
  caption: string
  keywords?: string[]
  objects?: string[]
  scene?: string
  confidence: number
  language: string
}

---

## 🎨 Best Practices

### Caption Style Selection

1. **Detailed**
   - Use for: CMS, documentation, comprehensive descriptions
   - Best: High-quality, content-rich images
   - Example: "A serene beach scene at sunset with gentle waves rolling onto the shore. The sky is painted in vibrant shades of orange and pink as the sun dips below the horizon."

2. **Brief**
   - Use for: Social media, quick summaries, alt text
   - Best: Any image type
   - Example: "Beach sunset with orange sky"

3. **Creative**
   - Use for: Marketing, storytelling, artistic content
   - Best: Visually striking or emotional images
   - Example: "Nature's daily masterpiece unfolds as the sun bids farewell, painting the sky in a breathtaking symphony of warm hues."

4. **Factual**
   - Use for: Accessibility, documentation, objective needs
   - Best: Any image type
   - Example: "A beach at sunset. Visible elements include sand, ocean water, sky, sun, and birds."

### Use Case Matching

1. **Social Media**
   - Style: Brief or Creative
   - Length: Match platform limits
   - Include keywords: Yes

2. **Accessibility (Alt Text)**
   - Style: Factual or Brief
   - Length: 125 characters
   - Include keywords: Optional

3. **CMS/Documentation**
   - Style: Detailed
   - Length: No limit
   - Include all metadata: Yes

---

## 🐛 Common Pitfalls

### Quality Issues

❌ **Problem**: Caption doesn't match image content
✅ **Solution**: Try different caption style, improve image quality

### Length Issues

❌ **Problem**: Caption too long for platform
✅ **Solution**: Use maxCaptionLength parameter

### Missing Metadata

❌ **Problem**: Keywords or objects not showing
✅ **Solution**: Enable includeKeywords and includeObjects options

### Confidence Issues

❌ **Problem**: Low confidence caption
✅ **Solution**: Review and edit caption, improve image quality

---

## 📦 Related Components

Use these components from the library:

- **PhotoUploadCard**: Upload image interface
- **CaptionStyleSelector**: Choose caption style
- **MetadataToggles**: Enable/disable keywords, objects, scene
- **CaptionDisplay**: Display caption with metadata
- **CopyButton**: Copy caption to clipboard
- **ProgressBar**: Progress display

Located at: `src/presentation/components/`

---

## 🔄 Migration Strategy

If migrating from previous implementation:

1. **Update imports** to new path
2. **Add caption style selector**
3. **Implement metadata toggles**
4. **Add copy to clipboard functionality**
5. **Update state handling** for new structure
6. **Display confidence scores**
7. **Test all caption styles**

---

## 📚 Additional Resources

- Main documentation: `/docs/`
- API reference: `/docs/api/`
- Examples: `/docs/examples/basic/image-captioning/`
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
