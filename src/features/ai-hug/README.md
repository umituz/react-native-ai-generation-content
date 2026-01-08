# AI Hug Feature

Generate AI-powered hug images between two people.

## 📍 Import Path

```typescript
import { useAIHugFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/ai-hug/`

## 🎯 Feature Purpose

Create realistic hug images by combining two photos using AI. Automatically detects poses, positions arms naturally, and generates high-quality facial matching for various hug types.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Creating couple photos
- Generating family moments
- Fun friendship images
- Social media content
- Creative personal projects

❌ **When NOT to Use:**
- Non-consensual image generation
- Misleading or deceptive content
- Harassment or bullying
- Commercial use without permissions

### Implementation Strategy

1. **Select TWO photos** (person 1 and person 2)
2. **Choose hug type** (romantic, friendly, family, cute)
3. **Validate both photos** before generation
4. **Generate AI hug** with progress tracking
5. **Preview result** and offer regeneration
6. **Save or share** the final image

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Image Requirements
- **MUST** provide TWO distinct images (person 1 + person 2)
- **MUST** contain at least one visible person in each image
- **MUST** use high-quality images (min 512x512 recommended)
- **MUST** ensure faces are clearly visible
- **MUST NOT** use images with no detectable people

### 2. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** specify `hugType` (romantic, friendly, family, cute)
- **MUST** implement `onError` callback
- **MUST** implement `onSelectPerson1` and `onSelectPerson2` callbacks
- **MUST** handle both images being selected before processing

### 3. State Management
- **MUST** check `isReady` before enabling generate button
- **MUST** verify both images are selected
- **MUST** handle `isProcessing` state to prevent duplicate requests
- **MUST** display `error` state to users
- **MUST** implement proper cleanup on unmount

### 4. Performance
- **MUST** limit image size (<10MB each)
- **MUST** compress images before processing
- **MUST** implement loading indicators during processing
- **MUST** cache results locally
- **MUST NOT** generate multiple hugs simultaneously

### 5. Ethics & Privacy
- **MUST** obtain consent from people whose photos are used
- **MUST** provide clear usage terms
- **MUST** implement content moderation
- **MUST** prevent malicious use cases
- **MUST** log processing for audit trail

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Single Image**
   - Always requires TWO images (person 1 + person 2)
   - Never attempt with missing image

2. **No Non-Consensual Generation**
   - Always obtain permission from subjects
   - Never generate hugs without consent
   - Implement age verification for minors

3. **No Malicious Use**
   - Never use for harassment or bullying
   - Never create misleading content
   - Never use for deception

4. **No Unhandled Errors**
   - Never ignore generation failures
   - Always handle detection errors gracefully
   - Provide clear error messages

5. **No Memory Leaks**
   - Never store large images in state unnecessarily
   - Always cleanup image references on unmount
   - Implement proper image disposal

6. **No Blocked UI**
   - Never process without user confirmation
   - Always show progress indicator
   - Never block main thread with image processing

7. **No Missing Context**
   - Never confuse which person is which
   - Always provide clear UI labels
   - Show preview before processing

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing an AI hug generation feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the useAIHugFeature hook
3. Require TWO images (person 1 + person 2)
4. Implement dual image selection UI
5. Select hug type (romantic, friendly, family, cute)
6. Validate both images before generation
7. Add confirmation dialog before generation
8. Handle long processing times with progress
9. Implement proper error handling
10. Implement cleanup on unmount

CRITICAL RULES:
- MUST obtain consent from subjects
- MUST validate both images before processing
- MUST provide clear UI for person 1 vs person 2
- MUST handle generation errors gracefully
- MUST prevent malicious use cases
- MUST implement content moderation
- NEVER process without user confirmation

CONFIGURATION:
- Provide valid userId (string)
- Set hugType: 'romantic' | 'friendly' | 'family' | 'cute'
- Implement onSelectPerson1 callback
- Implement onSelectPerson2 callback
- Implement onSaveResult callback
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

OPTIONS:
- hugType: Select hug style
- preserveFaces: boolean (maintain facial features)
- enhanceQuality: boolean (enhance output quality)

STRICTLY FORBIDDEN:
- No single image processing
- No non-consensual generation
- No malicious use
- No unhandled errors
- No memory leaks
- No missing UI context

ETHICS CHECKLIST:
- [ ] Consent mechanism implemented
- [ ] Age verification for minors
- [ ] Content moderation in place
- [ ] Usage terms provided
- [ ] Audit trail logging
- [ ] Report/flag functionality
```

#### AI Implementation Checklist

Use this checklist when generating code:

- [ ] Feature imported from correct path
- [ ] Dual image selection implemented
- [ ] Person 1/Person 2 labels clear
- [ ] Hug type selector added
- [ ] Both images validated before processing
- [ ] Confirmation dialog added
- [ ] Progress indicator during processing
- [ ] Error display with user-friendly message
- [ ] Result preview before saving
- [ ] Consent mechanism in place
- [ ] Cleanup on unmount
- [ ] Content moderation configured

---

## 🛠️ Configuration Strategy

### Essential Configuration

```typescript
// Required fields
{
  userId: string
  hugType: 'romantic' | 'friendly' | 'family' | 'cute'
  onSelectPerson1: () => Promise<string | null>
  onSelectPerson2: () => Promise<string | null>
}

