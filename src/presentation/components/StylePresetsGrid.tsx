/**
 * StylePresetsGrid Component
 * Generic grid of preset styles with emojis, names, and optional duration badges.
 */

import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export interface StylePreset {
  readonly id: string;
  readonly name: string;
  readonly emoji: string;
  readonly description: string;
  readonly duration?: number;
}

export interface StylePresetsGridProps {
  readonly presets: readonly StylePreset[];
  readonly onPresetPress: (preset: StylePreset) => void;
  readonly disabled?: boolean;
  readonly title?: string;
}

export const StylePresetsGrid: React.FC<StylePresetsGridProps> = ({
  presets,
  onPresetPress,
  disabled = false,
  title = "Quick Start - Choose a Style",
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.section}>
      <AtomicText
        type="bodyMedium"
        style={[styles.title, { color: tokens.colors.textPrimary }]}
      >
        ⚡ {title}
      </AtomicText>
      <View style={styles.grid}>
        {presets.map((preset) => (
          <TouchableOpacity
            key={preset.id}
            style={[
              styles.card,
              {
                backgroundColor: tokens.colors.surface,
                borderColor: tokens.colors.border,
              },
            ]}
            onPress={() => onPresetPress(preset)}
            disabled={disabled}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.emoji}>{preset.emoji}</Text>
              {preset.duration !== undefined && (
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: tokens.colors.surfaceVariant },
                  ]}
                >
                  <AtomicText
                    type="labelSmall"
                    style={{ color: tokens.colors.primary, fontSize: 10 }}
                  >
                    {preset.duration}s
                  </AtomicText>
                </View>
              )}
            </View>
            <AtomicText
              type="bodyMedium"
              style={[styles.cardTitle, { color: tokens.colors.textPrimary }]}
            >
              {preset.name}
            </AtomicText>
            <AtomicText
              type="labelSmall"
              style={{ color: tokens.colors.textSecondary, marginTop: 4 }}
            >
              {preset.description}
            </AtomicText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 16,
    width: "100%",
  },
  title: {
    fontWeight: "600",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    flex: 1,
    minWidth: "47%",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  emoji: {
    fontSize: 40,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cardTitle: {
    fontWeight: "600",
    marginTop: 8,
  },
});
