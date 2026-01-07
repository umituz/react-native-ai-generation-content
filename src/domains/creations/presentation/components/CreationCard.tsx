/**
 * CreationCard Component
 * Full-featured card for displaying a creation with preview, badges, and actions
 */

import React, { useMemo, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { CreationPreview } from "./CreationPreview";
import { CreationBadges } from "./CreationBadges";
import { CreationActions } from "./CreationActions";
import { CreationCardMeta } from "./CreationCardMeta";
import { useCreationCardActions } from "./useCreationCardActions";
import { useCreationDateFormatter } from "./CreationCard.utils";
import type { CreationCardProps } from "./CreationCard.types";
import type { CreationTypeId } from "../../domain/types";
import { getPreviewUrl, getCreationTitle } from "../../domain/utils";

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

  const previewUrl = getPreviewUrl(creation.output) || creation.uri;
  const title = getCreationTitle(creation.prompt, creation.type as CreationTypeId);
  const formattedDate = useCreationDateFormatter(creation.createdAt, formatDate);
  const actions = useCreationCardActions({
    callbacks,
    creation,
    isSharing,
    isDownloadAvailable,
    canPostToFeed,
  });

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

        <CreationCardMeta formattedDate={formattedDate} provider={creation.provider} />
      </View>
    </TouchableOpacity>
  );
}

export type { CreationCardProps, CreationCardData, CreationCardCallbacks } from "./CreationCard.types";
