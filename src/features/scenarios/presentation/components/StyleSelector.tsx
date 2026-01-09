/**
 * StyleSelector Component
 * Visual style selection grid for Magic Prompt
 */

import React, { useMemo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { VisualStyleOption } from "../../domain/types";

export interface StyleSelectorProps {
  readonly styles: readonly VisualStyleOption[];
  readonly selectedStyle: string;
  readonly title: string;
  readonly onSelect: (styleId: string) => void;
  readonly t: (key: string) => string;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  styles: visualStyles,
  selectedStyle,
  title,
  onSelect,
  t,
}) => {
  const tokens = useAppDesignTokens();

  const componentStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: tokens.spacing.lg,
        },
        sectionTitle: {
          fontWeight: "700",
          marginBottom: tokens.spacing.sm,
        },
        stylesGrid: {
          flexDirection: "row",
          gap: tokens.spacing.md,
        },
        styleItem: {
          flex: 1,
          alignItems: "center",
          gap: tokens.spacing.xs,
        },
        styleIcon: {
          width: 64,
          height: 64,
          borderRadius: tokens.borders.radius.md,
          alignItems: "center",
          justifyContent: "center",
        },
        styleLabel: {
          textAlign: "center",
        },
      }),
    [tokens],
  );

  return (
    <View style={componentStyles.container}>
      <AtomicText type="labelLarge" style={componentStyles.sectionTitle}>
        {title}
      </AtomicText>
      <View style={componentStyles.stylesGrid}>
        {visualStyles.map((style) => (
          <TouchableOpacity
            key={style.id}
            style={componentStyles.styleItem}
            onPress={() => onSelect(style.id)}
          >
            <View
              style={[
                componentStyles.styleIcon,
                {
                  backgroundColor:
                    selectedStyle === style.id
                      ? tokens.colors.primaryContainer
                      : tokens.colors.surface,
                  borderWidth: selectedStyle === style.id ? 2 : 1,
                  borderColor:
                    selectedStyle === style.id
                      ? tokens.colors.primary
                      : tokens.colors.border,
                },
              ]}
            >
              <AtomicIcon
                name={style.icon}
                size="md"
                color={selectedStyle === style.id ? "primary" : "textSecondary"}
              />
            </View>
            <AtomicText
              type="labelSmall"
              style={[
                componentStyles.styleLabel,
                {
                  color:
                    selectedStyle === style.id
                      ? tokens.colors.textPrimary
                      : tokens.colors.textSecondary,
                  fontWeight: selectedStyle === style.id ? "700" : "500",
                },
              ]}
            >
              {t(style.labelKey)}
            </AtomicText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
