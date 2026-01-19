/**
 * WizardHeader Component
 * Header with back button on left, action button on right
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export interface WizardHeaderProps {
  readonly onBack: () => void;
  readonly onAction?: () => void;
  readonly backLabel?: string;
  readonly actionLabel?: string;
  readonly isActionDisabled?: boolean;
  readonly showAction?: boolean;
}

export const WizardHeader: React.FC<WizardHeaderProps> = ({
  onBack,
  onAction,
  backLabel,
  actionLabel,
  isActionDisabled = false,
  showAction = true,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={[styles.container, { paddingHorizontal: tokens.spacing.md }]}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <AtomicIcon name="chevron-left" size="md" color="textPrimary" />
        {backLabel ? (
          <AtomicText type="bodyMedium" color="textPrimary">
            {backLabel}
          </AtomicText>
        ) : null}
      </TouchableOpacity>

      {showAction && actionLabel ? (
        <TouchableOpacity
          onPress={onAction}
          disabled={isActionDisabled}
          style={[
            styles.actionButton,
            {
              backgroundColor: isActionDisabled
                ? tokens.colors.surfaceSecondary
                : tokens.colors.primary,
              borderRadius: tokens.radius.md,
            },
          ]}
        >
          <AtomicText
            type="labelLarge"
            style={{
              color: isActionDisabled
                ? tokens.colors.textSecondary
                : tokens.colors.textInverse,
              fontWeight: "600",
            }}
          >
            {actionLabel}
          </AtomicText>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  placeholder: {
    width: 80,
  },
});
