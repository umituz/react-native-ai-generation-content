# Content Moderation Domain

Content moderation and filtering system for AI-generated content.

## Overview

The Content Moderation domain provides comprehensive content moderation capabilities for AI-generated content. It helps ensure that generated content meets safety guidelines and community standards.

## Features

- **Text Moderation**: Filter inappropriate text content
- **Image Moderation**: Detect and filter inappropriate images
- **Video Moderation**: Moderate video content
- **Voice Moderation**: Filter audio content
- **Configurable Rules**: Customize moderation rules and policies
- **Policy Violation Detection**: Detect and report policy violations

## Installation

This domain is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Basic Usage

### Using Moderation Wrapper

```tsx
import { ModerationWrapper } from '@umituz/react-native-ai-generation-content';

// Wrap generation with moderation
const wrapper = new ModerationWrapper({
  enabled: true,
  onViolation: (result) => {
    Alert.alert('Content Warning', result.warning);
  },
});

// Generate with moderation
const result = await wrapper.execute({
  type: 'text-to-image',
  input: { prompt: 'Your prompt here' },
  generate: async (input) => {
    return await generateImage(input);
  },
});

if (result.isModerated) {
  console.log('Content was flagged:', result.violations);
}
```

### Direct Moderation

```tsx
import { moderateText, moderateImage } from '@umituz/react-native-ai-generation-content';

// Moderate text
const textResult = await moderateText({
  text: 'Some text to moderate',
  rules: ['profanity', 'hate-speech', 'violence'],
});

if (textResult.isSafe) {
  console.log('Text is safe');
} else {
  console.log('Violations:', textResult.violations);
}

// Moderate image
const imageResult = await moderateImage({
  imageBase64: 'base64...',
  rules: ['nudity', 'violence', 'gore'],
});

if (imageResult.isSafe) {
  console.log('Image is safe');
} else {
  console.log('Violations:', imageResult.violations);
}
```

## Configuration Options

### Moderation Config

```tsx
interface ModerationConfig {
  enabled: boolean; // Enable/disable moderation
  rules?: ModerationRule[]; // Custom moderation rules
  threshold?: number; // Confidence threshold (0-1)
  onViolation?: (result: ModerationResult) => void; // Violation callback
  allowOverride?: boolean; // Allow users to override warnings
}
```

### Moderation Rules

```tsx
interface ModerationRule {
  id: string;
  category: 'profanity' | 'hate-speech' | 'violence' | 'sexual' | 'self-harm' | 'other';
  severity: 'low' | 'medium' | 'high';
  enabled: boolean;
  action: 'flag' | 'block' | 'warn';
}
```

## Moderation Types

### Text Moderation

```tsx
import { moderateText } from '@umituz/react-native-ai-generation-content';

const result = await moderateText({
  text: 'Your text content',
  rules: ['profanity', 'hate-speech', 'harassment'],
});

// Result
interface TextModerationResult {
  isSafe: boolean;
  confidence: number;
  violations: {
    category: string;
    severity: 'low' | 'medium' | 'high';
    confidence: number;
    position?: { start: number; end: number };
  }[];
  filteredText?: string; // Text with violations removed
}
```

### Image Moderation

```tsx
import { moderateImage } from '@umituz/react-native-ai-generation-content';

const result = await moderateImage({
  imageBase64: 'base64...',
  rules: ['nudity', 'violence', 'gore', 'racy'],
});

// Result
interface ImageModerationResult {
  isSafe: boolean;
  confidence: number;
  violations: {
    category: string;
    severity: 'low' | 'medium' | 'high';
    confidence: number;
    boundingBox?: { x: number; y: number; width: number; height: number };
  }[];
}
```

### Video Moderation

```tsx
import { moderateVideo } from '@umituz/react-native-ai-generation-content';

const result = await moderateVideo({
  videoUrl: 'https://...',
  rules: ['nudity', 'violence', 'gore'],
  frameInterval: 5, // Check every 5th frame
});

// Result
interface VideoModerationResult {
  isSafe: boolean;
  confidence: number;
  violations: {
    category: string;
    severity: 'low' | 'medium' | 'high';
    timestamp: number; // Time in seconds
    confidence: number;
  }[];
}
```

### Voice Moderation

