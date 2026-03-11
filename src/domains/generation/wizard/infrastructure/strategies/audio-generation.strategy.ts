/**
 * Audio Generation Strategy
 * Handles TTS-specific generation logic (execution only)
 */

import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import type { WizardStrategy } from "./wizard-strategy.types";
import type { WizardAudioInput, CreateAudioStrategyOptions } from "./audio-generation.types";
import { executeAudioGeneration } from "./audio-generation.executor";

// ============================================================================
// Input Builder
// ============================================================================

export function buildAudioInput(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData,
): WizardAudioInput {
  // Extract text from wizard data (TEXT_INPUT step stores as "text" or "prompt")
  const text =
    typeof wizardData.text === "string"
      ? wizardData.text
      : typeof wizardData.prompt === "string"
        ? wizardData.prompt
        : "";

  if (!text.trim()) {
    throw new Error("Text is required for audio generation");
  }

  // Extract voice selection from wizard data
  const voice =
    typeof wizardData.voice === "string"
      ? wizardData.voice
      : typeof wizardData.selectedVoice === "string"
        ? wizardData.selectedVoice
        : typeof scenario.voice === "string"
          ? scenario.voice
          : undefined;

  // Extract optional parameters
  const language =
    typeof wizardData.language === "string"
      ? wizardData.language
      : typeof scenario.language === "string"
        ? scenario.language
        : undefined;

  const exaggeration =
    typeof wizardData.exaggeration === "number"
      ? wizardData.exaggeration
      : typeof scenario.exaggeration === "number"
        ? scenario.exaggeration
        : undefined;

  const cfgWeight =
    typeof wizardData.cfgWeight === "number"
      ? wizardData.cfgWeight
      : typeof scenario.cfgWeight === "number"
        ? scenario.cfgWeight
        : undefined;

  return { text, voice, language, exaggeration, cfgWeight };
}

// ============================================================================
// Strategy Factory
// ============================================================================

export function createAudioStrategy(options: CreateAudioStrategyOptions): WizardStrategy {
  const { scenario } = options;

  if (!scenario.model) {
    throw new Error("Model is required for audio generation");
  }

  const model = scenario.model;
  const providerId = scenario.providerId;

  return {
    execute: async (input: unknown) => {
      if (!input || typeof input !== "object") {
        throw new Error("Invalid input: expected WizardAudioInput object");
      }
      const audioInput = input as WizardAudioInput;
      const result = await executeAudioGeneration(audioInput, model, undefined, providerId);

      if (!result.success || !result.audioUrl) {
        const error = new Error(result.error || "Audio generation failed");
        (error as Error & { logSessionId?: string }).logSessionId = result.logSessionId;
        throw error;
      }

      return { audioUrl: result.audioUrl, logSessionId: result.logSessionId };
    },
  };
}
