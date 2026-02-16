/**
 * Generation Strategy Factory
 * Creates generation strategies from feature configs
 */

import type { GenerationStrategy } from "../../../presentation/hooks/generation/types";
import type { FeatureConfig } from "../domain/feature-config.types";
import type {
  ImageGenerationOutput,
  VideoGenerationOutput,
} from "../domain/generation.types";
import { ExecutorFactory } from "../infrastructure/executors/executor-factory";
import { featureRegistry } from "./feature-registry";

declare const __DEV__: boolean;

interface CreationRepository {
  create(userId: string, creation: unknown): Promise<void>;
}

interface StrategyFactoryOptions {
  featureId: string;
  userId?: string;
  repository?: CreationRepository;
}

export function createGenerationStrategy(
  options: StrategyFactoryOptions,
): GenerationStrategy<unknown, unknown> {
  const { featureId, userId, repository } = options;

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[StrategyFactory] Creating strategy", {
      featureId,
      hasUserId: !!userId,
      hasRepository: !!repository,
    });
  }

  const featureConfig = featureRegistry.get(featureId);
  const executor = ExecutorFactory.create(featureConfig.type);

  return {
    execute: async (input: unknown, onProgress?: (progress: number) => void) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[StrategyFactory] Executing generation", {
          featureId,
          type: featureConfig.type,
          model: featureConfig.model,
        });
      }

      const result = await executor.generate(featureConfig.model, input, {
        onProgress,
      });

      if (!result.success || !result.data) {
        throw new Error(result.error || "Generation failed");
      }

      return result.data;
    },

    save: async (result: unknown, uid: string) => {
      if (!repository) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[StrategyFactory] No repository provided, skipping save");
        }
        return;
      }

      const creation = buildCreation(featureConfig, result);

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[StrategyFactory] Saving creation", {
          featureId,
          creationId: creation.id,
          outputType: featureConfig.outputType,
        });
      }

      await repository.create(uid, creation);

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[StrategyFactory] Creation saved successfully");
      }
    },
  };
}

function buildCreation(featureConfig: FeatureConfig, result: unknown) {
  const creationId = `${featureConfig.id}_${Date.now()}`;

  let mainUri = "";
  let output: Record<string, unknown> = {};

  if (featureConfig.outputType === "image") {
    const imageResult = result as ImageGenerationOutput;
    mainUri = imageResult.imageUrl || "";
    output = { imageUrl: imageResult.imageUrl };
  } else if (featureConfig.outputType === "video") {
    const videoResult = result as VideoGenerationOutput;
    mainUri = videoResult.videoUrl || "";
    output = { videoUrl: videoResult.videoUrl };
  }

  return {
    id: creationId,
    uri: mainUri,
    type: featureConfig.id,
    createdAt: new Date(),
    isShared: false,
    isFavorite: false,
    metadata: {
      featureId: featureConfig.id,
      generationType: featureConfig.type,
      outputType: featureConfig.outputType,
      ...featureConfig.metadata,
    },
    output,
  };
}
