/**
 * HierarchicalScenarioListScreen
 * Displays scenarios filtered by sub-category with optimized performance
 */

import React, { useMemo, useCallback, useState } from "react";
import { View, FlatList, StyleSheet, type ListRenderItemInfo } from "react-native";
import {
  AtomicText,
  AtomicCard,
  useAppDesignTokens,
  useResponsive,
  ScreenLayout,
  NavigationHeader,
  AtomicSpinner,
  type DesignTokens,
} from "@umituz/react-native-design-system";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { ScenarioData } from "../../domain/scenario.types";
import type { SubCategory } from "../../domain/category.types";
import { useHierarchicalScenarios } from "../hooks/useHierarchicalScenarios";
import { ScenarioContinueButton } from "../components/ScenarioContinueButton";

export interface HierarchicalScenarioListScreenProps {
  readonly subCategoryId: string;
  readonly subCategories: readonly SubCategory[];
  readonly scenarios: readonly ScenarioData[];
  readonly onSelectScenario: (scenarioId: string) => void;
  readonly onBack: () => void;
  readonly t: (key: string) => string;
  readonly numColumns?: number;
  readonly isLoading?: boolean;
}

export const HierarchicalScenarioListScreen: React.FC<HierarchicalScenarioListScreenProps> = ({
  subCategoryId,
  subCategories,
  scenarios,
  onSelectScenario,
  onBack,
  t,
  numColumns = 2,
  isLoading = false,
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const { width } = useResponsive();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { subCategory, filteredScenarios } = useHierarchicalScenarios({
    subCategoryId,
    subCategories,
    scenarios,
  });

  const horizontalPadding = tokens.spacing.md;
  const cardSpacing = tokens.spacing.md;

  const cardWidth = useMemo(() => {
    const availableWidth = width - horizontalPadding * 2 - cardSpacing;
    return availableWidth / numColumns;
  }, [width, horizontalPadding, cardSpacing, numColumns]);

  const styles = useMemo(
    () => createStyles(tokens, cardSpacing, horizontalPadding),
    [tokens, cardSpacing, horizontalPadding]
  );

  const handleContinue = useCallback(() => {
    if (selectedId) onSelectScenario(selectedId);
  }, [selectedId, onSelectScenario]);

  const handleCardPress = useCallback((itemId: string) => {
    setSelectedId(itemId);
  }, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ScenarioData>) => (
      <AtomicCard
        image={item.previewImageUrl || item.imageUrl || ""}
        title={t(`scenario.${item.id}.title`)}
        subtitle={t(`scenario.${item.id}.description`)}
        imageAspectRatio={1.25}
        selected={selectedId === item.id}
        style={{ width: cardWidth }}
        onPress={() => handleCardPress(item.id)}
        testID={`scenario-card-${item.id}`}
      />
    ),
    [cardWidth, selectedId, t, handleCardPress]
  );

  const ListEmptyComponent = useMemo(
    () => (
      <View style={styles.emptyState}>
        <AtomicText type="bodyLarge" color="textSecondary">
          {t("scenario.list.empty")}
        </AtomicText>
      </View>
    ),
    [t, styles.emptyState]
  );

  const LoadingComponent = useMemo(
    () => (
      <View style={styles.loadingContainer}>
        <AtomicSpinner size="lg" color="primary" />
        <AtomicText type="bodyMedium" style={{ marginTop: tokens.spacing.md }}>
          {t("common.loading")}
        </AtomicText>
      </View>
    ),
    [tokens, t, styles.loadingContainer]
  );

  if (!subCategory) return null;

  return (
    <View style={styles.container}>
      <NavigationHeader
        title={t(subCategory.titleKey)}
        onBackPress={onBack}
        rightElement={
          <ScenarioContinueButton
            canContinue={!!selectedId}
            onPress={handleContinue}
            label={t("common.continue")}
          />
        }
      />
      <ScreenLayout scrollable={false} edges={["left", "right"]} backgroundColor={tokens.colors.backgroundPrimary}>
        <FlatList
          data={filteredScenarios}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={isLoading ? LoadingComponent : (filteredScenarios.length === 0 ? ListEmptyComponent : null)}
          contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 100 }]}
          removeClippedSubviews
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={10}
          windowSize={21}
        />
      </ScreenLayout>
    </View>
  );
};

const createStyles = (tokens: DesignTokens, cardSpacing: number, horizontalPadding: number) =>
  StyleSheet.create({
    container: { flex: 1 },
    listContent: { paddingTop: tokens.spacing.sm, flexGrow: 1 },
    row: { gap: cardSpacing, marginBottom: cardSpacing, paddingHorizontal: horizontalPadding },
    emptyState: { flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: tokens.spacing.xl },
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: tokens.spacing.xl },
  });
