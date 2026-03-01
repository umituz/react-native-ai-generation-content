/**
 * CreationsHomeCard Component
 * Shows user's creations preview on home screen
 */

import React, { useMemo, useCallback } from "react";
import { View, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { Creation } from "../../domain/entities/Creation";
import { CreationThumbnail } from "./CreationThumbnail";

interface CreationsHomeCardProps {
  readonly creations: Creation[] | undefined;
  readonly isLoading: boolean;
  readonly title: string;
  readonly countLabel: string;
  readonly loadingLabel: string;
  readonly maxThumbnails?: number;
  readonly onPress: () => void;
}

export function CreationsHomeCard({
  creations,
  isLoading,
  title,
  countLabel,
  loadingLabel,
  maxThumbnails = 4,
  onPress,
}: CreationsHomeCardProps) {
  const tokens = useAppDesignTokens();

   
  if (__DEV__) {
     
    console.log("[CreationsHomeCard] Render:", {
      isLoading,
      count: creations?.length ?? 0,
    });
  }

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: tokens.colors.surface,
          borderRadius: tokens.borders.radius.md,
          padding: tokens.spacing.md,
        },
        header: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: tokens.spacing.md,
        },
        headerLeft: {
          flexDirection: "row",
          alignItems: "center",
          gap: tokens.spacing.sm,
        },
        icon: {
          fontSize: 20,
        },
        title: {
          ...tokens.typography.bodyLarge,
          fontWeight: "600",
          color: tokens.colors.textPrimary,
        },
        viewAll: {
          flexDirection: "row",
          alignItems: "center",
          gap: tokens.spacing.xs,
        },
        count: {
          ...tokens.typography.bodySmall,
          color: tokens.colors.textSecondary,
        },
        thumbnailList: {
          gap: tokens.spacing.sm,
        },
        loadingText: {
          ...tokens.typography.bodySmall,
          color: tokens.colors.textSecondary,
          textAlign: "center",
          padding: tokens.spacing.md,
        },
        moreBadge: {
          width: 72,
          height: 72,
          borderRadius: tokens.borders.radius.sm,
          backgroundColor: tokens.colors.backgroundSecondary,
          justifyContent: "center",
          alignItems: "center",
        },
        moreText: {
          ...tokens.typography.bodySmall,
          fontWeight: "600",
          color: tokens.colors.primary,
        },
      }),
    [tokens],
  );

  const displayItems = useMemo(() => {
    if (!creations) return [];
    return creations.slice(0, maxThumbnails);
  }, [creations, maxThumbnails]);

  const renderItem = useCallback(
    ({ item, index }: { item: Creation; index: number }) => {
      const isLast = index === maxThumbnails - 1;
      const hasMore = creations && creations.length > maxThumbnails;

      if (isLast && hasMore) {
        return (
          <TouchableOpacity style={styles.moreBadge} onPress={onPress}>
            <AtomicText style={styles.moreText}>
              +{creations.length - maxThumbnails + 1}
            </AtomicText>
          </TouchableOpacity>
        );
      }

      return <CreationThumbnail uri={item.uri} onPress={onPress} />;
    },
    [styles, creations, maxThumbnails, onPress],
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <AtomicText style={styles.loadingText}>{loadingLabel}</AtomicText>
      </View>
    );
  }

  if (!creations || creations.length === 0) {
    return null;
  }

  const count = creations.length;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <AtomicText style={styles.icon}>🎨</AtomicText>
          <AtomicText style={styles.title}>{title}</AtomicText>
        </View>
        <TouchableOpacity style={styles.viewAll} onPress={onPress}>
          <AtomicText style={styles.count}>
            {countLabel.replace("{{count}}", String(count))}
          </AtomicText>
          <AtomicIcon name="chevron-forward" size="sm" color="primary" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={displayItems}
        renderItem={renderItem}
        keyExtractor={(item: Creation) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.thumbnailList}
        scrollEnabled={false}
      />
    </TouchableOpacity>
  );
}
