/**
 * Video Generation Strategy
 * Handles video-specific generation logic
 */

import { executeVideoFeature } from "../../../../../infrastructure/services/video-feature-executor.service";
import { createCreationsRepository } from "../../../../creations/infrastructure/adapters";
import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import type { WizardStrategy } from "./wizard-strategy.types";
import { VIDEO_PROCESSING_PROMPTS } from "./wizard-strategy.constants";
import { extractPrompt, extractDuration, extractAspectRatio, extractResolution } from "../utils";
import { extractPhotosAsBase64 } from "./shared/photo-extraction.utils";
import { getVideoFeatureType } from "./video-generation.utils";
import type { WizardVideoInput, CreateVideoStrategyOptions } from "./video-generation.types";

declare const __DEV__: boolean;

// Re-export types for external use
export type { WizardVideoInput, WizardVideoResult, CreateVideoStrategyOptions } from "./video-generation.types";

// ============================================================================
// Input Builder
// ============================================================================

export async function buildVideoInput(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData,
): Promise<WizardVideoInput | null> {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[VideoStrategy] Building input", { scenarioId: scenario.id });
  }

  const photos = await extractPhotosAsBase64(wizardData, true);

  // Extract prompt with fallback to default
  let prompt = extractPrompt(wizardData, scenario.aiPrompt);

  if (!prompt) {
    const defaultPrompt = VIDEO_PROCESSING_PROMPTS[scenario.id];
    if (defaultPrompt) {
      prompt = defaultPrompt;
    } else {
      throw new Error("Prompt is required for video generation");
    }
  }

  const input: WizardVideoInput = {
    sourceImageBase64: photos[0],
    targetImageBase64: photos[1] || photos[0],
    prompt,
    duration: extractDuration(wizardData),
    aspectRatio: extractAspectRatio(wizardData),
    resolution: extractResolution(wizardData),
  };

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[VideoStrategy] Input built", {
      hasSource: !!input.sourceImageBase64,
      hasTarget: !!input.targetImageBase64,
      duration: input.duration,
    });
  }

  return input;
}

// ============================================================================
// Strategy Factory
// ============================================================================

export function createVideoStrategy(options: CreateVideoStrategyOptions): WizardStrategy {
  const { scenario, collectionName = "creations" } = options;
  const repository = createCreationsRepository(collectionName);
  const videoFeatureType = getVideoFeatureType(scenario.id);

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[VideoStrategy] Created", { scenarioId: scenario.id, videoFeatureType });
  }

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

      const creation = {
        id: `${scenario.id}_${Date.now()}`,
        uri: videoResult.videoUrl,
        type: scenario.id,
        prompt: input.prompt,
        status: "completed" as const,
        createdAt: new Date(),
        isShared: false,
        isFavorite: false,
        metadata: {
          scenarioId: scenario.id,
          scenarioTitle: scenario.title,
        },
        output: { videoUrl: videoResult.videoUrl },
      };

      await repository.create(uid, creation);
    },
  };
}
