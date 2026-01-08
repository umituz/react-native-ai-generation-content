# Prompts Domain

AI prompt management and generation system for AI features.

## Overview

The Prompts domain provides a comprehensive system for managing, generating, and templating AI prompts across all AI generation features. It includes services for prompt history, template management, and AI service processing.

## Features

- **Prompt Templates**: Pre-configured templates for various AI features
- **Prompt History**: Track and manage generated prompts
- **AI Service Processing**: Process prompts through AI services
- **Type Safety**: Full TypeScript support with comprehensive types
- **Extensible**: Easy to add new templates and services

## Installation

This domain is part of `@umituz/react-native-ai-generation-content`.

```bash
npm install @umituz/react-native-ai-generation-content
```

## Core Components

### Entities

#### AIPromptTemplate

Base template for AI prompts:

```tsx
import { AIPromptTemplate } from '@umituz/react-native-ai-generation-content';

const template: AIPromptTemplate = {
  id: 'text-to-image-default',
  name: 'Default Text to Image',
  template: 'Create an image of {description}',
  variables: ['description'],
  category: 'image-generation',
};
```

#### GeneratedPrompt

Represents a generated prompt:

```tsx
import { GeneratedPrompt } from '@umituz/react-native-ai-generation-content';

const generatedPrompt: GeneratedPrompt = {
  id: 'prompt-123',
  templateId: 'text-to-image-default',
  content: 'Create an image of a beautiful sunset',
  variables: {
    description: 'a beautiful sunset',
  },
  createdAt: new Date(),
};
```

#### Feature-Specific Configs

##### FaceSwapConfig

```tsx
import { FaceSwapConfig } from '@umituz/react-native-ai-generation-content';

const config: FaceSwapConfig = {
  enhanceFace: true,
  matchSkinTone: true,
};
```

##### PhotoRestorationConfig

```tsx
import { PhotoRestorationConfig } from '@umituz/react-native-ai-generation-content';

const config: PhotoRestorationConfig = {
  removeScratches: true,
  fixBlur: true,
  colorize: false,
};
```

##### StyleTransferConfig

```tsx
import { StyleTransferConfig } from '@umituz/react-native-ai-generation-content';

const config: StyleTransferConfig = {
  style: 'oil-painting',
  intensity: 0.8,
};
```

##### TextGenerationConfig

```tsx
import { TextGenerationConfig } from '@umituz/react-native-ai-generation-content';

const config: TextGenerationConfig = {
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 1000,
};
```

### Hooks

#### usePromptGeneration

Generate prompts from templates:

```tsx
import { usePromptGeneration } from '@umituz/react-native-ai-generation-content';

function MyComponent() {
  const { generatePrompt, isGenerating, error } = usePromptGeneration();

  const handleGenerate = async () => {
    const prompt = await generatePrompt({
      templateId: 'text-to-image-default',
      variables: {
        description: 'a majestic mountain landscape',
      },
    });
    console.log('Generated prompt:', prompt);
  };

  return <Button onPress={handleGenerate} title="Generate Prompt" />;
}
```

#### useTemplateRepository

Manage prompt templates:

```tsx
import { useTemplateRepository } from '@umituz/react-native-ai-generation-content';

function TemplateManager() {
  const { templates, addTemplate, updateTemplate, deleteTemplate } = useTemplateRepository();

  const handleAddTemplate = async () => {
    await addTemplate({
      id: 'custom-template',
      name: 'Custom Template',
      template: 'Generate {style} image of {subject}',
      variables: ['style', 'subject'],
      category: 'custom',
    });
  };

  return (
    <View>
      {templates.map(template => (
        <Text key={template.id}>{template.name}</Text>
      ))}
      <Button onPress={handleAddTemplate} title="Add Template" />
    </View>
  );
}
```

#### useFaceSwap

Face swap specific prompt generation:

```tsx
import { useFaceSwap } from '@umituz/react-native-ai-generation-content';

function FaceSwapComponent() {
  const { generatePrompt, config } = useFaceSwap({
    enhanceFace: true,
    matchSkinTone: true,
  });

  const handleGenerate = async () => {
    const prompt = await generatePrompt({
      sourceImage: 'base64...',
      targetImage: 'base64...',
    });
  };
}
```

#### usePhotoRestoration

Photo restoration prompt generation:

