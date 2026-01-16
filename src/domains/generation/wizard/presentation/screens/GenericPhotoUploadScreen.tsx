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
  type DesignTokens,
} from "@umituz/react-native-design-system";
import { PhotoUploadCard } from "../../../../presentation/components";
import { FaceDetectionToggle } from "../../../../domains/face-detection";
import { PhotoTips } from "../../../../features/partner-upload/presentation/components/PhotoTips";
import type { UploadedImage } from "../../../../features/partner-upload/domain/types";
import { usePhotoUploadState } from "../hooks/usePhotoUploadState";

export interface PhotoUploadScreenTranslations {
  readonly title: string;
  readonly subtitle: string;
  readonly continue: string;
  readonly tapToUpload: string;
  readonly selectPhoto: string;
  readonly change: string;
  readonly analyzing: string;
  readonly fileTooLarge: string;
  readonly maxFileSize: string;
  readonly error: string;
  readonly uploadFailed: string;
  readonly aiDisclosure?: string;
}

export interface PhotoUploadScreenConfig {
  readonly showFaceDetection?: boolean;
  readonly showPhotoTips?: boolean;
  readonly maxFileSizeMB?: number;
}

export interface PhotoUploadScreenProps {
  readonly translations: PhotoUploadScreenTranslations;
  readonly t: (key: string) => string;
  readonly config?: PhotoUploadScreenConfig;
  readonly faceDetectionEnabled?: boolean;
  readonly onFaceDetectionToggle?: (enabled: boolean) => void;
  readonly onBack: () => void;
  readonly onContinue: (image: UploadedImage) => void;
}

const DEFAULT_CONFIG: PhotoUploadScreenConfig = {
  showFaceDetection: false,
  showPhotoTips: true,
  maxFileSizeMB: 10,
};

export const GenericPhotoUploadScreen: React.FC<PhotoUploadScreenProps> = ({
  translations,
  t,
  config = DEFAULT_CONFIG,
  faceDetectionEnabled = false,
  onFaceDetectionToggle,
  onBack,
  onContinue,
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
  });

  const handleContinuePress = () => {
    if (!canContinue || !image) return;
    onContinue(image);
  };

  const styles = useMemo(() => createStyles(tokens), [tokens]);
  const showFaceDetection = config.showFaceDetection ?? false;
  const showPhotoTips = config.showPhotoTips ?? true;

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
              name="arrow-forward"
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
          <PhotoTips
            t={t}
            titleKey="photoUpload.tips.title"
            headerIcon="bulb"
            style={{ marginHorizontal: 24, marginBottom: 20 }}
          />
        )}

        {showFaceDetection && onFaceDetectionToggle && (
          <FaceDetectionToggle
            isEnabled={faceDetectionEnabled}
            onToggle={onFaceDetectionToggle}
            label={t("photoUpload.faceDetection")}
            hidden={true}
          />
        )}

        <PhotoUploadCard
          imageUri={image?.previewUrl || null}
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
