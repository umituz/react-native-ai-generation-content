/**
 * Artist Style Selector Component
 * Single-select artist style selector with intensity control
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { CoupleFeatureSelection } from "../../domain/types";
import { ARTIST_STYLE_OPTIONS } from "../../infrastructure/coupleFeatureRegistry";

export interface ArtistStyleSelectorProps {
  selection: CoupleFeatureSelection;
  onSelectionChange: (selection: CoupleFeatureSelection) => void;
  translationPrefix: string;
  t: (key: string) => string;
}

export const ArtistStyleSelector: React.FC<ArtistStyleSelectorProps> = ({
  selection,
  onSelectionChange,
  translationPrefix,
  t,
}) => {
  const tokens = useAppDesignTokens();
  const selectedArtist = selection.artist;
  const intensity = selection.artistIntensity || 70;

  const handleArtistSelect = (artistId: string) => {
    onSelectionChange({ ...selection, artist: artistId });
  };

  const handleIntensityChange = (value: number) => {
    onSelectionChange({ ...selection, artistIntensity: value });
  };

  return (
    <ScrollView style={s.container}>
      <View style={s.section}>
        <AtomicText
          type="bodyMedium"
          style={[s.title, { color: tokens.colors.textPrimary }]}
        >
          {t(`${translationPrefix}.selectArtist`)}
        </AtomicText>

        <View style={s.grid}>
          {ARTIST_STYLE_OPTIONS.map((artist) => {
            const isSelected = selectedArtist === artist.id;
            return (
              <TouchableOpacity
                key={artist.id}
                style={[
                  s.card,
                  {
                    backgroundColor: isSelected ? `${tokens.colors.primary}15` : tokens.colors.surface,
                    borderColor: isSelected ? tokens.colors.primary : tokens.colors.borderLight,
                  },
                ]}
                onPress={() => handleArtistSelect(artist.id)}
              >
                <View style={[s.iconContainer, { backgroundColor: isSelected ? tokens.colors.primary : tokens.colors.surfaceVariant }]}>
                  <AtomicIcon name={artist.iconKey as never} size="lg" color={isSelected ? "onPrimary" : "textSecondary"} />
                </View>
                <AtomicText
                  type="labelMedium"
                  style={[s.label, { color: isSelected ? tokens.colors.primary : tokens.colors.textPrimary, fontWeight: isSelected ? "600" : "500" }]}
                >
                  {t(`${translationPrefix}.artists.${artist.labelKey}`)}
                </AtomicText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {selectedArtist && (
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
  card: { width: "47%", padding: 12, borderRadius: 12, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  iconContainer: { width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  label: { textAlign: "center" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  slider: { flexDirection: "row", gap: 8, marginTop: 8 },
  button: { flex: 1, padding: 12, borderRadius: 8, borderWidth: 2, alignItems: "center" },
});
