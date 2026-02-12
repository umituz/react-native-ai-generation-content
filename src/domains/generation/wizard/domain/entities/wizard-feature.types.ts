/**
 * Wizard Feature Configuration Types - Barrel Export
 * Feature-level configs and builder utilities
 *
 * Architecture:
 * - Domain: Feature config types, scenario config types
 * - Domain Service: Config builder function
 * - Domain Knowledge: Preset configurations
 */

export type { WizardFeatureConfig, ScenarioBasedConfig } from "./wizard-feature-config.types";
export { buildWizardConfigFromScenario } from "./wizard-config-builder";
export { WIZARD_PRESETS } from "./wizard-presets.constants";
