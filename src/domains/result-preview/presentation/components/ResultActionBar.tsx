/**
 * ResultActionBar Component
 * Action buttons for save, share, and try again
 */

import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import {
  AtomicButton,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { ResultActionBarProps } from "../types/result-preview.types";

export const ResultActionBar: React.FC<ResultActionBarProps> = ({
  isSaving,
  isSharing,
  onDownload,
  onShare,
  onTryAgain,
  saveButtonText,
  saveButtonLoadingText,
  shareButtonText,
  shareButtonLoadingText,
  tryAgainButtonText,
}) => {
  const tokens = useAppDesignTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: "row",
          gap: tokens.spacing.md,
          marginBottom: tokens.spacing.lg,
        },
        button: {
          flex: 1,
        },
        tryAgainButton: {
          marginTop: tokens.spacing.md,
        },
      }),
    [tokens],
  );

  return (
    <View style={styles.container}>
      <AtomicButton
        title={isSaving ? saveButtonLoadingText : saveButtonText}
        onPress={onDownload}
        disabled={isSaving}
        variant="secondary"
        icon="download"
        style={styles.button}
      />
      <AtomicButton
        title={isSharing ? shareButtonLoadingText : shareButtonText}
        onPress={onShare}
        disabled={isSharing}
        variant="primary"
        icon="share-social"
        style={styles.button}
      />
      <AtomicButton
        title={tryAgainButtonText}
        onPress={onTryAgain}
        variant="text"
        icon="refresh"
        fullWidth
        style={styles.tryAgainButton}
      />
    </View>
  );
};
