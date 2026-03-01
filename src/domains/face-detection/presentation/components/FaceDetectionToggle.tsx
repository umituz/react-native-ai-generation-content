/**
 * FaceDetectionToggle Component
 *
 * A simple toggle switch for enabling/disabling AI face detection.
 */

import React from "react";
import { View, StyleSheet, Switch } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

interface FaceDetectionToggleProps {
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
  label: string;
  /** Hide the toggle temporarily - set to true to hide without removing the component */
  hidden?: boolean;
}

export const FaceDetectionToggle: React.FC<FaceDetectionToggleProps> = ({
  isEnabled,
  onToggle,
  label,
  hidden = false,
}) => {
  const tokens = useAppDesignTokens();

  // Return null if hidden - component is still here but not rendered
  if (hidden) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: tokens.colors.surfaceSecondary,
          borderColor: isEnabled
            ? tokens.colors.primary
            : tokens.colors.borderLight,
        },
      ]}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: isEnabled
                ? tokens.colors.primary + "20"
                : tokens.colors.backgroundPrimary,
            },
          ]}
        >
          <AtomicIcon
            name="scan"
            size={20}
            customColor={
              isEnabled ? tokens.colors.primary : tokens.colors.textSecondary
            }
          />
        </View>
        <AtomicText
          style={[styles.label, { color: tokens.colors.textPrimary }]}
        >
          {label}
        </AtomicText>
      </View>
      <Switch
        value={isEnabled}
        onValueChange={onToggle}
        trackColor={{
          false: tokens.colors.borderLight,
          true: tokens.colors.primary,
        }}
        thumbColor={tokens.colors.onPrimary}
        ios_backgroundColor={tokens.colors.borderLight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
});
