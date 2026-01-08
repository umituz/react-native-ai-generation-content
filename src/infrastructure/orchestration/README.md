# Infrastructure Orchestration

AI generation orchestration and coordination.

## Overview

The orchestration module provides the core orchestration layer for AI generation operations. It coordinates between providers, handles job polling, manages background processing, and ensures reliable generation execution.

## Features

- Generation orchestration
- Job polling and status checking
- Background queue management
- Provider abstraction
- Error recovery and retry logic

## Usage

### Generation Orchestrator

```tsx
import { generationOrchestrator } from '@umituz/react-native-ai-generation-content';

// Execute a generation
const result = await generationOrchestrator.execute({
  featureType: 'text-to-image',
  inputData: {
    prompt: 'A beautiful sunset',
    style: 'realistic',
  },
  userId: 'user-123',
});
```

### Execute Image Feature

```tsx
import { executeImageFeature } from '@umituz/react-native-ai-generation-content';

const result = await executeImageFeature({
  featureType: 'text-to-image',
  inputData: {
    prompt: 'A sunset over mountains',
  },
  userId: 'user-123',
});

// Check support
const hasSupport = hasImageFeatureSupport('text-to-image');
```

### Execute Video Feature

```tsx
import { executeVideoFeature } from '@umituz/react-native-ai-generation-content';

const result = await executeVideoFeature({
  featureType: 'text-to-video',
  inputData: {
    prompt: 'A drone flying over a forest',
    duration: 5,
  },
  userId: 'user-123',
});

// Check support
const hasSupport = hasVideoFeatureSupport('text-to-video');
```

### Job Polling

```tsx
import { pollJob, createJobPoller } from '@umituz/react-native-ai-generation-content';

// Single poll
const status = await pollJob({
  jobId: 'job-123',
  provider: 'openai',
});

// Continuous polling
const poller = createJobPoller({
  jobId: 'job-123',
  provider: 'openai',
  onProgress: (progress) => {
    console.log('Progress:', progress);
  },
  onComplete: (result) => {
    console.log('Complete:', result);
  },
  onError: (error) => {
    console.error('Error:', error);
  },
});

// Start polling
await poller.start();

// Stop polling
poller.stop();
```

### Generation Wrapper

```tsx
import { generationWrapper, createGenerationWrapper } from '@umituz/react-native-ai-generation-content';

// Simple wrapper
const result = await generationWrapper.execute({
  featureType: 'text-to-image',
  inputData: { prompt: 'A sunset' },
  userId: 'user-123',
});

// Custom wrapper
const wrapper = createGenerationWrapper({
  onBeforeGenerate: async (input) => {
    console.log('Generating:', input);
  },
  onAfterGenerate: async (result) => {
    console.log('Result:', result);
  },
  onError: async (error) => {
    console.error('Error:', error);
  },
});

const result = await wrapper.execute({
  featureType: 'text-to-image',
  inputData: { prompt: 'A sunset' },
  userId: 'user-123',
});
```

## Configuration

### Orchestrator Config

```tsx
interface OrchestratorConfig {
  defaultProvider?: string;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
}
```

### Polling Options

```tsx
interface PollJobOptions {
  jobId: string;
  provider: string;
  maxAttempts?: number;
  interval?: number;
  timeout?: number;
}

interface PollJobResult {
  status: JobStatus;
  result?: GenerationResult;
  error?: Error;
  attempts: number;
}
```

### Wrapper Config

```tsx
interface WrapperConfig {
  onBeforeGenerate?: (input: any) => Promise<void>;
  onAfterGenerate?: (result: GenerationResult) => Promise<void>;
  onError?: (error: Error) => Promise<void>;
  middleware?: GenerationMiddleware[];
}
```

## Background Processing

### Background Queue

