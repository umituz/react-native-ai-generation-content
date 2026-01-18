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
import { VideoResultPlayer } from "../../../../presentation/components/display/VideoResultPlayer";
import type { ResultPreviewScreenProps } from "../types/result-preview.types";

export const ResultPreviewScreen: React.FC<ResultPreviewScreenProps> = ({
  imageUrl,
  videoUrl,
  isSaving,
  isSharing,
  onDownload,
  onShare,
  onTryAgain,
  onNavigateBack,
  onRate,
  recentCreations,
  onViewAll,
  onCreationPress,
  translations,
  style,
  hideLabel = false,
  iconOnly = false,
  showTryAgain = true,
  showRating = false,
}) => {
  const tokens = useAppDesignTokens();
  const isVideo = Boolean(videoUrl);

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

  const displayMediaUrl = useMemo(() => {
    const url = videoUrl || imageUrl;
    if (!url) return null;
    if (!isVideo && !url.startsWith("http") && !url.startsWith("data:image")) {
      return `data:image/jpeg;base64,${url}`;
    }
    return url;
  }, [imageUrl, videoUrl, isVideo]);

  if (!displayMediaUrl) return null;

  return (
    <ScreenLayout scrollable edges={["left", "right"]} backgroundColor={tokens.colors.backgroundPrimary}>
      <NavigationHeader title={translations.title} onBackPress={onNavigateBack} />
      <View style={[styles.container, style]}>
        <View style={styles.resultContainer}>
          {!hideLabel && (
            <AtomicText style={styles.title}>{translations.yourResult}</AtomicText>
          )}
          {isVideo ? (
            <VideoResultPlayer uri={displayMediaUrl} />
          ) : (
            <ResultImageCard imageUrl={displayMediaUrl} />
          )}
          <ResultActionBar
            isSaving={isSaving}
            isSharing={isSharing}
            onDownload={onDownload}
            onShare={onShare}
            onTryAgain={onTryAgain}
            onRate={onRate}
            saveButtonText={translations.saveButton}
            shareButtonText={translations.shareButton}
            tryAgainButtonText={translations.tryAnother}
            iconOnly={iconOnly}
            showTryAgain={showTryAgain}
            showRating={showRating}
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
