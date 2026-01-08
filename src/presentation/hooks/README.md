# Presentation Hooks

Custom React hooks for AI generation features.

## Overview

The hooks module provides custom React hooks that encapsulate AI generation logic and state management. These hooks make it easy to integrate AI features into your React Native components.

## Core Hooks

### useGeneration

Main hook for generation operations:

```tsx
import { useGeneration } from '@umituz/react-native-ai-generation-content';

function MyComponent() {
  const { generate, state } = useGeneration({
    featureType: 'text-to-image',
    userId: 'user-123',
    onProgress: (progress) => {
      console.log('Progress:', progress);
    },
  });

  const handleGenerate = async () => {
    await generate({
      prompt: 'A beautiful sunset',
    });
  };

  return (
    <View>
      <Button onPress={handleGenerate} title="Generate" />
      {state.isProcessing && <Text>Processing...</Text>}
      {state.result && <Image source={{ uri: state.result.imageUrl }} />}
    </View>
  );
}
```

### useBackgroundGeneration

Background generation hook:

```tsx
import { useBackgroundGeneration } from '@umituz/react-native-ai-generation-content';

function BackgroundGenerator() {
  const { startGeneration, jobs, addJobListener } = useBackgroundGeneration({
    userId: 'user-123',
    onJobComplete: (job) => {
      console.log('Job complete:', job.result);
    },
  });

  const startBackgroundGen = async () => {
    await startGeneration({
      featureType: 'text-to-image',
      inputData: { prompt: 'A sunset' },
    });
  };

  return (
    <View>
      <Button onPress={startBackgroundGen} title="Start Background" />
      {jobs.map(job => (
        <Text key={job.id}>{job.status}: {job.progress}%</Text>
      ))}
    </View>
  );
}
```

### usePendingJobs

Manage pending generation jobs:

```tsx
import { usePendingJobs } from '@umituz/react-native-ai-generation-content';

function JobsList() {
  const { jobs, loading, refresh, deleteJob } = usePendingJobs({
    userId: 'user-123',
  });

  return (
    <FlatList
      data={jobs}
      refreshing={loading}
      onRefresh={refresh}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <JobCard
          job={item}
          onPress={() => viewJob(item.id)}
          onDelete={() => deleteJob(item.id)}
        />
      )}
    />
  );
}
```

### usePhotoGeneration

Photo generation hook:

```tsx
import { usePhotoGeneration } from '@umituz/react-native-ai-generation-content';

function PhotoGenerator() {
  const { generate, state, reset } = usePhotoGeneration({
    featureType: 'text-to-image',
    userId: 'user-123',
    onSuccess: (result) => {
      console.log('Success:', result.imageUrl);
    },
  });

  return (
    <View>
      <PhotoUploadCard
        image={state.image}
        onSelectImage={state.selectImage}
      />
      <Button
        onPress={() => generate({ prompt: 'A sunset' })}
        disabled={!state.canGenerate}
        title="Generate"
      />
    </View>
  );
}
```

### useGenerationFlow

Multi-step generation flow:

```tsx
import { useGenerationFlow } from '@umituz/react-native-ai-generation-content';

function FlowGenerator() {
  const { flow, currentStep, nextStep, prevStep, reset } = useGenerationFlow({
    steps: [
      {
        id: 'photo',
        type: 'photo-upload',
        title: 'Upload Photo',
      },
      {
        id: 'prompt',
        type: 'text-input',
        title: 'Enter Prompt',
      },
      {
        id: 'generate',
        type: 'generation',
        title: 'Generate',
      },
    ],
  });

  return (
    <View>
      <StepIndicator currentStep={currentStep} steps={flow.steps} />
      {currentStep.id === 'photo' && <PhotoUploadStep />}
      {currentStep.id === 'prompt' && <PromptInputStep />}
      {currentStep.id === 'generate' && <GenerationStep />}
      <Button onPress={nextStep} title="Next" />
    </View>
  );
}
```

### useGenerationCallbacksBuilder

Build generation callbacks:

