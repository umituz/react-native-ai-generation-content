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
  saveButtonText,
  shareButtonText,
  tryAgainButtonText,
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
        buttonText: {
          fontWeight: "700",
          color: tokens.colors.textInverse,
          fontSize: 15,
        },
      }),
    [tokens],
  );

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
          <AtomicIcon name="download-outline" size="sm" color="onPrimary" />
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
          <AtomicIcon name="share-social-outline" size="sm" color="onPrimary" />
        )}
        <AtomicText style={styles.buttonText}>{shareButtonText}</AtomicText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={onTryAgain}
        activeOpacity={0.7}
      >
        <AtomicIcon name="refresh-outline" size="sm" color="onPrimary" />
        <AtomicText style={styles.buttonText}>{tryAgainButtonText}</AtomicText>
      </TouchableOpacity>
    </View>
  );
};
