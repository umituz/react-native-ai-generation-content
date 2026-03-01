/**
 * ResultStoryCard Component
 * Displays story text with quote styling - fully configurable
 */

import * as React from "react";
import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { ResultStoryConfig } from "../../types/result-config.types";
import { DEFAULT_RESULT_CONFIG } from "../../types/result-config.types";

interface StoryContentProps {
  story: string;
  showQuotes?: boolean;
  quoteIconStyle: object;
  quoteEndStyle: object;
  quoteIconEndStyle: object;
  textStyle: object;
}

const StoryContent: React.FC<StoryContentProps> = ({
  story,
  showQuotes,
  quoteIconStyle,
  quoteEndStyle,
  quoteIconEndStyle,
  textStyle,
}) => (
  <>
    {showQuotes && <AtomicText style={quoteIconStyle}>&quot;</AtomicText>}
    <AtomicText style={textStyle}>{story}</AtomicText>
    {showQuotes && (
      <View style={quoteEndStyle}>
        <AtomicText style={[quoteIconStyle, quoteIconEndStyle]}>&quot;</AtomicText>
      </View>
    )}
  </>
);

export interface ResultStoryCardProps {
  story: string;
  config?: ResultStoryConfig;
}

export const ResultStoryCard: React.FC<ResultStoryCardProps> = ({
  story,
  config = DEFAULT_RESULT_CONFIG.story,
}) => {
  const tokens = useAppDesignTokens();
  const cfg = { ...DEFAULT_RESULT_CONFIG.story, ...config };

  const containerStyle = useMemo(() => {
    const base = {
      padding: cfg.spacing?.padding ?? 20,
      borderRadius: 16,
    };

    if (cfg.borderStyle === "outline") {
      return {
        ...base,
        borderWidth: 1,
        borderColor: tokens.colors.primaryContainer,
        backgroundColor: tokens.colors.surface,
      };
    } else if (cfg.borderStyle === "filled") {
      return {
        ...base,
        backgroundColor: tokens.colors.primaryContainer,
      };
    }

    return {
      ...base,
      backgroundColor: tokens.colors.surface,
    };
  }, [cfg.borderStyle, cfg.spacing, tokens]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        outer: {
          paddingHorizontal: cfg.spacing?.paddingHorizontal ?? 20,
          marginBottom: cfg.spacing?.marginBottom ?? 20,
        },
        container: containerStyle,
        quoteIcon: {
          fontSize: 40,
          lineHeight: 40,
          color: tokens.colors.primary,
          opacity: 0.4,
          marginBottom: -12,
        },
        quoteEnd: {
          alignItems:
            cfg.textAlignment === "left"
              ? "flex-start"
              : cfg.textAlignment === "right"
                ? "flex-end"
                : "flex-end",
          marginTop: -12,
        },
        quoteIconEnd: {
          marginBottom: 0,
        },
        text: {
          fontSize: cfg.fontSize ?? 14,
          color: tokens.colors.textPrimary,
          textAlign: cfg.textAlignment ?? "center",
          lineHeight: (cfg.fontSize ?? 14) * 1.57,
          fontStyle: cfg.fontStyle ?? "italic",
          fontWeight: cfg.fontWeight ?? "500",
        },
      }),
    [tokens, cfg, containerStyle],
  );

  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        <StoryContent
          story={story}
          showQuotes={cfg.showQuotes}
          quoteIconStyle={styles.quoteIcon}
          quoteEndStyle={styles.quoteEnd}
          quoteIconEndStyle={styles.quoteIconEnd}
          textStyle={styles.text}
        />
      </View>
    </View>
  );
};
