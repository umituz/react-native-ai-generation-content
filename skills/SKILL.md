---
name: setup-react-native-ai-generation-content
description: Sets up AI generation content orchestration for React Native apps with wizard flows, background tasks, and UI components. Triggers on: Setup AI generation, AI content orchestration, wizard flow, AI pipeline, creation screens, background generation, useGenerationOrchestrator, GenericWizardFlow, CreationsGalleryScreen.
---

# Setup React Native AI - Generation Content

Comprehensive setup for `@umituz/react-native-ai-generation-content` - Core AI generation orchestration system.

## Overview

This skill handles the core AI generation infrastructure:
- Wizard flow system for multi-step AI generation
- Background task management
- Creation gallery and history
- Video and image generation orchestration
- Provider abstraction layer
- UI components for AI features

## Quick Start

Just say: **"Setup AI generation content system in my app"** and this skill will handle everything.

**Features Included:**
- Multi-step wizard flows
- Background generation tasks
- Creation gallery with history
- Video/image orchestration
- Cost tracking integration
- Provider abstraction

## When to Use

Invoke this skill when you need to:
- Install AI generation core system
- Set up wizard flows for AI features
- Add creation gallery/screens
- Configure background generation
- Orchestrate multiple AI providers
- Add AI content management

## Step 1: Analyze the Project

### Check package.json

```bash
cat package.json | grep "@umituz/react-native-ai-generation-content"
npm list @umituz/react-native-ai-generation-content
```

### Detect Project Type

```bash
cat app.json | grep -q "expo" && echo "Expo" || echo "Bare RN"
```

## Step 2: Install Package

### Install Core Package

```bash
npm install @umituz/react-native-ai-generation-content@latest
```

### Install Required Dependencies

This package requires several umituz packages:

```bash
# Core dependencies
npm install @umituz/react-native-design-system
npm install @umituz/react-native-firebase
npm install @umituz/react-native-subscription
npm install @umituz/react-native-video-editor

# Expo dependencies
npx expo install expo-video expo-document-picker

# State management
npm install @tanstack/react-query firebase
```

## Step 3: Configure Provider

### Set Up ConfigProvider

In your app entry point:

```typescript
import { ConfigProvider } from '@umituz/react-native-ai-generation-content';

export default function RootLayout() {
  const config = {
    // Enable background processing
    enableBackgroundTasks: true,
    // Max concurrent generations
    maxConcurrentGenerations: 2,
    // Enable creation history
    enableCreationHistory: true,
  };

  return (
    <ConfigProvider config={config}>
      <Stack>{/* your screens */}</Stack>
    </ConfigProvider>
  );
}
```

### Check If Already Configured

```bash
grep -r "ConfigProvider" app/ App.tsx 2>/dev/null
```

## Step 4: Set Up Creation Gallery

### Add Gallery Screen

```typescript
import { CreationsGalleryScreen } from '@umituz/react-native-ai-generation-content';
import { useRouter } from 'expo-router';

export default function GalleryScreen() {
  const router = useRouter();

  const handleCreationPress = (creation: Creation) => {
    // Navigate to detail view
    router.push(`/creations/${creation.id}`);
  };

  const handleNewCreation = () => {
    router.push('/create');
  };

  return (
    <CreationsGalleryScreen
      onCreationPress={handleCreationPress}
      onNewCreation={handleNewCreation}
      enableFilters={true}
      enableSearch={true}
    />
  );
}
```

### Configure Gallery Options

```typescript
import { useCreations } from '@umituz/react-native-ai-generation-content';

export function GalleryScreen() {
  const {
    creations,
    isLoading,
    refresh,
    deleteCreation,
    filterByType,
    sortByDate,
  } = useCreations({
    enablePagination: true,
    pageSize: 20,
  });

  // Filter by type (image, video, etc.)
  const imagesOnly = filterByType('image');

  return (
    <View>
      {/* Your UI */}
    </View>
  );
}
```

## Step 5: Implement Wizard Flow

### Generic Wizard Flow

```typescript
import { GenericWizardFlow } from '@umituz/react-native-ai-generation-content';

export function CreateContentWizard() {
  const steps = [
    {
      id: 'prompt',
      title: 'Describe Your Vision',
      component: PromptStep,
    },
    {
      id: 'style',
      title: 'Choose Style',
      component: StyleSelectionStep,
    },
    {
      id: 'settings',
      title: 'Adjust Settings',
      component: GenerationSettingsStep,
    },
    {
      id: 'preview',
      title: 'Preview & Generate',
      component: PreviewStep,
    },
  ];

  const handleComplete = async (data: WizardData) => {
    // Start generation
    await startGeneration(data);
  };

  return (
    <GenericWizardFlow
      steps={steps}
      onComplete={handleComplete}
      enableBack={true}
      showProgress={true}
    />
  );
}
```

### Custom Wizard Step

