/**
 * Style Selector Component
 * Generic, props-driven style selection for AI generation
 */

import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { StyleOption } from "./types";

export interface StyleSelectorProps {
  styles: StyleOption[];
  selectedStyle: string;
  onStyleSelect: (styleId: string) => void;
  label: string;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  styles,
  selectedStyle,
  onStyleSelect,
  label,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={componentStyles.section}>
      <AtomicText
        type="bodyMedium"
        style={{
          color: tokens.colors.textPrimary,
          fontWeight: "600",
          marginBottom: 12,
        }}
      >
        {label}
      </AtomicText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={componentStyles.stylesScroll}
      >
        {styles.map((style) => {
          const isSelected = selectedStyle === style.id;

          return (
            <TouchableOpacity
              key={style.id}
              style={[
                componentStyles.styleCard,
                {
                  backgroundColor: isSelected
                    ? tokens.colors.primary
                    : tokens.colors.surface,
                  borderColor: isSelected
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
                },
              ]}
              onPress={() => onStyleSelect(style.id)}
            >
              {style.thumbnail ? (
                <AtomicText type="headlineLarge" style={{ marginBottom: 8 }}>
                  {style.thumbnail}
                </AtomicText>
              ) : style.icon ? (
                <AtomicIcon
                  name={style.icon as never}
                  size="lg"
                  color={isSelected ? "primary" : "secondary"}
                />
              ) : null}
              <AtomicText
                type="bodySmall"
                style={{
                  color: isSelected
                    ? tokens.colors.textInverse
                    : tokens.colors.textPrimary,
                  fontWeight: isSelected ? "600" : "400",
                  textAlign: "center",
                }}
              >
                {style.name}
              </AtomicText>
              {style.description && (
                <AtomicText
                  type="labelSmall"
                  style={{
                    color: isSelected
                      ? tokens.colors.textInverse
                      : tokens.colors.textSecondary,
                    opacity: isSelected ? 0.9 : 0.7,
                    textAlign: "center",
                    marginTop: 4,
                  }}
                  numberOfLines={2}
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

const componentStyles = StyleSheet.create({
  section: {
    padding: 16,
    marginBottom: 8,
  },
  stylesScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  styleCard: {
    width: 120,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    marginRight: 12,
    alignItems: "center",
    minHeight: 140,
  },
});
