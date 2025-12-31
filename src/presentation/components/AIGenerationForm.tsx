import React, { PropsWithChildren } from "react";
import { StyleSelector } from "./selectors/StyleSelector";
import { DurationSelector } from "./selectors/DurationSelector";
import { AspectRatioSelector } from "./selectors/AspectRatioSelector";
import { PromptInput } from "./PromptInput";
import { GenerateButton } from "./buttons/GenerateButton";
import { ExamplePrompts } from "./prompts/ExamplePrompts";
import type { StyleOption } from "./selectors/types";
import type { AspectRatioOption } from "./selectors/types";

export interface AIGenerationFormTranslations {
  promptTitle?: string;
  promptPlaceholder?: string;
  styleTitle?: string;
  durationTitle?: string;
  aspectRatioTitle?: string;
  examplePromptsTitle?: string;
  generateButton: string;
  generatingButton: string;
}

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
  
  // Custom Generate Button Props
  generateButtonProps?: {
    costLabel?: string;
    accessoryRight?: React.ReactNode;
    onAccessoryRightPress?: () => void;
    icon?: string;
  };
  
  translations: AIGenerationFormTranslations;
}

export const AIGenerationForm: React.FC<AIGenerationFormProps> = ({
  prompt,
  onPromptChange,
  
  examplePrompts,
  onExamplePromptSelect,
  
  styles,
  selectedStyle,
  onStyleSelect,
  
  duration,
  durationOptions,
  onDurationSelect,
  formatDurationLabel,
  
  aspectRatios,
  selectedAspectRatio,
  onAspectRatioSelect,
  
  onGenerate,
  isGenerating,
  hideGenerateButton,
  
  generateButtonProps,
  
  translations,
  children,
}) => {
  return (
    <>
      {onPromptChange && translations.promptTitle && (
        <PromptInput
          title={translations.promptTitle}
          placeholder={translations.promptPlaceholder}
          value={prompt || ""}
          onChangeText={onPromptChange}
        />
      )}
      
      {examplePrompts && examplePrompts.length > 0 && onExamplePromptSelect && (
        <ExamplePrompts
          prompts={examplePrompts}
          onSelectPrompt={onExamplePromptSelect}
          title={translations.examplePromptsTitle}
        />
      )}
      
      {styles && styles.length > 0 && selectedStyle && onStyleSelect && translations.styleTitle && (
        <StyleSelector
          styles={styles}
          selectedStyle={selectedStyle}
          onStyleSelect={onStyleSelect}
          title={translations.styleTitle}
        />
      )}
      
      {aspectRatios && aspectRatios.length > 0 && selectedAspectRatio && onAspectRatioSelect && translations.aspectRatioTitle && (
        <AspectRatioSelector
          ratios={aspectRatios}
          selectedRatio={selectedAspectRatio}
          onRatioSelect={onAspectRatioSelect}
          title={translations.aspectRatioTitle}
        />
      )}
      
      {duration && durationOptions && onDurationSelect && translations.durationTitle && (
        <DurationSelector
          duration={duration}
          durationOptions={durationOptions}
          onDurationSelect={onDurationSelect}
          title={translations.durationTitle}
          formatLabel={formatDurationLabel}
        />
      )}
      
      {/* Custom children injected here */}
      {children}
      
      {!hideGenerateButton && (
        <GenerateButton
          onPress={onGenerate}
          isProcessing={isGenerating}
          isDisabled={onPromptChange ? !prompt?.trim() : false}
          text={translations.generateButton}
          processingText={translations.generatingButton}
          variant="solid"
          icon={generateButtonProps?.icon || "sparkles-outline"}
          costLabel={generateButtonProps?.costLabel}
          accessoryRight={generateButtonProps?.accessoryRight}
          onAccessoryRightPress={generateButtonProps?.onAccessoryRightPress}
        />
      )}
    </>
  );
};
