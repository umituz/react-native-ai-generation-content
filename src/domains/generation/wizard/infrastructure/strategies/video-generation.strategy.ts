/**
 * Video Generation Strategy
 * Handles video-specific generation logic
 */

import { executeVideoFeature } from "../../../../../infrastructure/services/video-feature-executor.service";
import { createCreationsRepository } from "../../../../creations/infrastructure/adapters";
import { buildUnifiedPrompt } from "./shared/unified-prompt-builder";
import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import type { WizardStrategy } from "./wizard-strategy.types";
import { VIDEO_PROCESSING_PROMPTS } from "./wizard-strategy.constants";
import { extractPrompt, extractDuration, extractAspectRatio, extractResolution } from "../utils";
import { extractPhotosAsBase64 } from "./shared/photo-extraction.utils";
import { getVideoFeatureType } from "./video-generation.utils";
import type { WizardVideoInput, CreateVideoStrategyOptions } from "./video-generation.types";
import { validatePhotoCount } from "./video-generation.types";

declare const __DEV__: boolean;

export type { WizardVideoInput, WizardVideoResult, CreateVideoStrategyOptions } from "./video-generation.types";

export async function buildVideoInput(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData,
): Promise<WizardVideoInput | null> {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[VideoStrategy] Building input", { scenarioId: scenario.id });
  }

  const photos = await extractPhotosAsBase64(wizardData, true);

  const validation = validatePhotoCount(photos.length, scenario.inputType);
  if (!validation.isValid) {
    throw new Error(validation.errorKey ?? "error.generation.invalidInput");
  }

  let basePrompt = extractPrompt(wizardData, scenario.aiPrompt);

  if (!basePrompt) {
    const defaultPrompt = VIDEO_PROCESSING_PROMPTS[scenario.id];
    if (defaultPrompt) {
      basePrompt = defaultPrompt;
    } else {
      throw new Error("error.generation.promptRequired");
    }
  }

  // Build unified prompt with face preservation
  const finalPrompt = buildUnifiedPrompt({
    basePrompt,
    photoCount: photos.length,
    interactionStyle: scenario.interactionStyle as string | undefined,
  });

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[VideoStrategy] Prompt built", {
      baseLength: basePrompt.length,
      finalLength: finalPrompt.length,
      photoCount: photos.length,
    });
  }

  return {
    sourceImageBase64: photos[0],
    targetImageBase64: photos[1] || photos[0],
    prompt: finalPrompt,
    duration: extractDuration(wizardData),
    aspectRatio: extractAspectRatio(wizardData),
    resolution: extractResolution(wizardData),
  };
}

export function createVideoStrategy(options: CreateVideoStrategyOptions): WizardStrategy {
  const { scenario, collectionName = "creations" } = options;
  const repository = createCreationsRepository(collectionName);
  const videoFeatureType = getVideoFeatureType(scenario.id);

  let lastInputRef: WizardVideoInput | null = null;

  return {
    execute: async (input: unknown) => {
      const videoInput = input as WizardVideoInput;
      lastInputRef = videoInput;

      const result = await executeVideoFeature(videoFeatureType, {
        sourceImageBase64: videoInput.sourceImageBase64,
        targetImageBase64: videoInput.targetImageBase64,
        prompt: videoInput.prompt,
        options: {
          duration: videoInput.duration,
          aspect_ratio: videoInput.aspectRatio,
          resolution: videoInput.resolution,
        },
      });

      if (!result.success || !result.videoUrl) {
        throw new Error(result.error || "Video generation failed");
      }

      return { videoUrl: result.videoUrl };
    },

    getCreditCost: () => 1,

    save: async (result: unknown, uid) => {
      const input = lastInputRef;
      const videoResult = result as { videoUrl?: string };
      if (!input || !scenario?.id || !videoResult.videoUrl) return;

      await repository.create(uid, {
        id: `${scenario.id}_${Date.now()}`,
        uri: videoResult.videoUrl,
        type: scenario.id,
        prompt: input.prompt,
        status: "completed" as const,
        createdAt: new Date(),
        isShared: false,
        isFavorite: false,
        metadata: { scenarioId: scenario.id, scenarioTitle: scenario.title },
        output: { videoUrl: videoResult.videoUrl },
      });
    },
  };
}
