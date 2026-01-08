# Infrastructure Utils

Utility functions for AI generation operations.

## Overview

The utils module provides helper functions for common operations such as error classification, image preparation, polling, validation, and more.

## Features

- Error classification and handling
- Image preparation and optimization
- Job polling utilities
- Progress tracking
- Validation functions
- Helper functions for common tasks

## Error Handling

### classifyError

Classify errors into types:

```tsx
import { classifyError, AIErrorType } from '@umituz/react-native-ai-generation-content';

try {
  await generateImage({ prompt: 'A sunset' });
} catch (error) {
  const errorType = classifyError(error);

  switch (errorType) {
    case AIErrorType.INSUFFICIENT_CREDITS:
      // Handle insufficient credits
      showPaywall();
      break;
    case AIErrorType.PROVIDER_ERROR:
      // Handle provider error
      showErrorMessage('Provider error occurred');
      break;
    case AIErrorType.NETWORK_ERROR:
      // Handle network error
      showRetryOption();
      break;
    default:
      // Handle unknown error
      showGenericError();
  }
}
```

### isTransientError

Check if error is transient (retry-able):

```tsx
import { isTransientError } from '@umituz/react-native-ai-generation-content';

if (isTransientError(error)) {
  // Safe to retry
  retry();
} else {
  // Don't retry
  showError();
}
```

### isPermanentError

Check if error is permanent:

```tsx
import { isPermanentError } from '@umituz/react-native-ai-generation-content';

if (isPermanentError(error)) {
  // Don't retry
  showError();
}
```

### handleGenerationError

Handle generation errors with default behavior:

```tsx
import { handleGenerationError } from '@umituz/react-native-ai-generation-content';

try {
  await generateImage({ prompt: 'A sunset' });
} catch (error) {
  await handleGenerationError(error, {
    onInsufficientCredits: () => showPaywall(),
    onNetworkError: () => showRetryDialog(),
    onProviderError: () => showSupportContact(),
  });
}
```

## Polling Utilities

### pollJob

Poll a job for completion:

```tsx
import { pollJob } from '@umituz/react-native-ai-generation-content';

const result = await pollJob({
  jobId: 'job-123',
  provider: 'openai',
  maxAttempts: 30,
  interval: 2000,
});

if (result.status === JobStatus.COMPLETED) {
  console.log('Result:', result.result);
} else if (result.status === JobStatus.FAILED) {
  console.error('Error:', result.error);
}
```

### createJobPoller

Create a persistent job poller:

```tsx
import { createJobPoller } from '@umituz/react-native-ai-generation-content';

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
poller.start();

// Stop polling
poller.stop();
```

### calculatePollingInterval

Calculate optimal polling interval:

```tsx
import { calculatePollingInterval } from '@umituz/react-native-ai-generation-content';

const interval = calculatePollingInterval({
  baseInterval: 2000,
  attemptNumber: 3,
  maxInterval: 10000,
});

console.log('Interval:', interval); // 2000, 4000, 6000, ...
```

## Progress Tracking

### createProgressTracker

Create a progress tracker:

```tsx
import { createProgressTracker } from '@umituz/react-native-ai-generation-content';

const tracker = createProgressTracker({
  stages: [
    { name: 'initializing', weight: 10 },
    { name: 'processing', weight: 70 },
    { name: 'finalizing', weight: 20 },
  ],
  onProgress: (progress) => {
    console.log('Progress:', progress.percent, progress.stage);
  },
});

// Update stage
tracker.setStage('processing');

// Update progress within stage
tracker.setProgress(50); // 50% of current stage
```

### getProgressForStatus

Get progress for job status:

```tsx
import { getProgressForStatus } from '@umituz/react-native-ai-generation-content';

const progress = getProgressForStatus(JobStatus.PROCESSING);
console.log('Progress:', progress); // 0-100
```

## Image Preparation

### preparePhoto

Prepare and optimize photo for upload:

```tsx
import { preparePhoto } from '@umituz/react-native-ai-generation-content';

const prepared = await preparePhoto({
  imageBase64: rawImage,
  maxSize: 1048576, // 1MB
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 0.9,
});

console.log('Prepared image:', prepared.imageBase64);
console.log('Original size:', prepared.originalSize);
console.log('Compressed size:', prepared.compressedSize);
```

### preparePhotos

Prepare multiple photos:

```tsx
import { preparePhotos } from '@umituz/react-native-ai-generation-content';

const prepared = await preparePhotos({
  images: [image1, image2, image3],
  maxSize: 1048576,
  maxWidth: 1920,
  maxHeight: 1080,
});

console.log('Prepared images:', prepared.images);
```

### cleanBase64

Clean base64 string:

```tsx
import { cleanBase64 } from '@umituz/react-native-ai-generation-content';

const clean = cleanBase64('data:image/jpeg;base64,/9j/4AAQ...');
console.log('Clean base64:', clean);
```

### addBase64Prefix

Add base64 prefix:

```tsx
import { addBase64Prefix } from '@umituz/react-native-ai-generation-content';

const withPrefix = addBase64Prefix('/9j/4AAQ...', 'image/jpeg');
console.log('With prefix:', withPrefix);
// "data:image/jpeg;base64,/9j/4AAQ..."
```

