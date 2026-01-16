/**
 * Wizard Configurations for ALL Scenarios
 * Auto-detects feature type and generates appropriate config
 * Supports overrides for customization
 */

import type { WizardFeatureConfig } from "../../wizard/domain/entities/wizard-config.types";

/**
 * Feature Type Classification
 * Determines wizard flow based on scenario characteristics
 */
export enum FeatureType {
  COUPLE = "couple",               // 2 photos - romantic/partner scenarios
  SINGLE_PHOTO = "single_photo",   // 1 photo - editing/transformation
  FACE_SWAP = "face_swap",         // 2 photos - face replacement
  TEXT_BASED = "text_based",       // 0 photos - text-to-media
}

/**
 * Feature Detection Patterns
 * Regex patterns to auto-detect feature type from scenario ID
 */
const FEATURE_PATTERNS: Record<FeatureType, RegExp[]> = {
  [FeatureType.COUPLE]: [
    /kiss/i,           // romantic-kiss, ai-kiss, first-kiss, etc.
    /hug/i,            // ai-hug, back-hug, bear-hug, etc.
    /couple/i,         // couple-future, couple-ai-baby
    /partner/i,        // partner scenarios
    /wedding/i,        // wedding scenarios
    /anniversary/i,
    /dance/i,          // first-dance, etc.
    /together/i,
    /embrace/i,
    /romance/i,
    /love/i,
    /relationship/i,
    /years/i,          // 5-years, 10-years (couple-future)
    /age/i,            // old-age (couple-future)
    /future.*child/i,  // future-child
    /parenthood/i,
    /proposal/i,
    /engagement/i,
  ],

  [FeatureType.SINGLE_PHOTO]: [
    /background.*remove/i,
    /remove.*background/i,
    /photo.*restore/i,
    /restore.*photo/i,
    /upscale/i,
    /hd.*touch/i,
    /touch.*up/i,
    /enhance/i,
    /anime.*selfie/i,
    /selfie.*anime/i,
    /image.*to.*video/i,
    /remove.*object/i,
    /object.*remove/i,
  ],

  [FeatureType.TEXT_BASED]: [
    /text.*to.*video/i,
    /text.*to.*image/i,
    /prompt.*to/i,
  ],

  [FeatureType.FACE_SWAP]: [
    /face.*swap/i,
    /swap.*face/i,
  ],
};

/**
 * Detect feature type from scenario ID
 */
export const detectFeatureType = (scenarioId: string): FeatureType => {
  for (const [type, patterns] of Object.entries(FEATURE_PATTERNS)) {
    if (patterns.some((pattern) => pattern.test(scenarioId))) {
      return type as FeatureType;
    }
  }
  // Default: COUPLE (most common in AI video generation apps)
  return FeatureType.COUPLE;
};

/**
 * Config Factory for COUPLE features (2 photos)
 * Context-aware labels for couple/partner scenarios
 */
const createCoupleConfig = (scenarioId: string): WizardFeatureConfig => ({
  id: scenarioId,
  name: scenarioId,
  steps: [
    {
      id: "photo_1",
      type: "photo_upload",
      titleKey: "photoUpload.couple.step1.title",
      subtitleKey: "photoUpload.couple.step1.subtitle",
      showFaceDetection: true,
      showPhotoTips: true,
      required: true,
    },
    {
      id: "photo_2",
      type: "photo_upload",
      titleKey: "photoUpload.couple.step2.title",
      subtitleKey: "photoUpload.couple.step2.subtitle",
      showFaceDetection: true,
      showPhotoTips: true,
      required: true,
    },
  ],
});

/**
 * Config Factory for SINGLE_PHOTO features (1 photo)
 * Generic single photo step - label comes from translation
 */
const createSinglePhotoConfig = (scenarioId: string): WizardFeatureConfig => ({
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
 * Config Factory for TEXT_BASED features (0 photos, text input)
 */
const createTextBasedConfig = (scenarioId: string): WizardFeatureConfig => ({
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
    {
      id: "style_selection",
      type: "selection",
      selectionType: "style",
      titleKey: "styleSelection.title",
      subtitleKey: "styleSelection.subtitle",
      options: [], // Provided by app/feature
      required: false,
    },
  ],
});

/**
 * Config Factory for FACE_SWAP features (2 photos, different context)
 * Context-aware labels for face swap scenarios
 */
const createFaceSwapConfig = (scenarioId: string): WizardFeatureConfig => ({
  id: scenarioId,
  name: scenarioId,
  steps: [
    {
      id: "photo_1",
      type: "photo_upload",
      titleKey: "photoUpload.faceSwap.step1.title",
      subtitleKey: "photoUpload.faceSwap.step1.subtitle",
      showFaceDetection: true,
      showPhotoTips: true,
      required: true,
    },
    {
      id: "photo_2",
      type: "photo_upload",
      titleKey: "photoUpload.faceSwap.step2.title",
      subtitleKey: "photoUpload.faceSwap.step2.subtitle",
      showFaceDetection: false,
      showPhotoTips: true,
      required: true,
    },
  ],
});

/**
 * Config Factories Registry
 */
const FEATURE_CONFIG_FACTORIES: Record<FeatureType, (id: string) => WizardFeatureConfig> = {
  [FeatureType.COUPLE]: createCoupleConfig,
  [FeatureType.SINGLE_PHOTO]: createSinglePhotoConfig,
  [FeatureType.TEXT_BASED]: createTextBasedConfig,
  [FeatureType.FACE_SWAP]: createFaceSwapConfig,
};

/**
 * Explicit Wizard Configs (Optional)
 * Define specific configs for scenarios that need custom flows
 * Most scenarios will use auto-generated configs from factories
 */
export const SCENARIO_WIZARD_CONFIGS: Record<string, WizardFeatureConfig> = {
  // Add custom configs here only if needed
  // Example:
  // "special-scenario": {
  //   id: "special-scenario",
  //   steps: [...custom steps]
  // }
};

/**
 * Merge config overrides
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
 * Get wizard config for a scenario
 * 1. Check for explicit config in SCENARIO_WIZARD_CONFIGS
 * 2. Auto-detect feature type and generate config
 * 3. Apply overrides if provided
 *
 * This means ALL scenarios work automatically!
 */
export const getScenarioWizardConfig = (
  scenarioId: string,
  overrides?: Partial<WizardFeatureConfig>,
): WizardFeatureConfig => {
  // 1. Explicit config (highest priority)
  if (SCENARIO_WIZARD_CONFIGS[scenarioId]) {
    return mergeConfigOverrides(SCENARIO_WIZARD_CONFIGS[scenarioId], overrides);
  }

  // 2. Auto-detect feature type
  const featureType = detectFeatureType(scenarioId);

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[WizardConfig] Auto-detected feature type", {
      scenarioId,
      featureType,
    });
  }

  // 3. Generate config from factory
  const factory = FEATURE_CONFIG_FACTORIES[featureType];
  const config = factory(scenarioId);

  // 4. Apply overrides
  return mergeConfigOverrides(config, overrides);
};

/**
 * Check if scenario has explicit wizard config
 */
export const hasExplicitConfig = (scenarioId: string): boolean => {
  return scenarioId in SCENARIO_WIZARD_CONFIGS;
};

/**
 * Get feature type for a scenario
 */
export const getScenarioFeatureType = (scenarioId: string): FeatureType => {
  return detectFeatureType(scenarioId);
};
