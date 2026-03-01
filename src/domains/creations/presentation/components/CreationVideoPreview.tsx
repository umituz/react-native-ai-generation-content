/**
 * CreationVideoPreview Component
 * Displays video preview with thumbnail and play icon overlay
 */

import React, { useMemo } from "react";
import { View, StyleSheet, Image } from "react-native";
import { AtomicIcon, AtomicSpinner } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { CreationStatus, CreationTypeId } from "../../domain/types";
import { isInProgress } from "../../domain/utils";
import { shouldShowThumbnail } from "../../domain/utils/preview-helpers";

interface CreationVideoPreviewProps {
  /** Thumbnail image URL (optional) */
  readonly thumbnailUrl?: string | null;
  /** Video URL (for display purposes only) */
  readonly videoUrl?: string | null;
  /** Creation status */
  readonly status?: CreationStatus;
  /** Creation type for placeholder icon */
  readonly type?: CreationTypeId;
  /** Aspect ratio (default: 16/9) */
  readonly aspectRatio?: number;
  /** Custom height (overrides aspectRatio) */
  readonly height?: number;
  /** Show loading indicator when in progress */
  readonly showLoadingIndicator?: boolean;
}

export function CreationVideoPreview({
  thumbnailUrl,
  videoUrl: _videoUrl,
  status = "completed",
  aspectRatio = 16 / 9,
  height,
  showLoadingIndicator = true,
}: CreationVideoPreviewProps) {
  const tokens = useAppDesignTokens();
  const inProgress = isInProgress(status);
  const hasThumbnail = shouldShowThumbnail(thumbnailUrl, inProgress);

  // Debug logging
  if (__DEV__) {
    console.log("[CreationVideoPreview]", {
      thumbnailUrl,
      status,
      inProgress,
      hasThumbnail,
      willShowSpinner: inProgress && showLoadingIndicator,
      willShowThumbnail: hasThumbnail,
      willShowPlaceholder: !inProgress && !hasThumbnail,
    });
  }

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: "100%",
          aspectRatio: height ? undefined : aspectRatio,
          height: height,
          backgroundColor: tokens.colors.backgroundSecondary,
          position: "relative",
          overflow: "hidden",
        },
        thumbnail: {
          width: "100%",
          height: "100%",
        },
        placeholder: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        loadingContainer: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        loadingIcon: {
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: tokens.colors.primary + "20",
          justifyContent: "center",
          alignItems: "center",
        },
        playIconOverlay: {
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
        },
        playIconContainer: {
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: tokens.colors.primary,
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: 4,
        },
      }),
    [tokens, aspectRatio, height]
  );

  // Show loading state
  if (inProgress && showLoadingIndicator) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingIcon}>
            <AtomicSpinner size="lg" color="primary" />
          </View>
        </View>
      </View>
    );
  }

  // Show thumbnail with play icon overlay
  if (hasThumbnail && thumbnailUrl) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: thumbnailUrl }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.playIconOverlay}>
          <View style={styles.playIconContainer}>
            <AtomicIcon name="play" customSize={24} color="onPrimary" />
          </View>
        </View>
      </View>
    );
  }

  // Show placeholder with play icon (no thumbnail available)
  return (
    <View style={styles.container}>
      <View style={styles.placeholder}>
        <View style={styles.playIconContainer}>
          <AtomicIcon name="play" customSize={24} color="onPrimary" />
        </View>
      </View>
    </View>
  );
}
