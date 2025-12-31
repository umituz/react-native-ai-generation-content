/**
 * Aspect Ratio Selector Component
 * Generic, props-driven aspect ratio selection
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { AspectRatioOption } from "./types";

export interface AspectRatioSelectorProps {
  ratios: AspectRatioOption[];
  selectedRatio: string;
  onRatioSelect: (ratio: string) => void;
  title: string;
}

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({
  ratios,
  selectedRatio,
  onRatioSelect,
  title,
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
        {title}
      </AtomicText>
      <View style={componentStyles.aspectRatioGrid}>
        {ratios.map((ratio) => (
          <TouchableOpacity
            key={ratio.id}
            style={[
              componentStyles.aspectRatioCard,
              {
                backgroundColor:
                  selectedRatio === ratio.id
                    ? tokens.colors.primary + "20"
                    : tokens.colors.surface,
                borderColor:
                  selectedRatio === ratio.id
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
              },
            ]}
            onPress={() => onRatioSelect(ratio.id)}
          >
            <AtomicIcon
              name={ratio.icon as never}
              size="lg"
              color={selectedRatio === ratio.id ? "primary" : "secondary"}
            />
            <AtomicText
              type="bodySmall"
              style={{
                color: tokens.colors.textPrimary,
                fontWeight: selectedRatio === ratio.id ? "600" : "400",
                marginTop: 8,
              }}
            >
              {ratio.name}
            </AtomicText>
            <AtomicText
              type="labelSmall"
              style={{ color: tokens.colors.textSecondary, marginTop: 2 }}
            >
              {ratio.description}
            </AtomicText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const componentStyles = StyleSheet.create({
  section: {
    padding: 16,
    marginBottom: 8,
  },
  aspectRatioGrid: {
    flexDirection: "row",
    gap: 12,
  },
  aspectRatioCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
  },
});
