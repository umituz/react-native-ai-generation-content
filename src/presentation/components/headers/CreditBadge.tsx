import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

export interface CreditBadgeProps {
  readonly credits: number;
  readonly iconName?: string;
  readonly compact?: boolean;
}

export const CreditBadge: React.FC<CreditBadgeProps> = ({
  credits,
  iconName = "flash",
  compact = false,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View
      style={[
        styles.container,
        compact && styles.compact,
        { backgroundColor: tokens.colors.surface },
      ]}
    >
      <AtomicIcon name={iconName} size="sm" color="warning" />
      <AtomicText
        type={compact ? "labelSmall" : "labelMedium"}
        style={[styles.text, { color: tokens.colors.textPrimary }]}
      >
        {credits}
      </AtomicText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  compact: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  text: {
    fontWeight: "600",
  },
});
