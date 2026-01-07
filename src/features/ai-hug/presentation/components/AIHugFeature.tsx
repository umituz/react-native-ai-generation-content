/**
 * AIHugFeature Component
 * Self-contained AI hug video feature UI component
 * Uses centralized DualImageVideoFeatureLayout for consistent UX
 */

import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { DualImagePicker } from "../../../../presentation/components/image-picker/DualImagePicker";
import { DualImageVideoFeatureLayout } from "../../../../presentation/layouts";
import type { ProcessingModalRenderProps, DualImageInputRenderProps } from "../../../../presentation/layouts";
import { useAIHugFeature } from "../hooks";
import type {
  AIHugTranslations,
  AIHugFeatureConfig,
} from "../../domain/types";

export interface AIHugFeatureProps {
  config: AIHugFeatureConfig;
  translations: AIHugTranslations & {
    modalTitle?: string;
    modalMessage?: string;
    modalHint?: string;
    modalBackgroundHint?: string;
  };
  onSelectSourceImage: () => Promise<string | null>;
  onSelectTargetImage: () => Promise<string | null>;
  onSaveVideo: (videoUrl: string) => Promise<void>;
  onBeforeProcess?: () => Promise<boolean>;
  renderProcessingModal?: (props: ProcessingModalRenderProps) => React.ReactNode;
}

export const AIHugFeature: React.FC<AIHugFeatureProps> = ({
  config,
  translations,
  onSelectSourceImage,
  onSelectTargetImage,
  onSaveVideo,
  onBeforeProcess,
  renderProcessingModal,
}) => {
  const feature = useAIHugFeature({
    config,
    onSelectSourceImage,
    onSelectTargetImage,
    onSaveVideo,
    onBeforeProcess,
  });

  const modalTranslations = useMemo(
    () => ({
      title: translations.modalTitle || "Creating your video",
      message: translations.modalMessage || "AI is working its magic...",
      hint: translations.modalHint || "This may take a moment",
      backgroundHint: translations.modalBackgroundHint || "Continue in background",
    }),
    [translations],
  );

  return (
    <DualImageVideoFeatureLayout
      feature={feature}
      translations={translations}
      modalTranslations={modalTranslations}
      renderProcessingModal={renderProcessingModal}
      renderInput={({ sourceImageUri, targetImageUri, onSelectSource, onSelectTarget, isDisabled }: DualImageInputRenderProps) => (
        <View style={styles.pickerContainer}>
          <DualImagePicker
            sourceImageUri={sourceImageUri}
            targetImageUri={targetImageUri}
            isDisabled={isDisabled}
            onSelectSource={onSelectSource}
            onSelectTarget={onSelectTarget}
            sourcePlaceholder={translations.sourceUploadTitle}
            targetPlaceholder={translations.targetUploadTitle}
            layout="horizontal"
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
