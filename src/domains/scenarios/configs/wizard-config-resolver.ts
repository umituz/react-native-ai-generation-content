/**
 * Wizard Config Resolver
 * Main resolver for getting wizard configurations
 */

import type { WizardFeatureConfig } from "../../generation/wizard/domain/entities/wizard-config.types";
import { getConfiguredScenario } from "../infrastructure/scenario-registry";
import { WizardInputType, type WizardConfigOptions } from "./wizard-input.types";
import { detectWizardInputType, SCENARIO_TO_WIZARD_INPUT_MAP } from "./wizard-input-detector";
import { getConfigFactory } from "./wizard-step-factories";

declare const __DEV__: boolean;

const scenarioWizardConfigs: Record<string, WizardFeatureConfig> = {};

function mergeConfigOverrides(
  config: WizardFeatureConfig,
  overrides?: Partial<WizardFeatureConfig>,
): WizardFeatureConfig {
  if (!overrides) return config;
  return {
    ...config,
    ...overrides,
    steps: overrides.steps ?? config.steps,
  };
}

function applyAdditionalSteps(
  config: WizardFeatureConfig,
  additionalSteps?: WizardFeatureConfig["steps"],
): WizardFeatureConfig {
  if (!additionalSteps) return config;
  return { ...config, steps: [...config.steps, ...additionalSteps] };
}

function buildConfig(
  scenarioId: string,
  inputType: WizardInputType,
  options?: WizardConfigOptions,
): WizardFeatureConfig {
  const factory = getConfigFactory(inputType);
  let config = factory(scenarioId);
  config = mergeConfigOverrides(config, options?.overrides);
  return applyAdditionalSteps(config, options?.additionalSteps);
}

/**
 * Get wizard config for a scenario
 * Priority: 1. Explicit inputType  2. Registry config  3. Scenario inputType  4. Pattern detection
 */
export function getScenarioWizardConfig(
  scenarioId: string,
  options?: WizardConfigOptions,
): WizardFeatureConfig {
  if (options?.inputType) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[WizardConfig] Using explicit inputType", { scenarioId, inputType: options.inputType });
    }
    return buildConfig(scenarioId, options.inputType, options);
  }

  if (scenarioWizardConfigs[scenarioId]) {
    let config = scenarioWizardConfigs[scenarioId];
    config = mergeConfigOverrides(config, options?.overrides);
    return applyAdditionalSteps(config, options?.additionalSteps);
  }

  const scenario = getConfiguredScenario(scenarioId);
  if (scenario?.inputType) {
    const wizardInputType = SCENARIO_TO_WIZARD_INPUT_MAP[scenario.inputType];
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[WizardConfig] Using scenario.inputType", {
        scenarioId,
        scenarioInputType: scenario.inputType,
        wizardInputType,
      });
    }
    return buildConfig(scenarioId, wizardInputType, options);
  }

  const inputType = detectWizardInputType(scenarioId);
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[WizardConfig] Auto-detected inputType", { scenarioId, inputType });
  }
  return buildConfig(scenarioId, inputType, options);
}

/**
 * Register a custom wizard config
 */
export function registerWizardConfig(scenarioId: string, config: WizardFeatureConfig): void {
  scenarioWizardConfigs[scenarioId] = config;
}

/**
 * Check if scenario has explicit wizard config
 */
export function hasExplicitConfig(scenarioId: string): boolean {
  return scenarioId in scenarioWizardConfigs;
}

/**
 * Get input type for a scenario
 */
export function getScenarioWizardInputType(scenarioId: string): WizardInputType {
  return detectWizardInputType(scenarioId);
}
