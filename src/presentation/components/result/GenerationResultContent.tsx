/**
 * GenerationResultContent Component
 * Composition of result components for CelebrationModal
 */

import React from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import { Animated } from "@umituz/react-native-animation";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { ResultHeader } from "./ResultHeader";
import { ResultImageCard } from "./ResultImageCard";
import { ResultStoryCard } from "./ResultStoryCard";
import { ResultActions } from "./ResultActions";

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
  modalStyle?: any;
}

export const GenerationResultContent: React.FC<GenerationResultContentProps> = ({
  result,
  onShare,
  onSave,
  onRetry,
  isSharing,
  isSaving,
  translations,
  modalStyle,
}) => {
  const tokens = useAppDesignTokens();
  const styles = createStyles(tokens);

  return (
    <Animated.View style={[styles.container, modalStyle]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ResultHeader title={result.title} date={result.date} />
        <ResultImageCard imageUrl={result.imageUrl} badgeText={translations.aiGenerated} />
        {result.story && <ResultStoryCard story={result.story} />}
        <ResultActions
          onShare={onShare}
          onSave={onSave}
          onRetry={onRetry}
          isSharing={isSharing}
          isSaving={isSaving}
          translations={translations}
        />
      </ScrollView>
    </Animated.View>
  );
};

const createStyles = (tokens: any) =>
  StyleSheet.create({
    container: {
      width: width - 40,
      maxHeight: "90%",
      backgroundColor: tokens.colors.backgroundPrimary,
      borderRadius: 28,
      overflow: "hidden",
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingTop: 24,
      paddingBottom: 20,
    },
  });
