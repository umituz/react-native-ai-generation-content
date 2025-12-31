/**
 * Feature Utilities
 * Generic utilities for AI generation features
 * App provides implementations via dependency injection
 */

/**
 * Image selector function type
 */
export type ImageSelector = () => Promise<string | null>;

/**
 * Video saver function type
 */
export type VideoSaver = (uri: string) => Promise<void>;

/**
 * Credit checker function type
 */
export type CreditChecker = (cost: number, featureName: string, type: string) => Promise<boolean>;

/**
 * Alert function type
 */
export type AlertFunction = (title: string, message: string) => void;

/**
 * Feature utilities configuration
 */
export interface FeatureUtilsConfig {
  selectImage: ImageSelector;
  saveVideo: VideoSaver;
  checkCredit: CreditChecker;
  showSuccessAlert?: AlertFunction;
  showErrorAlert?: AlertFunction;
}

/**
 * Prepare image from URI (generic passthrough)
 */
export function prepareImage(uri: string): string {
  return uri;
}

/**
 * Create dev callbacks for logging
 */
export function createDevCallbacks(featureName: string) {
  return {
    onSuccess: (result: unknown) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log(`[${featureName}] Success:`, result);
      }
    },
    onError: (error: unknown) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error(`[${featureName}] Error:`, error);
      }
    },
  };
}

/**
 * Create feature utils with injected dependencies
 */
export function createFeatureUtils(config: FeatureUtilsConfig) {
  return {
    selectImage: config.selectImage,
    saveVideo: config.saveVideo,
    checkCreditGuard: config.checkCredit,
    prepareImage,
    createDevCallbacks,
  };
}

/**
 * Hook factory for feature utilities
 */
export function createUseFeatureUtils(config: FeatureUtilsConfig) {
  return function useFeatureUtils() {
    return createFeatureUtils(config);
  };
}
