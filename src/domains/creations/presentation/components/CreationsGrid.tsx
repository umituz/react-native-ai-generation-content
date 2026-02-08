/**
 * CreationsGrid Component
 * Grid/list of creation cards with refresh support
 */

import React, { useCallback } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  type ViewStyle,
} from "react-native";
import {
  useAppDesignTokens,
  type DesignTokens,
} from "@umituz/react-native-design-system";
import { CreationCard, type CreationCardData } from "./CreationCard";

interface CreationsGridProps<T extends CreationCardData> {
  /** Array of creations to display */
  readonly creations: T[];
  /** Loading state for refresh indicator */
  readonly isLoading: boolean;
  /** Pull to refresh handler */
  readonly onRefresh: () => void;
  /** Press handler */
  readonly onPress?: (creation: T) => void;
  /** Download handler */
  readonly onDownload?: (creation: T) => Promise<void>;
  /** Share handler */
  readonly onShare?: (creation: T) => Promise<void>;
  /** Delete handler */
  readonly onDelete?: (creation: T) => void;
  /** Favorite handler */
  readonly onFavorite?: (creation: T) => void;
  /** Post to feed handler */
  readonly onPostToFeed?: (creation: T) => void;
  /** Date formatter */
  readonly formatDate?: (date: Date) => string;
  /** Can post to feed */
  readonly canPostToFeed?: boolean;
  /** Content container style */
  readonly contentContainerStyle?: ViewStyle;
  /** Empty state component */
  readonly ListEmptyComponent?: React.ReactElement | null;
  /** Header component */
  readonly ListHeaderComponent?:
    | React.ComponentType<unknown>
    | React.ReactElement
    | null;
}

export function CreationsGrid<T extends CreationCardData>({
  creations,
  isLoading,
  onRefresh,
  onPress,
  onDownload,
  onShare,
  onDelete,
  onFavorite,
  onPostToFeed,
  formatDate,
  canPostToFeed = false,
  contentContainerStyle,
  ListEmptyComponent,
  ListHeaderComponent,
}: CreationsGridProps<T>) {
  const tokens = useAppDesignTokens();
  const styles = useStyles(tokens);

  const renderItem = useCallback(
    ({ item }: { item: T }) => (
      <CreationCard
        creation={item}
        callbacks={{
          onPress: onPress ? () => onPress(item) : undefined,
          onDownload: onDownload ? () => onDownload(item) : undefined,
          onShare: onShare ? () => onShare(item) : undefined,
          onDelete: onDelete ? () => onDelete(item) : undefined,
          onFavorite: onFavorite ? () => onFavorite(item) : undefined,
          onPostToFeed: onPostToFeed ? () => onPostToFeed(item) : undefined,
        }}
        formatDate={formatDate}
        canPostToFeed={canPostToFeed}
      />
    ),
    [
      onPress,
      onDownload,
      onShare,
      onDelete,
      onFavorite,
      onPostToFeed,
      formatDate,
      canPostToFeed,
    ]
  );

  return (
    <FlatList
      data={creations}
      renderItem={renderItem}
      keyExtractor={(item: T) => item.id}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={[
        styles.list,
        contentContainerStyle,
        (!creations || creations.length === 0) && { flexGrow: 1 },
      ]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onRefresh}
          tintColor={tokens.colors.primary}
        />
      }
    />
  );
}

const useStyles = (tokens: DesignTokens) =>
  StyleSheet.create({
    list: {
      padding: tokens.spacing.md,
      paddingBottom: 100,
    },
  });
