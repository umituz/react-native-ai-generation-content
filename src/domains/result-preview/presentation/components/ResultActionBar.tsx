/**
 * ResultActionBar Component
 * Action buttons for save, share, retry, and rate
 */

import React, { useMemo } from "react";
import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from "react-native";
import {
  AtomicIcon,
  AtomicText,
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
  shareButtonText,
  tryAgainButtonText,
  rateButtonText,
}) => {
  const tokens = useAppDesignTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginTop: tokens.spacing.xl,
          paddingHorizontal: tokens.spacing.md,
        },
        gridContainer: {
          flexDirection: "row",
          justifyContent: "space-between",
          gap: tokens.spacing.md,
        },
        actionButton: {
          flex: 1,
          alignItems: "center",
          gap: tokens.spacing.sm,
        },
        iconContainer: {
          width: 56,
          height: 56,
          borderRadius: 28,
          alignItems: "center",
          justifyContent: "center",
        },
        iconContainerSecondary: {
          backgroundColor: tokens.colors.backgroundSecondary,
          borderWidth: 1,
          borderColor: tokens.colors.borderPrimary,
        },
        iconContainerPrimary: {
          backgroundColor: tokens.colors.primary,
        },
        label: {
          fontSize: 12,
          fontWeight: "500",
          color: tokens.colors.textSecondary,
        },
      }),
    [tokens],
  );

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onDownload}
          disabled={isSaving}
        >
          <View style={[styles.iconContainer, styles.iconContainerSecondary]}>
            {isSaving ? (
              <ActivityIndicator color={tokens.colors.primary} />
            ) : (
              <AtomicIcon name="download" size="md" color="textPrimary" />
            )}
          </View>
          <AtomicText style={styles.label}>{saveButtonText}</AtomicText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={onShare}
          disabled={isSharing}
        >
          <View style={[styles.iconContainer, styles.iconContainerPrimary]}>
            {isSharing ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <AtomicIcon name="share" size="md" color="white" />
            )}
          </View>
          <AtomicText style={styles.label}>{shareButtonText}</AtomicText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onTryAgain}>
          <View style={[styles.iconContainer, styles.iconContainerSecondary]}>
            <AtomicIcon name="refresh-cw" size="md" color="textPrimary" />
          </View>
          <AtomicText style={styles.label}>{tryAgainButtonText}</AtomicText>
        </TouchableOpacity>

        {onRate && rateButtonText && (
          <TouchableOpacity style={styles.actionButton} onPress={onRate}>
            <View style={[styles.iconContainer, styles.iconContainerSecondary]}>
              <AtomicIcon name="thumbs-up" size="md" color="textPrimary" />
            </View>
            <AtomicText style={styles.label}>{rateButtonText}</AtomicText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
