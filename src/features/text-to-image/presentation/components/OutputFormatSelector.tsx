/**
 * Output Format Selector Component
 * Selection for image output format
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { OutputFormat } from "../../domain/types/form.types";

export interface OutputFormatOption {
  value: OutputFormat;
  label: string;
}

export interface OutputFormatSelectorProps {
  value: OutputFormat;
  onChange: (format: OutputFormat) => void;
  options: OutputFormatOption[];
  label: string;
}

export const OutputFormatSelector: React.FC<OutputFormatSelectorProps> = ({
  value,
  onChange,
  options,
  label,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.container}>
      <AtomicText
        type="bodyMedium"
        style={[styles.label, { color: tokens.colors.textPrimary }]}
      >
        {label}
      </AtomicText>
      <View style={styles.optionsRow}>
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.option,
                {
                  backgroundColor: isSelected
                    ? tokens.colors.primary
                    : tokens.colors.surface,
                  borderColor: isSelected
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
                },
              ]}
              onPress={() => onChange(option.value)}
              activeOpacity={0.7}
            >
              <AtomicText
                type="bodyMedium"
                style={{
                  color: isSelected ? "#FFFFFF" : tokens.colors.textPrimary,
                  fontWeight: isSelected ? "600" : "400",
                }}
              >
                {option.label}
              </AtomicText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  option: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
});
