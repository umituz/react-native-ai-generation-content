/**
 * GenerateButton Component
 * Generic AI generation button with gradient/solid variants
 * Props-driven for 100+ apps compatibility
 */

import React from "react";
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
  AtomicIcon,
} from "@umituz/react-native-design-system";
import { LinearGradient } from "expo-linear-gradient";

export interface GenerateButtonProps {
  readonly isDisabled?: boolean;
  readonly isProcessing?: boolean;
  readonly onPress: () => void;
  readonly text: string;
  readonly processingText?: string;
  readonly variant?: "gradient" | "solid";
  readonly gradientColors?: readonly [string, string, ...string[]];
  readonly icon?: string;
  readonly iconSize?: number;
  readonly costLabel?: string;
  readonly accessoryRight?: React.ReactNode;
  readonly onAccessoryRightPress?: () => void;
  readonly style?: any;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  isDisabled = false,
  isProcessing = false,
  onPress,
  text,
  processingText,
  variant = "gradient",
  gradientColors = ["#FF6B9D", "#C74375", "#FF6B9D"],
  icon = "sparkles",
  iconSize = 24,
  costLabel,
  accessoryRight,
  onAccessoryRightPress,
  style,
}) => {
  const tokens = useAppDesignTokens();
  const disabled = isDisabled || isProcessing;
  const displayText = isProcessing && processingText ? processingText : text;
  const finalDisplayText = costLabel ? `${displayText} (${costLabel})` : displayText;

  if (variant === "solid") {
    return (
      <View style={[styles.solidContainer, { marginTop: tokens.spacing.xl }, style]}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
            style={[
              styles.solidButton,
              {
                backgroundColor: disabled
                  ? tokens.colors.surfaceSecondary
                  : tokens.colors.primary,
                flex: 1,
              },
            ]}
          >
            <View style={styles.buttonContent}>
              {isProcessing ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <AtomicIcon name={icon} customSize={20} customColor="#FFFFFF" />
              )}
              <AtomicText type="bodyLarge" style={styles.solidButtonText}>
                {finalDisplayText}
              </AtomicText>
            </View>
          </TouchableOpacity>
          {accessoryRight && (
            <TouchableOpacity
              onPress={onAccessoryRightPress}
              style={[styles.accessory, { backgroundColor: tokens.colors.surfaceSecondary }]}
            >
              {accessoryRight}
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.gradientContainer, { marginTop: tokens.spacing.xl }, style]}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled}
          activeOpacity={0.85}
          style={[styles.buttonWrapper, accessoryRight && { flex: 1 }]}
        >
          <LinearGradient
            colors={disabled ? ["#9CA3AF", "#6B7280"] : gradientColors}
            start={[0, 0]}
            end={[1, 0]}
            style={[styles.gradientButton, disabled && styles.disabledButton]}
          >
            <View style={styles.buttonContent}>
            {isProcessing ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <AtomicIcon name={icon} customSize={iconSize} customColor="#FFF" />
            )}
              <AtomicText type="bodyLarge" style={styles.gradientButtonText}>
                {finalDisplayText}
              </AtomicText>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        {accessoryRight && (
          <TouchableOpacity
            onPress={onAccessoryRightPress}
            style={[styles.accessory, { backgroundColor: tokens.colors.surface, height: 56, width: 56 }]}
          >
            {accessoryRight}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  solidContainer: {
    paddingHorizontal: 16,
  },
  buttonWrapper: {
    width: "100%",
    maxWidth: 320,
    borderRadius: 30,
  },
  gradientButton: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  solidButton: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    opacity: 0.5,
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
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  gradientButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 18,
  },
  solidButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