## Validation

### isValidBase64

Validate base64 string:

```tsx
import { isValidBase64 } from '@umituz/react-native-ai-generation-content';

if (isValidBase64(imageString)) {
  // Valid base64
} else {
  // Invalid base64
  showError('Invalid image format');
}
```

### validateResult

Validate generation result:

```tsx
import { validateResult } from '@umituz/react-native-ai-generation-content';

const isValid = await validateResult({
  result: generationResult,
  featureType: 'text-to-image',
  checkUrl: true,
});

if (!isValid) {
  showError('Invalid generation result');
}
```

### checkStatusForErrors

Check job status for errors:

```tsx
import { checkStatusForErrors } from '@umituz/react-native-ai-generation-content';

const hasError = checkStatusForErrors(jobStatus);

if (hasError) {
  // Handle error
}
```

## Result Extraction

### extractOutputUrl

Extract output URL from response:

```tsx
import { extractOutputUrl } from '@umituz/react-native-ai-generation-content';

const url = extractOutputUrl(providerResponse);
console.log('Output URL:', url);
```

### extractOutputUrls

Extract multiple output URLs:

```tsx
import { extractOutputUrls } from '@umituz/react-native-ai-generation-content';

const urls = extractOutputUrls(providerResponse);
console.log('Output URLs:', urls);
```

### extractVideoUrl

Extract video URL:

```tsx
import { extractVideoUrl } from '@umituz/react-native-ai-generation-content';

const videoUrl = extractVideoUrl(providerResponse);
console.log('Video URL:', videoUrl);
```

### extractThumbnailUrl

Extract thumbnail URL:

```tsx
import { extractThumbnailUrl } from '@umituz/react-native-ai-generation-content';

const thumbnailUrl = extractThumbnailUrl(providerResponse);
console.log('Thumbnail URL:', thumbnailUrl);
```

### extractAudioUrl

Extract audio URL:

```tsx
import { extractAudioUrl } from '@umituz/react-native-ai-generation-content';

const audioUrl = extractAudioUrl(providerResponse);
console.log('Audio URL:', audioUrl);
```

### extractImageUrls

Extract image URLs:

```tsx
import { extractImageUrls } from '@umituz/react-native-ai-generation-content';

const imageUrls = extractImageUrls(providerResponse);
console.log('Image URLs:', imageUrls);
```

## Base64 Utilities

### getBase64Size

Get base64 size in bytes:

```tsx
import { getBase64Size } from '@umituz/react-native-ai-generation-content';

const size = getBase64Size(base64String);
console.log('Size:', size, 'bytes');
```

### getBase64SizeMB

Get base64 size in MB:

```tsx
import { getBase64SizeMB } from '@umituz/react-native-ai-generation-content';

const sizeMB = getBase64SizeMB(base64String);
console.log('Size:', sizeMB, 'MB');
```

## UI Helpers

### createDevCallbacks

Create development callbacks:

```tsx
import { createDevCallbacks } from '@umituz/react-native-ai-generation-content';

if (__DEV__) {
  const callbacks = createDevCallbacks();
  // Logs all generation events in development
}
```

### createFeatureUtils

Create feature utilities:

```tsx
import { createFeatureUtils } from '@umituz/react-native-ai-generation-content';

const utils = createFeatureUtils({
  showVideoGenerationSuccess: true,
});

await utils.showVideoGenerationSuccess(videoUrl);
```

### showVideoGenerationSuccess

Show video generation success alert:

```tsx
import { showVideoGenerationSuccess } from '@umituz/react-native-ai-generation-content';

await showVideoGenerationSuccess({
  videoUrl: 'https://...',
  onSave: async () => {
    await saveToGallery(videoUrl);
  },
});
```

### showContentModerationWarning

Show content moderation warning:

```tsx
import { showContentModerationWarning } from '@umituz/react-native-ai-generation-content';

await showContentModerationWarning({
  violations: ['violence', 'adult-content'],
  onConfirm: () => {
    // User acknowledged and wants to proceed
  },
  onCancel: () => {
    // User cancelled
  },
});
```

## Job Status Helpers

### isJobComplete

Check if job is complete:

```tsx
import { isJobComplete } from '@umituz/react-native-ai-generation-content';

if (isJobComplete(jobStatus)) {
  // Job is complete
}
```

### isJobProcessing

Check if job is processing:

```tsx
import { isJobProcessing } from '@umituz/react-native-ai-generation-content';

if (isJobProcessing(jobStatus)) {
  // Job is still processing
}
```

### isJobFailed

Check if job failed:

```tsx
import { isJobFailed } from '@umituz/react-native-ai-generation-content';

if (isJobFailed(jobStatus)) {
  // Job failed
}
```

## Best Practices

1. **Error Handling**: Always classify and handle errors appropriately
2. **Image Preparation**: Always prepare images before upload
3. **Validation**: Validate inputs and results
4. **Progress Tracking**: Show progress to users for long operations
5. **Base64 Cleaning**: Clean base64 strings before processing

## Related

- [Config](../config/) - Service configuration
- [Services](../services/) - AI generation services
- [Orchestration](../orchestration/) - Generation orchestration

## License

MIT
