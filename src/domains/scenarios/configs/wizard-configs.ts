/**
 * Wizard Configurations - App-Agnostic
 * Classifies features by INPUT REQUIREMENTS, not app-specific scenarios
 * Apps can override inputType or provide custom step configurations
 */

import type { WizardFeatureConfig } from "../../generation/wizard/domain/entities/wizard-config.types";

declare const __DEV__: boolean;

/**
 * Input Type Classification
 * Based on what inputs the wizard needs (photos, text)
 * NOT based on app-specific scenario names
 */
export enum WizardInputType {
  /** Two images required (any two-person/two-image scenario) */
  DUAL_IMAGE = "dual_image",
  /** Single image required */
  SINGLE_IMAGE = "single_image",
  /** Text input only, no images */
  TEXT_INPUT = "text_input",
  /** Two images with face detection (face swap scenarios) */
  DUAL_IMAGE_FACE = "dual_image_face",
}

/** @deprecated Use WizardInputType instead */
export const FeatureType = WizardInputType;

/**
 * Generic Input Detection Patterns
 * Only patterns that describe input/output, NOT app-specific scenarios
 */
const INPUT_PATTERNS: Record<WizardInputType, RegExp[]> = {
  [WizardInputType.DUAL_IMAGE]: [
    // Empty - app must specify explicitly for dual image scenarios
    // This prevents accidental matches with app-specific terms
  ],

  [WizardInputType.SINGLE_IMAGE]: [
    /^image-to-video$/i,
    /upscale/i,
    /restore/i,
    /enhance/i,
    /remove-background/i,
    /background-remove/i,
    /remove-object/i,
    /hd-touch/i,
    /anime-selfie/i,
  ],

  [WizardInputType.TEXT_INPUT]: [
    /^text-to-video$/i,
    /^text-to-image$/i,
    /prompt-to/i,
  ],

  [WizardInputType.DUAL_IMAGE_FACE]: [
    /face-swap/i,
    /swap-face/i,
  ],
};

/**
 * Detect input type from scenario ID
 * Only matches generic I/O patterns
 * Returns SINGLE_IMAGE as safe default
 */
export const detectWizardInputType = (scenarioId: string): WizardInputType => {
  // Check patterns in priority order: TEXT_INPUT, SINGLE_IMAGE, DUAL_IMAGE_FACE
  // DUAL_IMAGE has no patterns - must be explicitly specified
  const checkOrder: WizardInputType[] = [
    WizardInputType.TEXT_INPUT,
    WizardInputType.DUAL_IMAGE_FACE,
    WizardInputType.SINGLE_IMAGE,
  ];

  for (const type of checkOrder) {
    const patterns = INPUT_PATTERNS[type];
    if (patterns.some((pattern) => pattern.test(scenarioId))) {
      return type;
    }
  }

  // Safe default: SINGLE_IMAGE (most common use case)
  return WizardInputType.SINGLE_IMAGE;
};

/**
 * Config Factory: DUAL_IMAGE (2 photos required)
 * Generic labels - apps provide translations
 */
const createDualImageConfig = (scenarioId: string): WizardFeatureConfig => ({
  id: scenarioId,
  name: scenarioId,
  steps: [
    {
      id: "photo_1",
      type: "photo_upload",
      titleKey: "photoUpload.first.title",
      subtitleKey: "photoUpload.first.subtitle",
      showFaceDetection: true,
      showPhotoTips: true,
      required: true,
    },
    {
      id: "photo_2",
      type: "photo_upload",
      titleKey: "photoUpload.second.title",
      subtitleKey: "photoUpload.second.subtitle",
      showFaceDetection: true,
      showPhotoTips: true,
      required: true,
    },
  ],
});

/**
 * Config Factory: SINGLE_IMAGE (1 photo required)
 */
const createSingleImageConfig = (scenarioId: string): WizardFeatureConfig => ({
  id: scenarioId,
  name: scenarioId,
  steps: [
    {
      id: "photo_1",
      type: "photo_upload",
      titleKey: "photoUpload.single.title",
      subtitleKey: "photoUpload.single.subtitle",
      showFaceDetection: false,
      showPhotoTips: true,
      required: true,
    },
  ],
});

/**
 * Config Factory: TEXT_INPUT (text only, no photos)
 */
const createTextInputConfig = (scenarioId: string): WizardFeatureConfig => ({
  id: scenarioId,
  name: scenarioId,
  steps: [
    {
      id: "text_input",
      type: "text_input",
      titleKey: "textInput.title",
      subtitleKey: "textInput.subtitle",
      placeholderKey: "textInput.placeholder",
      minLength: 10,
      maxLength: 500,
      multiline: true,
      required: true,
    },
  ],
});

/**
 * Config Factory: DUAL_IMAGE_FACE (2 photos with face detection)
 */
