/**
 * Background Feature Types
 * @description Core type definitions for background feature
 */

/**
 * Studio mode for background operations
 */
export type StudioMode =
    | "transparent"
    | "remove-object"
    | "replace-object"
    | "relight"
    | "creative-scene"
    | "enhance"
    | "clean-white"
    | "portrait-blur";

/**
 * Background processing request input
 */
export interface BackgroundProcessRequest {
    readonly imageUri: string;
    readonly prompt?: string;
    readonly mode?: StudioMode;
    readonly mask?: string;
}

/**
 * Background processing result
 */
export interface BackgroundProcessResult {
    readonly success: boolean;
    readonly imageUrl?: string;
    readonly error?: string;
    readonly requestId?: string;
}

/**
 * Background feature state
 */
export interface BackgroundFeatureState {
    readonly imageUri: string | null;
    readonly prompt: string;
    readonly processedUrl: string | null;
    readonly isProcessing: boolean;
    readonly progress: number;
    readonly error: string | null;
    readonly mode: StudioMode;
}

/**
 * Sample prompt configuration
 */
export interface SamplePrompt {
    readonly id: string;
    readonly text: string;
}

/**
 * Studio mode configuration
 */
export interface StudioModeConfig {
    readonly id: StudioMode;
    readonly icon: string;
    readonly requiresPrompt?: boolean;
    readonly requiresMask?: boolean;
}

/**
 * Comparison view state
 */
export interface ComparisonState {
    readonly originalUri: string | null;
    readonly processedUri: string | null;
    readonly position: number;
}
