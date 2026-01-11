/**
 * ScenarioGrid Component
 * Grid display for scenario selection with category filtering
 */

import React, { useMemo, useCallback, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  type ListRenderItemInfo,
} from "react-native";
import {
  useAppDesignTokens,
  useResponsive,
  AtomicCard,
  AtomicText,
  AtomicSkeleton,
  FilterGroup,
  type DesignTokens,
} from "@umituz/react-native-design-system";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { ScenarioData, ScenarioCategory } from "../../domain/types";
import { SCENARIO_DEFAULTS } from "../../domain/types";

export interface ScenarioGridProps {
  readonly scenarios: readonly ScenarioData[];
  readonly selectedScenarioId: string | null;
  readonly onSelect: (id: string) => void;
  readonly categories: readonly ScenarioCategory[];
  readonly t: (key: string) => string;
  readonly pageSize?: number;
  readonly categoryAllLabel?: string;
}

export const ScenarioGrid: React.FC<ScenarioGridProps> = ({
  scenarios,
  selectedScenarioId,
  onSelect,
  categories,
  t,
  pageSize = SCENARIO_DEFAULTS.pageSize,
  categoryAllLabel = "All",
}) => {
  const [category, setCategory] = useState<ScenarioCategory | "all">("all");
  const [displayedCount, setDisplayedCount] = useState(pageSize);
  const [isLoading, setIsLoading] = useState(false);

  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const { width } = useResponsive();

  const numColumns = 2;
  const horizontalPadding = tokens.spacing.md;
  const cardSpacing = tokens.spacing.md;
  const availableWidth = width - horizontalPadding * 2 - cardSpacing;
  const cardWidth = availableWidth / numColumns;

  const filteredScenarios = useMemo(() => {
    if (category === "all") return scenarios;
    return scenarios.filter((s) => s.category === category);
  }, [scenarios, category]);

  const displayedScenarios = useMemo(
    () => filteredScenarios.slice(0, displayedCount),
    [filteredScenarios, displayedCount],
  );

  const hasMore = displayedCount < filteredScenarios.length;
  const isLoadingMore = isLoading && displayedCount > pageSize;

  const styles = useMemo(
    () => createStyles(tokens, cardWidth, cardSpacing, horizontalPadding),
    [tokens, cardWidth, cardSpacing, horizontalPadding],
  );

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setDisplayedCount((prev) =>
          Math.min(prev + pageSize, filteredScenarios.length),
        );
        setIsLoading(false);
      }, 300);
    }
  }, [hasMore, isLoading, filteredScenarios.length, pageSize]);

  const handleCategoryChange = useCallback(
    (val: ScenarioCategory | "all") => {
      setCategory(val);
      setDisplayedCount(pageSize);
    },
    [pageSize],
  );

  const ListEmptyComponent = useMemo(
    () => (
      <View style={[styles.centerContainer, { paddingHorizontal: horizontalPadding }]}>
        <AtomicText type="bodyMedium" color="textSecondary">
          {t("scenario.empty")}
        </AtomicText>
      </View>
    ),
    [t, styles.centerContainer, horizontalPadding],
  );

  const ListFooterComponent = useMemo(
    () =>
      isLoadingMore ? (
        <View style={[styles.footerLoader, { paddingHorizontal: horizontalPadding }]}>
          <AtomicSkeleton pattern="card" count={2} />
        </View>
      ) : null,
    [isLoadingMore, styles.footerLoader, horizontalPadding],
  );

  const ListHeaderComponent = useMemo(
    () => (
      <View style={{ marginBottom: tokens.spacing.md }}>
        <FilterGroup
          items={[
            { label: categoryAllLabel, value: "all" },
            ...categories.map((cat) => ({
              label: t(`category.${cat}`),
              value: cat,
            })),
          ]}
          selectedValue={category}
          onSelect={(val) =>
            handleCategoryChange(val as ScenarioCategory | "all")
          }
          contentContainerStyle={{ paddingHorizontal: horizontalPadding }}
        />
      </View>
    ),
    [
      category,
      t,
      horizontalPadding,
      tokens.spacing.md,
      categories,
      categoryAllLabel,
      handleCategoryChange,
    ],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ScenarioData>) => {
      const title = t(`scenario.${item.id}.title`);
      const description = t(`scenario.${item.id}.description`);

      return (
        <AtomicCard
          image={item.previewImageUrl ?? item.imageUrl ?? ""}
          title={title}
          subtitle={description}
          selected={selectedScenarioId === item.id}
          imageAspectRatio={1.25}
          style={{ width: cardWidth }}
          onPress={() => onSelect(item.id)}
          testID={`scenario-card-${item.id}`}
        />
      );
    },
    [cardWidth, selectedScenarioId, onSelect, t],
  );

  return (
    <FlatList
      data={displayedScenarios}
      numColumns={numColumns}
      key={`grid-${numColumns}`}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.row}
      renderItem={renderItem}
      keyExtractor={(item: ScenarioData) => item.id}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={filteredScenarios.length === 0 ? ListEmptyComponent : null}
      ListFooterComponent={ListFooterComponent}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      contentContainerStyle={[
        styles.listContent,
        {
          paddingBottom: insets.bottom + 100,
        },
      ]}
      initialNumToRender={pageSize}
      maxToRenderPerBatch={pageSize}
      windowSize={5}
    />
  );
};

const createStyles = (
  tokens: DesignTokens,
  cardWidth: number,
  cardSpacing: number,
  horizontalPadding: number,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    listContent: {
      paddingTop: tokens.spacing.sm,
      flexGrow: 1,
    },
    row: {
      gap: cardSpacing,
      marginBottom: cardSpacing,
      paddingHorizontal: horizontalPadding,
    },
    centerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: tokens.spacing.xl,
    },
    footerLoader: {
      paddingVertical: tokens.spacing.md,
    },
  });
