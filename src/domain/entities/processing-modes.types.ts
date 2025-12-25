/**
 * Image Processing Mode Types
 * Generic types for image processing modes across apps
 */

export type ImageProcessingMode =
    | "clean_white"
    | "portrait_blur"
    | "creative_scene"
    | "transparent"
    | "enhance"
    | "remove_object"
    | "replace_object"
    | "relight";

export interface ModeConfig {
    readonly id: string;
    readonly icon: string;
    readonly cost: number;
    readonly premium: boolean;
    readonly requiresPrompt: boolean;
    readonly aiPrompt: string;
}

export interface ModeCatalog {
    readonly [key: string]: ModeConfig;
}
