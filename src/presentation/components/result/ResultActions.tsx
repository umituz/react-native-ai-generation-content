/**
 * ResultActions Component
 * Action buttons for generation results
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export interface ResultActionsProps {
  onShare?: () => void;
  onSave?: () => void;
  onRetry?: () => void;
  isSharing?: boolean;
  isSaving?: boolean;
  translations: {
    share: string;
    sharing: string;
    save: string;
    retry: string;
  };
}

export const ResultActions: React.FC<ResultActionsProps> = ({
  onShare,
  onSave,
  onRetry,
  isSharing = false,
  isSaving = false,
  translations,
}) => {
  const tokens = useAppDesignTokens();
  const styles = createStyles(tokens);

  return (
    <View style={styles.container}>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <AtomicIcon name="refresh" size={18} customColor={tokens.colors.primary} />
          <AtomicText style={styles.retryText}>{translations.retry}</AtomicText>
        </TouchableOpacity>
      )}

      <View style={styles.buttons}>
        {onShare && (
          <TouchableOpacity
            style={[styles.button, styles.shareButton]}
            onPress={onShare}
            disabled={isSharing}
          >
            <AtomicIcon
              name={isSharing ? "hourglass" : "share-social"}
              size={22}
              customColor="#fff"
            />
            <AtomicText style={styles.shareText}>
              {isSharing ? translations.sharing : translations.share}
            </AtomicText>
          </TouchableOpacity>
        )}

        {onSave && (
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={onSave}
            disabled={isSaving}
          >
            <AtomicIcon
              name={isSaving ? "hourglass" : "download"}
              size={22}
              customColor={tokens.colors.primary}
            />
            <AtomicText style={styles.saveText}>{translations.save}</AtomicText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const createStyles = (tokens: any) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    retryButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingVertical: 12,
      marginBottom: 16,
    },
    retryText: {
      fontSize: 14,
      fontWeight: "600",
      color: tokens.colors.primary,
    },
    buttons: {
      flexDirection: "row",
      gap: 10,
    },
    button: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingVertical: 14,
      borderRadius: 14,
    },
    shareButton: {
      backgroundColor: tokens.colors.primary,
    },
    shareText: {
      fontSize: 15,
      fontWeight: "700",
      color: "#fff",
    },
    saveButton: {
      backgroundColor: tokens.colors.surface,
      borderWidth: 2,
      borderColor: tokens.colors.primary,
    },
    saveText: {
      fontSize: 15,
      fontWeight: "700",
      color: tokens.colors.primary,
    },
  });
