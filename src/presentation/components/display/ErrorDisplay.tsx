/**
 * ErrorDisplay Component
 * Generic error display with retry action
 * Props-driven for 100+ apps compatibility
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
  AtomicIcon,
} from "@umituz/react-native-design-system";

export interface ErrorDisplayProps {
  readonly error: string | null;
  readonly onRetry?: () => void;
  readonly retryText?: string;
  readonly icon?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  retryText,
  icon = "alert-circle",
}) => {
  const tokens = useAppDesignTokens();

  if (!error) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `${tokens.colors.error}15`,
          borderColor: `${tokens.colors.error}30`,
          padding: tokens.spacing.md,
          marginTop: tokens.spacing.md,
        },
      ]}
    >
      <View style={styles.header}>
        <AtomicIcon
          name={icon}
          customSize={20}
          customColor={tokens.colors.error}
        />
        <AtomicText
          type="bodyMedium"
          style={[styles.errorText, { color: tokens.colors.error }]}
        >
          {error}
        </AtomicText>
      </View>
      {onRetry && retryText && (
        <TouchableOpacity
          onPress={onRetry}
          style={[
            styles.retryButton,
            {
              backgroundColor: tokens.colors.error,
              marginTop: tokens.spacing.sm,
            },
          ]}
        >
          <AtomicIcon
            name="refresh"
            customSize={16}
            customColor={tokens.colors.onError}
          />
          <AtomicText
            type="bodySmall"
            style={{ color: tokens.colors.onError, fontWeight: "600" }}
          >
            {retryText}
          </AtomicText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  errorText: {
    flex: 1,
    lineHeight: 20,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
});
