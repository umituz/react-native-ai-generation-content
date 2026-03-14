import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { NavigationHeader } from "@umituz/react-native-design-system/molecules";
import { ScreenLayout } from "@umituz/react-native-design-system/layouts";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { ResultImageCard } from "./ResultImageCard";
import { ResultActionBar } from "./ResultActionBar";
import { SuccessRedirectionCard } from "../../../../presentation/components/result/SuccessRedirectionCard";
import { RecentCreationsSection } from "./RecentCreationsSection";
import { VideoResultPlayer } from "../../../../presentation/components/display/VideoResultPlayer";
import type { ResultPreviewScreenProps } from "../types/result-preview.types";
import { formatMediaUrl, shouldShowRecentCreations } from "./ResultPreviewScreen.utils";

export const ResultPreviewScreen: React.FC<ResultPreviewScreenProps> = ({
  imageUrl,
  videoUrl,
  isSaving = false,
  isSharing = false,
  onDownload,
  onShare,
  onTryAgain,
  onNavigateBack,
  onRate,
  onEdit,
  onEditVideo,
  onShareToFeed,
  recentCreations,
  onViewAll,
  onCreationPress,
  onViewCreations,
  translations,
  style,
  hideLabel = false,
  iconOnly = false,
  showTryAgain = true,
  showRating = false,
  showActions = false,
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
    <View style={{ flex: 1, backgroundColor: tokens.colors.backgroundPrimary }}>
      <NavigationHeader title={translations.title} onBackPress={onNavigateBack} />
      <ScreenLayout
        scrollable
        edges={["left", "right", "bottom"]}
        backgroundColor={tokens.colors.backgroundPrimary}
      >
        <View style={[styles.container, style]}>
          <View style={styles.resultContainer}>
            {!hideLabel && <AtomicText style={styles.title}>{translations.yourResult}</AtomicText>}
            {isVideo ? <VideoResultPlayer uri={displayMediaUrl} /> : <ResultImageCard imageUrl={displayMediaUrl} />}

            {showActions && (
              <ResultActionBar
                isSaving={isSaving}
                isSharing={isSharing}
                onDownload={onDownload}
                onShare={onShare}
                onTryAgain={onTryAgain}
                onRate={onRate}
                onEdit={onEdit}
                onEditVideo={onEditVideo}
                onShareToFeed={onShareToFeed}
                saveButtonText={translations.saveButton}
                shareButtonText={translations.shareButton}
                tryAgainButtonText={translations.tryAnother}
                iconOnly={iconOnly}
                showTryAgain={showTryAgain}
                showRating={showRating}
              />
            )}

            {onViewCreations && (
              <SuccessRedirectionCard
                onPress={onViewCreations}
                title={translations.redirectTitle || "Your Creation is Ready!"}
                description={
                  translations.redirectDescription ||
                  "Head over to the My Creations screen to view full details."
                }
                buttonText={translations.viewCreations || "View My Creations"}
                style={{ marginTop: tokens.spacing.xl }}
              />
            )}
          </View>
          {showRecent && recentCreations && translations.recentCreations && translations.viewAll && (
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
    </View>
  );
};
