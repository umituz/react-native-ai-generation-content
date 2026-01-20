/**
 * CategoryNavigationContainer
 * Orchestrates 3-step hierarchical scenario selection flow:
 * Main Category → Sub Category → Scenario List
 */

import React, { useState, useCallback, useEffect } from "react";
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

  // Debug: Initial mount
  useEffect(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[CategoryNavigationContainer] Mounted", {
        mainCategoriesCount: mainCategories.length,
        subCategoriesCount: subCategories.length,
        scenariosCount: scenarios.length,
        currentStep,
      });
    }
  }, []);

  // Debug: Step changes
  useEffect(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[CategoryNavigationContainer] Step changed", {
        currentStep,
        selectedMainCategoryId,
        selectedSubCategoryId,
      });
    }
  }, [currentStep, selectedMainCategoryId, selectedSubCategoryId]);

  const handleSelectMainCategory = useCallback((categoryId: string) => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[CategoryNavigationContainer] Main category selected", {
        categoryId,
      });
    }
    setSelectedMainCategoryId(categoryId);
    setCurrentStep("sub_category");
    if (onSelectMainCategory) {
      onSelectMainCategory(categoryId);
    }
  }, [onSelectMainCategory]);

  const handleSelectSubCategory = useCallback((subCategoryId: string) => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[CategoryNavigationContainer] Sub category selected", {
        subCategoryId,
      });
    }
    setSelectedSubCategoryId(subCategoryId);
    setCurrentStep("scenario_list");
    if (onSelectSubCategory) {
      onSelectSubCategory(subCategoryId);
    }
  }, [onSelectSubCategory]);

  const handleBackFromSubCategory = useCallback(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[CategoryNavigationContainer] Back from sub category");
    }
    setSelectedMainCategoryId(null);
    setCurrentStep("main_category");
  }, []);

  const handleBackFromScenarioList = useCallback(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[CategoryNavigationContainer] Back from scenario list");
    }
    setSelectedSubCategoryId(null);
    setCurrentStep("sub_category");
  }, []);

  const handleBackFromMainCategory = useCallback(() => {
    if (onBack) {
      onBack();
    }
  }, [onBack]);

  if (currentStep === "main_category") {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[CategoryNavigationContainer] Rendering MainCategoryScreen", {
        mainCategoriesCount: mainCategories.length,
      });
    }
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
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[CategoryNavigationContainer] Rendering SubCategoryScreen", {
        selectedMainCategoryId,
        subCategoriesCount: subCategories.length,
      });
    }
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
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[CategoryNavigationContainer] Rendering HierarchicalScenarioListScreen", {
        selectedSubCategoryId,
        scenariosCount: scenarios.length,
      });
    }
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

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[CategoryNavigationContainer] Rendering NULL - no matching condition", {
      currentStep,
      selectedMainCategoryId,
      selectedSubCategoryId,
    });
  }

  return null;
};
