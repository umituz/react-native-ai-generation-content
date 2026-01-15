/**
 * PartnerStepScreen
 * Generic partner/photo upload screen
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
import { PhotoTips } from "../components/PhotoTips";
import { PartnerInfoInput } from "../components/PartnerInfoInput";
import { usePartnerStep } from "../hooks/usePartnerStep";
import type { UploadedImage } from "../../domain/types";

export interface PartnerStepScreenTranslations {
  readonly title: string;
  readonly subtitle: string;
  readonly continue: string;
  readonly tapToUpload: string;
  readonly selectPhoto: string;
  readonly change: string;
  readonly analyzing: string;
  readonly faceDetectionLabel?: string;
  readonly fileTooLarge: string;
  readonly maxFileSize: string;
  readonly error: string;
  readonly uploadFailed: string;
  readonly aiDisclosure?: string;
}

export interface PartnerStepScreenConfig {
  readonly showFaceDetection?: boolean;
  readonly showNameInput?: boolean;
  readonly showPhotoTips?: boolean;
  readonly maxFileSizeMB?: number;
  readonly maxNameLength?: number;
}

export interface PartnerStepScreenProps {
  readonly translations: PartnerStepScreenTranslations;
  readonly t: (key: string) => string;
  readonly initialName?: string;
  readonly config?: PartnerStepScreenConfig;
  readonly faceDetectionEnabled?: boolean;
  readonly onFaceDetectionToggle?: (enabled: boolean) => void;
  readonly onBack: () => void;
  readonly onContinue: (image: UploadedImage, name: string) => void;
}

const DEFAULT_CONFIG: PartnerStepScreenConfig = {
  showFaceDetection: false,
  showNameInput: false,
  showPhotoTips: true,
  maxFileSizeMB: 10,
  maxNameLength: 30,
};

export const PartnerStepScreen: React.FC<PartnerStepScreenProps> = ({
  translations,
  t,
  initialName = "",
  config = DEFAULT_CONFIG,
  faceDetectionEnabled = false,
  onFaceDetectionToggle,
  onBack,
  onContinue,
}) => {
  const tokens = useAppDesignTokens();

  const { image, name, setName, handlePickImage, canContinue } = usePartnerStep({
    initialName,
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
    onContinue(image, name);
  };

  const styles = useMemo(() => createStyles(tokens), [tokens]);
  const showFaceDetection = config.showFaceDetection ?? false;
  const showNameInput = config.showNameInput ?? false;
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

        {showPhotoTips && <PhotoTips t={t} />}

        {showFaceDetection && onFaceDetectionToggle && (
          <FaceDetectionToggle
            isEnabled={faceDetectionEnabled}
            onToggle={onFaceDetectionToggle}
            label={translations.faceDetectionLabel ?? ""}
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

        {showNameInput && (
          <PartnerInfoInput
            t={t}
            name={name}
            onNameChange={setName}
            showName={true}
            maxNameLength={config.maxNameLength}
          />
        )}
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
