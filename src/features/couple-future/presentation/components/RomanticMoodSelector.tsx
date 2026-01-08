/**
 * Romantic Mood Selector Component
 * Multi-select mood selector with intensity control
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { CoupleFeatureSelection } from "../../domain/types";
import { ROMANTIC_MOOD_OPTIONS } from "../../infrastructure/coupleFeatureRegistry";

export interface RomanticMoodSelectorProps {
  selection: CoupleFeatureSelection;
  onSelectionChange: (selection: CoupleFeatureSelection) => void;
  translationPrefix: string;
  t: (key: string) => string;
}

export const RomanticMoodSelector: React.FC<RomanticMoodSelectorProps> = ({
  selection,
  onSelectionChange,
  translationPrefix,
  t,
}) => {
  const tokens = useAppDesignTokens();
  const selectedMoods = selection.romanticMoods || [];
  const intensity = selection.romanticIntensity || 70;

  const handleMoodToggle = (moodId: string) => {
    const newMoods = selectedMoods.includes(moodId)
      ? selectedMoods.filter((id) => id !== moodId)
      : [...selectedMoods, moodId];
    onSelectionChange({ ...selection, romanticMoods: newMoods });
  };

  const handleIntensityChange = (value: number) => {
    onSelectionChange({ ...selection, romanticIntensity: value });
  };

  return (
    <ScrollView style={s.container}>
      <View style={s.section}>
        <AtomicText
          type="bodyMedium"
          style={[s.title, { color: tokens.colors.textPrimary }]}
        >
          {t(`${translationPrefix}.selectMoods`)}
        </AtomicText>

        <View style={s.grid}>
          {ROMANTIC_MOOD_OPTIONS.map((mood) => {
            const isSelected = selectedMoods.includes(mood.id);
            return (
              <TouchableOpacity
                key={mood.id}
                style={[
                  s.card,
                  {
                    backgroundColor: isSelected
                      ? `${tokens.colors.primary}15`
                      : tokens.colors.surface,
                    borderColor: isSelected
                      ? tokens.colors.primary
                      : tokens.colors.borderLight,
                  },
                ]}
                onPress={() => handleMoodToggle(mood.id)}
              >
                <AtomicIcon
                  name={mood.iconKey as never}
                  size="md"
                  color={isSelected ? "primary" : "textSecondary"}
                />
                <AtomicText
                  type="labelSmall"
                  style={[
                    s.label,
                    {
                      color: isSelected
                        ? tokens.colors.primary
                        : tokens.colors.textSecondary,
                      fontWeight: isSelected ? "600" : "400",
                    },
                  ]}
                >
                  {t(`${translationPrefix}.moods.${mood.labelKey}`)}
                </AtomicText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={s.section}>
        <View style={s.header}>
          <AtomicText type="bodyMedium" style={[s.title, { color: tokens.colors.textPrimary }]}>
            {t(`${translationPrefix}.intensity`)}
          </AtomicText>
          <AtomicText type="bodyMedium" style={{ color: tokens.colors.primary, fontWeight: "600" }}>
            {intensity}%
          </AtomicText>
        </View>

        <View style={s.slider}>
          {[25, 50, 75, 100].map((value) => (
            <TouchableOpacity
              key={value}
              style={[
                s.button,
                {
                  backgroundColor: intensity === value ? tokens.colors.primary : tokens.colors.surface,
                  borderColor: intensity === value ? tokens.colors.primary : tokens.colors.borderLight,
                },
              ]}
              onPress={() => handleIntensityChange(value)}
            >
              <AtomicText
                type="labelSmall"
                style={{
                  color: intensity === value ? tokens.colors.onPrimary : tokens.colors.textSecondary,
                }}
              >
                {value}%
              </AtomicText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  container: { flex: 1 },
  section: { padding: 16, marginBottom: 8 },
  title: { fontWeight: "600", marginBottom: 12 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: { width: "22%", aspectRatio: 1, padding: 8, borderRadius: 12, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  label: { marginTop: 4, textAlign: "center", fontSize: 10 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  slider: { flexDirection: "row", gap: 8, marginTop: 8 },
  button: { flex: 1, padding: 12, borderRadius: 8, borderWidth: 2, alignItems: "center" },
});
