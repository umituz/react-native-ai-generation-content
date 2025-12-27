/**
 * Style Selector Component
 * Horizontal scrollable list of style options
 */

import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { StyleOption } from "../../domain/types/form.types";

export interface StyleSelectorProps {
  options: StyleOption[];
  value: string;
  onChange: (styleId: string) => void;
  label: string;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  options,
  value,
  onChange,
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {options.map((style) => {
          const isSelected = value === style.id;
          return (
            <TouchableOpacity
              key={style.id}
              style={[
                styles.card,
                {
                  backgroundColor: isSelected
                    ? tokens.colors.primary
                    : tokens.colors.surface,
                  borderColor: isSelected
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
                },
              ]}
              onPress={() => onChange(style.id)}
              activeOpacity={0.7}
            >
              <AtomicText
                type="bodyMedium"
                style={{
                  color: isSelected ? "#FFFFFF" : tokens.colors.textPrimary,
                  fontWeight: isSelected ? "600" : "400",
                }}
              >
                {style.name}
              </AtomicText>
              {style.description && (
                <AtomicText
                  type="labelSmall"
                  style={{
                    color: isSelected
                      ? "rgba(255,255,255,0.8)"
                      : tokens.colors.textSecondary,
                    marginTop: 4,
                  }}
                  numberOfLines={1}
                >
                  {style.description}
                </AtomicText>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
  scrollContent: {
    paddingRight: 16,
  },
  card: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 12,
    minWidth: 100,
  },
});
