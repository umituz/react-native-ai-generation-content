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
 * Romantic Mood Options for Couple Scenarios
 */
const ROMANTIC_MOOD_OPTIONS = [
  { id: "romantic", label: "Romantic", icon: "❤️", value: "romantic" },
  { id: "mysterious", label: "Mysterious", icon: "🌙", value: "mysterious" },
  { id: "magical", label: "Magical", icon: "✨", value: "magical" },
  { id: "energetic", label: "Energetic", icon: "⚡", value: "energetic" },
  { id: "melancholic", label: "Melancholic", icon: "☁️", value: "melancholic" },
  { id: "passionate", label: "Passionate", icon: "🔥", value: "passionate" },
  { id: "nostalgic", label: "Nostalgic", icon: "📷", value: "nostalgic" },
  { id: "futuristic", label: "Futuristic", icon: "🚀", value: "futuristic" },
];

/**
 * Art Style Options for Couple Scenarios
 */
const ART_STYLE_OPTIONS = [
  { id: "original", label: "Original", icon: "🖼️", value: "original" },
  { id: "cubism", label: "Cubism", icon: "🔷", value: "cubism" },
  { id: "popArt", label: "Pop Art", icon: "🎨", value: "pop_art" },
  { id: "impressionism", label: "Impressionism", icon: "🖌️", value: "impressionism" },
  { id: "surrealism", label: "Surrealism", icon: "👁️", value: "surrealism" },
  { id: "renaissance", label: "Renaissance", icon: "🎭", value: "renaissance" },
];

/**
 * Artist Style Options for Couple Scenarios
 */
const ARTIST_STYLE_OPTIONS = [
  { id: "vanGogh", label: "Van Gogh", icon: "🖌️", value: "van_gogh" },
  { id: "picasso", label: "Picasso", icon: "🔷", value: "picasso" },
  { id: "fridaKahlo", label: "Frida Kahlo", icon: "🌺", value: "frida_kahlo" },
  { id: "daVinci", label: "Da Vinci", icon: "🎨", value: "da_vinci" },
];

/**
 * Config Factory for COUPLE features (2 photos + style selections)
 * Generic sequential labels for two-person scenarios
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
    {
      id: "romantic_mood",
      type: "selection",
      selectionType: "custom",
      titleKey: "selection.romanticMood.title",
      subtitleKey: "selection.romanticMood.subtitle",
      options: ROMANTIC_MOOD_OPTIONS,
      multiSelect: true,
      required: false,
    },
    {
      id: "art_style",
      type: "selection",
      selectionType: "style",
      titleKey: "selection.artStyle.title",
      subtitleKey: "selection.artStyle.subtitle",
      options: ART_STYLE_OPTIONS,
      multiSelect: false,
      required: false,
    },
    {
      id: "artist_style",
      type: "selection",
      selectionType: "custom",
      titleKey: "selection.artistStyle.title",
      subtitleKey: "selection.artistStyle.subtitle",
      options: ARTIST_STYLE_OPTIONS,
      multiSelect: false,
      required: false,
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
 * Config Factory for FACE_SWAP features (2 photos)
 * Specific labels for face replacement scenarios
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
 * Apply configuration options to filter/modify steps
 */
const applyConfigOptions = (
  config: WizardFeatureConfig,
  options?: WizardConfigOptions,
): WizardFeatureConfig => {
  if (!options) return config;

  let steps = [...config.steps];

  // Filter out style selection steps if disabled
  if (options.disableStyleSelections) {
    const styleStepIds = ["romantic_mood", "art_style", "artist_style"];
    steps = steps.filter((step) => !styleStepIds.includes(step.id));

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[WizardConfig] Style selections disabled", {
        filteredStepIds: styleStepIds,
        remainingSteps: steps.map((s) => s.id),
      });
    }
  }

  return {
    ...config,
    steps,
  };
};

/**
 * Configuration Options for Wizard Behavior
 */
export interface WizardConfigOptions {
  readonly disableStyleSelections?: boolean; // Disable romantic mood, art style, artist style
}

/**
 * Get wizard config for a scenario
 * 1. Check for explicit config in SCENARIO_WIZARD_CONFIGS
 * 2. Auto-detect feature type and generate config
 * 3. Apply overrides if provided
 * 4. Apply options to disable certain steps
 *
 * This means ALL scenarios work automatically!
 */
export const getScenarioWizardConfig = (
  scenarioId: string,
  options?: WizardConfigOptions,
  overrides?: Partial<WizardFeatureConfig>,
): WizardFeatureConfig => {
  // 1. Explicit config (highest priority)
  if (SCENARIO_WIZARD_CONFIGS[scenarioId]) {
    const config = mergeConfigOverrides(SCENARIO_WIZARD_CONFIGS[scenarioId], overrides);
    return applyConfigOptions(config, options);
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
  const configWithOverrides = mergeConfigOverrides(config, overrides);

  // 5. Apply options (disable steps)
  return applyConfigOptions(configWithOverrides, options);
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
