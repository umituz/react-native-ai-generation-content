/**
 * Image Size Selector Component
 * Selection for image output size
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { ImageSize } from "../../domain/types/form.types";

export interface ImageSizeOption {
  value: ImageSize;
  label: string;
}

export interface ImageSizeSelectorProps {
  value: ImageSize;
  onChange: (size: ImageSize) => void;
  options: ImageSizeOption[];
  label: string;
}

export const ImageSizeSelector: React.FC<ImageSizeSelectorProps> = ({
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
      <View style={styles.optionsGrid}>
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
                type="bodySmall"
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
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
});