```tsx
import { createBackgroundQueue } from '@umituz/react-native-ai-generation-content';

const queue = createBackgroundQueue({
  concurrency: 3, // Process 3 jobs at a time
  onJobComplete: (jobId, result) => {
    console.log('Job complete:', jobId, result);
  },
  onJobError: (jobId, error) => {
    console.error('Job error:', jobId, error);
  },
});

// Add job to queue
queue.add({
  featureType: 'text-to-image',
  inputData: { prompt: 'A sunset' },
  userId: 'user-123',
});

// Start queue
queue.start();

// Stop queue
queue.stop();
```

### Job Management

```tsx
// Add job
const job = await queue.add({
  featureType: 'text-to-image',
  inputData: { prompt: 'A sunset' },
  userId: 'user-123',
});

// Get job status
const status = await queue.getJobStatus(job.id);

// Cancel job
await queue.cancelJob(job.id);

// Retry job
await queue.retryJob(job.id);
```

## Provider Management

### Provider Registry

```tsx
import { providerRegistry } from '@umituz/react-native-ai-generation-content';

// Register provider
providerRegistry.registerProvider({
  id: 'my-provider',
  name: 'My AI Provider',
  capabilities: {
    textToImage: true,
    textToVideo: false,
  },
  execute: async (request) => {
    // Provider implementation
    return result;
  },
});

// Get provider
const provider = providerRegistry.getProvider('my-provider');

// List providers
const providers = providerRegistry.getAllProviders();

// Get provider for feature
const provider = providerRegistry.getProviderForFeature('text-to-image');
```

### Provider Selection

```tsx
// Execute with specific provider
const result = await generationOrchestrator.execute({
  featureType: 'text-to-image',
  inputData: { prompt: 'A sunset' },
  userId: 'user-123',
  providerId: 'openai', // Use specific provider
});

// Or let orchestrator choose based on capabilities
const result = await generationOrchestrator.execute({
  featureType: 'text-to-image',
  inputData: { prompt: 'A sunset' },
  userId: 'user-123',
  // providerId omitted - orchestrator will choose
});
```

## Error Handling

### Error Classification

```tsx
import {
  classifyError,
  isTransientError,
  isPermanentError,
} from '@umituz/react-native-ai-generation-content';

try {
  await generationOrchestrator.execute({ ... });
} catch (error) {
  const errorType = classifyError(error);

  if (isTransientError(error)) {
    // Retry
    console.log('Transient error, retrying...');
  } else if (isPermanentError(error)) {
    // Don't retry
    console.log('Permanent error, aborting');
  }
}
```

### Retry Logic

```tsx
const result = await generationOrchestrator.execute({
  featureType: 'text-to-image',
  inputData: { prompt: 'A sunset' },
  userId: 'user-123',
  retryAttempts: 3, // Retry up to 3 times
  retryDelay: 1000, // Wait 1 second between retries
});
```

## Progress Tracking

### Progress Callbacks

```tsx
const result = await generationOrchestrator.execute({
  featureType: 'text-to-image',
  inputData: { prompt: 'A sunset' },
  userId: 'user-123',
  onProgress: (progress) => {
    console.log('Progress:', progress);
    // Update UI
  },
});
```

### Progress Stages

```tsx
// Progress includes stage information
onProgress: (progress) => {
  console.log('Stage:', progress.stage); // 'initializing', 'processing', 'completed'
  console.log('Percent:', progress.percent); // 0-100
  console.log('Message:', progress.message); // Human-readable status
}
```

## Best Practices

1. **Error Handling**: Always handle errors appropriately
2. **Retry Logic**: Use retry for transient errors
3. **Progress Tracking**: Show progress to users
4. **Background Jobs**: Use background queue for long-running tasks
5. **Provider Selection**: Choose appropriate provider for each feature

## Related

- [Config](../config/) - Service configuration
- [Middleware](../middleware/) - Request/response middleware
- [Services](../services/) - AI generation services
- [Utils](../utils/) - Utility functions

## License

MIT
