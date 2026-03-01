/**
 * GenerationResultContent Component
 * Composition of result components for CelebrationModal - fully configurable
 */

import * as React from "react";
import { useMemo } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  type ViewStyle,
  type StyleProp,
  type DimensionValue,
} from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { ResultHeader } from "./ResultHeader";
import { ResultImageCard } from "./ResultImageCard";
import { ResultStoryCard } from "./ResultStoryCard";
import { ResultActions } from "./ResultActions";
import type { ResultConfig } from "../../types/result-config.types";
import { DEFAULT_RESULT_CONFIG } from "../../types/result-config.types";

const { width } = Dimensions.get("window");

export interface GenerationResultData {
  imageUrl: string;
  story?: string;
  title?: string;
  date?: string;
}

export interface GenerationResultContentProps {
  result: GenerationResultData;
  onShare?: () => void;
  onSave?: () => void;
  onRetry?: () => void;
  isSharing?: boolean;
  isSaving?: boolean;
  translations: {
    share: string;
    sharing: string;
    save: string;
    retry: string;
    aiGenerated: string;
  };
  modalStyle?: StyleProp<ViewStyle>;
  config?: ResultConfig;
}

export const GenerationResultContent: React.FC<
  GenerationResultContentProps
> = ({
  result,
  onShare,
  onSave,
  onRetry,
  isSharing,
  isSaving,
  translations,
  modalStyle,
  config = DEFAULT_RESULT_CONFIG,
}) => {
  const tokens = useAppDesignTokens();
  const cfg = { ...DEFAULT_RESULT_CONFIG, ...config };

  const styles = useMemo(() => {
    const containerWidth = cfg.layout?.maxWidth ?? width - 40;
    const maxHeight: DimensionValue = (cfg.layout?.maxHeight ??
      "90%") as DimensionValue;

    return StyleSheet.create({
      container: {
        width: containerWidth,
        maxHeight,
        backgroundColor:
          cfg.layout?.backgroundColor ?? tokens.colors.background,
        borderRadius: cfg.layout?.borderRadius ?? 28,
        overflow: "hidden",
      },
      scrollView: {
        flex: 1,
      },
      scrollContent: {
        paddingTop: cfg.layout?.contentPadding?.top ?? 24,
        paddingBottom: cfg.layout?.contentPadding?.bottom ?? 20,
        paddingHorizontal: cfg.layout?.contentPadding?.horizontal ?? 0,
      },
    });
  }, [tokens, cfg, width]);

  return (
    <View style={[styles.container, modalStyle]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={cfg.layout?.scrollEnabled ?? true}
      >
        <ResultHeader
          title={result.title}
          date={result.date}
          config={cfg.header}
        />
        <ResultImageCard
          imageUrl={result.imageUrl}
          badgeText={translations.aiGenerated}
          config={cfg.image}
        />
        {result.story && (
          <ResultStoryCard story={result.story} config={cfg.story} />
        )}
        <ResultActions
          onShare={onShare}
          onSave={onSave}
          onRetry={onRetry}
          isSharing={isSharing}
          isSaving={isSaving}
          translations={translations}
          config={cfg.actions}
        />
      </ScrollView>
    </View>
  );
};
