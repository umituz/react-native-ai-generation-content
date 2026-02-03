/**
 * useCreationCardActions Hook
 * Builds actions array for CreationCard based on callbacks and state
 */

import { useMemo } from "react";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import type { CreationCardData, CreationCardCallbacks } from "./CreationCard.types";
import type { CreationAction } from "./CreationActions";

interface UseCreationCardActionsParams {
  callbacks: CreationCardCallbacks;
  creation: CreationCardData;
  isSharing: boolean;
  isDownloadAvailable: boolean;
  canPostToFeed: boolean;
}

export function useCreationCardActions({
  callbacks,
  creation,
  isSharing,
  isDownloadAvailable,
  canPostToFeed,
}: UseCreationCardActionsParams): CreationAction[] {
  const tokens = useAppDesignTokens();

  return useMemo<CreationAction[]>(() => {
    const result: CreationAction[] = [];

    if (callbacks.onDownload && isDownloadAvailable && creation.output) {
      result.push({
        id: "download",
        icon: "download",
        onPress: () => callbacks.onDownload?.(creation),
      });
    }

    if (callbacks.onShare) {
      result.push({
        id: "share",
        icon: "share-social",
        loading: isSharing,
        onPress: () => callbacks.onShare?.(creation),
      });
    }

    if (callbacks.onFavorite) {
      result.push({
        id: "favorite",
        icon: creation.isFavorite ? "heart" : "heart-outline",
        color: creation.isFavorite ? "error" : undefined,
        customColor: !creation.isFavorite ? tokens.colors.textSecondary : undefined,
        onPress: () => callbacks.onFavorite?.(creation),
      });
    }

    if (callbacks.onDelete) {
      result.push({
        id: "delete",
        icon: "trash",
        color: "error",
        onPress: () => callbacks.onDelete?.(creation),
      });
    }

    if (callbacks.onPostToFeed && canPostToFeed) {
      result.push({
        id: "post",
        icon: "send",
        filled: true,
        onPress: () => callbacks.onPostToFeed?.(creation),
      });
    }

    return result;
  }, [callbacks, creation, isSharing, isDownloadAvailable, canPostToFeed, tokens]);
}
