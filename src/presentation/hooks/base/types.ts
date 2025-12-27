/**
 * Base Feature Hook Types
 * Provider-agnostic types for feature hooks
 */

/**
 * Result from AI processing
 */
export interface FeatureProcessResult {
  readonly success: boolean;
  readonly outputUrl?: string;
  readonly error?: string;
  readonly metadata?: Record<string, unknown>;
}

/**
 * Base state shared by all feature hooks
 */
export interface BaseFeatureState {
  readonly isProcessing: boolean;
  readonly progress: number;
  readonly error: string | null;
  readonly processedUrl: string | null;
}

/**
 * Base actions shared by all feature hooks
 */
export interface BaseFeatureActions {
  readonly reset: () => void;
  readonly clearError: () => void;
}

/**
 * Progress callback type
 */
export type OnProgressCallback = (progress: number) => void;

/**
 * Image selection callback - provided by app
 */
export type OnSelectImageCallback = () => Promise<string | null>;

/**
 * Save callback - provided by app
 */
export type OnSaveCallback = (url: string) => Promise<void>;
