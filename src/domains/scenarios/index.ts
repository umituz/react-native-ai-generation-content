/**
 * Scenarios Domain
 * Pre-configured AI generation scenarios for all apps
 */

// Types
export type { ScenarioOutputType } from "./domain/Scenario";
export { ScenarioCategory, ScenarioId } from "./domain/Scenario";
export type { Scenario } from "./domain/Scenario";

// Scenario Data
export { SCENARIOS } from "./infrastructure/ScenariosData";

// Utils
export { createStoryTemplate } from "./infrastructure/utils/scenario-utils";
