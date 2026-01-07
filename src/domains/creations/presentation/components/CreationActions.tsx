/**
 * CreationActions Component
 * Flexible action buttons for creations
 */

import React, { useMemo } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  useAppDesignTokens,
  AtomicIcon,
  AtomicSpinner,
} from "@umituz/react-native-design-system";

export interface CreationAction {
  /** Unique action identifier */
  id: string;
  /** Icon name */
  icon: string;
  /** Icon color (design system color key) */
  color?: "primary" | "secondary" | "error" | "success" | "textInverse";
  /** Show loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Use filled background (primary color) */
  filled?: boolean;
  /** Action handler */
  onPress: () => void;
}

interface CreationActionsProps {
  /** Array of actions to display */
  readonly actions: CreationAction[];
  /** Button size */
  readonly size?: "sm" | "md" | "lg";
  /** Layout direction */
  readonly direction?: "row" | "column";
}

const SIZES = {
  sm: { button: 36, icon: "sm" as const },
  md: { button: 44, icon: "md" as const },
  lg: { button: 52, icon: "lg" as const },
};

export function CreationActions({
  actions,
  size = "md",
  direction = "row",
}: CreationActionsProps) {
  const tokens = useAppDesignTokens();
  const sizeConfig = SIZES[size];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: direction,
          gap: 8,
        },
        actionButton: {
          width: sizeConfig.button,
          height: sizeConfig.button,
          borderRadius: sizeConfig.button / 2,
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: tokens.colors.surface,
          borderColor: tokens.colors.borderLight,
        },
        actionButtonFilled: {
          backgroundColor: tokens.colors.primary,
          borderWidth: 0,
        },
        actionButtonDisabled: {
          opacity: 0.5,
        },
      }),
    [tokens, sizeConfig, direction]
  );

  if (actions.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          style={[
            styles.actionButton,
            action.filled && styles.actionButtonFilled,
            action.disabled && styles.actionButtonDisabled,
          ]}
          onPress={action.onPress}
          disabled={action.disabled || action.loading}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          {action.loading ? (
            <AtomicSpinner
              size="sm"
              color={action.filled ? tokens.colors.textInverse : tokens.colors.primary}
            />
          ) : (
            <AtomicIcon
              name={action.icon}
              size={sizeConfig.icon}
              color={action.color || (action.filled ? "textInverse" : "primary")}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}
