/**
 * Number of Images Selector Component
 * Grid of buttons to select number of images to generate
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { NumImages } from "../../domain/types/form.types";

export interface NumImagesSelectorProps {
  value: NumImages;
  onChange: (num: NumImages) => void;
  options: NumImages[];
  label: string;
}

export const NumImagesSelector: React.FC<NumImagesSelectorProps> = ({
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
      <View style={styles.grid}>
        {options.map((num) => {
          const isSelected = value === num;
          return (
            <TouchableOpacity
              key={num}
              style={[
                styles.button,
                {
                  backgroundColor: isSelected
                    ? tokens.colors.primary
                    : tokens.colors.surface,
                  borderColor: isSelected
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
                },
              ]}
              onPress={() => onChange(num)}
              activeOpacity={0.7}
            >
              <AtomicText
                type="bodyLarge"
                style={{
                  color: isSelected ? "#FFFFFF" : tokens.colors.textPrimary,
                  fontWeight: isSelected ? "700" : "400",
                }}
              >
                {num}
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
    marginBottom: 24,
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
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
  },
});
