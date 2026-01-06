/**
 * AIFeatureScreen
 * Unified screen component for all AI features
 * Reduces 9 screens to 1 configurable component
 */

import React, { useMemo, useCallback } from "react";
import { View } from "react-native";
import { ScreenLayout } from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";

import { AIGenScreenHeader } from "../../components/headers/AIGenScreenHeader";
import { CreditBadge } from "../../components/headers/CreditBadge";
import { prepareImage } from "../../../infrastructure/utils/feature-utils";
import { useCreationPersistence } from "../../../domains/creations/presentation/hooks/useCreationPersistence";

// Feature components
import { AnimeSelfieFeature } from "../../../features/anime-selfie/presentation/components/AnimeSelfieFeature";
import { RemoveBackgroundFeature } from "../../../features/remove-background/presentation/components/RemoveBackgroundFeature";
import { HDTouchUpFeature } from "../../../features/hd-touch-up/presentation/components/HDTouchUpFeature";
import { UpscaleFeature } from "../../../features/upscaling/presentation/components/UpscaleFeature";
import { PhotoRestoreFeature } from "../../../features/photo-restoration/presentation/components/PhotoRestoreFeature";
import { RemoveObjectFeature } from "../../../features/remove-object/presentation/components/RemoveObjectFeature";
import { ReplaceBackgroundFeature } from "../../../features/replace-background/presentation/components/ReplaceBackgroundFeature";
import { FaceSwapFeature } from "../../../features/face-swap/presentation/components/FaceSwapFeature";
import { AIHugFeature } from "../../../features/ai-hug/presentation/components/AIHugFeature";
import { AIKissFeature } from "../../../features/ai-kiss/presentation/components/AIKissFeature";
import { MemeGeneratorFeature } from "../../../features/meme-generator/presentation/components/MemeGeneratorFeature";

import { createFeatureTranslations } from "./translations";
import type { AIFeatureScreenProps, AIFeatureId } from "./types";

/**
 * Feature component mapping
 * Using explicit any type for component registry to allow dynamic prop injection
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FEATURE_COMPONENTS: Record<AIFeatureId, React.ComponentType<any>> = {
  "anime-selfie": AnimeSelfieFeature,
  "remove-background": RemoveBackgroundFeature,
  "hd-touch-up": HDTouchUpFeature,
  upscale: UpscaleFeature,
  "photo-restore": PhotoRestoreFeature,
  "remove-object": RemoveObjectFeature,
  "replace-background": ReplaceBackgroundFeature,
  "face-swap": FaceSwapFeature,
  "ai-hug": AIHugFeature,
  "ai-kiss": AIKissFeature,
  "meme-generator": MemeGeneratorFeature,
};

/**
 * AIFeatureScreen - Unified component for all AI features
 */
export const AIFeatureScreen: React.FC<AIFeatureScreenProps> = ({
  config,
  creditCost,
  onDeductCredits,
  onSelectImage,
  onSaveMedia,
  onCheckCreditGuard,
  imageCredits,
  headerRightContent,
}) => {
  const { t } = useLocalization();

  // Create persistence callbacks
  const persistence = useCreationPersistence({
    type: config.id,
    creditCost,
    onCreditDeduct: onDeductCredits,
  });

  // Create translations based on feature mode
  const translations = useMemo(
    () => createFeatureTranslations(config, t),
    [config, t],
  );

  // Create feature config
  const featureConfig = useMemo(
    () => ({
      prepareImage,
      ...config.extraConfig,
      ...persistence,
    }),
    [config.extraConfig, persistence],
  );

  // Credit guard callback
  const handleBeforeProcess = useCallback(async () => {
    // Convert featureId to PascalCase for analytics
    const featureName = config.id
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
    return onCheckCreditGuard(creditCost, featureName);
  }, [config.id, creditCost, onCheckCreditGuard]);

  // Get the feature component
  const FeatureComponent = FEATURE_COMPONENTS[config.id];

  // Build props based on feature mode
  const featureProps = useMemo(() => {
    const baseProps = {
      config: featureConfig,
      translations,
      onBeforeProcess: handleBeforeProcess,
    };

    // Add mode-specific props
    switch (config.mode) {
      case "single":
      case "single-with-prompt":
        return {
          ...baseProps,
          onSelectImage,
          onSaveImage: onSaveMedia,
        };
      case "text-input":
        return {
          ...baseProps,
          onSaveImage: onSaveMedia,
          // Text input doesn't need image selection
        };
      case "dual":
        return {
          ...baseProps,
          onSelectSourceImage: onSelectImage,
          onSelectTargetImage: onSelectImage,
          onSaveImage: onSaveMedia,
        };
      case "dual-video":
        return {
          ...baseProps,
          onSelectSourceImage: onSelectImage,
          onSelectTargetImage: onSelectImage,
          onSaveVideo: onSaveMedia,
        };
      default:
        return baseProps;
    }
  }, [config.mode, featureConfig, translations, handleBeforeProcess, onSelectImage, onSaveMedia]);

  // Default header right content with credit badge
  const defaultHeaderRight = (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <CreditBadge credits={imageCredits} compact />
    </View>
  );

  return (
    <ScreenLayout
      header={
        <AIGenScreenHeader
          title={t(`${config.translationPrefix}.title`)}
          rightContent={headerRightContent ?? defaultHeaderRight}
        />
      }
      scrollable={false}
    >
      <FeatureComponent {...featureProps} />
    </ScreenLayout>
  );
};
