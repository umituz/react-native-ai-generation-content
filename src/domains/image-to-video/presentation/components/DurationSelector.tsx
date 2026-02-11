/**
 * Duration Selector Component
 * Generic component for video duration selection
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { VideoDuration, DurationOption } from "../../domain/types";

export interface DurationSelectorProps {
  options: DurationOption[];
  selectedDuration: VideoDuration;
  onDurationSelect: (duration: VideoDuration) => void;
  label: string;
  imageCount: number;
  totalVideoLabel: string;
}

export const DurationSelector: React.FC<DurationSelectorProps> = ({
  options,
  selectedDuration,
  onDurationSelect,
  label,
  imageCount,
  totalVideoLabel,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={componentStyles.section}>
      <AtomicText
        type="bodyMedium"
        style={[componentStyles.label, { color: tokens.colors.textPrimary }]}
      >
        {label}
      </AtomicText>
      <View style={componentStyles.grid}>
        {options.map((option) => {
          const isSelected = selectedDuration === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                componentStyles.button,
                {
                  backgroundColor: isSelected
                    ? tokens.colors.primary
                    : tokens.colors.surface,
                  borderColor: isSelected
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
                },
              ]}
              onPress={() => onDurationSelect(option.value)}
              activeOpacity={0.7}
            >
              <AtomicText
                type="bodyMedium"
                style={{
                  color: isSelected
                    ? tokens.colors.textInverse
                    : tokens.colors.textPrimary,
                  fontWeight: isSelected ? "600" : "400",
                }}
              >
                {option.label ?? `${option.value}s`}
              </AtomicText>
            </TouchableOpacity>
          );
        })}
      </View>
      <AtomicText
        type="labelSmall"
        style={[componentStyles.hint, { color: tokens.colors.textSecondary }]}
      >
        {totalVideoLabel.replace("{duration}", String(imageCount * selectedDuration))}
      </AtomicText>
    </View>
  );
};

const componentStyles = StyleSheet.create({
  section: {
    padding: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  hint: {
    marginTop: 8,
  },
});