// Optional callbacks
{
  onProcessingStart?: () => void
  onProcessingComplete?: (result) => void
  onError?: (error: string) => void
}
```

### Recommended Settings

1. **Hug Types**
   - Romantic: Intimate couple hugs
   - Friendly: Casual friendship hugs
   - Family: Warm family embraces
   - Cute: Adorable, playful hugs

2. **Image Quality**
   - Minimum: 512x512 resolution
   - Recommended: 1024x1024 or higher
   - Format: JPEG or PNG
   - Max size: 10MB per image

3. **Performance Settings**
   - Compress images before upload
   - Show progress for long operations
   - Implement timeout (120s default)
   - Enable result caching

---

## 📊 State Management

### Feature States

**isReady**: boolean
- Both images selected and validated
- Check before enabling generate button

**isProcessing**: boolean
- AI hug generation in progress
- Show loading/progress indicator
- Disable generate button

**progress**: number (0-100)
- Generation progress percentage
- Update progress bar

**error**: string | null
- Error message if generation failed
- Common errors: "No person found in image", "Generation failed"

**result**: {
  imageUrl: string
  hugType?: string
  metadata?: any
}

---

## 🔐 Ethics & Privacy

### Consent Requirements

- **MUST** obtain explicit consent from all subjects
- **MUST** provide clear explanation of how images will be used
- **MUST** implement age verification
- **MUST** allow subjects to opt-out

### Content Moderation

- **MUST** filter inappropriate content
- **MUST** prevent malicious use cases
- **MUST** implement reporting mechanism
- **MUST** review flagged content

### Usage Guidelines

- **MUST** provide terms of service
- **MUST** clearly label AI-generated content
- **MUST** prevent deception/misrepresentation
- **MUST** comply with deepfake regulations

---

## 🎨 Best Practices

### Image Selection

1. **Photo Quality**
   - Good: Clear, well-lit, high-resolution photos
   - Bad: Blurry, dark, low-resolution images

2. **Pose Clarity**
   - Good: Full-body or waist-up shots
   - Bad: Extreme close-ups, obscured poses

3. **Face Visibility**
   - Good: Clear, frontal face shots
   - Bad: Occluded or profile faces

4. **Lighting**
   - Similar lighting conditions work best
   - Front-facing well-lit photos ideal

### User Experience

1. **Clear UI**
   - Label person 1 vs person 2 clearly
   - Show preview before processing
   - Add confirmation dialog

2. **Error Handling**
   - Explain "no person found" errors
   - Provide troubleshooting tips
   - Offer retry option

3. **Performance**
   - Compress images before upload
   - Show progress for long operations
   - Cache results for re-download

---

## 🐛 Common Pitfalls

### Detection Issues

❌ **Problem**: "No person found" error
✅ **Solution**: Ensure people are clearly visible, well-lit, frontal

### Quality Issues

❌ **Problem**: Poor quality generation
✅ **Solution**: Use higher resolution images, better lighting, try different hug type

### UX Confusion

❌ **Problem**: Users confused about which person is which
✅ **Solution**: Clear labels, visual indicators, preview

### Privacy Concerns

❌ **Problem**: Non-consensual image generation
✅ **Solution**: Implement consent mechanisms, age verification

---

## 📦 Related Components

Use these components from the library:

- **DualImagePicker**: Select two images
- **HugTypeSelector**: Choose hug style
- **ResultImageCard**: Display result with actions
- **ConfirmationDialog**: Confirm before processing

Located at: `src/presentation/components/`

---

## 🔄 Migration Strategy

If migrating from previous implementation:

1. **Update imports** to new path
2. **Add dual image selection** (person 1 + person 2)
3. **Implement consent mechanism**
4. **Add hug type selector**
5. **Update state handling** for both images
6. **Test all error cases**

---

## ⚖️ Legal Considerations

### Compliance

- **Deepfake Regulations**: Comply with local laws
- **Privacy Laws**: GDPR, CCPA compliance
- **Consent Requirements**: Explicit permission needed
- **Age Restrictions**: Verify adult subjects
- **Content Labeling**: Mark as AI-generated

### Best Practices

- Provide attribution for source images
- Allow content reporting/flagging
- Implement audit trail logging
- Cooperate with takedown requests

---

## 📚 Additional Resources

- Main documentation: `/docs/`
- API reference: `/docs/api/`
- Examples: `/docs/examples/basic/ai-hug/`
- Ethics guidelines: `/docs/ethics.md`

---

**Last Updated**: 2025-01-08
**Version**: 2.0.0 (Strategy-based Documentation)

---

## 📝 Changelog

### v2.0.0 - 2025-01-08
- **BREAKING**: Documentation format changed to strategy-based
- Removed extensive code examples
- Added ethics and privacy guidelines
- Added rules, prohibitions, and AI agent directions
- Focus on responsible AI usage

### v1.0.0 - Initial Release
- Initial feature documentation
