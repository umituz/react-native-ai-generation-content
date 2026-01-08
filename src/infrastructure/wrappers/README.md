# Infrastructure Wrappers

Wrapper utilities and enhancements for AI generation operations.

## Overview

The wrappers module provides wrapper utilities that add additional functionality to core AI generation operations, such as language enhancement, moderation, and synchronous execution.

## Features

- Language enhancement for prompts
- Content moderation wrapper
- Synchronous generation support
- Prompt augmentation
- Result filtering

## Language Enhancement

### enhancePromptWithLanguage

Enhance prompts with language support:

```tsx
import { enhancePromptWithLanguage } from '@umituz/react-native-ai-generation-content';

// Enhance prompt for better results
const enhanced = enhancePromptWithLanguage({
  prompt: 'A beautiful sunset',
  targetLanguage: 'en', // Translate to English first
  enhance: true, // Add descriptive details
});

console.log('Enhanced prompt:', enhanced);
// "A beautiful sunset over the ocean with vibrant orange and pink colors,
//  captured during golden hour with dramatic cloud formations"
```

### getSupportedLanguages

Get list of supported languages:

```tsx
import { getSupportedLanguages } from '@umituz/react-native-ai-generation-content';

const languages = getSupportedLanguages();
console.log('Supported languages:', languages);
// [
//   { code: 'en', name: 'English' },
//   { code: 'es', name: 'Spanish' },
//   { code: 'fr', name: 'French' },
//   ...
// ]
```

### getLanguageName

Get language name from code:

```tsx
import { getLanguageName } from '@umituz/react-native-ai-generation-content';

const name = getLanguageName('es');
console.log('Language:', name); // "Spanish"
```

## Content Moderation

### ModerationWrapper

Wrap generation with content moderation:

```tsx
import { ModerationWrapper } from '@umituz/react-native-ai-generation-content';

const wrapper = new ModerationWrapper({
  enabled: true,
  rules: [
    {
      id: 'no-violence',
      category: 'violence',
      severity: 'high',
      enabled: true,
      action: 'block',
    },
    {
      id: 'no-adult',
      category: 'sexual',
      severity: 'high',
      enabled: true,
      action: 'block',
    },
  ],
  onViolation: (result) => {
    Alert.alert('Content Warning', result.warning, [
      { text: 'OK', onPress: () => console.log('Acknowledged') },
    ]);
  },
});

// Wrap generation
const wrapped = wrapper.wrap({
  type: 'text-to-image',
  generate: async (input) => {
    return await generateImage(input);
  },
});

// Execute with moderation
const result = await wrapped.generate({
  prompt: 'Your prompt here',
});

if (result.isModerated) {
  console.log('Content was moderated');
  console.log('Violations:', result.violations);
} else {
  console.log('Content is safe:', result.output);
}
```

### Moderation Result

```tsx
interface ModerationResult {
  isSafe: boolean;
  isModerated: boolean;
  violations: {
    category: string;
    severity: 'low' | 'medium' | 'high';
    confidence: number;
  }[];
  warning?: string;
  output?: any;
}
```

## Synchronous Generation

### generateSynchronously

Generate content synchronously (blocks until complete):

```tsx
import { generateSynchronously } from '@umituz/react-native-ai-generation-content';

// ⚠️ Warning: This blocks the thread
const result = await generateSynchronously({
  featureType: 'text-to-image',
  inputData: {
    prompt: 'A sunset',
  },
  userId: 'user-123',
  timeout: 30000, // 30 second timeout
});

console.log('Result:', result);
```

**⚠️ Use with caution**: Synchronous generation blocks the UI thread. Only use for:
- Testing
- Very fast operations
- Background workers

### SynchronousGenerationConfig

```tsx
interface SynchronousGenerationConfig {
  featureType: string;
  inputData: any;
  userId: string;
  providerId?: string;
  timeout?: number;
  onProgress?: (progress: number) => void;
}
```

## Prompt Augmentation

### Auto-Enhance Prompts

Automatically enhance prompts for better results:

```tsx
import { ModerationWrapper } from '@umituz/react-native-ai-generation-content';

const wrapper = new ModerationWrapper({
  enabled: true,
  autoEnhance: true,
  enhancementOptions: {
    addDetail: true,
    addStyle: true,
    improveGrammar: true,
  },
});

const enhanced = await wrapper.enhancePrompt('A cat');
// "A highly detailed, professional photograph of a beautiful cat,
//  with perfect lighting and composition, captured with a DSLR camera"
```

### Style Prompts

Add style to prompts:

```tsx
import { enhancePromptWithLanguage } from '@umituz/react-native-ai-generation-content';

const styled = enhancePromptWithLanguage({
  prompt: 'A sunset',
  style: 'photorealistic',
  quality: 'high',
});

// "A photorealistic, high-quality image of a sunset over the ocean,
//  with dramatic lighting and vivid colors"
```

## Result Filtering

### FilterResults

Filter and clean generation results:

```tsx
import { ModerationWrapper } from '@umituz/react-native-ai-generation-content';

const wrapper = new ModerationWrapper({
  enabled: true,
  filterResults: true,
  filterOptions: {
    removeDuplicates: true,
    qualityThreshold: 0.7,
    maxResults: 4,
  },
});

const filtered = await wrapper.filterResults(results);
```

## Usage Examples

### Complete Moderation Setup

```tsx
import { ModerationWrapper } from '@umituz/react-native-ai-generation-content';

const wrapper = new ModerationWrapper({
  enabled: true,
  autoEnhance: true,
  rules: [
    {
      id: 'safety',
      category: 'violence',
      severity: 'high',
      enabled: true,
      action: 'block',
    },
  ],
  onViolation: (result) => {
    Alert.alert('Content Warning', result.warning);
  },
});

const generateWithModeration = wrapper.wrap({
  type: 'text-to-image',
  generate: async (input) => {
    return await generateImage(input);
  },
});

// Use wrapped generation
const result = await generateWithModeration({
  prompt: userInput,
});

if (result.isSafe) {
  setImage(result.output.imageUrl);
} else {
  showWarning(result.violations);
}
```

### Multi-Language Support

```tsx
import { enhancePromptWithLanguage } from '@umituz/react-native-ai-generation-content';

// User enters prompt in Spanish
const userPrompt = 'Un hermoso atardecer';

// Enhance and translate to English for AI
const enhanced = enhancePromptWithLanguage({
  prompt: userPrompt,
  targetLanguage: 'en',
  enhance: true,
});

// Use enhanced prompt for generation
const result = await generateImage({
  prompt: enhanced,
});
```

## Best Practices

1. **Moderation**: Always enable moderation in production
2. **Language Enhancement**: Use for non-English prompts
3. **Synchronous**: Avoid synchronous generation in production
4. **Rule Configuration**: Customize rules based on your use case
5. **Violation Handling**: Provide clear feedback to users

## Error Handling

```tsx
try {
  const result = await wrapped.generate({ prompt: '...' });
} catch (error) {
  if (error.type === 'MODERATION_ERROR') {
    // Content was flagged
    showModerationError(error.violations);
  } else if (error.type === 'TIMEOUT_ERROR') {
    // Generation timed out
    showTimeoutError();
  }
}
```

## Related

- [Middleware](../middleware/) - Request/response middleware
- [Services](../services/) - AI generation services
- [Utils](../utils/) - Utility functions

## License

MIT
