/**
 * Animation Style Selector Component
 * Generic component for animation style selection
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { AnimationStyle, AnimationStyleId } from "../../domain/types";

export interface AnimationStyleSelectorProps {
  styles: AnimationStyle[];
  selectedStyle: AnimationStyleId;
  onStyleSelect: (styleId: AnimationStyleId) => void;
  label: string;
}

export const AnimationStyleSelector: React.FC<AnimationStyleSelectorProps> = ({
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
        style={[componentStyles.label, { color: tokens.colors.textPrimary }]}
      >
        {label}
      </AtomicText>
      {styles.map((style) => {
        const isSelected = selectedStyle === style.id;
        return (
          <TouchableOpacity
            key={style.id}
            style={[
              componentStyles.card,
              {
                backgroundColor: isSelected
                  ? tokens.colors.primary + "20"
                  : tokens.colors.surface,
                borderColor: isSelected
                  ? tokens.colors.primary
                  : tokens.colors.borderLight,
              },
            ]}
            onPress={() => onStyleSelect(style.id)}
            activeOpacity={0.7}
          >
            <View style={componentStyles.cardContent}>
              <View
                style={[
                  componentStyles.iconContainer,
                  {
                    backgroundColor: isSelected
                      ? tokens.colors.primary
                      : tokens.colors.primary + "20",
                  },
                ]}
              >
                <AtomicIcon
                  name={style.icon as never}
                  size="md"
                  color={isSelected ? "onSurface" : "primary"}
                />
              </View>
              <View style={componentStyles.textContainer}>
                <AtomicText
                  type="bodyMedium"
                  style={[
                    componentStyles.styleName,
                    { color: tokens.colors.textPrimary },
                  ]}
                >
                  {style.name}
                </AtomicText>
                <AtomicText
                  type="labelSmall"
                  style={{ color: tokens.colors.textSecondary }}
                >
                  {style.description}
                </AtomicText>
              </View>
              {isSelected && (
                <AtomicIcon name="Check" size="md" color="primary" />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
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
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  styleName: {
    fontWeight: "600",
  },
});
