/**
 * AudioPickerScreen
 * Allows users to pick an audio file (mp3, m4a, wav) for video generation.
 * Supports optional skip. Uses expo-document-picker.
 */

import React, { useState, useCallback, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText, AtomicButton } from "@umituz/react-native-design-system/atoms";
import { ScreenLayout } from "@umituz/react-native-design-system/layouts";
import { NavigationHeader } from "@umituz/react-native-design-system/molecules";
import { useAppDesignTokens, type DesignTokens } from "@umituz/react-native-design-system/theme";
import { WizardContinueButton } from "../components/WizardContinueButton";
import type { AudioPickerScreenProps } from "./AudioPickerScreen.types";

export type {
  AudioPickerScreenTranslations,
  AudioPickerScreenProps,
} from "./AudioPickerScreen.types";

const DEFAULT_AUDIO_TYPES = [
  "audio/mpeg",
  "audio/mp4",
  "audio/wav",
  "audio/aac",
  "audio/x-m4a",
];

const DEFAULT_MAX_SIZE_MB = 20;

export const AudioPickerScreen: React.FC<AudioPickerScreenProps> = ({
  stepId: _stepId,
  translations,
  allowedTypes,
  maxFileSizeMB,
  optional = true,
  creditCost,
  onBack,
  onContinue,
}) => {
  const tokens = useAppDesignTokens();
  const [selectedFile, setSelectedFile] = useState<{
    uri: string;
    name: string;
    size?: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const maxSize = (maxFileSizeMB ?? DEFAULT_MAX_SIZE_MB) * 1024 * 1024;
  const mimeTypes = allowedTypes ?? DEFAULT_AUDIO_TYPES;

  const handlePick = useCallback(async () => {
    try {
      setError(null);

      // Lazy load expo-document-picker only when needed
      const DocumentPicker = await import("expo-document-picker");
      const result = await DocumentPicker.getDocumentAsync({
        type: mimeTypes as string[],
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets?.length) return;

      const asset = result.assets[0];

      if (asset.size && asset.size > maxSize) {
        setError(
          translations.fileTooLarge ??
            `File too large. Max ${maxFileSizeMB ?? DEFAULT_MAX_SIZE_MB}MB.`
        );
        return;
      }

      setSelectedFile({
        uri: asset.uri,
        name: asset.name,
        size: asset.size ?? undefined,
      });
    } catch {
      if (__DEV__) {
        console.warn("[AudioPickerScreen] Failed to pick document");
      }
    }
  }, [mimeTypes, maxSize, maxFileSizeMB, translations]);

  const handleContinue = useCallback(() => {
    onContinue(selectedFile?.uri ?? "");
  }, [selectedFile, onContinue]);

  const handleSkip = useCallback(() => {
    onContinue("");
  }, [onContinue]);

  const formatFileSize = useCallback((bytes?: number) => {
    if (bytes === undefined || bytes === null) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }, []);

  const canContinue = !!selectedFile || optional;
  const styles = useMemo(() => createStyles(tokens), [tokens]);

  return (
    <View style={[styles.root, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      <NavigationHeader
        title=""
        onBackPress={onBack}
        rightElement={
          <WizardContinueButton
            label={translations.continueButton}
            canContinue={canContinue}
            onPress={handleContinue}
            creditCost={creditCost}
          />
        }
      />
      <ScreenLayout
        scrollable={true}
        edges={["left", "right"]}
        hideScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
      >
        <AtomicText type="headlineMedium" color="textPrimary" style={styles.title}>
          {translations.title}
        </AtomicText>

        {translations.subtitle ? (
          <AtomicText type="bodyMedium" color="textSecondary" style={styles.subtitle}>
            {translations.subtitle}
          </AtomicText>
        ) : null}

        {selectedFile ? (
          <View style={styles.selectedContainer}>
            <AtomicText type="labelLarge" color="textPrimary" style={styles.fileName}>
              {selectedFile.name}
            </AtomicText>
            {selectedFile.size ? (
              <AtomicText type="bodySmall" color="textTertiary">
                {formatFileSize(selectedFile.size)}
              </AtomicText>
            ) : null}
            <AtomicButton
              variant="outline"
              size="sm"
              onPress={handlePick}
              style={styles.changeButton}
            >
              {translations.selectButton}
            </AtomicButton>
          </View>
        ) : (
          <AtomicButton
            variant="outline"
            size="md"
            onPress={handlePick}
            style={styles.pickButton}
          >
            {translations.selectButton}
          </AtomicButton>
        )}

        {error ? (
          <AtomicText type="bodySmall" color="error" style={styles.error}>
            {error}
          </AtomicText>
        ) : null}

        {optional && !selectedFile ? (
          <AtomicButton
            variant="text"
            size="sm"
            onPress={handleSkip}
            style={styles.skipButton}
          >
            {translations.skipButton}
          </AtomicButton>
        ) : null}
      </ScreenLayout>
    </View>
  );
};

const createStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: tokens.spacing.lg,
      paddingBottom: 40,
    },
    title: {
      marginBottom: tokens.spacing.sm,
    },
    subtitle: {
      marginBottom: tokens.spacing.xl,
    },
    selectedContainer: {
      backgroundColor: tokens.colors.backgroundSecondary,
      borderRadius: tokens.borders.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      padding: tokens.spacing.lg,
      alignItems: "center",
      gap: tokens.spacing.sm,
    },
    fileName: {
      textAlign: "center",
    },
    changeButton: {
      marginTop: tokens.spacing.sm,
    },
    pickButton: {
      marginTop: tokens.spacing.md,
    },
    error: {
      marginTop: tokens.spacing.sm,
      textAlign: "center",
    },
    skipButton: {
      marginTop: tokens.spacing.lg,
      alignSelf: "center",
    },
  });
