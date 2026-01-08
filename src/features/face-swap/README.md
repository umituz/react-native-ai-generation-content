# Face Swap Feature

Swap faces between people in images using AI.

## 📍 Import Path

```typescript
import { useFaceSwapFeature } from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/features/face-swap/`

## 🎯 Feature Purpose

Swap faces between two images using AI-powered face detection and alignment. Supports multiple faces and produces natural-looking results.

---

## 📋 Usage Strategy

### When to Use This Feature

✅ **Use Cases:**
- Entertainment and fun face swaps
- Movie character transformations
- Historical face replacement projects
- Creative content and memes
- Social media engagement

❌ **When NOT to Use:**
- Identity fraud or deception
- Non-consensual face swapping
- Misleading content creation
- Defamatory purposes

### Implementation Strategy

1. **Require TWO images** - source and target
2. **Validate both images** before processing
3. **Show clear UI** for which face is which
4. **Implement confirmation dialog** before processing
5. **Provide preview** before saving
6. **Handle privacy** and consent properly

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Image Requirements
- **MUST** provide TWO distinct images (source + target)
- **MUST** contain at least one detectable face in each image
- **MUST** use high-quality images (min 512x512 recommended)
- **MUST** ensure faces are clearly visible
- **MUST NOT** use images with no detectable faces

### 2. Configuration
- **MUST** provide valid `userId` for tracking
- **MUST** implement `onError` callback
- **MUST** implement `onSelectSourceImage` callback
- **MUST** implement `onSelectTargetImage` callback
- **MUST** handle both images being selected before processing

### 3. State Management
- **MUST** check `isReady` before enabling swap button
- **MUST** verify both images are selected
- **MUST** handle `isProcessing` state to prevent duplicate requests
- **MUST** display `error` state to users
- **MUST** implement proper cleanup on unmount

### 4. Performance
- **MUST** limit image size (<10MB each)
- **MUST** compress images before processing
- **MUST** implement loading indicators during processing
- **MUST** cache results locally
- **MUST NOT** process multiple swaps simultaneously

### 5. Ethics & Privacy
- **MUST** obtain consent from people whose faces are used
- **MUST** provide clear usage terms
- **MUST** implement content moderation
- **MUST** prevent malicious use cases
- **MUST** log processing for audit trail

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Single Image**
   - Always requires TWO images (source + target)
   - Never attempt with missing image

2. **No Non-Consensual Swaps**
   - Always obtain permission from subjects
   - Never swap faces without consent
   - Implement age verification for minors

3. **No Malicious Use**
   - Never use for fraud or deception
   - Never create misleading content
   - Never use for harassment or bullying

4. **No Unhandled Errors**
   - Never ignore face detection failures
   - Always handle "no face found" errors
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
   - Never confuse which face is source/target
   - Always provide clear UI labels
   - Show preview before processing

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

When using this feature with AI code generation tools, follow these guidelines:

#### Prompt Template for AI Agents

```
You are implementing a face swap feature using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import from: @umituz/react-native-ai-generation-content
2. Use the useFaceSwapFeature hook
3. Require TWO images (source + target)
4. Implement dual image selection UI
5. Validate both images before processing
6. Add confirmation dialog before swap
7. Handle face detection failures gracefully
8. Implement proper error handling
9. Show clear progress indicators
10. Implement cleanup on unmount

CRITICAL RULES:
- MUST obtain consent from subjects
- MUST validate both images before processing
- MUST provide clear UI for source vs target
- MUST handle "no face found" errors
- MUST prevent malicious use cases
- MUST implement content moderation
- NEVER process without user confirmation

CONFIGURATION:
- Provide valid userId (string)
- Implement onSelectSourceImage callback
- Implement onSelectTargetImage callback
- Implement onSaveImage callback
- Configure callbacks: onProcessingStart, onProcessingComplete, onError

OPTIONS:
- enhanceFace: boolean (default: true)
- matchSkinTone: boolean (default: true)

STRICTLY FORBIDDEN:
- No single image processing
- No non-consensual swaps
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
- [ ] Source/target image labels clear
- [ ] Both images validated before processing
- [ ] Confirmation dialog added
- [ ] Face detection error handling
- [ ] Progress indicator during processing
- [ ] Result preview before saving
- [ ] Error display with user-friendly message
- [ ] Consent mechanism in place
- [ ] Cleanup on unmount
- [ ] Content moderation configured

---

## 🛠️ Configuration Strategy

### Essential Configuration

```typescript
// Required fields
{
  userId: string  // User identifier for tracking
  onSelectSourceImage: () => Promise<string | null>
  onSelectTargetImage: () => Promise<string | null>
}

