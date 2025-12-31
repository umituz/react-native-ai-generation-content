import React from "react";
import { StyleSelector } from "./selectors/StyleSelector";
import { DurationSelector } from "./selectors/DurationSelector";
import { PromptInput } from "./PromptInput";
import { GenerateButton } from "./buttons/GenerateButton";
import type { StyleOption } from "./selectors/types";

export interface AIGenerationFormTranslations {
  promptTitle: string;
  promptPlaceholder: string;
  styleTitle: string;
  durationTitle: string;
  generateButton: string;
  generatingButton: string;
}

export interface AIGenerationFormProps {
  prompt: string;
  onPromptChange: (text: string) => void;
  
  styles: StyleOption[];
  selectedStyle: string;
  onStyleSelect: (styleId: string) => void;
  
  duration: number;
  durationOptions: readonly number[];
  onDurationSelect: (duration: number) => void;
  
  onGenerate: () => void;
  isGenerating: boolean;
  
  translations: AIGenerationFormTranslations;
}

export const AIGenerationForm: React.FC<AIGenerationFormProps> = ({
  prompt,
  onPromptChange,
  
  styles,
  selectedStyle,
  onStyleSelect,
  
  duration,
  durationOptions,
  onDurationSelect,
  
  onGenerate,
  isGenerating,
  
  translations,
}) => {
  return (
    <>
      <PromptInput
        title={translations.promptTitle}
        placeholder={translations.promptPlaceholder}
        value={prompt}
        onChangeText={onPromptChange}
      />
      
      <StyleSelector
        styles={styles}
        selectedStyle={selectedStyle}
        onStyleSelect={onStyleSelect}
        title={translations.styleTitle}
      />
      
      <DurationSelector
        duration={duration}
        durationOptions={durationOptions}
        onDurationSelect={onDurationSelect}
        title={translations.durationTitle}
      />
      
      <GenerateButton
        onPress={onGenerate}
        isProcessing={isGenerating}
        isDisabled={!prompt.trim()}
        text={translations.generateButton}
        processingText={translations.generatingButton}
        variant="solid"
        icon="sparkles-outline"
      />
    </>
  );
};
