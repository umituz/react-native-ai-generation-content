import React, { useMemo, useCallback } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { timezoneService } from "@umituz/react-native-timezone";
import type { Creation } from "../../domain/entities/Creation";
import type { CreationType } from "../../domain/value-objects/CreationsConfig";

interface CreationCardProps {
  readonly creation: Creation;
  readonly types: readonly CreationType[];
  readonly onView?: (creation: Creation) => void;
  readonly onShare: (creation: Creation) => void;
  readonly onDelete: (creation: Creation) => void;
  readonly onFavorite?: (creation: Creation, isFavorite: boolean) => void;
  readonly locale?: string;
}

export function CreationCard({
  creation,
  types,
  onView,
  onShare,
  onDelete,
  onFavorite,
  locale = "en-US",
}: CreationCardProps) {
  const tokens = useAppDesignTokens();

  const typeConfig = types.find((t) => t.id === creation.type);
  const icon = typeConfig?.icon;
  const label = typeConfig?.labelKey || creation.type;

  const handleView = useCallback(() => onView?.(creation), [creation, onView]);
  const handleShare = useCallback(() => onShare(creation), [creation, onShare]);
  const handleDelete = useCallback(
    () => onDelete(creation),
    [creation, onDelete],
  );
  const handleFavorite = useCallback(
    () => onFavorite?.(creation, !creation.isFavorite),
    [creation, onFavorite],
  );

  const formattedDate = useMemo(() => {
    const date =
      creation.createdAt instanceof Date
        ? creation.createdAt
        : new Date(creation.createdAt);

    return timezoneService.formatDateTime(date, locale, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [creation.createdAt, locale]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: "row",
          backgroundColor: tokens.colors.surface,
          borderRadius: tokens.spacing.md,
          overflow: "hidden",
          marginBottom: tokens.spacing.md,
        },
        thumbnail: {
          width: 100,
          height: 100,
        },
        content: {
          flex: 1,
          padding: tokens.spacing.md,
          justifyContent: "space-between",
        },
        typeRow: {
          flexDirection: "row",
          alignItems: "center",
          gap: tokens.spacing.sm,
        },
        icon: {
          fontSize: 20,
        },
        typeText: {
          ...tokens.typography.bodyMedium,
          fontWeight: "600",
          color: tokens.colors.textPrimary,
        },
        dateText: {
          ...tokens.typography.bodySmall,
          color: tokens.colors.textSecondary,
        },
        actions: {
          flexDirection: "row",
          gap: tokens.spacing.sm,
        },
        actionBtn: {
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: tokens.colors.backgroundSecondary,
          justifyContent: "center",
          alignItems: "center",
        },
      }),
    [tokens],
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: creation.uri }} style={styles.thumbnail} />
      <View style={styles.content}>
        <View>
          <View style={styles.typeRow}>
            {icon && <AtomicIcon name={icon} size="sm" color="primary" />}
            <AtomicText style={styles.typeText}>{label}</AtomicText>
          </View>
          <AtomicText style={styles.dateText}>{formattedDate}</AtomicText>
        </View>
        <View style={styles.actions}>
          {onView && (
            <TouchableOpacity style={styles.actionBtn} onPress={handleView}>
              <AtomicIcon name="eye" size="sm" color="primary" />
            </TouchableOpacity>
          )}
          {onFavorite && (
            <TouchableOpacity style={styles.actionBtn} onPress={handleFavorite}>
              <AtomicIcon
                name={creation.isFavorite ? "heart" : "heart-outline"}
                size="sm"
                color={creation.isFavorite ? "error" : "primary"}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
            <AtomicIcon name="share-social" size="sm" color="primary" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={handleDelete}>
            <AtomicIcon name="trash" size="sm" color="error" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
