/**
 * Generic Photo Upload Screen
 * Used by wizard domain for ANY photo upload step
 */

import React, { useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { ScreenLayout } from "@umituz/react-native-design-system/layouts";
import { useAlert, AlertType, AlertMode, NavigationHeader, InfoGrid } from "@umituz/react-native-design-system/molecules";
import type { InfoGridItem } from "@umituz/react-native-design-system/molecules";
import { useAppDesignTokens, type DesignTokens } from "@umituz/react-native-design-system/theme";
import { PhotoUploadCard } from "../../../../../presentation/components";
import type { UploadedImage } from "../../../../../presentation/hooks/generation/useAIGenerateState";
import { usePhotoUploadState, type PhotoUploadError } from "../hooks/usePhotoUploadState";
import { WizardContinueButton } from "../components/WizardContinueButton";

interface PhotoUploadScreenTranslations {
  readonly title: string;
  readonly subtitle: string;
  readonly continue: string;
  readonly tapToUpload: string;
  readonly selectPhoto: string;
  readonly change: string;
  readonly analyzing?: string;
  readonly fileTooLarge: string;
  readonly maxFileSize: string;
  readonly error: string;
  readonly uploadFailed: string;
  readonly aiDisclosure?: string;
}

interface PhotoUploadScreenConfig {
  readonly showPhotoTips?: boolean;
  readonly maxFileSizeMB?: number;
}

interface PhotoUploadScreenProps {
  readonly translations: PhotoUploadScreenTranslations;
  readonly t: (key: string) => string;
  readonly config?: PhotoUploadScreenConfig;
  readonly creditCost?: number;
  readonly onBack: () => void;
  readonly onContinue: (image: UploadedImage) => void;
  readonly existingImage?: UploadedImage | null;
  readonly stepId?: string;
}

const DEFAULT_CONFIG: PhotoUploadScreenConfig = { showPhotoTips: true, maxFileSizeMB: 10 };

export const GenericPhotoUploadScreen: React.FC<PhotoUploadScreenProps> = ({
  translations,
  t,
  config = DEFAULT_CONFIG,
  creditCost,
  onBack,
  onContinue,
  existingImage,
  stepId,
}) => {
  const tokens = useAppDesignTokens();
  const alert = useAlert();

  const handleError = useCallback(
    (error: PhotoUploadError) => {
      alert.show(AlertType.ERROR, AlertMode.MODAL, error.title, error.message);
    },
    [alert],
  );

  const { image, handlePickImage, canContinue } = usePhotoUploadState({
    config: { maxFileSizeMB: config.maxFileSizeMB },
    translations: {
      fileTooLarge: translations.fileTooLarge,
      maxFileSize: translations.maxFileSize,
      error: translations.error,
      uploadFailed: translations.uploadFailed,
    },
    initialImage: existingImage || undefined,
    stepId,
    onError: handleError,
  });

  const handleContinuePress = () => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[GenericPhotoUploadScreen] handleContinuePress called", {
        canContinue,
        hasImage: !!image,
        imageUri: image?.uri?.substring(0, 50),
        stepId,
      });
    }
    if (!canContinue || !image) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[GenericPhotoUploadScreen] BLOCKED - canContinue:", canContinue, "image:", !!image);
      }
      return;
    }
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[GenericPhotoUploadScreen] Calling onContinue with image");
    }
    onContinue(image);
  };

  const styles = useMemo(() => createStyles(tokens), [tokens]);
  const showPhotoTips = config.showPhotoTips ?? true;

  const photoTipsItems: InfoGridItem[] = useMemo(() => {
    const tipKeys = [
      { key: "photoUpload.tips.clearFace", icon: "happy-outline" },
      { key: "photoUpload.tips.goodLighting", icon: "sunny-outline" },
      { key: "photoUpload.tips.recentPhoto", icon: "time-outline" },
      { key: "photoUpload.tips.noFilters", icon: "image-outline" },
    ];
    return tipKeys.map(({ key, icon }) => ({ text: t(key), icon }));
  }, [t]);

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      <NavigationHeader
        title={translations.title}
        onBackPress={onBack}
        rightElement={
          <WizardContinueButton
            canContinue={canContinue && !!image}
            onPress={handleContinuePress}
            label={translations.continue}
            creditCost={creditCost}
          />
        }
      />
      <ScreenLayout
        edges={["left", "right"]}
        backgroundColor="transparent"
        scrollable={true}
        keyboardAvoiding={true}
        contentContainerStyle={styles.scrollContent}
        hideScrollIndicator={true}
      >
        <AtomicText style={[styles.subtitle, { color: tokens.colors.textSecondary }]}>
          {translations.subtitle}
        </AtomicText>

        {showPhotoTips && (
          <View style={styles.tipsContainer}>
            <InfoGrid items={photoTipsItems} columns={2} title={t("photoUpload.tips.title")} headerIcon="bulb-outline" />
          </View>
        )}

        <PhotoUploadCard
          imageUri={image?.previewUrl || image?.uri || null}
          onPress={handlePickImage}
          isValidating={false}
          isValid={null}
          translations={{
            tapToUpload: translations.tapToUpload,
            selectPhoto: translations.selectPhoto,
            change: translations.change,
            analyzing: translations.analyzing,
          }}
        />

        {translations.aiDisclosure && (
          <View style={styles.disclosureContainer}>
            <AtomicText type="labelSmall" style={[styles.disclosureText, { color: tokens.colors.textSecondary }]}>
              {translations.aiDisclosure}
            </AtomicText>
          </View>
        )}
      </ScreenLayout>
    </View>
  );
};

const createStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { paddingBottom: 40 },
    subtitle: { fontSize: 16, textAlign: "center", marginHorizontal: 24, marginBottom: 24 },
    tipsContainer: { marginHorizontal: 24, marginBottom: 20 },
    disclosureContainer: {
      marginTop: 24,
      marginHorizontal: 24,
      padding: 16,
      borderRadius: 12,
      backgroundColor: tokens.colors.surfaceVariant + "40",
    },
    disclosureText: { textAlign: "center", lineHeight: 18, opacity: 0.8 },
  });