const createDualImageFaceConfig = (scenarioId: string): WizardFeatureConfig => ({
  id: scenarioId,
  name: scenarioId,
  steps: [
    {
      id: "photo_1",
      type: "photo_upload",
      titleKey: "photoUpload.source.title",
      subtitleKey: "photoUpload.source.subtitle",
      showFaceDetection: true,
      showPhotoTips: true,
      required: true,
    },
    {
      id: "photo_2",
      type: "photo_upload",
      titleKey: "photoUpload.target.title",
      subtitleKey: "photoUpload.target.subtitle",
      showFaceDetection: false,
      showPhotoTips: true,
      required: true,
    },
  ],
});

/**
 * Config Factories Registry
 */
const CONFIG_FACTORIES: Record<WizardInputType, (id: string) => WizardFeatureConfig> = {
  [WizardInputType.DUAL_IMAGE]: createDualImageConfig,
  [WizardInputType.SINGLE_IMAGE]: createSingleImageConfig,
  [WizardInputType.TEXT_INPUT]: createTextInputConfig,
  [WizardInputType.DUAL_IMAGE_FACE]: createDualImageFaceConfig,
};

/**
 * Explicit Wizard Configs (Optional)
 * Apps can register custom configs for specific scenario IDs
 */
export const SCENARIO_WIZARD_CONFIGS: Record<string, WizardFeatureConfig> = {};

/**
 * Merge config with overrides
 */
const mergeConfigOverrides = (
  config: WizardFeatureConfig,
  overrides?: Partial<WizardFeatureConfig>,
): WizardFeatureConfig => {
  if (!overrides) return config;
  return {
    ...config,
    ...overrides,
    steps: overrides.steps || config.steps,
  };
};

/**
 * Configuration Options
 */
export interface WizardConfigOptions {
  /** Explicit input type - highest priority */
  readonly inputType?: WizardInputType;
  /** Additional steps to append */
  readonly additionalSteps?: WizardFeatureConfig["steps"];
  /** Custom overrides */
  readonly overrides?: Partial<WizardFeatureConfig>;
}

/**
 * Get wizard config for a scenario
 *
 * Priority:
 * 1. Explicit inputType in options (highest)
 * 2. Explicit config in SCENARIO_WIZARD_CONFIGS
 * 3. Auto-detect from scenario ID patterns
 *
 * @example
 * // Auto-detect from ID
 * getScenarioWizardConfig("text-to-video")
 *
 * // Explicit input type for app-specific scenarios
 * getScenarioWizardConfig("ai-kiss", { inputType: WizardInputType.DUAL_IMAGE })
 */
export const getScenarioWizardConfig = (
  scenarioId: string,
  options?: WizardConfigOptions,
): WizardFeatureConfig => {
  // 1. Explicit inputType (highest priority)
  if (options?.inputType) {
    const factory = CONFIG_FACTORIES[options.inputType];
    let config = factory(scenarioId);
    config = mergeConfigOverrides(config, options.overrides);

    if (options.additionalSteps) {
      config = { ...config, steps: [...config.steps, ...options.additionalSteps] };
    }

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[WizardConfig] Using explicit inputType", {
        scenarioId,
        inputType: options.inputType,
      });
    }

    return config;
  }

  // 2. Explicit config in registry
  if (SCENARIO_WIZARD_CONFIGS[scenarioId]) {
    let config = SCENARIO_WIZARD_CONFIGS[scenarioId];
    config = mergeConfigOverrides(config, options?.overrides);

    if (options?.additionalSteps) {
      config = { ...config, steps: [...config.steps, ...options.additionalSteps] };
    }

    return config;
  }

  // 3. Auto-detect from scenario ID
  const inputType = detectWizardInputType(scenarioId);

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[WizardConfig] Auto-detected inputType", {
      scenarioId,
      inputType,
    });
  }

  const factory = CONFIG_FACTORIES[inputType];
  let config = factory(scenarioId);
  config = mergeConfigOverrides(config, options?.overrides);

  if (options?.additionalSteps) {
    config = { ...config, steps: [...config.steps, ...options.additionalSteps] };
  }

  return config;
};

/**
 * Register a custom wizard config for a scenario
 */
export const registerWizardConfig = (
  scenarioId: string,
  config: WizardFeatureConfig,
): void => {
  SCENARIO_WIZARD_CONFIGS[scenarioId] = config;
};

/**
 * Check if scenario has explicit wizard config
 */
export const hasExplicitConfig = (scenarioId: string): boolean => {
  return scenarioId in SCENARIO_WIZARD_CONFIGS;
};

/**
 * Get input type for a scenario
 */
export const getScenarioWizardInputType = (scenarioId: string): WizardInputType => {
  return detectWizardInputType(scenarioId);
};

/** @deprecated Use getScenarioWizardInputType instead */
export const getScenarioFeatureType = getScenarioWizardInputType;

/** @deprecated Use detectWizardInputType instead */
export const detectFeatureType = detectWizardInputType;
