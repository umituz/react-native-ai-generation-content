/**
 * Generation Utilities
 * Config-driven input building and result processing
 */

import { enhanceCouplePrompt } from "./couplePromptEnhancer";
import type { CoupleFeatureSelection } from "../domain/types";

/**
 * Scenario config interface - app provides this data
 */
export interface ScenarioConfig {
  readonly id: string;
  readonly aiPrompt: string;
  readonly storyTemplate: string;
  readonly title?: string;
}

/**
 * Visual style modifiers config
 */
export interface VisualStyleConfig {
  readonly [key: string]: string;
}

export const DEFAULT_VISUAL_STYLES: VisualStyleConfig = {
  realistic: "photorealistic, highly detailed, professional photography",
  anime: "anime art style, vibrant colors, manga aesthetic, cel-shaded",
  cinematic: "cinematic lighting, dramatic composition, film photography, movie scene",
  "3d": "3D render, octane render, unreal engine, raytraced lighting",
} as const;

/**
 * Uploaded image interface
 */
export interface GenerationImage {
  readonly uri: string;
  readonly base64?: string;
  readonly previewUrl?: string;
}

/**
 * Generation input builder config
 */
export interface BuildGenerationInputConfig {
  readonly partnerA: GenerationImage | null;
  readonly partnerB: GenerationImage | null;
  readonly partnerAName: string;
  readonly partnerBName: string;
  readonly scenario: ScenarioConfig | null;
  readonly customPrompt?: string;
  readonly visualStyle: string;
  readonly defaultPartnerAName: string;
  readonly defaultPartnerBName: string;
  readonly coupleFeatureSelection?: CoupleFeatureSelection;
  readonly visualStyles?: VisualStyleConfig;
  readonly customScenarioId?: string;
}

/**
 * Generation input with base64
 */
export interface GenerationInputResult {
  readonly partnerA: GenerationImage;
  readonly partnerB: GenerationImage;
  readonly partnerABase64: string;
  readonly partnerBBase64: string;
  readonly prompt: string;
  readonly partnerAName: string;
  readonly partnerBName: string;
  readonly scenarioId: string;
  readonly customPrompt?: string;
}

/**
 * Build generation input from config
 */
export const buildGenerationInputFromConfig = (
  config: BuildGenerationInputConfig,
): GenerationInputResult | null => {
  const {
    partnerA,
    partnerB,
    partnerAName,
    partnerBName,
    scenario,
    customPrompt,
    visualStyle,
    defaultPartnerAName,
    defaultPartnerBName,
    coupleFeatureSelection = {},
    visualStyles = DEFAULT_VISUAL_STYLES,
    customScenarioId = "custom",
  } = config;

  if (!partnerA || !partnerB || !scenario) {
    return null;
  }

  let prompt = scenario.aiPrompt;

  if (scenario.id === customScenarioId && customPrompt) {
    prompt = prompt.replace("{{customPrompt}}", customPrompt);
  }

  const styleModifier = visualStyles[visualStyle];
  if (visualStyle !== "realistic" && styleModifier) {
    prompt = prompt.replace(/photorealistic/gi, styleModifier);
  }

  prompt = enhanceCouplePrompt(prompt, coupleFeatureSelection);

  return {
    partnerA,
    partnerB,
    partnerABase64: partnerA.base64 || "",
    partnerBBase64: partnerB.base64 || "",
    prompt,
    partnerAName: partnerAName || defaultPartnerAName,
    partnerBName: partnerBName || defaultPartnerBName,
    scenarioId: scenario.id,
    customPrompt,
  };
};

/**
 * Process result config
 */
export interface ProcessResultConfig {
  readonly scenarioId: string;
  readonly partnerAName: string;
  readonly partnerBName: string;
  readonly scenario: ScenarioConfig;
}

/**
 * Generation result
 */
export interface GenerationResultData {
  readonly imageUrl: string;
  readonly story: string;
  readonly date: string;
  readonly scenarioId: string;
  readonly names: string;
  readonly timestamp: number;
}

/**
 * Process generation result from config
 */
export const processGenerationResultFromConfig = (
  imageUrl: string,
  config: ProcessResultConfig,
): GenerationResultData => {
  const { scenario, partnerAName, partnerBName, scenarioId } = config;

  const futureYear = new Date().getFullYear() + 5 + Math.floor(Math.random() * 20);
  const months = ["May", "June", "August"];
  const randomMonth = months[Math.floor(Math.random() * months.length)];
  const randomDay = Math.floor(Math.random() * 28) + 1;

  const story = scenario.storyTemplate
    .replace(/\{\{partnerA\}\}/g, partnerAName)
    .replace(/\{\{partnerB\}\}/g, partnerBName)
    .replace(/\{\{year\}\}/g, String(futureYear));

  return {
    imageUrl,
    story,
    date: `${randomMonth} ${randomDay}, ${futureYear}`,
    scenarioId,
    names: `${partnerAName} & ${partnerBName}`,
    timestamp: Date.now(),
  };
};

/**
 * Build creation config
 */
export interface BuildCreationConfig {
  readonly scenarioId: string;
  readonly partnerAName: string;
  readonly partnerBName: string;
  readonly scenarioTitle?: string;
}

/**
 * Creation data
 */
export interface CoupleFutureCreationData {
  readonly id: string;
  readonly uri: string;
  readonly type: string;
  readonly prompt: string;
  readonly metadata: {
    readonly scenarioId: string;
    readonly partnerAName: string;
    readonly partnerBName: string;
  };
  readonly createdAt: Date;
  readonly isShared: boolean;
  readonly isFavorite: boolean;
}

/**
 * Build creation from result
 */
export const buildCreationFromConfig = (
  result: GenerationResultData,
  config: BuildCreationConfig,
): CoupleFutureCreationData => {
  const { scenarioId, partnerAName, partnerBName, scenarioTitle } = config;

  return {
    id: `${scenarioId}_${Date.now()}`,
    uri: result.imageUrl,
    type: scenarioId,
    prompt: scenarioTitle || scenarioId,
    metadata: {
      scenarioId,
      partnerAName,
      partnerBName,
    },
    createdAt: new Date(),
    isShared: false,
    isFavorite: false,
  };
};
