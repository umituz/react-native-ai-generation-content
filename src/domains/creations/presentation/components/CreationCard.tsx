/**
 * CreationCard Component
 * Full-featured card for displaying a creation with preview, badges, and actions
 */

import React, { useMemo, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { CreationPreview } from "./CreationPreview";
import { CreationBadges } from "./CreationBadges";
import { CreationActions, type CreationAction } from "./CreationActions";
import type { CreationStatus, CreationTypeId } from "../../domain/types";
import type { CreationOutput } from "../../domain/utils";
import { getPreviewUrl, getCreationTitle } from "../../domain/utils";

/**
 * Creation data interface for the card
 * Flexible to support both package and app Creation types
 */
export interface CreationCardData {
  id: string;
  type: CreationTypeId | string;
  status?: CreationStatus;
  prompt?: string;
  /** Output object for app-style creations */
  output?: CreationOutput;
  /** URI for package-style creations */
  uri?: string;
  provider?: string;
  createdAt: Date | number;
}

/**
 * Action callbacks interface
 */
export interface CreationCardCallbacks {
  onPress?: (creation: CreationCardData) => void;
  onDownload?: (creation: CreationCardData) => Promise<void>;
  onShare?: (creation: CreationCardData) => Promise<void>;
  onDelete?: (creation: CreationCardData) => void;
  onFavorite?: (creation: CreationCardData) => void;
  onPostToFeed?: (creation: CreationCardData) => void;
}

interface CreationCardProps {
  /** Creation data */
  readonly creation: CreationCardData;
  /** Action callbacks */
  readonly callbacks?: CreationCardCallbacks;
  /** Show badges overlay */
  readonly showBadges?: boolean;
  /** Show action buttons */
  readonly showActions?: boolean;
  /** Custom status text (for i18n) */
  readonly statusText?: string;
  /** Custom type text (for i18n) */
  readonly typeText?: string;
  /** Date formatter function */
  readonly formatDate?: (date: Date) => string;
  /** Is sharing in progress */
  readonly isSharing?: boolean;
  /** Is download available */
  readonly isDownloadAvailable?: boolean;
  /** Can post to feed */
  readonly canPostToFeed?: boolean;
}

export function CreationCard({
  creation,
  callbacks = {},
  showBadges = true,
  showActions = true,
  statusText,
  typeText,
  formatDate,
  isSharing = false,
  isDownloadAvailable = true,
  canPostToFeed = false,
}: CreationCardProps) {
  const tokens = useAppDesignTokens();
  // Support both output object and direct uri
  const previewUrl = creation.uri || getPreviewUrl(creation.output);
  const title = getCreationTitle(creation.prompt, creation.type as CreationTypeId);

  // Format date
  const formattedDate = useMemo(() => {
    const date = creation.createdAt instanceof Date
      ? creation.createdAt
      : new Date(creation.createdAt);

    if (formatDate) {
      return formatDate(date);
    }

    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [creation.createdAt, formatDate]);

  // Build actions array
  const actions = useMemo<CreationAction[]>(() => {
    const result: CreationAction[] = [];

    if (callbacks.onDownload && isDownloadAvailable && creation.output) {
      result.push({
        id: "download",
        icon: "Download",
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
        icon: "heart-outline",
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
        icon: "Send",
        filled: true,
        onPress: () => callbacks.onPostToFeed?.(creation),
      });
    }

    return result;
  }, [callbacks, creation, isSharing, isDownloadAvailable, canPostToFeed]);

  const handlePress = useCallback(() => {
    callbacks.onPress?.(creation);
  }, [callbacks, creation]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 16,
          backgroundColor: tokens.colors.surface,
        },
        previewContainer: {
          position: "relative",
        },
        content: {
          padding: 12,
        },
        header: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 8,
          gap: 8,
        },
        titleContainer: {
          flex: 1,
        },
        title: {
          fontWeight: "600",
        },
        meta: {
          flexDirection: "row",
          alignItems: "center",
        },
        metaText: {
          fontSize: 12,
          color: tokens.colors.textSecondary,
        },
        metaDot: {
          marginHorizontal: 4,
        },
      }),
    [tokens]
  );

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={callbacks.onPress ? 0.7 : 1}
      disabled={!callbacks.onPress}
    >
      <View style={styles.previewContainer}>
        <CreationPreview
          uri={previewUrl}
          status={creation.status || "completed"}
          type={creation.type as CreationTypeId}
        />
        {showBadges && creation.status && (
          <CreationBadges
            status={creation.status}
            type={creation.type as CreationTypeId}
            statusText={statusText}
            typeText={typeText}
          />
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <AtomicText type="bodyMedium" style={styles.title} numberOfLines={2}>
              {title}
            </AtomicText>
          </View>

          {showActions && actions.length > 0 && (
            <CreationActions actions={actions} size="md" />
          )}
        </View>

        <View style={styles.meta}>
          <Text style={styles.metaText}>{formattedDate}</Text>
          {creation.provider && (
            <>
              <Text style={[styles.metaText, styles.metaDot]}>•</Text>
              <Text style={styles.metaText}>{creation.provider}</Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
