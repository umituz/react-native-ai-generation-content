/**
 * Recent Creations Section Component
 * Displays recent creations in a grid layout
 */

import React, { useMemo, useCallback } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { AtomicImage } from "@umituz/react-native-design-system/image";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import type { RecentCreation } from "../types/result-preview.types";

interface RecentCreationsSectionProps {
  readonly recentCreations: readonly RecentCreation[];
  readonly onViewAll?: () => void;
  readonly onCreationPress?: (creation: RecentCreation) => void;
  readonly title: string;
  readonly viewAllLabel: string;
}

export const RecentCreationsSection: React.FC<RecentCreationsSectionProps> = ({
  recentCreations,
  onViewAll,
  onCreationPress,
  title,
  viewAllLabel,
}) => {
  const tokens = useAppDesignTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginTop: tokens.spacing.xl,
          paddingHorizontal: tokens.spacing.md,
        },
        header: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: tokens.spacing.md,
        },
        title: {
          fontSize: 20,
          fontWeight: "700",
          color: tokens.colors.textPrimary,
        },
        viewAllButton: {
          paddingHorizontal: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs,
        },
        viewAllText: {
          fontSize: 12,
          fontWeight: "700",
          color: tokens.colors.primary,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        },
        grid: {
          gap: tokens.spacing.md,
        },
        creationItem: {
          flex: 1,
          marginHorizontal: tokens.spacing.xs,
        },
        imageContainer: {
          width: "100%",
          aspectRatio: 4 / 5,
          borderRadius: tokens.borders.radius.md,
          overflow: "hidden",
          backgroundColor: tokens.colors.backgroundSecondary,
          position: "relative",
        },
        image: {
          width: "100%",
          height: "100%",
        },
        favoriteIcon: {
          position: "absolute",
          bottom: 8,
          right: 8,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderRadius: tokens.borders.radius.full,
          padding: 6,
        },
        creationInfo: {
          marginTop: tokens.spacing.xs,
        },
        creationTitle: {
          fontSize: 14,
          fontWeight: "700",
          color: tokens.colors.textPrimary,
          marginBottom: 2,
        },
        creationDate: {
          fontSize: 12,
          color: tokens.colors.textSecondary,
        },
        divider: {
          height: 1,
          backgroundColor: tokens.colors.border,
          marginBottom: tokens.spacing.lg,
          marginHorizontal: tokens.spacing.lg,
        },
        columnWrapper: {
          justifyContent: "space-between",
        },
      }),
    [tokens],
  );

  const handleCreationPress = useCallback((creation: RecentCreation) => {
    onCreationPress?.(creation);
  }, [onCreationPress]);

  const renderItem = useCallback(({ item }: { item: RecentCreation }) => (
    <TouchableOpacity
      style={styles.creationItem}
      onPress={() => handleCreationPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <AtomicImage
          source={{ uri: item.imageUrl }}
          style={styles.image}
          rounded
        />
        {item.isFavorite && (
          <View style={styles.favoriteIcon}>
            <AtomicIcon name="heart" size="xs" color="error" />
          </View>
        )}
      </View>
      <View style={styles.creationInfo}>
        <AtomicText style={styles.creationTitle} numberOfLines={1}>
          {item.title}
        </AtomicText>
        <AtomicText style={styles.creationDate}>
          {item.date}
        </AtomicText>
      </View>
    </TouchableOpacity>
  ), [styles, handleCreationPress]);

  if (!recentCreations || recentCreations.length === 0) {
    return null;
  }

  return (
    <>
      <View style={styles.divider} />
      <View style={styles.container}>
        <View style={styles.header}>
          <AtomicText style={styles.title}>{title}</AtomicText>
          {onViewAll && (
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={onViewAll}
              activeOpacity={0.7}
            >
              <AtomicText style={styles.viewAllText}>{viewAllLabel}</AtomicText>
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          data={recentCreations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};
