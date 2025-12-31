/**
 * VideoTypeSelector Component
 * Horizontal scroll selector for different video types with emojis.
 */

import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { VideoTypeOption } from "../../domain/types/script.types";

export interface VideoTypeSelectorProps {
  readonly selectedType: string;
  readonly onSelectType: (typeId: string) => void;
  readonly types: readonly VideoTypeOption[];
  readonly title?: string;
}

export const VideoTypeSelector: React.FC<VideoTypeSelectorProps> = ({
  selectedType,
  onSelectType,
  types,
  title = "Video Type",
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.section}>
      <AtomicText
        type="bodyMedium"
        style={[styles.title, { color: tokens.colors.textPrimary }]}
      >
        {title}
      </AtomicText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {types.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.card,
              {
                backgroundColor:
                  selectedType === type.id
                    ? tokens.colors.primary
                    : tokens.colors.surface,
                borderColor:
                  selectedType === type.id
                    ? tokens.colors.primary
                    : tokens.colors.borderLight,
              },
            ]}
            onPress={() => onSelectType(type.id)}
          >
            <AtomicText type="headlineLarge">{type.emoji}</AtomicText>
            <AtomicText
              type="bodySmall"
              style={{
                color:
                  selectedType === type.id
                    ? tokens.colors.onPrimary
                    : tokens.colors.textPrimary,
                fontWeight: selectedType === type.id ? "600" : "400",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              {type.name}
            </AtomicText>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    marginBottom: 12,
  },
  scrollContent: {
    paddingRight: 16,
  },
  card: {
    width: 100,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    marginRight: 12,
    alignItems: "center",
  },
});
