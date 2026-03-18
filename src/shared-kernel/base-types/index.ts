/**
 * Shared kernel base types
 * Exports all base types for use across domains
 */

export type {
  AspectRatio,
  BaseGenerationOptions,
  BaseRequestMeta,
  BaseGenerationResult,
  GenerationProgress,
} from './base-generation.types';

export type {
  BaseFeatureState,
  FeatureStateWithMetadata,
  FeatureStateAction,
  createInitialFeatureState,
  isFeatureStateError,
  hasFeatureStateOutput,
} from './base-feature-state.types';

export type {
  CreditCallbacks,
  ProgressCallbacks,
  ResultCallbacks,
  BaseGenerationCallbacks,
  ValidationCallbacks,
  LifecycleCallbacks,
} from './base-callbacks.types';
