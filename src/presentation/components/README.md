# Presentation Components

Reusable UI components for AI generation features.

## Overview

The components module provides a comprehensive set of pre-built UI components for AI generation features. These components are designed to be flexible, customizable, and easy to integrate.

## Features

- Progress modals and indicators
- Image/video pickers
- Result displays
- Form inputs
- Style selectors
- And more...

## Core Components

### GenerationProgressModal

Modal showing generation progress:

```tsx
import { GenerationProgressModal } from '@umituz/react-native-ai-generation-content';

<GenerationProgressModal
  visible={isGenerating}
  progress={progress}
  status="Processing your request..."
  onCancel={() => cancelGeneration()}
/>
```

### GenerationProgressContent

Progress content component:

```tsx
import { GenerationProgressContent } from '@umituz/react-native-ai-generation-content';

<GenerationProgressContent
  progress={75}
  status="Generating image..."
  stages={[
    { label: 'Initializing', completed: true },
    { label: 'Processing', completed: false },
    { label: 'Finalizing', completed: false },
  ]}
/>
```

### GenerationProgressBar

Progress bar component:

```tsx
import { GenerationProgressBar } from '@umituz/react-native-ai-generation-content';

<GenerationProgressBar
  progress={progress}
  height={8}
  color="#4CAF50"
/>
```

### PendingJobCard

Card showing pending job:

```tsx
import { PendingJobCard } from '@umituz/react-native-ai-generation-content';

<PendingJobCard
  job={{
    id: 'job-123',
    featureType: 'text-to-image',
    status: 'processing',
    progress: 45,
    createdAt: new Date(),
  }}
  onPress={() => viewJob('job-123')}
/>
```

### GenerationResultContent

Display generation result:

```tsx
import { GenerationResultContent } from '@umituz/react-native-ai-generation-content';

<GenerationResultContent
  result={{
    imageUrl: 'https://...',
    prompt: 'A sunset',
    metadata: {},
  }}
  onSave={() => saveResult()}
  onShare={() => shareResult()}
/>
```

### ResultImageCard

Card displaying image result:

```tsx
import { ResultImageCard } from '@umituz/react-native-ai-generation-content';

<ResultImageCard
  imageUrl="https://..."
  onSave={() => saveToGallery()}
  onShare={() => shareImage()}
  onDelete={() => deleteImage()}
/>
```

### ResultStoryCard

Card for story/image results:

```tsx
import { ResultStoryCard } from '@umituz/react-native-ai-generation-content';

<ResultStoryCard
  imageUrl="https://..."
  prompt="A sunset"
  onSave={() => save()}
  onShare={() => share()}
/>
```

## Input Components

### DualImagePicker

Picker for two images:

```tsx
import { DualImagePicker } from '@umituz/react-native-ai-generation-content';

<DualImagePicker
  sourceImage={sourceImage}
  targetImage={targetImage}
  onSelectSourceImage={handleSelectSource}
  onSelectTargetImage={handleSelectTarget}
  sourceLabel="First Image"
  targetLabel="Second Image"
/>
```

### PromptInput

Text input for prompts:

```tsx
import { PromptInput } from '@umituz/react-native-ai-generation-content';

<PromptInput
  prompt={prompt}
  onChangePrompt={setPrompt}
  placeholder="Describe what you want to create..."
  maxLength={1000}
  showCharacterCount
/>
```

### PhotoUploadCard

Card for photo upload:

```tsx
import { PhotoUploadCard } from '@umituz/react-native-ai-generation-content';

<PhotoUploadCard
  image={image}
  onSelectImage={handleSelectImage}
  title="Upload Photo"
  maxSize={5 * 1024 * 1024} // 5MB
  allowedTypes={['image/jpeg', 'image/png']}
/>
```

### AIGenerationHero

Hero section for AI generation:

```tsx
import { AIGenerationHero } from '@umituz/react-native-ai-generation-content';

<AIGenerationHero
  title="AI Image Generator"
  description="Create stunning images from text"
  illustration={require('./assets/hero.png')}
/>
```

### ExamplePrompts

Example prompts selector:

```tsx
import { ExamplePrompts } from '@umituz/react-native-ai-generation-content';

<ExamplePrompts
  prompts={[
    'A beautiful sunset',
    'A futuristic city',
    'A serene forest',
  ]}
  onSelectPrompt={(prompt) => setPrompt(prompt)}
/>
```

### GenerateButton

Styled generate button:

```tsx
import { GenerateButton } from '@umituz/react-native-ai-generation-content';

<GenerateButton
  onPress={handleGenerate}
  disabled={!canGenerate}
  loading={isGenerating}
  text="Generate Image"
/>
```

## Selection Components

### StyleSelector

Style selection component:

```tsx
import { StyleSelector } from '@umituz/react-native-ai-generation-content';

<StyleSelector
  styles={[
    { id: 'realistic', name: 'Realistic', preview: '...' },
    { id: 'artistic', name: 'Artistic', preview: '...' },
  ]}
  selectedStyle={selectedStyle}
  onSelectStyle={setSelectedStyle}
/>
```

### AspectRatioSelector

Aspect ratio selector:

```tsx
import { AspectRatioSelector } from '@umituz/react-native-ai-generation-content';

<AspectRatioSelector
  selectedAspectRatio={aspectRatio}
  onSelectAspectRatio={setAspectRatio}
  availableRatios={['1:1', '16:9', '9:16']}
/>
```

