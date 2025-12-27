/**
 * TextToVoiceExamplePrompts Component
 * Horizontal scrolling example prompts
 */

import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalization } from "@umituz/react-native-localization";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { TextToVoiceExamplePromptsProps } from "../../domain/types";

export const TextToVoiceExamplePrompts: React.FC<
  TextToVoiceExamplePromptsProps
> = ({ prompts, onSelectPrompt, labelKey, style }) => {
  const { t } = useLocalization();
  const tokens = useAppDesignTokens();

  if (prompts.length === 0) {
    return null;
  }

  return (
    <View style={[styles.section, style]}>
      <AtomicText
        type="bodyMedium"
        style={[styles.label, { color: tokens.colors.textPrimary }]}
      >
        {t(labelKey)}
      </AtomicText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {prompts.map((prompt, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.promptCard, { backgroundColor: tokens.colors.surface }]}
            onPress={() => onSelectPrompt(prompt)}
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
  section: {
    marginBottom: 24,
  },
  label: {
    fontWeight: "600",
    marginBottom: 12,
  },
  scrollView: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  promptCard: {
    padding: 12,
    borderRadius: 8,
    marginRight: 12,
    minWidth: 150,
    maxWidth: 200,
  },
});
