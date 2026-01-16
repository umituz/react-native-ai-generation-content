/**
 * HierarchicalScenarioListScreen
 * Displays scenarios filtered by sub-category with optimized performance
 * PERFORMANCE OPTIMIZED: No FlatList key remounting, memoized calculations
 */

import React, { useMemo, useCallback, useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  type ListRenderItemInfo,
} from "react-native";
import {
  AtomicText,
  AtomicCard,
  useAppDesignTokens,
  useResponsive,
  ScreenLayout,
  NavigationHeader,
  AtomicIcon,
  type DesignTokens,
} from "@umituz/react-native-design-system";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { ScenarioData, ScenarioSubCategory } from "../../domain/scenario.types";

export interface HierarchicalScenarioListScreenProps {
  readonly subCategoryId: string;
  readonly subCategories: readonly ScenarioSubCategory[];
  readonly scenarios: readonly ScenarioData[];
  readonly onSelectScenario: (scenarioId: string) => void;
  readonly onBack: () => void;
  readonly t: (key: string) => string;
  readonly numColumns?: number;
}

export const HierarchicalScenarioListScreen: React.FC<HierarchicalScenarioListScreenProps> = ({
  subCategoryId,
  subCategories,
  scenarios,
  onSelectScenario,
  onBack,
  t,
  numColumns = 2,
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const { width } = useResponsive();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const subCategory = useMemo(
    () => subCategories.find((sub) => sub.id === subCategoryId),
    [subCategories, subCategoryId]
  );

  const filteredScenarios = useMemo(() => {
    if (!subCategory) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[HierarchicalScenarioListScreen] No subCategory found", {
          subCategoryId,
          subCategoriesCount: subCategories.length,
        });
      }
      return [];
    }

    const filtered = scenarios.filter((scenario) => {
      if (!scenario.category) return false;
      return subCategory.scenarioCategories.includes(scenario.category);
    });

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[HierarchicalScenarioListScreen] Filtered scenarios", {
        subCategoryId: subCategory.id,
        scenarioCategories: subCategory.scenarioCategories,
        totalScenarios: scenarios.length,
        filteredCount: filtered.length,
        sampleScenarioCategories: scenarios.slice(0, 5).map(s => s.category),
      });
    }

    return filtered;
  }, [scenarios, subCategory, subCategoryId, subCategories]);

  // Debug: Monitor component state
  useEffect(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[HierarchicalScenarioListScreen] Component state", {
        subCategoryId,
        hasSubCategory: !!subCategory,
        filteredScenariosCount: filteredScenarios.length,
      });
    }
  }, [subCategoryId, subCategory, filteredScenarios]);

  const horizontalPadding = tokens.spacing.md;
  const cardSpacing = tokens.spacing.md;

  // Calculate card width once - memoized to prevent unnecessary recalculations
  const cardWidth = useMemo(() => {
    const availableWidth = width - horizontalPadding * 2 - cardSpacing;
    return availableWidth / numColumns;
  }, [width, horizontalPadding, cardSpacing, numColumns]);

  const styles = useMemo(
    () => createStyles(tokens, cardSpacing, horizontalPadding),
    [tokens, cardSpacing, horizontalPadding]
  );

  const handleContinue = useCallback(() => {
    if (selectedId) {
      onSelectScenario(selectedId);
    }
  }, [selectedId, onSelectScenario]);

  // Memoized callback for card selection - prevents inline arrow functions
  const handleCardPress = useCallback((itemId: string) => {
    setSelectedId(itemId);
  }, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ScenarioData>) => {
      const title = t(`scenario.${item.id}.title`);
      const description = t(`scenario.${item.id}.description`);
      const isSelected = selectedId === item.id;

      return (
        <AtomicCard
          image={item.previewImageUrl || item.imageUrl || ""}
          title={title}
          subtitle={description}
          imageAspectRatio={1.25}
          selected={isSelected}
          style={{ width: cardWidth }}
          onPress={() => handleCardPress(item.id)}
          testID={`scenario-card-${item.id}`}
        />
      );
    },
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

  if (!subCategory) {
    return null;
  }

  const canContinue = !!selectedId;

  return (
    <View style={styles.container}>
      <NavigationHeader
        title={t(subCategory.titleKey)}
        onBackPress={onBack}
        rightElement={
          <TouchableOpacity
            onPress={handleContinue}
            disabled={!canContinue}
            activeOpacity={0.7}
            style={[
              styles.continueButton,
              {
                backgroundColor: canContinue
                  ? tokens.colors.primary
                  : tokens.colors.surfaceVariant,
                opacity: canContinue ? 1 : 0.5,
              },
            ]}
          >
            <AtomicText
              type="bodyMedium"
              style={[
                styles.continueText,
                {
                  color: canContinue
                    ? tokens.colors.onPrimary
                    : tokens.colors.textSecondary,
                },
              ]}
            >
              {t("common.continue")}
            </AtomicText>
            <AtomicIcon
              name="arrow-forward"
              size="sm"
              color={canContinue ? "onPrimary" : "textSecondary"}
            />
          </TouchableOpacity>
        }
      />
      <ScreenLayout
        scrollable={false}
        edges={["left", "right"]}
        backgroundColor={tokens.colors.backgroundPrimary}
      >
        <FlatList
          data={filteredScenarios}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            filteredScenarios.length === 0 ? ListEmptyComponent : null
          }
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + 100 },
          ]}
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

const createStyles = (
  tokens: DesignTokens,
  cardSpacing: number,
  horizontalPadding: number
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
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: tokens.spacing.xl,
    },
    continueButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.xs,
      borderRadius: tokens.borders.radius.full,
    },
    continueText: {
      fontWeight: "800",
      marginRight: 4,
    },
  });
