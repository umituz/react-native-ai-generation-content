/**
 * Base feature state types for AI generation features
 * Provides consistent state management across all domains
 */

import type { GenerationProgress } from './base-generation.types';

/**
 * Base state for all generation features
 * Used by hooks and components for consistent state management
 */
export interface BaseFeatureState<TOutput = string> {
  /** Whether a generation is currently in progress */
  isProcessing: boolean;
  /** Current generation progress (0-1) */
  progress: number;
  /** Error message if operation failed */
  error: string | null;
  /** Generated output data */
  output: TOutput | null;
  /** Additional progress information */
  progressInfo?: GenerationProgress;
}

/**
 * Feature state with additional metadata
 */
export interface FeatureStateWithMetadata<TOutput = string> extends BaseFeatureState<TOutput> {
  /** Unique ID for the current generation job */
  jobId?: string;
  /** Timestamp when generation started */
  startedAt?: number;
  /** Timestamp when generation completed */
  completedAt?: number;
  /** Number of retry attempts */
  retryCount?: number;
}

/**
 * Actions that can be performed on feature state
 */
export type FeatureStateAction<TOutput = string> =
  | { type: 'START'; jobId?: string }
  | { type: 'PROGRESS'; progress: number; status?: string }
  | { type: 'SUCCESS'; output: TOutput; metadata?: Record<string, unknown> }
  | { type: 'ERROR'; error: string }
  | { type: 'RESET' };

/**
 * Initial state factory
 */
export function createInitialFeatureState<TOutput = string>(): BaseFeatureState<TOutput> {
  return {
    isProcessing: false,
    progress: 0,
    error: null,
    output: null,
  };
}

/**
 * Check if feature state is in an error state
 */
export function isFeatureStateError<TOutput = string>(
  state: BaseFeatureState<TOutput>
): boolean {
  return state.error !== null;
}

/**
 * Check if feature state has output
 */
export function hasFeatureStateOutput<TOutput = string>(
  state: BaseFeatureState<TOutput>
): boolean {
  return state.output !== null;
}
