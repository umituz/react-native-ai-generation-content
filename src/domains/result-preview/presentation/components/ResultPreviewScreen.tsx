/**
 * ResultPreviewScreen Component
 * Displays AI generation result with actions
 */

import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
  ScreenLayout,
  NavigationHeader,
} from "@umituz/react-native-design-system";
import { ResultImageCard } from "./ResultImageCard";
import { ResultActionBar } from "./ResultActionBar";
import { RecentCreationsSection } from "./RecentCreationsSection";
import type { ResultPreviewScreenProps } from "../types/result-preview.types";

export const ResultPreviewScreen: React.FC<ResultPreviewScreenProps> = ({
  imageUrl,
  isSaving,
  isSharing,
  onDownload,
  onShare,
  onTryAgain,
  onNavigateBack,
  _onRate,
  recentCreations,
  onViewAll,
  onCreationPress,
  translations,
  style,
}) => {
  const tokens = useAppDesignTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          paddingHorizontal: tokens.spacing.lg,
        },
        resultContainer: {
          marginTop: tokens.spacing.lg,
        },
        title: {
          fontSize: 18,
          fontWeight: "700",
          color: tokens.colors.textPrimary,
          marginBottom: tokens.spacing.md,
        },
      }),
    [tokens],
  );

  const displayImageUrl = useMemo(() => {
    if (!imageUrl) return null;

    // If not a URL and not a data URL, assume it's base64
    if (
      !imageUrl.startsWith("http") &&
      !imageUrl.startsWith("data:image")
    ) {
      return `data:image/jpeg;base64,${imageUrl}`;
    }

    return imageUrl;
  }, [imageUrl]);

  if (!displayImageUrl) {
    return null;
  }

  return (
    <ScreenLayout
      scrollable
      edges={["left", "right"]}
      backgroundColor={tokens.colors.backgroundPrimary}
    >
      <NavigationHeader
        title={translations.title}
        onBackPress={onNavigateBack}
      />
      <View style={[styles.container, style]}>
        <View style={styles.resultContainer}>
          <AtomicText style={styles.title}>
            {translations.yourResult}
          </AtomicText>
          <ResultImageCard imageUrl={displayImageUrl} />
          <ResultActionBar
            isSaving={isSaving}
            isSharing={isSharing}
            onDownload={onDownload}
            onShare={onShare}
            onTryAgain={onTryAgain}
            saveButtonText={translations.saveButton}
            shareButtonText={translations.shareButton}
            tryAgainButtonText={translations.tryAnother}
          />
        </View>
        {recentCreations && recentCreations.length > 0 && translations.recentCreations && translations.viewAll && (
          <RecentCreationsSection
            recentCreations={recentCreations}
            onViewAll={onViewAll}
            onCreationPress={onCreationPress}
            title={translations.recentCreations}
            viewAllLabel={translations.viewAll}
          />
        )}
      </View>
    </ScreenLayout>
  );
};
