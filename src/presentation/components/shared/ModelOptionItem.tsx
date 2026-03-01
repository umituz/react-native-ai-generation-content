/**
 * ModelOptionItem Component
 * Single Responsibility: Render a single model option in the list
 */

import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { ModelOption } from "./ModelSelector";

interface ModelOptionItemProps {
  readonly model: ModelOption;
  readonly isSelected: boolean;
  readonly onSelect: (modelId: string) => void;
  readonly creditsLabel: string;
}

export const ModelOptionItem: React.FC<ModelOptionItemProps> = ({
  model,
  isSelected,
  onSelect,
  creditsLabel,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <TouchableOpacity
      style={[
        styles.option,
        {
          backgroundColor: isSelected
            ? `${tokens.colors.primary}15`
            : "transparent",
        },
      ]}
      onPress={() => onSelect(model.id)}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
    >
      <View style={styles.optionContent}>
        <View style={styles.optionInfo}>
          <AtomicText
            type="bodyLarge"
            style={{
              color: isSelected
                ? tokens.colors.primary
                : tokens.colors.textPrimary,
              fontWeight: isSelected ? "600" : "400",
            }}
          >
            {model.name}
          </AtomicText>
          {model.description && (
            <AtomicText
              type="bodySmall"
              color="textSecondary"
              numberOfLines={2}
            >
              {model.description}
            </AtomicText>
          )}
          {model.badge && (
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: `${tokens.colors.success}20`,
                },
              ]}
            >
              <AtomicText type="labelSmall" color="success">
                {model.badge}
              </AtomicText>
            </View>
          )}
        </View>
        <View style={styles.optionRight}>
          {model.cost !== undefined && (
            <AtomicText type="labelSmall" color="textSecondary">
              {model.cost} {creditsLabel}
            </AtomicText>
          )}
          {isSelected && (
            <AtomicIcon name="checkmark" size="sm" color="primary" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  optionInfo: {
    flex: 1,
    gap: 4,
  },
  optionRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
});