```tsx
import { useGenerationCallbacksBuilder } from '@umituz/react-native-ai-generation-content';

function Generator() {
  const { callbacks, buildCallbacks } = useGenerationCallbacksBuilder({
    featureType: 'text-to-image',
    userId: 'user-123',
  });

  const handleGenerate = async () => {
    const builtCallbacks = await buildCallbacks({
      onBeforeGenerate: async () => {
        console.log('Starting generation...');
      },
      onAfterGenerate: async (result) => {
        console.log('Generation complete:', result);
      },
      onError: async (error) => {
        console.error('Error:', error);
      },
    });

    await generateWithCallbacks(builtCallbacks);
  };
}
```

### useAIFeatureCallbacks

AI feature-specific callbacks:

```tsx
import { useAIFeatureCallbacks } from '@umituz/react-native-ai-generation-content';

function AIGenerator() {
  const { callbacks, setCallbacks } = useAIFeatureCallbacks({
    featureType: 'text-to-image',
    onProgress: (progress) => {
      console.log('Progress:', progress);
    },
  });

  return (
    <View>
      <Button
        onPress={() => callbacks.generate({ prompt: 'A sunset' })}
        title="Generate"
      />
    </View>
  );
}
```

## Utility Hooks

### useAsyncState

Manage async state:

```tsx
import { useAsyncState } from '@umituz/react-native-ai-generation-content';

function DataLoader() {
  const { data, loading, error, execute } = useAsyncState(async () => {
    return await fetchData();
  });

  return (
    <View>
      {loading && <ActivityIndicator />}
      {error && <Text>Error: {error.message}</Text>}
      {data && <Text>{data}</Text>}
      <Button onPress={execute} title="Reload" />
    </View>
  );
}
```

## Hook Parameters

### UseGenerationOptions

```tsx
interface UseGenerationOptions {
  featureType: string;
  userId: string;
  providerId?: string;
  onProgress?: (progress: number) => void;
  onSuccess?: (result: GenerationResult) => void;
  onError?: (error: Error) => void;
}
```

### UseGenerationReturn

```tsx
interface UseGenerationReturn {
  generate: (input: any) => Promise<GenerationResult>;
  state: {
    isProcessing: boolean;
    progress: number;
    result: GenerationResult | null;
    error: Error | null;
  };
  reset: () => void;
}
```

### UseBackgroundGenerationOptions

```tsx
interface UseBackgroundGenerationOptions {
  userId: string;
  onJobComplete?: (job: BackgroundJob) => void;
  onJobError?: (job: BackgroundJob) => void;
}
```

### UsePendingJobsOptions

```tsx
interface UsePendingJobsOptions {
  userId: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}
```

## Advanced Usage

### Custom Hook Composition

```tsx
function useCustomGenerator() {
  const generation = useGeneration({
    featureType: 'text-to-image',
    userId: 'user-123',
  });

  const moderation = useModeration();

  const generateWithModeration = async (prompt: string) => {
    // Check moderation first
    const isSafe = await moderation.checkPrompt(prompt);
    if (!isSafe) {
      throw new Error('Prompt violates content policy');
    }

    // Generate
    return await generation.generate({ prompt });
  };

  return {
    ...generation,
    generate: generateWithModeration,
  };
}
```

### Hook with Persistence

```tsx
import { useAsyncStorage } from '@umituz/react-native-ai-generation-content';

function usePersistedGeneration() {
  const [history, setHistory] = useState([]);

  const { generate, state } = useGeneration({
    featureType: 'text-to-image',
    userId: 'user-123',
    onSuccess: async (result) => {
      // Save to history
      const newHistory = [...history, result];
      setHistory(newHistory);
      await AsyncStorage.setItem('generation_history', JSON.stringify(newHistory));
    },
  });

  return { generate, state, history };
}
```

## Best Practices

1. **Cleanup**: Always cleanup effects
2. **Error Handling**: Handle errors in hooks
3. **Loading States**: Show loading to users
4. **Memoization**: Use useMemo/useCallback for performance
5. **Type Safety**: Use proper TypeScript types

## Related

- [Components](../components/) - UI components
- [Layouts](../layouts/) - Layout components
- [Screens](../screens/) - Screen components

## License

MIT
