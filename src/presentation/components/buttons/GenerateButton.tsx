/**
 * GenerateButton Component
 * Generic AI generation button using design system tokens
 * Props-driven for 100+ apps compatibility
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity, type ViewStyle } from "react-native";
import { AtomicText, AtomicIcon, AtomicSpinner } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

export interface GenerateButtonProps {
  readonly isDisabled?: boolean;
  readonly isProcessing?: boolean;
  readonly onPress: () => void;
  readonly text: string;
  readonly processingText?: string;
  readonly icon?: string;
  readonly iconSize?: number;
  readonly costLabel?: string;
  readonly accessoryRight?: React.ReactNode;
  readonly onAccessoryRightPress?: () => void;
  readonly style?: ViewStyle;
}


export const GenerateButton: React.FC<GenerateButtonProps> = ({
  isDisabled = false,
  isProcessing = false,
  onPress,
  text,
  processingText,
  icon = "sparkles",
  iconSize = 20,
  costLabel,
  accessoryRight,
  onAccessoryRightPress,
  style,
}) => {
  const tokens = useAppDesignTokens();
  const disabled = isDisabled || isProcessing;
  const displayText = isProcessing && processingText ? processingText : text;
  const finalDisplayText = costLabel ? `${displayText} (${costLabel})` : displayText;

  const handlePress = () => {
    if (!disabled) {
      onPress();
    }
  };

  return (
    <View style={[styles.container, { marginTop: tokens.spacing.xl }, style]}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={handlePress}
          disabled={disabled}
          activeOpacity={0.8}
          style={[
            styles.button,
            {
              backgroundColor: disabled
                ? tokens.colors.surfaceSecondary
                : tokens.colors.primary,
              borderRadius: tokens.radius.lg,
              flex: 1,
            },
          ]}
        >
          <View style={styles.buttonContent}>
            {isProcessing ? (
              <AtomicSpinner size="sm" color={disabled ? tokens.colors.textSecondary : tokens.colors.textInverse} />
            ) : (
              <AtomicIcon 
                name={icon} 
                customSize={iconSize} 
                customColor={disabled ? tokens.colors.textSecondary : tokens.colors.textInverse} 
              />
            )}
            <AtomicText
              type="bodyLarge"
              style={[
                styles.buttonText, 
                { color: disabled ? tokens.colors.textSecondary : tokens.colors.textInverse }
              ]}
            >
              {finalDisplayText}
            </AtomicText>
          </View>
        </TouchableOpacity>
        {accessoryRight && (
          <TouchableOpacity
            onPress={onAccessoryRightPress}
            style={[
              styles.accessory,
              {
                backgroundColor: tokens.colors.surfaceSecondary,
                borderRadius: tokens.radius.lg,
              },
            ]}
          >
            {accessoryRight}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
  },
  accessory: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "600",
  },
});
