/**
 * OptionsPanel Component
 * Single Responsibility: Display toggleable options for video generation
 */

import React from "react";
import { View, StyleSheet, Switch, TouchableOpacity } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { OptionsPanelProps } from "../../domain/types";

export const OptionsPanel: React.FC<OptionsPanelProps> = ({
  soundEnabled,
  onSoundToggle,
  professionalMode,
  onProfessionalModeToggle,
  duration,
  soundLabel,
  soundBadge,
  professionalLabel,
  style,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <View style={styles.labelContainer}>
          <AtomicText type="labelMedium" style={styles.label}>
            {soundLabel}
          </AtomicText>
          {soundBadge && (
            <View
              style={[styles.badge, { backgroundColor: tokens.colors.success }]}
            >
              <AtomicText type="labelSmall" style={[styles.badgeText, { color: tokens.colors.textInverse }]}>
                {soundBadge}
              </AtomicText>
            </View>
          )}
        </View>
        <Switch
          value={soundEnabled}
          onValueChange={onSoundToggle}
          trackColor={{
            false: tokens.colors.surface,
            true: tokens.colors.success,
          }}
        />
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={[
            styles.controlButton,
            { backgroundColor: professionalMode ? tokens.colors.surface : tokens.colors.surfaceVariant },
          ]}
          onPress={() => onProfessionalModeToggle(!professionalMode)}
        >
          <AtomicText
            type="labelMedium"
            color={professionalMode ? "textPrimary" : "textSecondary"}
          >
            {professionalLabel}
          </AtomicText>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.controlButton, styles.durationButton, { backgroundColor: tokens.colors.surfaceVariant }]}>
          <AtomicText type="labelMedium" color="textSecondary">
            {duration}s
          </AtomicText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    gap: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontWeight: "600",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontWeight: "bold",
    fontSize: 10,
  },
  controlsRow: {
    flexDirection: "row",
    gap: 12,
  },
  controlButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  durationButton: {
    minWidth: 60,
  },
});
