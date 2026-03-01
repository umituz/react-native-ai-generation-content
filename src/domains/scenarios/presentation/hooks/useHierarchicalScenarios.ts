/**
 * Hierarchical Scenarios Hook
 * Filters scenarios by sub-category with memoized calculations
 */

import { useMemo } from "react";
import type { ScenarioData } from "../../domain/scenario.types";
import type { SubCategory } from "../../domain/category.types";

interface UseHierarchicalScenariosProps {
  readonly subCategoryId: string;
  readonly subCategories: readonly SubCategory[];
  readonly scenarios: readonly ScenarioData[];
}

interface UseHierarchicalScenariosResult {
  readonly subCategory: SubCategory | undefined;
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
      return [];
    }

    return scenarios.filter((scenario) => {
      if (!scenario.category) return false;
      return subCategory.scenarioCategories?.includes(scenario.category) ?? false;
    });
  }, [scenarios, subCategory]);

  return { subCategory, filteredScenarios };
}