// Optional callbacks
{
  onProcessingStart?: () => void
  onProcessingComplete?: (result) => void
  onError?: (error: string) => void
}
```

### Recommended Settings

1. **Image Quality**
   - Minimum: 512x512 resolution
   - Recommended: 1024x1024 or higher
   - Format: JPEG or PNG
   - Max size: 10MB per image

2. **Processing Options**
   - enhanceFace: true (sharpen facial features)
   - matchSkinTone: true (natural skin tone blending)

3. **Performance Settings**
   - Compress images before upload
   - Show progress for long operations
   - Implement timeout (60s default)

---

## 📊 State Management

### Feature States

**isReady**: boolean
- Both images selected and validated
- Check before enabling swap button

**isProcessing**: boolean
- Face swap in progress
- Show loading indicator
- Disable all buttons

**progress**: number (0-100)
- Processing progress percentage
- Update progress bar

**error**: string | null
- Error message if processing failed
- Common errors: "No face found in source image", "No face found in target image"

**result**: {
  imageUrl: string
  metadata?: any
}

---

## 🔐 Ethics & Privacy

### Consent Requirements

- **MUST** obtain explicit consent from all subjects
- **MUST** provide clear explanation of how faces will be used
- **MUST** implement age verification
- **MUST** allow subjects to opt-out

### Content Moderation

- **MUST** filter inappropriate content
- **MUST** prevent malicious use cases
- **MUST** implement reporting mechanism
- **MUST** review flagged content

### Usage Guidelines

- **MUST** provide terms of service
- **MUST** clearly label face-swapped content
- **MUST** prevent deception/fraud
- **MUST** comply with deepfake regulations

---

## 🎨 Best Practices

### Image Selection

1. **Face Visibility**
   - Good: Clear, frontal face shots
   - Bad: Occluded or profile faces

2. **Lighting**
   - Similar lighting conditions work best
   - Front-facing well-lit photos ideal

3. **Image Quality**
   - Higher resolution = better results
   - Minimum 512x512 recommended

4. **Multiple Faces**
   - Feature handles multiple faces
   - Warn users about all faces being swapped

### User Experience

1. **Clear UI**
   - Label source vs target clearly
   - Show preview before processing
   - Add confirmation dialog

2. **Error Handling**
   - Explain "no face found" errors
   - Provide troubleshooting tips
   - Offer retry option

3. **Performance**
   - Compress images before upload
   - Show progress for long operations
   - Cache results for re-download

---

## 🐛 Common Pitfalls

### Face Detection Issues

❌ **Problem**: "No face found" error
✅ **Solution**: Ensure faces are clearly visible, well-lit, frontal

### Image Quality Issues

❌ **Problem**: Poor quality results
✅ **Solution**: Use higher resolution images, better lighting

### UX Confusion

❌ **Problem**: Users confused about which face is which
✅ **Solution**: Clear labels, visual indicators, preview

### Privacy Concerns

❌ **Problem**: Non-consensual face swapping
✅ **Solution**: Implement consent mechanisms, age verification

---

## 📦 Related Components

Use these components from the library:

- **DualImagePicker**: Select two images
- **ResultImageCard**: Display face swap result
- **ConfirmationDialog**: Confirm before processing
- **FaceDetectionOverlay**: Show detected faces

Located at: `src/presentation/components/`

---

## 🔄 Migration Strategy

If migrating from previous implementation:

1. **Update imports** to new path
2. **Add dual image selection** (source + target)
3. **Implement consent mechanism**
4. **Update state handling** for both images
5. **Add confirmation dialog**
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
- Examples: `/docs/examples/basic/face-swap/`
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
