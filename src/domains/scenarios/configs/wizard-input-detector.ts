/**
 * Wizard Input Detector
 * Detects wizard input type from scenario ID patterns
 */

import type { ScenarioInputType } from "../domain/Scenario";
import { WizardInputType } from "./wizard-input.types";

/**
 * Map ScenarioInputType to WizardInputType
 */
export const SCENARIO_TO_WIZARD_INPUT_MAP: Record<ScenarioInputType, WizardInputType> = {
  single: WizardInputType.SINGLE_IMAGE,
  dual: WizardInputType.DUAL_IMAGE,
  text: WizardInputType.TEXT_INPUT,
};

/**
 * Pattern-based input detection
 * Only matches generic I/O patterns
 */
const INPUT_PATTERNS: Record<WizardInputType, readonly RegExp[]> = {
  [WizardInputType.DUAL_IMAGE]: [/ai-kiss/i, /ai-hug/i, /couple/i, /dual/i],
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
  [WizardInputType.TEXT_INPUT]: [/^text-to-video$/i, /^text-to-image$/i, /prompt-to/i],
  [WizardInputType.DUAL_IMAGE_FACE]: [/face-swap/i, /swap-face/i],
};

const DETECTION_ORDER: readonly WizardInputType[] = [
  WizardInputType.TEXT_INPUT,
  WizardInputType.DUAL_IMAGE,
  WizardInputType.DUAL_IMAGE_FACE,
  WizardInputType.SINGLE_IMAGE,
];

/**
 * Detect input type from scenario ID using pattern matching
 */
export function detectWizardInputType(scenarioId: string): WizardInputType {
  for (const type of DETECTION_ORDER) {
    const patterns = INPUT_PATTERNS[type];
    if (patterns.some((pattern) => pattern.test(scenarioId))) {
      return type;
    }
  }
  return WizardInputType.SINGLE_IMAGE;
}
