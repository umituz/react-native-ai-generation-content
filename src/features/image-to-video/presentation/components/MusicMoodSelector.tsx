/**
 * Music Mood Selector Component
 * Generic component for music mood selection
 */

import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { MusicMood, MusicMoodId } from "../../domain/types";

export interface MusicMoodSelectorProps {
  moods: MusicMood[];
  selectedMood: MusicMoodId;
  onMoodSelect: (moodId: MusicMoodId) => void;
  label: string;
  hasCustomAudio?: boolean;
  customAudioLabel?: string;
}

export const MusicMoodSelector: React.FC<MusicMoodSelectorProps> = ({
  moods,
  selectedMood,
  onMoodSelect,
  label,
  hasCustomAudio = false,
  customAudioLabel,
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={componentStyles.scroll}
      >
        {moods.map((mood) => {
          const isSelected = selectedMood === mood.id;
          return (
            <TouchableOpacity
              key={mood.id}
              style={[
                componentStyles.card,
                {
                  backgroundColor: isSelected
                    ? tokens.colors.primary
                    : tokens.colors.surface,
                  borderColor: isSelected
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
                },
              ]}
              onPress={() => onMoodSelect(mood.id)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  componentStyles.iconContainer,
                  {
                    backgroundColor: isSelected
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(0, 0, 0, 0.05)",
                  },
                ]}
              >
                <AtomicIcon
                  name={mood.icon as never}
                  size="lg"
                  color={isSelected ? "onSurface" : "primary"}
                />
              </View>
              <AtomicText
                type="bodySmall"
                style={[
                  componentStyles.moodName,
                  {
                    color: isSelected
                      ? tokens.colors.textInverse
                      : tokens.colors.textPrimary,
                  },
                ]}
              >
                {mood.name}
              </AtomicText>
              <AtomicText
                type="labelSmall"
                style={[
                  componentStyles.moodDescription,
                  {
                    color: isSelected
                      ? tokens.colors.textInverse
                      : tokens.colors.textSecondary,
                    opacity: isSelected ? 0.9 : 0.7,
                  },
                ]}
              >
                {mood.description}
              </AtomicText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {selectedMood === "custom" && hasCustomAudio && customAudioLabel && (
        <View
          style={[
            componentStyles.customBadge,
            { backgroundColor: tokens.colors.primary + "20" },
          ]}
        >
          <AtomicIcon name="checkmark-circle-outline" size="sm" color="primary" />
          <AtomicText
            type="labelSmall"
            style={[componentStyles.customBadgeText, { color: tokens.colors.primary }]}
          >
            {customAudioLabel}
          </AtomicText>
        </View>
      )}
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
  scroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  card: {
    width: 140,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    marginRight: 12,
    alignItems: "center",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  moodName: {
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  moodDescription: {
    marginTop: 4,
    textAlign: "center",
  },
  customBadge: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  customBadgeText: {
    marginLeft: 8,
    flex: 1,
  },
});
