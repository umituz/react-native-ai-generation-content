# Face Detection Domain

Face detection and analysis system for AI features.

## Overview

The Face Detection domain provides comprehensive face detection and analysis capabilities. It's used by various AI features like face swap, AI hug, AI kiss, and more to detect, analyze, and process faces in images.

## Features

- **Face Detection**: Detect faces in images
- **Face Analysis**: Analyze facial features and attributes
- **Multiple Faces**: Support for multiple faces in one image
- **Face Metrics**: Extract facial measurements and landmarks
- **Face Matching**: Compare and match faces
- **Bounding Boxes**: Get face bounding boxes for cropping
- **Landmarks**: Extract facial landmark points

## Installation

This domain is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Detecting Faces

```tsx
import { detectFaces } from '@umituz/react-native-ai-generation-content';

const result = await detectFaces({
  imageBase64: 'base64...',
});

if (result.faces.length > 0) {
  console.log(`Found ${result.faces.length} face(s)`);

  result.faces.forEach(face => {
    console.log('Face bounding box:', face.boundingBox);
    console.log('Confidence:', face.confidence);
  });
} else {
  console.log('No faces detected');
}
```

### Analyzing Faces

```tsx
import { analyzeFace } from '@umituz/react-native-ai-generation-content';

const analysis = await analyzeFace({
  imageBase64: 'base64...',
  faceIndex: 0, // Analyze first detected face
});

console.log('Gender:', analysis.gender);
console.log('Age:', analysis.age);
console.log('Emotions:', analysis.emotions);
console.log('Landmarks:', analysis.landmarks);
```

### Comparing Faces

```tsx
import { compareFaces } from '@umituz/react-native-ai-generation-content';

const similarity = await compareFaces({
  image1Base64: 'base64...',
  image2Base64: 'base64...',
});

console.log('Similarity score:', similarity.score);
console.log('Is same person:', similarity.isSamePerson);
```

## Data Models

### FaceDetectionResult

```tsx
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

### BoundingBox

```tsx
interface BoundingBox {
  x: number; // Top-left X coordinate
  y: number; // Top-left Y coordinate
  width: number;
  height: number;
}
```

### FacialLandmarks

```tsx
interface FacialLandmarks {
  leftEye: Point;
  rightEye: Point;
  nose: Point;
  mouth: Point;
  leftEar: Point;
  rightEar: Point;
  chin: Point;
  // Additional landmarks
  allPoints: Point[];
}

