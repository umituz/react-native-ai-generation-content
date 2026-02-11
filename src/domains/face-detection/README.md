# Face Detection & Preservation

AI-powered face detection and preservation for image generation tasks.

## Features

- ✅ **AI-based Face Detection** - Detect faces in images using AI vision models
- ✅ **Face Preservation Modes** - Multiple preservation strategies (strict, balanced, minimal)
- ✅ **Provider-Agnostic** - Works with any AI vision provider
- ✅ **Image Generation Integration** - Easy integration with image-to-video, image-to-image, etc.
- ✅ **React Hooks** - Ready-to-use hooks for React Native

## Quick Example

```typescript
import { prepareImageGenerationWithFacePreservation } from "@umituz/react-native-ai-generation-content/domains/face-detection";

// Enhance your generation prompts with face preservation
const generation = prepareImageGenerationWithFacePreservation({
  prompt: "Transform into cartoon style",
  faceDetectionResult: faceResult,
  preservationMode: "balanced",
});

// Use enhanced prompt
await generateVideo({ prompt: generation.enhancedPrompt });
```

See [index.ts](./index.ts) for complete API.
