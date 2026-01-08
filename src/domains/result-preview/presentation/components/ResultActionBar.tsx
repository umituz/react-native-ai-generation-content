/**
 * ResultActionBar Component
 * Action buttons for save, share, retry, and rate
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
  onRate,
  saveButtonText,
  saveButtonLoadingText,
  shareButtonText,
  shareButtonLoadingText,
  tryAgainButtonText,
  rateButtonText,
}) => {
  const tokens = useAppDesignTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginTop: tokens.spacing.xl,
          gap: tokens.spacing.md,
        },
        buttonRow: {
          flexDirection: "row",
          gap: tokens.spacing.md,
        },
        button: {
          flex: 1,
        },
        fullWidthButton: {
          width: "100%",
        },
      }),
    [tokens],
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <AtomicButton
          title={isSaving ? saveButtonLoadingText : saveButtonText}
          onPress={onDownload}
          disabled={isSaving}
          variant="outline"
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
      </View>
      <View style={styles.buttonRow}>
        <AtomicButton
          title={tryAgainButtonText}
          onPress={onTryAgain}
          variant="outline"
          icon="refresh"
          style={styles.button}
        />
        {onRate && rateButtonText && (
          <AtomicButton
            title={rateButtonText}
            onPress={onRate}
            variant="primary"
            icon="star"
            style={styles.button}
          />
        )}
      </View>
    </View>
  );
};