interface Point {
  x: number;
  y: number;
}
```

### FaceAnalysis

```tsx
interface FaceAnalysis {
  gender: 'male' | 'female' | 'unknown';
  genderConfidence: number;
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

### FaceComparison

```tsx
interface FaceComparison {
  score: number; // 0-1 similarity score
  isSamePerson: boolean;
  confidence: number;
  matchDetails: {
    eyeDistance: number;
    faceShape: number;
    featureSimilarity: number;
  };
}
```

## Hooks

### useFaceDetection

```tsx
import { useFaceDetection } from '@umituz/react-native-ai-generation-content';

function FaceDetectionComponent() {
  const { detectFaces, detecting, result, error } = useFaceDetection();

  const handleDetect = async (imageBase64: string) => {
    await detectFaces({ imageBase64 });
  };

  return (
    <View>
      {result && (
        <Text>Detected {result.faces.length} face(s)</Text>
      )}
      {error && <Text>Error: {error}</Text>}
    </View>
  );
}
```

### useFaceAnalysis

```tsx
import { useFaceAnalysis } from '@umituz/react-native-ai-generation-content';

function FaceAnalysisComponent() {
  const { analyzeFace, analyzing, analysis, error } = useFaceAnalysis();

  const handleAnalyze = async (imageBase64: string) => {
    await analyzeFace({ imageBase64 });
  };

  return (
    <View>
      {analysis && (
        <View>
          <Text>Gender: {analysis.gender}</Text>
          <Text>Age: ~{analysis.age.estimated}</Text>
          <Text>Emotion: {analysis.dominantEmotion}</Text>
        </View>
      )}
    </View>
  );
}
```

## Advanced Usage

### Face Cropping

```tsx
import { cropFace } from '@umituz/react-native-ai-generation-content';

// Crop face from image
const croppedImage = await cropFace({
  imageBase64: 'base64...',
  faceIndex: 0,
  padding: 20, // Add padding around face
});

// Result: Base64 of cropped face image
```

### Face Quality Check

```tsx
import { checkFaceQuality } from '@umituz/react-native-ai-generation-content';

const quality = await checkFaceQuality({
  imageBase64: 'base64...',
  faceIndex: 0,
});

if (quality.overall === 'good') {
  console.log('Good quality face for processing');
} else {
  console.log('Face quality issues:', quality.issues);
}
```

### Multiple Face Processing

```tsx
import { detectFaces, cropFace } from '@umituz/react-native-ai-generation-content';

const result = await detectFaces({ imageBase64: 'base64...' });

// Process all detected faces
const croppedFaces = await Promise.all(
  result.faces.map(async (face, index) => {
    return await cropFace({
      imageBase64: 'base64...',
      faceIndex: index,
      padding: 20,
    });
  })
);
```

### Face Matching

```tsx
import { findMatchingFace } from '@umituz/react-native-ai-generation-content';

// Find a specific face in a group photo
const match = await findMatchingFace({
  targetImageBase64: 'base64...', // Face to find
  sourceImageBase64: 'base64...', // Group photo
});

if (match.found) {
  console.log('Found face at index:', match.faceIndex);
  console.log('Similarity:', match.similarity);
}
```

## Component Examples

### Face Detection Overlay

```tsx
import { FaceDetectionOverlay } from '@umituz/react-native-ai-generation-content';

<FaceDetectionOverlay
  imageUri={imageUri}
  faces={detectedFaces}
  showLandmarks
  showBoundingBoxes
  boundingBoxColor="#00FF00"
  landmarkColor="#FF0000"
/>
```

### Face Analysis Display

```tsx
import { FaceAnalysisDisplay } from '@umituz/react-native-ai-generation-content';

<FaceAnalysisDisplay
  analysis={faceAnalysis}
  showEmotions
  showAge
  showGender
  showLandmarks
/>
```

## Use Cases

### Face Swap Preparation

```tsx
// Detect faces before face swap
const result = await detectFaces({
  imageBase64: sourceImage,
});

if (result.faces.length === 0) {
  Alert.alert('No Face Detected', 'Please choose a photo with a clear face');
} else if (result.faces.length > 1) {
  // Ask user to select which face to use
  showFaceSelection(result.faces);
}
```

### Quality Validation

```tsx
// Check face quality before processing
const quality = await checkFaceQuality({
  imageBase64: image,
});

if (quality.overall === 'poor') {
  Alert.alert(
    'Poor Photo Quality',
    'Please use a clearer, well-lit photo for best results',
    [{ text: 'OK' }]
  );
  return;
}
```

### Face Verification

```tsx
// Verify if two photos show the same person
const comparison = await compareFaces({
  image1Base64: photo1,
  image2Base64: photo2,
});

if (comparison.isSamePerson) {
  console.log('Same person detected');
} else {
  console.log('Different people');
}
```

## Best Practices

1. **Image Quality**: Use high-quality, well-lit photos
2. **Face Visibility**: Ensure faces are clearly visible
3. **Frontal Faces**: Forward-facing photos work best
4. **Single Face**: Features work best with single clear faces
5. **Error Handling**: Always handle cases where no face is detected

## Related Features

- [Face Swap](../../features/face-swap) - Swap faces between images
- [AI Hug](../../features/ai-hug) - Generate AI hug images
- [AI Kiss](../../features/ai-kiss) - Generate AI kiss images

## License

MIT
