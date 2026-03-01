/**
 * ResultDisplay Component
 * Generic result display with save/reset actions
 * Props-driven for 100+ apps compatibility
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText, AtomicButton, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

export interface ResultDisplayAction {
  readonly id: string;
  readonly label: string;
  readonly onPress: () => void;
  readonly variant?: "primary" | "outline";
  readonly icon?: string;
}

export interface ResultDisplayProps {
  readonly visible?: boolean;
  readonly successText: string;
  readonly actions: ResultDisplayAction[];
  readonly successIcon?: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  visible = true,
  successText,
  actions,
  successIcon = "checkmark-circle",
}) => {
  const tokens = useAppDesignTokens();

  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.container, { marginTop: tokens.spacing.lg }]}>
      <View style={styles.successHeader}>
        <AtomicIcon
          name={successIcon}
          customSize={24}
          customColor={tokens.colors.success}
        />
        <AtomicText
          type="bodyMedium"
          style={[styles.successText, { color: tokens.colors.success }]}
        >
          {successText}
        </AtomicText>
      </View>
      <View style={[styles.actionButtons, { gap: tokens.spacing.sm }]}>
        {actions.map((action) => (
          <AtomicButton
            key={action.id}
            onPress={action.onPress}
            variant={action.variant === "outline" ? "outline" : undefined}
            style={styles.actionButton}
          >
            <View style={styles.buttonContent}>
              {action.icon && (
                <AtomicIcon
                  name={action.icon}
                  customSize={18}
                  customColor={
                    action.variant === "outline"
                      ? tokens.colors.primary
                      : tokens.colors.onPrimary
                  }
                />
              )}
              <AtomicText
                type="bodyMedium"
                style={{
                  color:
                    action.variant === "outline"
                      ? tokens.colors.primary
                      : tokens.colors.onPrimary,
                }}
              >
                {action.label}
              </AtomicText>
            </View>
          </AtomicButton>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  successHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  successText: {
    textAlign: "center",
  },
  actionButtons: {
    width: "100%",
    maxWidth: 280,
  },
  actionButton: {
    flex: 1,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
