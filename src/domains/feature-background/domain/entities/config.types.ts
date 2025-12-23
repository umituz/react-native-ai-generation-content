/**
 * Configuration Types
 * @description Configuration interfaces for background feature
 */

import type {
    BackgroundProcessRequest,
    BackgroundProcessResult,
    StudioMode,
} from "./background.types";

/**
 * Process request callback parameters
 */
export interface ProcessRequestParams extends BackgroundProcessRequest {
    readonly onProgress?: (progress: number) => void;
}

/**
 * Background feature configuration
 */
export interface BackgroundFeatureConfig {
    readonly onProcess: (
        params: ProcessRequestParams
    ) => Promise<BackgroundProcessResult>;
    readonly onSave?: (imageUrl: string) => Promise<void>;
    readonly onError?: (error: Error) => void;
    readonly onSuccess?: (result: BackgroundProcessResult) => void;
    readonly defaultMode?: StudioMode;
}

/**
 * Hook configuration
 */
export interface UseBackgroundFeatureConfig {
    readonly processRequest: (
        params: ProcessRequestParams
    ) => Promise<BackgroundProcessResult>;
    readonly onSelectImage?: () => Promise<string | null>;
    readonly defaultMode?: StudioMode;
}
