/**
 * ExamplePrompts Component
 * Horizontal scrollable list of example prompts
 * Props-driven for 100+ apps compatibility
 */

import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet, type ViewStyle } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export interface ExamplePromptsProps {
  readonly prompts: readonly string[];
  readonly onSelectPrompt: (prompt: string) => void;
  readonly title?: string;
  readonly cardWidth?: number;
  readonly style?: ViewStyle;
}

export const ExamplePrompts: React.FC<ExamplePromptsProps> = ({
  prompts,
  onSelectPrompt,
  title = "✨ Example Prompts",
  cardWidth = 180,
  style,
}) => {
  const tokens = useAppDesignTokens();

  if (prompts.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      {title && (
        <AtomicText
          type="bodyMedium"
          style={[styles.label, { color: tokens.colors.textPrimary }]}
        >
          {title}
        </AtomicText>
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {prompts.map((prompt) => (
          <TouchableOpacity
            key={prompt}
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
              style={[styles.promptText, { color: tokens.colors.textPrimary }]}
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
    paddingVertical: 16,
    width: "100%",
  },
  label: {
    fontWeight: "600",
    marginBottom: 12,
    marginHorizontal: 16,
  },
  scrollView: {
    marginHorizontal: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingRight: 32,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    minHeight: 60,
    justifyContent: "center",
  },
  promptText: {
    lineHeight: 18,
  },
});