```tsx
import { usePhotoRestoration } from '@umituz/react-native-ai-generation-content';

const { generatePrompt } = usePhotoRestoration({
  removeScratches: true,
  fixBlur: true,
});
```

#### useStyleTransfer

Style transfer prompt generation:

```tsx
import { useStyleTransfer } from '@umituz/react-native-ai-generation-content';

const { generatePrompt } = useStyleTransfer({
  style: 'oil-painting',
  intensity: 0.8,
});
```

#### useImageEnhancement

Image enhancement prompt generation:

```tsx
import { useImageEnhancement } from '@umituz/react-native-ai-generation-content';

const { generatePrompt } = useImageEnhancement({
  enhanceDetails: true,
  adjustColors: true,
});
```

### Services

#### PromptGenerationService

Core service for generating prompts:

```tsx
import { PromptGenerationService } from '@umituz/react-native-ai-generation-content';

const service = new PromptGenerationService();

const prompt = await service.generatePrompt({
  templateId: 'text-to-image-default',
  variables: { description: 'beautiful sunset' },
});
```

#### AIServiceProcessor

Process prompts through AI services:

```tsx
import { AIServiceProcessor } from '@umituz/react-native-ai-generation-content';

const processor = new AIServiceProcessor({
  apiKey: 'your-api-key',
  provider: 'openai',
});

const result = await processor.processPrompt({
  prompt: 'Create an image of...',
  service: 'text-to-image',
});
```

### Repositories

#### TemplateRepository

Manage prompt templates:

```tsx
import { TemplateRepository } from '@umituz/react-native-ai-generation-content';

const repository = new TemplateRepository();

// Get all templates
const templates = await repository.getAll();

// Get template by ID
const template = await repository.getById('text-to-image-default');

// Save template
await repository.save(template);

// Delete template
await repository.delete('text-to-image-default');
```

#### PromptHistoryRepository

Track prompt generation history:

```tsx
import { PromptHistoryRepository } from '@umituz/react-native-ai-generation-content';

const repository = new PromptHistoryRepository();

// Add to history
await repository.add({
  promptId: 'prompt-123',
  content: 'Create an image...',
  createdAt: new Date(),
});

// Get history
const history = await repository.getHistory({ limit: 10 });

// Clear history
await repository.clear();
```

## Sample Prompts

Pre-configured example prompts:

```tsx
import {
  DEFAULT_TEXT_TO_IMAGE_PROMPTS,
  DEFAULT_TEXT_TO_VOICE_PROMPTS,
} from '@umituz/react-native-ai-generation-content';

// Text to image prompts
DEFAULT_TEXT_TO_IMAGE_PROMPTS.forEach(prompt => {
  console.log(prompt.id, prompt.fallbackText);
  // Output:
  // sunset, "A beautiful sunset over mountains with vibrant colors"
  // cityscape, "Futuristic cityscape at night with neon lights"
  // ...
});

// Text to voice prompts
DEFAULT_TEXT_TO_VOICE_PROMPTS.forEach(prompt => {
  console.log(prompt.id, prompt.fallbackText);
  // Output:
  // welcome, "Welcome to our amazing product!..."
  // story, "Once upon a time..."
  // ...
});
```

## Custom Templates

Create custom prompt templates:

```tsx
import { AIPromptTemplate } from '@umituz/react-native-ai-generation-content';

const customTemplate: AIPromptTemplate = {
  id: 'my-custom-template',
  name: 'My Custom Template',
  template: 'Create a {style} image of {subject} with {mood} mood',
  variables: ['style', 'subject', 'mood'],
  category: 'custom',
  metadata: {
    author: 'Your Name',
    version: '1.0.0',
  },
};

// Use custom template
const prompt = await generatePrompt({
  templateId: 'my-custom-template',
  variables: {
    style: 'realistic',
    subject: 'a cat',
    mood: 'playful',
  },
});
// Result: "Create a realistic image of a cat with playful mood"
```

## Best Practices

1. **Template Organization**: Group templates by category for easy management
2. **Variable Naming**: Use clear, descriptive variable names
3. **Prompt History**: Track prompt generation for analytics and debugging
4. **Error Handling**: Always handle errors gracefully
5. **Type Safety**: Leverage TypeScript types for type safety

## Related Features

- [Content Moderation](../content-moderation) - Moderate generated content
- [Face Detection](../face-detection) - Detect faces in images
- [Creations](../creations) - Manage AI-generated creations

## License

MIT
