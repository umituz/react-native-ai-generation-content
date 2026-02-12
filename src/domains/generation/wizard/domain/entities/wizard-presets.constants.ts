/**
 * Wizard Presets Constants
 * Domain Knowledge: Pre-configured scenarios for common use cases
 */

import type { ScenarioBasedConfig } from "./wizard-feature-config.types";

export const WIZARD_PRESETS: Record<string, ScenarioBasedConfig> = {
  TWO_PHOTOS: {
    photoCount: 2,
  },
  SINGLE_PHOTO: {
    photoCount: 1,
    requireStyleSelection: true,
    requireDurationSelection: true,
  },
  TEXT_ONLY: {
    photoCount: 0,
    requireText: true,
    requireStyleSelection: true,
    requireDurationSelection: true,
  },
} as const;
