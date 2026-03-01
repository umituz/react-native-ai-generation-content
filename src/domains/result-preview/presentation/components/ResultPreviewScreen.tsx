import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { NavigationHeader } from "@umituz/react-native-design-system/molecules";
import { ScreenLayout } from "@umituz/react-native-design-system/layouts";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { ResultImageCard } from "./ResultImageCard";
import { ResultActionBar } from "./ResultActionBar";
import { RecentCreationsSection } from "./RecentCreationsSection";
import { VideoResultPlayer } from "../../../../presentation/components/display/VideoResultPlayer";
import type { ResultPreviewScreenProps } from "../types/result-preview.types";
import { formatMediaUrl, shouldShowRecentCreations } from "./ResultPreviewScreen.utils";

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
  const displayMediaUrl = useMemo(
    () => formatMediaUrl(videoUrl, imageUrl, isVideo),
    [imageUrl, videoUrl, isVideo]
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, paddingHorizontal: tokens.spacing.lg },
        resultContainer: { marginTop: tokens.spacing.lg },
        title: {
          fontSize: 18,
          fontWeight: "700",
          color: tokens.colors.textPrimary,
          marginBottom: tokens.spacing.md,
        },
      }),
    [tokens]
  );

  if (!displayMediaUrl) return null;

  const showRecent = shouldShowRecentCreations(recentCreations, translations);

  return (
    <ScreenLayout scrollable edges={["left", "right"]} backgroundColor={tokens.colors.backgroundPrimary}>
      <NavigationHeader title={translations.title} onBackPress={onNavigateBack} />
      <View style={[styles.container, style]}>
        <View style={styles.resultContainer}>
          {!hideLabel && <AtomicText style={styles.title}>{translations.yourResult}</AtomicText>}
          {isVideo ? <VideoResultPlayer uri={displayMediaUrl} /> : <ResultImageCard imageUrl={displayMediaUrl} />}
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
        {showRecent && (
          <RecentCreationsSection
            recentCreations={recentCreations!}
            onViewAll={onViewAll}
            onCreationPress={onCreationPress}
            title={translations.recentCreations!}
            viewAllLabel={translations.viewAll!}
          />
        )}
      </View>
    </ScreenLayout>
  );
};