### DurationSelector

Duration selector:

```tsx
import { DurationSelector } from '@umituz/react-native-ai-generation-content';

<DurationSelector
  selectedDuration={duration}
  onSelectDuration={setDuration}
  durations={[4, 5, 6, 7, 8]}
  unit="seconds"
/>
```

### GridSelector

Generic grid selector:

```tsx
import { GridSelector } from '@umituz/react-native-ai-generation-content';

<GridSelector
  options={[
    { id: 'option1', name: 'Option 1', description: 'Description' },
    { id: 'option2', name: 'Option 2', description: 'Description' },
  ]}
  selectedOption={selectedOption}
  onSelectOption={setSelectedOption}
/>
```

### StylePresetsGrid

Grid of style presets:

```tsx
import { StylePresetsGrid } from '@umituz/react-native-ai-generation-content';

<StylePresetsGrid
  styles={stylePresets}
  selectedStyle={selectedStyle}
  onSelectStyle={setSelectedStyle}
  columns={3}
/>
```

## Display Components

### ResultDisplay

Display generation result:

```tsx
import { ResultDisplay } from '@umituz/react-native-ai-generation-content';

<ResultDisplay
  result={{
    success: true,
    imageUrl: 'https://...',
    metadata: {},
  }}
  originalImage={originalImage}
  onSave={() => save()}
  onShare={() => share()}
/>
```

### AIGenerationResult

Complete result display:

```tsx
import { AIGenerationResult } from '@umituz/react-native-ai-generation-content';

<AIGenerationResult
  result={result}
  onSave={() => saveResult()}
  onShare={() => shareResult()}
  onRegenerate={() => regenerate()}
/>
```

### ErrorDisplay

Error display component:

```tsx
import { ErrorDisplay } from '@umituz/react-native-ai-generation-content';

<ErrorDisplay
  error="Generation failed. Please try again."
  onRetry={() => retry()}
  onDismiss={() => dismiss()}
/>
```

## Header Components

### FeatureHeader

Feature screen header:

```tsx
import { FeatureHeader } from '@umituz/react-native-ai-generation-content';

<FeatureHeader
  title="Text to Image"
  description="Generate images from text descriptions"
  icon={require('./assets/icon.png')}
/>
```

### AIGenScreenHeader

AI generation screen header:

```tsx
import { AIGenScreenHeader } from '@umituz/react-native-ai-generation-content';

<AIGenScreenHeader
  title="AI Image Generator"
  showBackButton
  onBackPress={() => navigation.goBack()}
/>
```

### CreditBadge

Credit badge display:

```tsx
import { CreditBadge } from '@umituz/react-native-ai-generation-content';

<CreditBadge
  credits={userCredits}
  cost={generationCost}
/>
```

## Form Components

### AIGenerationForm

Complete AI generation form:

```tsx
import { AIGenerationForm } from '@umituz/react-native-ai-generation-content';

<AIGenerationForm
  fields={[
    {
      type: 'prompt',
      key: 'prompt',
      label: 'Prompt',
      required: true,
    },
    {
      type: 'style-selector',
      key: 'style',
      label: 'Style',
      options: styleOptions,
    },
    {
      type: 'aspect-ratio',
      key: 'aspectRatio',
      label: 'Aspect Ratio',
    },
  ]}
  values={formValues}
  onChange={setFormValues}
  onSubmit={handleSubmit}
  submitLabel="Generate"
/>
```

### SettingsSheet

Settings bottom sheet:

```tsx
import { SettingsSheet } from '@umituz/react-native-ai-generation-content';

<SettingsSheet
  visible={showSettings}
  onClose={() => setShowSettings(false)}
  settings={[
    {
      key: 'quality',
      label: 'Quality',
      type: 'select',
      options: ['low', 'medium', 'high'],
    },
    {
      key: 'notifications',
      label: 'Notifications',
      type: 'toggle',
    },
  ]}
  values={settings}
  onChange={updateSettings}
/>
```

## Utility Components

### ModerationSummary

Content moderation summary:

```tsx
import { ModerationSummary } from '@umituz/react-native-ai-generation-content';

<ModerationSummary
  violations={[
    { category: 'violence', severity: 'high' },
  ]}
  onDismiss={() => acknowledgeWarning()}
/>
```

### PhotoStep

Photo upload step:

```tsx
import { PhotoStep } from '@umituz/react-native-ai-generation-content';

<PhotoStep
  image={image}
  onSelectImage={selectImage}
  title="Upload Photo"
  description="Choose a photo to process"
/>
```

## Customization

All components support customization through props:

```tsx
<GenerationProgressModal
  visible={visible}
  progress={progress}
  // Custom styling
  backgroundColor="#FFFFFF"
  progressColor="#4CAF50"
  textColor="#000000"
  // Custom behavior
  onCancel={handleCancel}
  showCancel={true}
  cancelText="Cancel Generation"
/>
```

## Best Practices

1. **Composition**: Combine components for complex UIs
2. **Styling**: Use StyleSheet for consistent styling
3. **Accessibility**: Add accessibility labels
4. **Performance**: Use memo for expensive components
5. **Testing**: Test components in isolation

## Related

- [Hooks](../hooks/) - Custom React hooks
- [Layouts](../layouts/) - Layout components
- [Screens](../screens/) - Screen components

## License

MIT
