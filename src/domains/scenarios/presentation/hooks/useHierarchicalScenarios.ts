/**
 * Hierarchical Scenarios Hook
 * Filters scenarios by sub-category with memoized calculations
 */

import { useMemo, useEffect } from "react";
import type { ScenarioData, ScenarioSubCategory } from "../../domain/scenario.types";

export interface UseHierarchicalScenariosProps {
  readonly subCategoryId: string;
  readonly subCategories: readonly ScenarioSubCategory[];
  readonly scenarios: readonly ScenarioData[];
}

export interface UseHierarchicalScenariosResult {
  readonly subCategory: ScenarioSubCategory | undefined;
  readonly filteredScenarios: readonly ScenarioData[];
}

export function useHierarchicalScenarios({
  subCategoryId,
  subCategories,
  scenarios,
}: UseHierarchicalScenariosProps): UseHierarchicalScenariosResult {
  const subCategory = useMemo(
    () => subCategories.find((sub) => sub.id === subCategoryId),
    [subCategories, subCategoryId]
  );

  const filteredScenarios = useMemo(() => {
    if (!subCategory) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[useHierarchicalScenarios] No subCategory found", {
          subCategoryId,
          subCategoriesCount: subCategories.length,
        });
      }
      return [];
    }

    const filtered = scenarios.filter((scenario) => {
      if (!scenario.category) return false;
      return subCategory.scenarioCategories?.includes(scenario.category) ?? false;
    });

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[useHierarchicalScenarios] Filtered scenarios", {
        subCategoryId: subCategory.id,
        scenarioCategories: subCategory.scenarioCategories,
        totalScenarios: scenarios.length,
        filteredCount: filtered.length,
        sampleScenarioCategories: scenarios.slice(0, 5).map((s) => s.category),
      });
    }

    return filtered;
  }, [scenarios, subCategory, subCategoryId, subCategories]);

  useEffect(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[useHierarchicalScenarios] State changed", {
        subCategoryId,
        hasSubCategory: !!subCategory,
        filteredScenariosCount: filteredScenarios.length,
      });
    }
  }, [subCategoryId, subCategory, filteredScenarios]);

  return { subCategory, filteredScenarios };
}
