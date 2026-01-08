/**
 * Wardrobe Selector Component
 * Wardrobe style selector with intensity control
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { CoupleFeatureSelection } from "../../domain/types";

const WARDROBE_STYLES = [
  { id: "casual", iconKey: "shirt-outline" },
  { id: "formal", iconKey: "briefcase-outline" },
  { id: "sporty", iconKey: "fitness-outline" },
  { id: "elegant", iconKey: "star-outline" },
];

export interface WardrobeSelectorProps {
  selection: CoupleFeatureSelection;
  onSelectionChange: (selection: CoupleFeatureSelection) => void;
  translationPrefix: string;
  t: (key: string) => string;
}

export const WardrobeSelector: React.FC<WardrobeSelectorProps> = ({
  selection,
  onSelectionChange,
  translationPrefix,
  t,
}) => {
  const tokens = useAppDesignTokens();
  const selectedStyle = selection.wardrobeStyle;
  const intensity = selection.wardrobeIntensity || 70;

  const handleStyleSelect = (styleId: string) => {
    onSelectionChange({ ...selection, wardrobeStyle: styleId });
  };

  const handleIntensityChange = (value: number) => {
    onSelectionChange({ ...selection, wardrobeIntensity: value });
  };

  return (
    <ScrollView style={s.container}>
      <View style={s.section}>
        <AtomicText
          type="bodyMedium"
          style={[s.title, { color: tokens.colors.textPrimary }]}
        >
          {t(`${translationPrefix}.selectStyle`)}
        </AtomicText>

        <View style={s.grid}>
          {WARDROBE_STYLES.map((style) => {
            const isSelected = selectedStyle === style.id;
            return (
              <TouchableOpacity
                key={style.id}
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
                onPress={() => handleStyleSelect(style.id)}
              >
                <AtomicIcon
                  name={style.iconKey as never}
                  size="lg"
                  color={isSelected ? "primary" : "textSecondary"}
                />
                <AtomicText
                  type="labelMedium"
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
                  {t(`${translationPrefix}.styles.${style.id}`)}
                </AtomicText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {selectedStyle && (
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
                style={[s.button, { backgroundColor: intensity === value ? tokens.colors.primary : tokens.colors.surface, borderColor: intensity === value ? tokens.colors.primary : tokens.colors.borderLight }]}
                onPress={() => handleIntensityChange(value)}
              >
                <AtomicText type="labelSmall" style={{ color: intensity === value ? tokens.colors.onPrimary : tokens.colors.textSecondary }}>
                  {value}%
                </AtomicText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const s = StyleSheet.create({
  container: { flex: 1 },
  section: { padding: 16, marginBottom: 8 },
  title: { fontWeight: "600", marginBottom: 12 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: { width: "47%", padding: 16, borderRadius: 12, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  label: { marginTop: 8, textAlign: "center" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  slider: { flexDirection: "row", gap: 8, marginTop: 8 },
  button: { flex: 1, padding: 12, borderRadius: 8, borderWidth: 2, alignItems: "center" },
});
