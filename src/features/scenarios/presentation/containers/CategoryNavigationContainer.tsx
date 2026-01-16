/**
 * CategoryNavigationContainer
 * Orchestrates 3-step hierarchical scenario selection flow:
 * Main Category → Sub Category → Scenario List
 */

import React, { useState, useCallback } from "react";
import type {
  ScenarioData,
  ScenarioMainCategory,
  ScenarioSubCategory,
} from "../../domain/types";
import { MainCategoryScreen } from "../screens/MainCategoryScreen";
import { SubCategoryScreen } from "../screens/SubCategoryScreen";
import { HierarchicalScenarioListScreen } from "../screens/HierarchicalScenarioListScreen";

type NavigationStep = "main_category" | "sub_category" | "scenario_list";

export interface CategoryNavigationContainerProps {
  readonly mainCategories: readonly ScenarioMainCategory[];
  readonly subCategories: readonly ScenarioSubCategory[];
  readonly scenarios: readonly ScenarioData[];
  readonly onSelectScenario: (scenarioId: string) => void;
  readonly onBack?: () => void;
  readonly t: (key: string) => string;
  readonly headerTitle?: string;
  readonly headerDescription?: string;
  readonly numColumns?: number;
}

export const CategoryNavigationContainer: React.FC<
  CategoryNavigationContainerProps
> = ({
  mainCategories,
  subCategories,
  scenarios,
  onSelectScenario,
  onBack,
  t,
  headerTitle,
  headerDescription,
  numColumns = 2,
}) => {
  const [currentStep, setCurrentStep] = useState<NavigationStep>("main_category");
  const [selectedMainCategoryId, setSelectedMainCategoryId] = useState<string | null>(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | null>(null);

  const handleSelectMainCategory = useCallback((categoryId: string) => {
    setSelectedMainCategoryId(categoryId);
    setCurrentStep("sub_category");
  }, []);

  const handleSelectSubCategory = useCallback((subCategoryId: string) => {
    setSelectedSubCategoryId(subCategoryId);
    setCurrentStep("scenario_list");
  }, []);

  const handleBackFromSubCategory = useCallback(() => {
    setSelectedMainCategoryId(null);
    setCurrentStep("main_category");
  }, []);

  const handleBackFromScenarioList = useCallback(() => {
    setSelectedSubCategoryId(null);
    setCurrentStep("sub_category");
  }, []);

  const handleBackFromMainCategory = useCallback(() => {
    if (onBack) {
      onBack();
    }
  }, [onBack]);

  if (currentStep === "main_category") {
    return (
      <MainCategoryScreen
        mainCategories={mainCategories}
        onSelectCategory={handleSelectMainCategory}
        onBack={onBack ? handleBackFromMainCategory : undefined}
        t={t}
        headerTitle={headerTitle}
        headerDescription={headerDescription}
      />
    );
  }

  if (currentStep === "sub_category" && selectedMainCategoryId) {
    return (
      <SubCategoryScreen
        mainCategoryId={selectedMainCategoryId}
        subCategories={subCategories}
        onSelectSubCategory={handleSelectSubCategory}
        onBack={handleBackFromSubCategory}
        t={t}
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
      />
    );
  }

  return null;
};
