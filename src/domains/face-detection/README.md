# Face Detection Domain

Face detection and analysis system for AI features.

## 📍 Import Path

```typescript
import {
  detectFaces,
  analyzeFace,
  compareFaces,
  cropFace,
  checkFaceQuality,
  findMatchingFace
} from '@umituz/react-native-ai-generation-content';
```

**Location**: `src/domains/face-detection/`

## 🎯 Domain Purpose

Comprehensive face detection and analysis capabilities for AI features. Detect faces in images, analyze facial features and attributes, support multiple faces, extract facial measurements and landmarks, and enable face matching for various AI generation features.

---

## 📋 Usage Strategy

### When to Use This Domain

✅ **Use Cases:**
- Preparing images for face swap
- Validating photos for AI features
- Detecting multiple faces in group photos
- Quality checking before processing
- Face matching and verification

❌ **When NOT to Use:**
- Real-time video processing (use specialized tools)
- Surveillance or tracking (ethical concerns)
- Biometric authentication (use security libraries)
- Age verification for legal purposes

### Implementation Strategy

1. **Detect faces** before AI generation
2. **Validate quality** of detected faces
3. **Handle multiple faces** appropriately
4. **Extract landmarks** for processing
5. **Compare faces** when needed
6. **Crop faces** for focused processing
7. **Provide feedback** on detection results

---

## ⚠️ Critical Rules (MUST FOLLOW)

### 1. Detection Requirements
- **MUST** detect faces before processing
- **MUST** handle no-face scenarios
- **MUST** support multiple faces
- **MUST** return confidence scores
- **MUST** provide bounding boxes

### 2. Quality Validation
- **MUST** check face quality before use
- **MUST** provide quality feedback
- **MUST** handle poor quality gracefully
- **MUST** guide users to better photos
- **MUST** validate clarity and visibility

### 3. Multiple Face Handling
- **MUST** detect all faces in image
- **MUST** allow face selection
- **MUST** provide face indexing
- **MUST** handle face ordering
- **MUST** support group photos

### 4. Performance
- **MUST** optimize detection speed
- **MUST** cache detection results
- **MUST** handle large images
- **MUST NOT** block main thread
- **MUST** implement efficient algorithms

### 5. User Experience
- **MUST** provide clear feedback
- **MUST** explain detection failures
- **MUST** guide users to better photos
- **MUST** show detected faces
- **MUST** allow face selection

---

## 🚫 Prohibitions (MUST AVOID)

### Strictly Forbidden

❌ **NEVER** do the following:

1. **No Skipping Detection**
   - Always detect before processing
   - Never assume face presence
   - Validate detection results

2. **No Poor Quality Processing**
   - Always check quality first
   - Never process poor quality faces
   - Guide users to better photos

3. **No Missing Feedback**
   - Always explain detection results
   - Never silently fail
   - Provide actionable guidance

4. **No Privacy Violations**
   - Never store faces without consent
   - Always handle data properly
   - Comply with regulations

5. **No Biased Detection**
   - Ensure fair detection across demographics
   - Test for bias regularly
   - Use diverse training data

6. **No Missing Context**
   - Always explain what was detected
   - Show face locations
   - Provide confidence scores

7. **No Blocking UI**
   - Never block on detection
   - Show progress indicators
   - Allow cancellation

---

## 🤖 AI Agent Directions

### For AI Code Generation Tools

#### Prompt Template for AI Agents

```
You are implementing face detection using @umituz/react-native-ai-generation-content.

REQUIREMENTS:
1. Import face detection functions
2. Detect faces before AI generation
3. Validate face quality
4. Handle multiple faces
5. Extract landmarks for processing
6. Provide clear user feedback
7. Handle no-face scenarios
8. Optimize for performance

CRITICAL RULES:
- MUST detect before processing
- MUST validate face quality
- MUST handle multiple faces
- MUST provide clear feedback
- MUST guide users to better photos
- MUST handle no-face scenarios

DETECTION FUNCTIONS:
- detectFaces: Detect all faces in image
- analyzeFace: Analyze facial features
- compareFaces: Compare two faces
- cropFace: Crop face from image
- checkFaceQuality: Validate face quality
- findMatchingFace: Find face in group photo

FACE DATA:
- boundingBox: Face location and size
- confidence: Detection confidence (0-1)
- landmarks: Facial feature points
- gender: Detected gender
- age: Estimated age range
- emotions: Emotion probabilities

QUALITY METRICS:
- brightness: Image brightness
- sharpness: Face clarity
- overall: 'good' | 'fair' | 'poor'

STRICTLY FORBIDDEN:
- No skipping detection
- No poor quality processing
- No missing feedback
- No privacy violations
- No biased detection
- No missing context
- No blocking UI

QUALITY CHECKLIST:
- [ ] Face detection implemented
- [ ] Quality validation added
- [ ] Multiple faces handled
- [ ] Clear feedback provided
- [ ] No-face scenarios handled
- [ ] Performance optimized
- [ ] Privacy protected
- [ ] Bias tested
- [ ] User guidance provided
- [ ] Error handling complete
```

---

## 🛠️ Configuration Strategy

### Detection Result

```typescript
interface FaceDetectionResult {
  faces: DetectedFace[];
  imageWidth: number;
  imageHeight: number;
  processingTime: number;
}

interface DetectedFace {
  id: string;
  boundingBox: BoundingBox;
  confidence: number;
  landmarks?: FacialLandmarks;
}
```

### Face Analysis

```typescript
interface FaceAnalysis {
  gender: 'male' | 'female' | 'unknown';
  age: {
    min: number;
    max: number;
    estimated: number;
  };
  emotions: {
    happy: number;
    sad: number;
    angry: number;
    surprised: number;
    neutral: number;
  };
  dominantEmotion: string;
  landmarks: FacialLandmarks;
  faceQuality: {
    brightness: number;
    sharpness: number;
    overall: 'good' | 'fair' | 'poor';
  };
}
```

---

## 📊 Core Functions

### Detection
- `detectFaces()` - Find all faces
- `analyzeFace()` - Analyze single face
- `checkFaceQuality()` - Validate quality

### Processing
- `cropFace()` - Extract face
- `findMatchingFace()` - Match in group
- `compareFaces()` - Compare two faces

### Components
- `FaceDetectionOverlay` - Visual overlay
- `FaceAnalysisDisplay` - Analysis results

---

## 🎨 Best Practices

### Image Quality
- Use high-quality, well-lit photos
- Ensure faces are clearly visible
- Forward-facing photos work best
- Avoid extreme angles

### User Feedback
- Explain why detection failed
- Guide to better photos
- Show what was detected
- Provide confidence scores

### Performance
- Cache detection results
- Optimize image sizes
- Implement lazy loading
- Background processing

---

## 🐛 Common Pitfalls

❌ **No face detected**: Guide user to better photo
❌ **Poor quality**: Check quality first
❌ **Multiple faces**: Allow face selection
❌ **Slow detection**: Optimize, cache results

---

## 📚 Related Features

- [Face Swap](../../features/face-swap) - Swap faces between images
- [AI Hug](../../features/ai-hug) - Generate AI hug images
- [AI Kiss](../../features/ai-kiss) - Generate AI kiss images

---

**Last Updated**: 2025-01-08
**Version**: 2.0.0 (Strategy-based Documentation)
