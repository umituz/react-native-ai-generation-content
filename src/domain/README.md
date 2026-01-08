# Domain Layer

Core business logic and type definitions.

## Overview

The domain layer contains the core business logic, types, and interfaces that define the AI generation system. It is independent of any external dependencies and provides the foundation for the entire library.

## Features

- Core type definitions
- Domain entities
- Business rules
- Repository interfaces
- Service interfaces

## Core Types

### Generation Types

```tsx
// Generation status
enum GenerationStatus {
  IDLE = 'idle',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

// Generation result
interface GenerationResult {
  success: boolean;
  output?: {
    imageUrl?: string;
    imageUrls?: string[];
    videoUrl?: string;
    audioUrl?: string;
    thumbnailUrl?: string;
  };
  metadata?: GenerationMetadata;
  error?: string;
}

// Generation request
interface GenerationRequest {
  featureType: string;
  inputData: any;
  userId: string;
  providerId?: string;
  options?: Record<string, any>;
}

// Generation metadata
interface GenerationMetadata {
  prompt?: string;
  model?: string;
  timestamp: string;
  duration?: number;
  [key: string]: any;
}
```

### Job Types

```tsx
// Job status
enum JobStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

// Job submission
interface JobSubmission {
  jobId: string;
  status: JobStatus;
  result?: any;
  error?: Error;
}

// Background job
interface BackgroundJob {
  id: string;
  featureType: string;
  inputData: any;
  userId: string;
  status: JobStatus;
  progress: number;
  createdAt: string;
  updatedAt: string;
  result?: any;
  error?: Error;
}
```

### Error Types

```tsx
// Error types
enum AIErrorType {
  INSUFFICIENT_CREDITS = 'INSUFFICIENT_CREDITS',
  PROVIDER_ERROR = 'PROVIDER_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

// Error info
interface AIErrorInfo {
  type: AIErrorType;
  message: string;
  details?: any;
  timestamp: string;
}

// Error messages
interface AIErrorMessages {
  [key: string]: string;
}
```

### Processing Modes

```tsx
// Processing modes
type ImageProcessingMode =
  | 'free'
  | 'premium'
  | 'prompt-required';

// Mode config
interface ModeConfig {
  id: string;
  name: string;
  description: string;
  mode: ImageProcessingMode;
  creditCost: number;
  promptRequired?: boolean;
}

// Mode catalog
interface ModeCatalog {
  modes: ModeConfig[];
  getMode(modeId: string): ModeConfig | undefined;
  getFreeModes(): ModeConfig[];
  getPremiumModes(): ModeConfig[];
  getPromptRequiredModes(): ModeConfig[];
}
```

## Interfaces

### IAIProvider

AI provider interface:

```tsx
interface IAIProvider {
  id: string;
  name: string;
  capabilities: ProviderCapabilities;
  execute(request: GenerationRequest): Promise<GenerationResult>;
  pollJob?(jobId: string): Promise<JobSubmission>;
}

interface ProviderCapabilities {
  textToImage?: boolean;
  textToVideo?: boolean;
  textToVoice?: boolean;
  imageToImage?: boolean;
  faceSwap?: boolean;
  // ... more capabilities
}
```

### IAppServices

App services interface:

```tsx
interface IAppServices {
  networkService?: INetworkService;
  creditService?: ICreditService;
  paywallService?: IPaywallService;
  authService?: IAuthService;
  analyticsService?: IAnalyticsService;
}

interface INetworkService {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
}

interface ICreditService {
  checkCredits(userId: string, cost: number): Promise<boolean>;
  deductCredits(userId: string, cost: number): Promise<void>;
}

interface IPaywallService {
  showPaywall(): Promise<boolean>;
}

interface IAuthService {
  getCurrentUser(): Promise<User | null>;
  getToken(): Promise<string | null>;
}

interface IAnalyticsService {
  trackEvent(event: string, properties?: any): Promise<void>;
}
```

### IFeatureUtils

Feature utilities interface:

```tsx
interface IFeatureUtils {
  showVideoGenerationSuccess?(options: VideoAlertFunction): Promise<void>;
  showContentModerationWarning?(options: AlertFunction): Promise<void>;
}
```

## Entities

### GenerationCapability

```tsx
interface GenerationCapability {
  featureType: string;
  supported: boolean;
  provider?: string;
  creditCost: number;
  processingTime?: number;
}
```

### GenerationProgress

```tsx
interface GenerationProgress {
  percent: number;
  stage: string;
  message: string;
  timestamp: string;
}
```

### PollingConfig

```tsx
interface PollingConfig {
  maxAttempts: number;
  interval: number;
  timeout: number;
  backoffMultiplier: number;
}
```

### MiddlewareContext

