/**
 * CreationImagePreview Component
 * Displays image preview with loading/placeholder states
 */

import React, { useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  type ImageErrorEventData,
  type NativeSyntheticEvent,
} from "react-native";
import {
  useAppDesignTokens,
  AtomicIcon,
  AtomicSpinner,
} from "@umituz/react-native-design-system";
import type { CreationStatus, CreationTypeId } from "../../domain/types";
import { isInProgress, getTypeIcon } from "../../domain/utils";

export interface CreationImagePreviewProps {
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

  const hasPreview = !!uri && !inProgress && !imageError;

  const handleImageError = (_error: NativeSyntheticEvent<ImageErrorEventData>) => {
    setImageError(true);
  };

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

  // Show image preview
  if (hasPreview) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri }}
          style={styles.image}
          resizeMode="cover"
          onError={handleImageError}
        />
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
