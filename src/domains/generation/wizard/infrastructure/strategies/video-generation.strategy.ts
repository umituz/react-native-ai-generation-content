/**
 * Video Generation Strategy
 * Handles video-specific generation logic
 */

import { readFileAsBase64 } from "@umituz/react-native-design-system";
import type { VideoFeatureType } from "../../../../../domain/interfaces";
import { executeVideoFeature } from "../../../../../infrastructure/services/video-feature-executor.service";
import { createCreationsRepository } from "../../../../creations/infrastructure/adapters";
import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import type { WizardStrategy } from "./wizard-strategy.types";
import { PHOTO_KEY_PREFIX, VIDEO_FEATURE_PATTERNS } from "./wizard-strategy.constants";

declare const __DEV__: boolean;

// ============================================================================
// Types
// ============================================================================

export interface VideoGenerationInput {
  readonly sourceImageBase64: string;
  readonly targetImageBase64: string;
  readonly prompt: string;
}

export interface VideoGenerationResult {
  readonly videoUrl: string;
}

// ============================================================================
// Photo Extraction
// ============================================================================

async function extractPhotosFromWizardData(
  wizardData: Record<string, unknown>,
): Promise<string[] | null> {
  const photoKeys = Object.keys(wizardData)
    .filter((k) => k.includes(PHOTO_KEY_PREFIX))
    .sort();

  if (photoKeys.length === 0) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[VideoStrategy] No photos found", { keys: Object.keys(wizardData) });
    }
    return null;
  }

  const photoUris: string[] = [];
  for (const key of photoKeys) {
    const photo = wizardData[key] as { uri?: string };
    if (!photo?.uri) return null;
    photoUris.push(photo.uri);
  }

  const photosBase64 = await Promise.all(photoUris.map((uri) => readFileAsBase64(uri)));
  const validPhotos = photosBase64.filter(Boolean) as string[];

  return validPhotos.length > 0 ? validPhotos : null;
}

// ============================================================================
// Video Feature Type Detection
// ============================================================================

function getVideoFeatureType(scenarioId: string): VideoFeatureType {
  const id = scenarioId.toLowerCase();

  for (const [pattern, featureType] of Object.entries(VIDEO_FEATURE_PATTERNS)) {
    if (id.includes(pattern)) {
      return featureType;
    }
  }

  throw new Error(`Unknown video feature type for scenario "${scenarioId}". Add pattern to VIDEO_FEATURE_PATTERNS.`);
}

// ============================================================================
// Input Builder
// ============================================================================

export async function buildVideoInput(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData,
): Promise<VideoGenerationInput | null> {
  const photos = await extractPhotosFromWizardData(wizardData);
  if (!photos || photos.length < 1) return null;

  if (!scenario.aiPrompt?.trim()) {
    throw new Error(`Scenario "${scenario.id}" must have aiPrompt field`);
  }

  return {
    sourceImageBase64: photos[0],
    targetImageBase64: photos[1] || photos[0],
    prompt: scenario.aiPrompt,
  };
}

// ============================================================================
// Strategy Factory
// ============================================================================

export interface CreateVideoStrategyOptions {
  readonly scenario: WizardScenarioData;
  readonly collectionName?: string;
}

export function createVideoStrategy(options: CreateVideoStrategyOptions): WizardStrategy {
  const { scenario, collectionName = "creations" } = options;
  const repository = createCreationsRepository(collectionName);
  const videoFeatureType = getVideoFeatureType(scenario.id);

  let lastInputRef: VideoGenerationInput | null = null;

  return {
    execute: async (input: unknown, onProgress) => {
      const videoInput = input as VideoGenerationInput;
      lastInputRef = videoInput;

      const result = await executeVideoFeature(
        videoFeatureType,
        {
          sourceImageBase64: videoInput.sourceImageBase64,
          targetImageBase64: videoInput.targetImageBase64,
          prompt: videoInput.prompt,
        },
        { onProgress },
      );

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
        createdAt: new Date(),
        isShared: false,
        isFavorite: false,
        metadata: {
          scenarioId: scenario.id,
          scenarioTitle: scenario.title || scenario.id,
        },
        output: { videoUrl: videoResult.videoUrl },
      };

      await repository.create(uid, creation);
    },
  };
}
