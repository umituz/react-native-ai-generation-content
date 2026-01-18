/**
 * Generic Photo Upload Screen
 * Used by wizard domain for ANY photo upload step
 * NO feature-specific concepts (no partner, couple, etc.)
 * Works for: couple features, face-swap, image-to-video, ANY photo upload need
 */

import React, { useMemo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  useAppDesignTokens,
  ScreenLayout,
  AtomicText,
  AtomicIcon,
  NavigationHeader,
  InfoGrid,
  type DesignTokens,
  type InfoGridItem,
} from "@umituz/react-native-design-system";
import { PhotoUploadCard } from "../../../../../presentation/components";
import type { UploadedImage } from "../../../../../presentation/hooks/generation/useAIGenerateState";
import { usePhotoUploadState } from "../hooks/usePhotoUploadState";

export interface PhotoUploadScreenTranslations {
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

export interface PhotoUploadScreenConfig {
  readonly showPhotoTips?: boolean;
  readonly maxFileSizeMB?: number;
}

export interface PhotoUploadScreenProps {
  readonly translations: PhotoUploadScreenTranslations;
  readonly t: (key: string) => string;
  readonly config?: PhotoUploadScreenConfig;
  readonly onBack: () => void;
  readonly onContinue: (image: UploadedImage) => void;
  readonly existingImage?: UploadedImage | null;
  readonly stepId?: string;
}

const DEFAULT_CONFIG: PhotoUploadScreenConfig = {
  showPhotoTips: true,
  maxFileSizeMB: 10,
};

export const GenericPhotoUploadScreen: React.FC<PhotoUploadScreenProps> = ({
  translations,
  t,
  config = DEFAULT_CONFIG,
  onBack,
  onContinue,
  existingImage,
  stepId,
}) => {
  const tokens = useAppDesignTokens();

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
  });

  const handleContinuePress = () => {
    if (!canContinue || !image) return;
    onContinue(image);
  };

  const styles = useMemo(() => createStyles(tokens), [tokens]);
  const showPhotoTips = config.showPhotoTips ?? true;

  // Build photo tips items from translations
  const photoTipsItems: InfoGridItem[] = useMemo(() => {
    const tipKeys = [
      { key: "photoUpload.tips.clearFace", icon: "happy-outline" },
      { key: "photoUpload.tips.goodLighting", icon: "sunny-outline" },
      { key: "photoUpload.tips.recentPhoto", icon: "time-outline" },
      { key: "photoUpload.tips.noFilters", icon: "image-outline" },
    ];
    return tipKeys.map(({ key, icon }) => ({
      text: t(key),
      icon,
    }));
  }, [t]);

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      <NavigationHeader
        title={translations.title}
        onBackPress={onBack}
        rightElement={
          <TouchableOpacity
            onPress={handleContinuePress}
            activeOpacity={0.7}
            disabled={!canContinue || !image}
            style={[
              styles.continueButton,
              {
                backgroundColor: canContinue && image ? tokens.colors.primary : tokens.colors.surfaceVariant,
                opacity: canContinue && image ? 1 : 0.5,
              },
            ]}
          >
            <AtomicText
              type="bodyMedium"
              style={[
                styles.continueText,
                { color: canContinue && image ? tokens.colors.onPrimary : tokens.colors.textSecondary },
              ]}
            >
              {translations.continue}
            </AtomicText>
            <AtomicIcon
              name="chevron-forward-outline"
              size="sm"
              color={canContinue && image ? "onPrimary" : "textSecondary"}
            />
          </TouchableOpacity>
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

        {/* Photo Tips - InfoGrid version */}
        {showPhotoTips && (
          <View style={styles.tipsContainer}>
            <InfoGrid
              items={photoTipsItems}
              columns={2}
              title={t("photoUpload.tips.title")}
              headerIcon="bulb-outline"
            />
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
            <AtomicText
              type="labelSmall"
              style={[styles.disclosureText, { color: tokens.colors.textSecondary }]}
            >
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
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 40,
    },
    subtitle: {
      fontSize: 16,
      textAlign: "center",
      marginHorizontal: 24,
      marginBottom: 24,
    },
    tipsContainer: {
      marginHorizontal: 24,
      marginBottom: 20,
    },
    continueButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.xs,
      borderRadius: tokens.borders.radius.full,
    },
    continueText: {
      fontWeight: "800",
      marginRight: 4,
    },
    disclosureContainer: {
      marginTop: 24,
      marginHorizontal: 24,
      padding: 16,
      borderRadius: 12,
      backgroundColor: tokens.colors.surfaceVariant + "40",
    },
    disclosureText: {
      textAlign: "center",
      lineHeight: 18,
      opacity: 0.8,
    },
  });
