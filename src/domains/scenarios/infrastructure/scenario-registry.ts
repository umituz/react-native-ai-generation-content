/**
 * Scenario Registry
 * Singleton registry for app-configured scenarios
 * Apps configure once at startup, package uses internally
 */

import type { Scenario, ScenarioOutputType } from "../domain/Scenario";

declare const __DEV__: boolean;

/** Configured scenario with required outputType */
export interface ConfiguredScenario extends Scenario {
  readonly outputType: ScenarioOutputType;
  readonly [key: string]: unknown;
}

interface ScenarioRegistryState {
  scenarios: Map<string, ConfiguredScenario>;
  defaultOutputType: ScenarioOutputType;
  isConfigured: boolean;
}

const state: ScenarioRegistryState = {
  scenarios: new Map(),
  defaultOutputType: "video",
  isConfigured: false,
};

/**
 * Configure scenarios for this app
 * Call once at app startup
 */
export const configureScenarios = (
  scenarios: readonly ConfiguredScenario[],
  defaultOutputType: ScenarioOutputType = "video",
): void => {
  state.scenarios.clear();

  for (const scenario of scenarios) {
    state.scenarios.set(scenario.id, scenario);
  }

  state.defaultOutputType = defaultOutputType;
  state.isConfigured = true;

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[ScenarioRegistry] Configured:", {
      count: scenarios.length,
      defaultOutputType,
    });
  }
};

/**
 * Get scenario by ID from configured scenarios
 */
export const getConfiguredScenario = (
  id: string,
): ConfiguredScenario | undefined => {
  const found = state.scenarios.get(id);

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[ScenarioRegistry] getConfiguredScenario:", {
      id,
      found: !!found,
      outputType: found?.outputType,
    });
  }

  return found;
};

/**
 * Get default output type for this app
 */
export const getDefaultOutputType = (): ScenarioOutputType => {
  return state.defaultOutputType;
};

/**
 * Check if scenarios are configured
 */
export const isScenariosConfigured = (): boolean => {
  return state.isConfigured;
};

/**
 * Get all configured scenarios
 */
export const getAllConfiguredScenarios = (): readonly ConfiguredScenario[] => {
  return Array.from(state.scenarios.values());
};

/**
 * Reset registry (for testing)
 */
export const resetScenarioRegistry = (): void => {
  state.scenarios.clear();
  state.defaultOutputType = "video";
  state.isConfigured = false;
};
