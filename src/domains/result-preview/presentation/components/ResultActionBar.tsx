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
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 16,
          gap: 8,
          minWidth: 110,
          backgroundColor: tokens.colors.primary,
        },
        iconButton: {
          width: 56,
          height: 56,
          borderRadius: 28,
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
    [tokens],
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
            <AtomicIcon name="Download" customSize={24} color="onPrimary" />
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
            <AtomicIcon name="Share2" customSize={24} color="onPrimary" />
          )}
        </TouchableOpacity>
        {showRating && onRate && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onRate}
            activeOpacity={0.7}
          >
            <AtomicIcon name="Star" customSize={24} color="onPrimary" />
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
          <AtomicIcon name="download" customSize={18} color="onPrimary" />
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
          <AtomicIcon name="share-2" customSize={18} color="onPrimary" />
        )}
        <AtomicText style={styles.buttonText}>{shareButtonText}</AtomicText>
      </TouchableOpacity>
      {showTryAgain && (
        <TouchableOpacity style={styles.button} onPress={onTryAgain} activeOpacity={0.7}>
          <AtomicIcon name="refresh-cw" customSize={18} color="onPrimary" />
          <AtomicText style={styles.buttonText}>{tryAgainButtonText}</AtomicText>
        </TouchableOpacity>
      )}
    </View>
  );
};