```typescript
import { useWizardStep } from '@umituz/react-native-ai-generation-content';

export function PromptStep() {
  const { data, onNext, canProceed } = useWizardStep();

  const [prompt, setPrompt] = useState('');

  const handleNext = () => {
    onNext({ prompt });
  };

  useEffect(() => {
    canProceed(!!prompt);
  }, [prompt]);

  return (
    <View>
      <Text>Describe what you want to create</Text>
      <TextInput
        value={prompt}
        onChangeText={setPrompt}
        placeholder="A beautiful sunset over mountains..."
        multiline
        numberOfLines={4}
      />
      <Button title="Next" onPress={handleNext} disabled={!prompt} />
    </View>
  );
}
```

## Step 6: Set Up Background Generation

### Use Generation Orchestrator

```typescript
import { useGenerationOrchestrator } from '@umituz/react-native-ai-generation-content';

export function GenerationScreen() {
  const {
    startGeneration,
    generations,
    activeGenerations,
    cancelGeneration,
    retryGeneration,
  } = useGenerationOrchestrator({
    onGenerationComplete: (result) => {
      console.log('Generation complete:', result);
    },
    onGenerationError: (error) => {
      console.error('Generation failed:', error);
    },
  });

  const handleStart = async () => {
    await startGeneration({
      type: 'text-to-image',
      provider: 'fal',
      model: 'flux-pro',
      params: {
        prompt: 'A beautiful landscape',
      },
    });
  };

  return (
    <View>
      <FlatList
        data={activeGenerations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GenerationCard
            generation={item}
            onCancel={cancelGeneration}
            onRetry={retryGeneration}
          />
        )}
      />

      <Button title="Start Generation" onPress={handleStart} />
    </View>
  );
}
```

### Background Task Configuration

```typescript
// Configure background processing
const config = {
  backgroundTasks: {
    enabled: true,
    maxConcurrent: 2,
    timeoutMs: 300000, // 5 minutes
    retryAttempts: 3,
    retryDelayMs: 1000,
  },
};
```

## Step 7: Add Video Processing

### Video Generation Flow

```typescript
import { TextToVideoWizardFlow } from '@umituz/react-native-ai-generation-content';

export function CreateVideoWizard() {
  const handleComplete = async (data: VideoWizardData) => {
    // data contains: prompt, duration, style, aspectRatio
    await generateVideo(data);
  };

  return (
    <TextToVideoWizardFlow
      onComplete={handleComplete}
      enablePreview={true}
      defaultDuration={4}
    />
  );
}
```

### Video Editor Integration

```typescript
import { VideoEditor } from '@umituz/react-native-ai-generation-content';

export function EditVideoScreen({ route }) {
  const { videoUri } = route.params;

  const handleSave = async (editedUri: string) => {
    // Save edited video
    await saveToGallery(editedUri);
  };

  return (
    <VideoEditor
      videoUri={videoUri}
      onSave={handleSave}
      enableTrimming={true}
      enableFilters={true}
      enableTextOverlay={true}
    />
  );
}
```

## Step 8: Configure Cost Tracking

### Enable Cost Tracking

```typescript
import { useGenerationCosts } from '@umituz/react-native-ai-generation-content';

export function CostDashboard() {
  const {
    totalCost,
    costByProvider,
    costByType,
    resetTracking,
  } = useGenerationCosts({
    enableTracking: true,
    trackByProvider: true,
    trackByType: true,
  });

  return (
    <View>
      <Text>Total Cost: ${totalCost.toFixed(2)}</Text>

      <FlatList
        data={costByProvider}
        renderItem={({ item }) => (
          <Text>{item.provider}: ${item.cost.toFixed(2)}</Text>
        )}
      />
    </View>
  );
}
```

## Step 9: Native Setup (Bare React Native)

### iOS Setup

```bash
cd ios && pod install && cd ..
```

### Android Setup

No additional setup needed.

## Step 10: Verify Setup

### Run the App

```bash
npx expo start
# or
npx react-native run-ios
```

### Verification Checklist

- ✅ Package installed
- ✅ All dependencies installed
- ✅ ConfigProvider wraps app
- ✅ Creation gallery displays
- ✅ Wizard flow works
- ✅ Background generation works
- ✅ Video processing works
- ✅ Cost tracking active

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Missing peer dependencies | Install all required umituz packages |
| ConfigProvider not wrapping app | Must wrap entire navigation |
| Background tasks not working | Check enableBackgroundTasks in config |
| Video processing fails | Install expo-video and expo-document-picker |
| Gallery not showing creations | Check Firebase/Storage setup |
| Wizard not progressing | Validate step data before calling onNext |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **"ConfigProvider not found"** | Ensure package is installed correctly |
| **"Background task failed"** | Check background task permissions in app.json |
| **"Video processing error"** | Verify expo-video is installed and configured |
| **"Gallery empty"** | Check Firebase storage and Firestore setup |
| **"Wizard stuck on step"** | Ensure canProceed is called with correct value |
| **"Generation timeout"** | Increase timeoutMs in config |

## Summary

After setup, provide:

1. ✅ Package version installed
2. ✅ Dependencies added
3. ✅ ConfigProvider location
4. ✅ Wizard flows configured
5. ✅ Gallery screen added
6. ✅ Background generation working
7. ✅ Verification status

---

**Compatible with:** @umituz/react-native-ai-generation-content@latest
**Platforms:** React Native (Expo & Bare)
**Dependencies:** Requires design-system, firebase, subscription, video-editor
