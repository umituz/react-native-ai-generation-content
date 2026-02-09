/**
 * Scenario Helpers
 * Utilities for configuring scenarios in apps
 */

import type { Scenario, ScenarioOutputType } from "../domain/Scenario";

/**
 * Configuration for creating app-specific scenarios
 */
export interface AppScenarioConfig {
  /** Output type for all scenarios (image or video) */
  readonly outputType: ScenarioOutputType;
  /** Optional AI model to assign to all scenarios */
  readonly model?: string;
  /** Categories to include (whitelist) */
  readonly categories: readonly string[];
}

/**
 * Creates app-configured scenarios from package scenarios
 * Uses whitelist approach - only includes specified categories
 */
export const createScenariosForApp = (
  scenarios: readonly Scenario[],
  config: AppScenarioConfig,
): Scenario[] => {
  const { outputType, model, categories } = config;

  return scenarios
    .filter((scenario) => {
      if (!scenario.category) {
        return false;
      }
      return categories.includes(scenario.category);
    })
    .map((scenario) => ({
      ...scenario,
      outputType,
      ...(model && { model }),
    }));
};

/**
 * Filters scenarios by output type
 */
export const filterScenariosByOutputType = (
  scenarios: readonly Scenario[],
  outputType: ScenarioOutputType,
): Scenario[] => scenarios.filter((s) => s.outputType === outputType);

/**
 * Filters scenarios by category
 */
export const filterScenariosByCategory = (
  scenarios: readonly Scenario[],
  category: string,
): Scenario[] => scenarios.filter((s) => s.category === category);

/**
 * Gets unique categories from scenarios
 */
export const getScenarioCategories = (
  scenarios: readonly Scenario[],
): string[] => {
  const categories = new Set<string>();
  scenarios.forEach((s) => {
    if (s.category) {
      categories.add(s.category);
    }
  });
  return Array.from(categories);
};

/**
 * Finds a scenario by ID
 */
export const findScenarioById = (
  scenarios: readonly Scenario[],
  id: string,
): Scenario | undefined => scenarios.find((s) => s.id === id);
