/**
 * ResultActionBar Component
 * Action buttons for save, share, retry
 */

import React, { useMemo } from "react";
import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from "react-native";
import {
  AtomicIcon,
  AtomicText,
  useAppDesignTokens,
  useResponsive,
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
  iconOnly = false,
  showTryAgain = true,
  showRating = false,
}) => {
  const tokens = useAppDesignTokens();
  const { minTouchTarget } = useResponsive();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.lg,
          marginTop: tokens.spacing.xl,
        },
        button: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.lg,
          borderRadius: tokens.radius.md,
          gap: tokens.spacing.xs,
          minWidth: 110,
          backgroundColor: tokens.colors.primary,
        },
        iconButton: {
          width: minTouchTarget,
          height: minTouchTarget,
          borderRadius: minTouchTarget / 2,
          backgroundColor: tokens.colors.primary,
          justifyContent: "center",
          alignItems: "center",
        },
        buttonText: {
          fontWeight: "700",
          color: tokens.colors.textInverse,
          fontSize: 15,
        },
        disabledButton: {
          opacity: 0.6,
        },
      }),
    [tokens, minTouchTarget],
  );

  if (iconOnly) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.iconButton, isSaving && styles.disabledButton]}
          onPress={onDownload}
          disabled={isSaving}
          activeOpacity={0.7}
        >
          {isSaving ? (
            <ActivityIndicator color={tokens.colors.textInverse} size="small" />
          ) : (
            <AtomicIcon name="download-outline" customSize={20} color="onPrimary" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconButton, isSharing && styles.disabledButton]}
          onPress={onShare}
          disabled={isSharing}
          activeOpacity={0.7}
        >
          {isSharing ? (
            <ActivityIndicator color={tokens.colors.textInverse} size="small" />
          ) : (
            <AtomicIcon name="share-social-outline" customSize={20} color="onPrimary" />
          )}
        </TouchableOpacity>
        {showTryAgain && onTryAgain && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onTryAgain}
            activeOpacity={0.7}
          >
            <AtomicIcon name="refresh-outline" customSize={20} color="onPrimary" />
          </TouchableOpacity>
        )}
        {showRating && onRate && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onRate}
            activeOpacity={0.7}
          >
            <AtomicIcon name="star-outline" customSize={20} color="onPrimary" />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onDownload}
        disabled={isSaving}
        activeOpacity={0.7}
      >
        {isSaving ? (
          <ActivityIndicator color={tokens.colors.textInverse} size="small" />
        ) : (
          <AtomicIcon name="download-outline" customSize={18} color="onPrimary" />
        )}
        <AtomicText style={styles.buttonText}>{saveButtonText}</AtomicText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={onShare}
        disabled={isSharing}
        activeOpacity={0.7}
      >
        {isSharing ? (
          <ActivityIndicator color={tokens.colors.textInverse} size="small" />
        ) : (
          <AtomicIcon name="share-social-outline" customSize={18} color="onPrimary" />
        )}
        <AtomicText style={styles.buttonText}>{shareButtonText}</AtomicText>
      </TouchableOpacity>
      {showTryAgain && (
        <TouchableOpacity style={styles.button} onPress={onTryAgain} activeOpacity={0.7}>
          <AtomicIcon name="refresh-outline" customSize={18} color="onPrimary" />
          <AtomicText style={styles.buttonText}>{tryAgainButtonText}</AtomicText>
        </TouchableOpacity>
      )}
    </View>
  );
};
