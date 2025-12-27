/**
 * Example Prompts Component
 * Horizontal scrollable list of example prompts
 */

import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export interface ExamplePromptsProps {
  prompts: string[];
  onSelectPrompt: (prompt: string) => void;
  label: string;
  cardWidth?: number;
}

export const ExamplePrompts: React.FC<ExamplePromptsProps> = ({
  prompts,
  onSelectPrompt,
  label,
  cardWidth = 180,
}) => {
  const tokens = useAppDesignTokens();

  if (prompts.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <AtomicText
        type="bodyMedium"
        style={[styles.label, { color: tokens.colors.textPrimary }]}
      >
        {label}
      </AtomicText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {prompts.map((prompt, index) => (
          <TouchableOpacity
            key={`prompt-${index}`}
            style={[
              styles.card,
              {
                backgroundColor: tokens.colors.surface,
                width: cardWidth,
              },
            ]}
            onPress={() => onSelectPrompt(prompt)}
            activeOpacity={0.7}
          >
            <AtomicText
              type="bodySmall"
              style={{ color: tokens.colors.textPrimary }}
              numberOfLines={2}
            >
              {prompt}
            </AtomicText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontWeight: "600",
    marginBottom: 12,
  },
  scrollContent: {
    paddingRight: 16,
  },
  card: {
    padding: 12,
    borderRadius: 8,
    marginRight: 12,
  },
});
