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
import { extractPrompt, extractDuration } from "../utils";

// ============================================================================
// Types
// ============================================================================

export interface VideoGenerationInput {
  /** Source image (optional for text-to-video) */
  readonly sourceImageBase64?: string;
  /** Target image (optional, uses source if not provided) */
  readonly targetImageBase64?: string;
  readonly prompt: string;
  /** Video duration in seconds */
  readonly duration?: number;
}

export interface VideoGenerationResult {
  readonly videoUrl: string;
}

// ============================================================================
// Photo Extraction
// ============================================================================

async function extractPhotosFromWizardData(
  wizardData: Record<string, unknown>,
): Promise<string[]> {
  const photoKeys = Object.keys(wizardData)
    .filter((k) => k.includes(PHOTO_KEY_PREFIX))
    .sort();

  if (photoKeys.length === 0) {
    return [];
  }

  const photoUris: string[] = [];
  for (const key of photoKeys) {
    const photo = wizardData[key] as { uri?: string };
    if (photo?.uri) {
      photoUris.push(photo.uri);
    }
  }

  if (photoUris.length === 0) {
    return [];
  }

  const photosBase64 = await Promise.all(photoUris.map((uri) => readFileAsBase64(uri)));
  return photosBase64.filter(Boolean) as string[];
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

  // Extract prompt using type-safe extractor with fallback
  const prompt = extractPrompt(wizardData, scenario.aiPrompt);

  if (!prompt) {
    throw new Error("Prompt is required for video generation");
  }

  // Extract duration using type-safe extractor (required from wizard step)
  const duration = extractDuration(wizardData);

  return {
    sourceImageBase64: photos[0],
    targetImageBase64: photos[1] || photos[0],
    prompt,
    duration,
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
          sourceImageBase64: videoInput.sourceImageBase64 || "",
          targetImageBase64: videoInput.targetImageBase64 || videoInput.sourceImageBase64 || "",
          prompt: videoInput.prompt,
          options: {
            duration: videoInput.duration,
          },
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