```tsx
import { moderateVoice } from '@umituz/react-native-ai-generation-content';

const result = await moderateVoice({
  audioUrl: 'https://...',
  rules: ['profanity', 'hate-speech', 'violence'],
  language: 'en',
});

// Result
interface VoiceModerationResult {
  isSafe: boolean;
  confidence: number;
  transcript?: string; // Transcribed text
  violations: {
    category: string;
    severity: 'low' | 'medium' | 'high';
    timestamp: number;
    confidence: number;
    text?: string; // Transcribed text segment
  }[];
}
```

## Using with AI Features

### Wrap Generation with Moderation

```tsx
import { generationWrapper, ModerationWrapper } from '@umituz/react-native-ai-generation-content';

// Setup moderation
const moderation = new ModerationWrapper({
  enabled: true,
  rules: [
    { id: 'no-nudity', category: 'sexual', severity: 'high', enabled: true, action: 'block' },
    { id: 'no-violence', category: 'violence', severity: 'medium', enabled: true, action: 'warn' },
  ],
  onViolation: (result) => {
    Alert.alert('Content Flagged', result.warning);
  },
});

// Wrap generation
const wrappedGenerate = moderation.wrap({
  type: 'text-to-image',
  generate: async (input) => {
    return await generationWrapper.executeImageFeature({
      featureType: 'text-to-image',
      inputData: input,
    });
  },
});

// Use wrapped generation
const result = await wrappedGenerate({
  prompt: 'Your prompt here',
});

if (result.isModerated) {
  // Content was flagged
  console.log('Violations:', result.violations);
} else {
  // Content is safe
  console.log('Generated image:', result.imageUrl);
}
```

### Custom Moderation Rules

```tsx
import { ModerationWrapper } from '@umituz/react-native-ai-generation-content';

const customRules = [
  {
    id: 'custom-1',
    category: 'other' as const,
    severity: 'medium' as const,
    enabled: true,
    action: 'warn' as const,
    check: async (content: string) => {
      // Custom check logic
      return {
        isViolation: content.includes('forbidden-word'),
        confidence: 1.0,
      };
    },
  },
];

const moderation = new ModerationWrapper({
  enabled: true,
  rules: customRules,
});
```

## Component Integration

### ModerationSummary Component

```tsx
import { ModerationSummary } from '@umituz/react-native-ai-generation-content';

<ModerationSummary
  violations={moderationResult.violations}
  onDismiss={() => console.log('Dismissed')}
  onOverride={() => console.log('Overridden')}
/>
```

### Show Warning Helper

```tsx
import { showContentModerationWarning } from '@umituz/react-native-ai-generation-content';

const result = await moderateText({ text: '...' });

if (!result.isSafe) {
  showContentModerationWarning({
    violations: result.violations,
    onConfirm: () => {
      // User acknowledged and wants to proceed
    },
    onCancel: () => {
      // User cancelled
    },
  });
}
```

## Best Practices

1. **Enable Early**: Enable moderation from the start of development
2. **Custom Rules**: Customize rules based on your use case
3. **Thresholds**: Adjust confidence thresholds based on your needs
4. **User Feedback**: Allow users to provide feedback on moderation
5. **Transparency**: Be transparent about moderation with users

## Configuration Examples

### Strict Moderation

```tsx
const strictConfig: ModerationConfig = {
  enabled: true,
  threshold: 0.3, // Lower threshold = more strict
  rules: [
    { id: 'profanity', category: 'profanity', severity: 'low', enabled: true, action: 'block' },
    { id: 'hate-speech', category: 'hate-speech', severity: 'high', enabled: true, action: 'block' },
    { id: 'violence', category: 'violence', severity: 'low', enabled: true, action: 'block' },
    { id: 'sexual', category: 'sexual', severity: 'low', enabled: true, action: 'block' },
  ],
};
```

### Lenient Moderation

```tsx
const lenientConfig: ModerationConfig = {
  enabled: true,
  threshold: 0.8, // Higher threshold = more lenient
  allowOverride: true,
  rules: [
    { id: 'hate-speech', category: 'hate-speech', severity: 'high', enabled: true, action: 'block' },
    { id: 'sexual', category: 'sexual', severity: 'high', enabled: true, action: 'warn' },
  ],
};
```

## Related Features

- [Prompts](../prompts) - AI prompt management
- [Creations](../creations) - Manage AI-generated creations
- [Face Detection](../face-detection) - Face detection API

## License

MIT
