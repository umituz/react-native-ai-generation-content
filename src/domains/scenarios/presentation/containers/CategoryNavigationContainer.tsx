/**
 * CategoryNavigationContainer
 * Orchestrates 3-step hierarchical scenario selection flow:
 * Main Category → Sub Category → Scenario List
 */

import React, { useState, useCallback } from "react";
import type { ScenarioData } from "../../domain/scenario.types";
import type { MainCategory, SubCategory } from "../../domain/category.types";
import { MainCategoryScreen } from "../screens/MainCategoryScreen";
import { SubCategoryScreen } from "../screens/SubCategoryScreen";
import { HierarchicalScenarioListScreen } from "../screens/HierarchicalScenarioListScreen";

type NavigationStep = "main_category" | "sub_category" | "scenario_list";

export interface CategoryNavigationContainerProps {
  readonly mainCategories: readonly MainCategory[];
  readonly subCategories: readonly SubCategory[];
  readonly scenarios: readonly ScenarioData[];
  readonly onSelectScenario: (scenarioId: string) => void;
  readonly onBack?: () => void;
  readonly onSelectMainCategory?: (categoryId: string) => void;
  readonly onSelectSubCategory?: (subCategoryId: string) => void;
  readonly t: (key: string) => string;
  readonly headerTitle?: string;
  readonly headerDescription?: string;
  readonly numColumns?: number;
  readonly isLoading?: boolean;
}

export const CategoryNavigationContainer: React.FC<
  CategoryNavigationContainerProps
> = ({
  mainCategories,
  subCategories,
  scenarios,
  onSelectScenario,
  onBack,
  onSelectMainCategory,
  onSelectSubCategory,
  t,
  headerTitle,
  headerDescription,
  numColumns = 2,
  isLoading = false,
}) => {
  const [currentStep, setCurrentStep] = useState<NavigationStep>("main_category");
  const [selectedMainCategoryId, setSelectedMainCategoryId] = useState<string | null>(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | null>(null);

  const handleSelectMainCategory = useCallback((categoryId: string) => {
    setSelectedMainCategoryId(categoryId);
    setCurrentStep("sub_category");
    onSelectMainCategory?.(categoryId);
  }, [onSelectMainCategory]);

  const handleSelectSubCategory = useCallback((subCategoryId: string) => {
    setSelectedSubCategoryId(subCategoryId);
    setCurrentStep("scenario_list");
    onSelectSubCategory?.(subCategoryId);
  }, [onSelectSubCategory]);

  const handleBackFromSubCategory = useCallback(() => {
    setSelectedMainCategoryId(null);
    setCurrentStep("main_category");
  }, []);

  const handleBackFromScenarioList = useCallback(() => {
    setSelectedSubCategoryId(null);
    setCurrentStep("sub_category");
  }, []);

  if (currentStep === "main_category") {
    return (
      <MainCategoryScreen
        mainCategories={mainCategories}
        onSelectCategory={handleSelectMainCategory}
        onBack={onBack}
        t={t}
        headerTitle={headerTitle}
        headerDescription={headerDescription}
      />
    );
  }

  if (currentStep === "sub_category" && selectedMainCategoryId) {
    const selectedMainCategory = mainCategories.find(c => c.id === selectedMainCategoryId);
    return (
      <SubCategoryScreen
        mainCategoryId={selectedMainCategoryId}
        subCategories={subCategories}
        onSelectSubCategory={handleSelectSubCategory}
        onBack={handleBackFromSubCategory}
        t={t}
        headerTitleKey={selectedMainCategory?.titleKey}
        headerDescriptionKey="scenario.sub_category.description"
      />
    );
  }

  if (currentStep === "scenario_list" && selectedSubCategoryId) {
    return (
      <HierarchicalScenarioListScreen
        subCategoryId={selectedSubCategoryId}
        subCategories={subCategories}
        scenarios={scenarios}
        onSelectScenario={onSelectScenario}
        onBack={handleBackFromScenarioList}
        t={t}
        numColumns={numColumns}
        isLoading={isLoading}
      />
    );
  }

  return null;
};
