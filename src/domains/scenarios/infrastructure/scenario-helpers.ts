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
  /** Optional filter to exclude certain scenarios by ID */
  readonly excludeIds?: readonly string[];
  /** Optional filter to include only certain category IDs */
  readonly includeCategories?: readonly string[];
}

/**
 * Creates app-configured scenarios from package scenarios
 * Apps use this to set their desired outputType and model
 *
 * @example
 * // Video generation app
 * const scenarios = createScenariosForApp(SCENARIOS, {
 *   outputType: "video",
 *   model: "fal-ai/veo3/image-to-video"
 * });
 *
 * @example
 * // Image generation app
 * const scenarios = createScenariosForApp(SCENARIOS, {
 *   outputType: "image",
 *   model: "fal-ai/nano-banana/edit",
 *   excludeIds: ["custom"]
 * });
 */
export const createScenariosForApp = (
  scenarios: readonly Scenario[],
  config: AppScenarioConfig,
): Scenario[] => {
  const { outputType, model, excludeIds, includeCategories } = config;

  return scenarios
    .filter((scenario) => {
      // Filter by excluded IDs
      if (excludeIds?.includes(scenario.id)) {
        return false;
      }
      // Filter by included categories
      if (
        includeCategories &&
        includeCategories.length > 0 &&
        scenario.category &&
        !includeCategories.includes(scenario.category)
      ) {
        return false;
      }
      return true;
    })
    .map((scenario) => ({
      ...scenario,
      outputType,
      ...(model && { model }),
    }));
};

/**
 * Filters scenarios by output type (if they have one set)
 * Useful for apps that have mixed scenarios with different output types
 *
 * @example
 * const videoScenarios = filterScenariosByOutputType(scenarios, "video");
 */
export const filterScenariosByOutputType = (
  scenarios: readonly Scenario[],
  outputType: ScenarioOutputType,
): Scenario[] => scenarios.filter((s) => s.outputType === outputType);

/**
 * Filters scenarios by category
 *
 * @example
 * const weddingScenarios = filterScenariosByCategory(scenarios, "wedding");
 */
export const filterScenariosByCategory = (
  scenarios: readonly Scenario[],
  category: string,
): Scenario[] => scenarios.filter((s) => s.category === category);

/**
 * Gets unique categories from scenarios
 *
 * @example
 * const categories = getScenarioCategories(scenarios);
 * // ["wedding", "fantasy", "adventure", ...]
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
 *
 * @example
 * const scenario = findScenarioById(scenarios, "beach_wedding");
 */
export const findScenarioById = (
  scenarios: readonly Scenario[],
  id: string,
): Scenario | undefined => scenarios.find((s) => s.id === id);
