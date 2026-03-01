/**
 * CreationImagePreview Component
 * Displays image preview with loading/placeholder states
 * Uses expo-image for caching and performance
 */

import React, { useMemo, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { AtomicIcon, AtomicSpinner } from "@umituz/react-native-design-system/atoms";
import { AtomicImage } from "@umituz/react-native-design-system/image";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { CreationStatus, CreationTypeId } from "../../domain/types";
import { isInProgress, getTypeIcon } from "../../domain/utils";

interface CreationImagePreviewProps {
  /** Preview image URL */
  readonly uri?: string | null;
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

export function CreationImagePreview({
  uri,
  status = "completed",
  type = "text-to-image",
  aspectRatio = 16 / 9,
  height,
  showLoadingIndicator = true,
}: CreationImagePreviewProps) {
  const tokens = useAppDesignTokens();
  const inProgress = isInProgress(status);
  const typeIcon = getTypeIcon(type);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const hasPreview = !!uri && !inProgress && !imageError;

  const handleImageError = useCallback(() => {
    setImageError(true);
    setIsLoading(false);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);

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
        image: {
          width: "100%",
          height: "100%",
        },
        placeholder: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        loadingOverlay: {
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: tokens.colors.backgroundSecondary,
        },
        loadingIcon: {
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: tokens.colors.primary + "20",
          justifyContent: "center",
          alignItems: "center",
        },
      }),
    [tokens, aspectRatio, height]
  );

  // Show loading state during generation
  if (inProgress && showLoadingIndicator) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingIcon}>
            <AtomicSpinner size="lg" color="primary" />
          </View>
        </View>
      </View>
    );
  }

  // Show image preview with caching
  if (hasPreview) {
    return (
      <View style={styles.container}>
        <AtomicImage
          source={{ uri }}
          style={styles.image}
          contentFit="cover"
          transition={0}
          cachePolicy="disk"
          onError={handleImageError}
          onLoadEnd={handleLoadEnd}
          placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }}
          placeholderContentFit="cover"
        />
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <AtomicSpinner size="md" color="primary" />
          </View>
        )}
      </View>
    );
  }

  // Show placeholder
  return (
    <View style={styles.container}>
      <View style={styles.placeholder}>
        <AtomicIcon name={typeIcon} color="secondary" size="xl" />
      </View>
    </View>
  );
}