```tsx
interface MiddlewareContext {
  featureType: string;
  inputData: any;
  userId?: string;
  options?: Record<string, any>;
}

interface MiddlewareResultContext extends MiddlewareContext {
  result: GenerationResult;
  duration: number;
}

interface MiddlewareErrorContext extends MiddlewareContext {
  error: Error;
  errorType: AIErrorType;
}
```

## Constants

### Default Configurations

```tsx
// Default polling config
const DEFAULT_POLLING_CONFIG: PollingConfig = {
  maxAttempts: 30,
  interval: 2000,
  timeout: 60000,
  backoffMultiplier: 1.5,
};

// Default progress stages
const DEFAULT_PROGRESS_STAGES = {
  textToImage: [
    { stage: 'initializing', weight: 10 },
    { stage: 'processing', weight: 70 },
    { stage: 'finalizing', weight: 20 },
  ],
  // ... more features
};

// Default queue config
const DEFAULT_QUEUE_CONFIG = {
  concurrency: 3,
  maxQueueSize: 100,
  retryAttempts: 3,
};
```

### Processing Modes

```tsx
// Default processing modes
const DEFAULT_PROCESSING_MODES: ModeConfig[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Free generation',
    mode: 'free',
    creditCost: 0,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Premium quality',
    mode: 'premium',
    creditCost: 1,
  },
  // ... more modes
];
```

## Utility Functions

### getModeConfig

Get mode configuration:

```tsx
import { getModeConfig } from '@umituz/react-native-ai-generation-content';

const config = getModeConfig('premium');
console.log('Premium mode costs:', config.creditCost, 'credits');
```

### getFreeModes

Get all free modes:

```tsx
import { getFreeModes } from '@umituz/react-native-ai-generation-content';

const freeModes = getFreeModes();
console.log('Free modes:', freeModes);
```

### getPremiumModes

Get all premium modes:

```tsx
import { getPremiumModes } from '@umituz/react-native-ai-generation-content';

const premiumModes = getPremiumModes();
console.log('Premium modes:', premiumModes);
```

### getPromptRequiredModes

Get modes requiring prompts:

```tsx
import { getPromptRequiredModes } from '@umituz/react-native-ai-generation-content';

const modes = getPromptRequiredModes();
console.log('Modes requiring prompts:', modes);
```

## Type Guards

### isJobComplete

```tsx
import { isJobComplete } from '@umituz/react-native-ai-generation-content';

if (isJobComplete(jobStatus)) {
  console.log('Job is complete');
}
```

### isJobProcessing

```tsx
import { isJobProcessing } from '@umituz/react-native-ai-generation-content';

if (isJobProcessing(jobStatus)) {
  console.log('Job is processing');
}
```

### isJobFailed

```tsx
import { isJobFailed } from '@umituz/react-native-ai-generation-content';

if (isJobFailed(jobStatus)) {
  console.log('Job failed');
}
```

## Type Exports

The domain layer exports all core types:

```tsx
// Core interfaces
export type {
  IAIProvider,
  IAppServices,
  INetworkService,
  ICreditService,
  IPaywallService,
  IAuthService,
  IAnalyticsService,
  IFeatureUtils,
};

// Core types
export type {
  AIProviderConfig,
  JobSubmission,
  JobStatus,
  AIJobStatusType,
  AILogEntry,
  SubscribeOptions,
  RunOptions,
  ImageFeatureType,
  VideoFeatureType,
  ImageFeatureInputData,
  VideoFeatureInputData,
  ProviderCapabilities,
  ProviderProgressInfo,
};

// Entities
export type {
  AIErrorInfo,
  AIErrorMessages,
  GenerationCapability,
  GenerationStatus,
  GenerationMetadata,
  GenerationResult,
  GenerationProgress,
  GenerationRequest,
  PollingConfig,
  PollingState,
  PollingOptions,
  ProgressStageConfig,
  ProgressConfig,
  MiddlewareContext,
  MiddlewareResultContext,
  BeforeGenerateHook,
  AfterGenerateHook,
  GenerationMiddleware,
  MiddlewareChain,
  BackgroundJobStatus,
  BackgroundJob,
  AddJobInput,
  UpdateJobInput,
  JobExecutorConfig,
  BackgroundQueueConfig,
  GenerationMode,
};

// Enums
export { AIErrorType };
export { DEFAULT_POLLING_CONFIG, DEFAULT_PROGRESS_STAGES, DEFAULT_QUEUE_CONFIG };
export { DEFAULT_PROCESSING_MODES, getModeConfig, getFreeModes, getPremiumModes, getPromptRequiredModes };
```

## Best Practices

1. **Type Safety**: Use types everywhere
2. **No Dependencies**: Keep domain layer dependency-free
3. **Clear Interfaces**: Define clear interfaces
4. **Immutable Data**: Keep data immutable
5. **Validation**: Validate at domain boundaries

## Related

- [Infrastructure](../../infrastructure/) - Infrastructure implementation
- [Presentation](../../presentation/) - UI layer
- [Features](../../features/) - Feature implementations

## License

MIT
