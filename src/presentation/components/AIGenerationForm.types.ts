import React, { PropsWithChildren } from "react";
import type { StyleOption, AspectRatioOption } from "./selectors/types";
import type { StylePreset } from "./StylePresetsGrid";

/**
 * Translations for AIGenerationForm
 */
export interface AIGenerationFormTranslations {
  promptTitle?: string;
  promptPlaceholder?: string;
  styleTitle?: string;
  durationTitle?: string;
  aspectRatioTitle?: string;
  examplePromptsTitle?: string;
  generateButton: string;
  generatingButton: string;
  // Progress Modal (mandatory when isGenerating)
  progressTitle?: string;
  progressMessage?: string;
  progressHint?: string;
  /** Hint for background generation (e.g., "Continue in background") */
  progressBackgroundHint?: string;
  presetsTitle?: string;
  showAdvancedLabel?: string;
  hideAdvancedLabel?: string;
}

/**
 * Props for AIGenerationForm
 */
export interface AIGenerationFormProps extends PropsWithChildren {
  prompt?: string;
  onPromptChange?: (text: string) => void;
  
  // Optional: Example Prompts
  examplePrompts?: readonly string[];
  onExamplePromptSelect?: (prompt: string) => void;
  
  // Optional: Style Selection
  styles?: StyleOption[];
  selectedStyle?: string;
  onStyleSelect?: (styleId: string) => void;
  
  // Optional: Duration Selection
  duration?: number;
  durationOptions?: readonly number[];
  onDurationSelect?: (duration: number) => void;
  formatDurationLabel?: (duration: number) => string;
  
  // Optional: Aspect Ratio Selection
  aspectRatios?: AspectRatioOption[];
  selectedAspectRatio?: string;
  onAspectRatioSelect?: (ratio: string) => void;
  
  onGenerate: () => void;
  isGenerating: boolean;
  hideGenerateButton?: boolean;
  /** External control to disable the generate button (e.g., when images are not selected) */
  isDisabled?: boolean;
  
  // Optional: Generation Progress
  progress?: number;
  progressIcon?: string;
  /** Override modal visibility (defaults to isGenerating) */
  isProgressModalVisible?: boolean;
  /** Callback when user closes the progress modal (for background generation) */
  onCloseProgressModal?: () => void;

  // Custom Generate Button Props
  generateButtonProps?: {
    costLabel?: string;
    accessoryRight?: React.ReactNode;
    onAccessoryRightPress?: () => void;
    icon?: string;
  };
  
  // Optional: Advanced Options Toggle
  showAdvanced?: boolean;
  onAdvancedToggle?: (show: boolean) => void;
  
  // Optional: Style Presets
  presets?: readonly StylePreset[];
  onPresetPress?: (preset: StylePreset) => void;
  
  translations: AIGenerationFormTranslations;
}
