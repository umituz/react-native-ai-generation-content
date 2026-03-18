/**
 * Video Generation Strategy - Input Builder
 * Builds video input from wizard data
 */

import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import type { WizardVideoInput } from "./video-generation.types";
import { VIDEO_PROCESSING_PROMPTS } from "./wizard-strategy.constants";
import { extractPrompt, extractDuration, extractAspectRatio, extractResolution, extractQualityMode } from "../utils";
import { extractPhotosAsBase64 } from "./shared/photo-extraction.utils";
import { extractAudioAsBase64 } from "./video-generation.audio-extractor";
import { validatePhotoCount } from "./video-generation.validation";

export async function buildVideoInput(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData,
): Promise<WizardVideoInput | null> {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[VideoStrategy] Building input", { scenarioId: scenario.id });
  }

  // Extract audio (shared by all code paths)
  const audioUrl = await extractAudioAsBase64(wizardData);

  // If a pre-generated image URL exists (e.g., two-step solo video),
  // use it directly instead of extracting photos from wizard data
  if (scenario.preGeneratedImageUrl) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[VideoStrategy] Using pre-generated image URL", {
        url: scenario.preGeneratedImageUrl.slice(0, 80),
        hasAudio: !!audioUrl,
      });
    }
    const finalPrompt = extractPrompt(wizardData, scenario.aiPrompt) || scenario.aiPrompt || "";
    const qualityMode = extractQualityMode(wizardData);

    return {
      sourceImageBase64: scenario.preGeneratedImageUrl,
      prompt: finalPrompt,
      duration: extractDuration(wizardData),
      aspectRatio: extractAspectRatio(wizardData),
      resolution: extractResolution(wizardData),
      audioUrl,
      qualityMode,
    };
  }

  const photos = await extractPhotosAsBase64(wizardData, true);

  const validation = validatePhotoCount(photos.length, scenario.inputType);
  if (!validation.isValid) {
    throw new Error(validation.errorKey ?? "error.generation.invalidInput");
  }

  let finalPrompt = extractPrompt(wizardData, scenario.aiPrompt);

  if (!finalPrompt) {
    const defaultPrompt = VIDEO_PROCESSING_PROMPTS[scenario.id];
    if (defaultPrompt) {
      finalPrompt = defaultPrompt;
    } else {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[VideoStrategy] No prompt found for scenario:", scenario.id);
        console.error("[VideoStrategy] Available defaults:", Object.keys(VIDEO_PROCESSING_PROMPTS));
      }
      throw new Error("error.generation.promptRequired");
    }
  }

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[VideoStrategy] Using clean prompt for video generation", {
      promptLength: finalPrompt.length,
      photoCount: photos.length,
      hasAudio: !!audioUrl,
    });
  }

  const qualityMode = extractQualityMode(wizardData);

  return {
    sourceImageBase64: photos[0] || undefined,
    targetImageBase64: photos[1] || photos[0] || undefined,
    prompt: finalPrompt,
    duration: extractDuration(wizardData),
    aspectRatio: extractAspectRatio(wizardData),
    resolution: extractResolution(wizardData),
    audioUrl,
    qualityMode,
  };
}
