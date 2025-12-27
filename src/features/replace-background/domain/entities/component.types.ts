/**
 * Component Props Types
 * @description Props definitions for background feature components
 */

import type { ImageSourcePropType } from "react-native";
import type { SamplePrompt, StudioMode, StudioModeConfig } from "./background.types";

/**
 * Image picker component props
 */
export interface ImagePickerProps {
    readonly imageUri: string | null;
    readonly isProcessing: boolean;
    readonly onSelectImage: () => void;
    readonly placeholderText?: string;
}

/**
 * Prompt input component props
 */
export interface PromptInputProps {
    readonly value: string;
    readonly onChangeText: (text: string) => void;
    readonly isProcessing: boolean;
    readonly label?: string;
    readonly placeholder?: string;
    readonly samplePrompts?: readonly SamplePrompt[];
    readonly samplePromptsLabel?: string;
}

/**
 * Generate button component props
 */
export interface GenerateButtonProps {
    readonly isDisabled: boolean;
    readonly isProcessing: boolean;
    readonly onPress: () => void;
    readonly buttonText?: string;
}

/**
 * Result display component props
 */
export interface ResultDisplayProps {
    readonly imageUrl: string | null;
    readonly isProcessing: boolean;
    readonly onSave: () => void;
    readonly onReset: () => void;
    readonly saveButtonText?: string;
    readonly resetButtonText?: string;
}

/**
 * Error display component props
 */
export interface ErrorDisplayProps {
    readonly error: string | null;
}

/**
 * Processing modal component props
 */
export interface ProcessingModalProps {
    readonly visible: boolean;
    readonly progress?: number;
    readonly title?: string;
}

/**
 * Feature header component props
 */
export interface FeatureHeaderProps {
    readonly heroImage?: ImageSourcePropType;
    readonly description?: string;
}

/**
 * Mode selector component props
 */
export interface ModeSelectorProps {
    readonly activeMode: StudioMode;
    readonly onModeChange: (mode: StudioMode) => void;
    readonly isProcessing: boolean;
    readonly modes: readonly StudioModeConfig[];
}

/**
 * Comparison slider component props
 */
export interface ComparisonSliderProps {
    readonly originalUri: string;
    readonly processedUri: string;
    readonly beforeLabel?: string;
    readonly afterLabel?: string;
}
