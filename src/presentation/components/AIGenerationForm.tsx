import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { StyleSelector } from "./selectors/StyleSelector";
import { DurationSelector } from "./selectors/DurationSelector";
import { AspectRatioSelector } from "./selectors/AspectRatioSelector";
import { PromptInput } from "./PromptInput";
import { GenerateButton } from "./buttons/GenerateButton";
import { ExamplePrompts } from "./prompts/ExamplePrompts";
import { AIGenerationProgressInline } from "./AIGenerationProgressInline";
import { StylePresetsGrid } from "./StylePresetsGrid";
import type { AIGenerationFormProps } from "./AIGenerationForm.types";

export const AIGenerationForm: React.FC<AIGenerationFormProps> = ({
  prompt,
  onPromptChange,
  examplePrompts,
  onExamplePromptSelect,
  styles: styleOptions,
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
  progress,
  generateButtonProps,
  showAdvanced,
  onAdvancedToggle,
  presets,
  onPresetPress,
  translations,
  children,
}) => {
  const tokens = useAppDesignTokens();
  const isAdvancedVisible = showAdvanced !== undefined ? showAdvanced : true;

  return (
    <>
      {presets && presets.length > 0 && onPresetPress && (
        <StylePresetsGrid
          presets={presets}
          onPresetPress={onPresetPress}
          disabled={isGenerating}
          title={translations.presetsTitle}
        />
      )}

      {onAdvancedToggle && (
        <TouchableOpacity
          style={[
            styles.toggleButton,
            { backgroundColor: tokens.colors.backgroundSecondary },
          ]}
          onPress={() => onAdvancedToggle(!showAdvanced)}
        >
          <AtomicText type="bodyMedium" style={{ color: tokens.colors.textPrimary }}>
            {showAdvanced ? translations.hideAdvancedLabel : translations.showAdvancedLabel}
          </AtomicText>
          <AtomicIcon
            name={showAdvanced ? "chevron-up" : "chevron-down"}
            size="sm"
            customColor={tokens.colors.textSecondary}
          />
        </TouchableOpacity>
      )}

      {isAdvancedVisible && (
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

          {styleOptions && styleOptions.length > 0 && selectedStyle && onStyleSelect && translations.styleTitle && (
            <StyleSelector
              styles={styleOptions}
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
      )}

      {isGenerating && progress !== undefined && (
        <AIGenerationProgressInline
          progress={progress}
          title={translations.progressTitle || translations.generatingButton}
          hint={translations.progressHint}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    gap: 8,
    marginVertical: 12,
  },
});
