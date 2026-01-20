/**
 * Creation Persistence Utility
 * Handles all Firestore creation operations for wizard generation
 * Single source of truth for processing → completed flow
 */

import { createCreationsRepository } from "../../../../creations/infrastructure/adapters";

declare const __DEV__: boolean;

export interface CreationPersistenceConfig {
  readonly collectionName?: string;
}

export interface ProcessingCreationData {
  readonly scenarioId: string;
  readonly scenarioTitle: string;
  readonly prompt: string;
}

export interface CompletedCreationData {
  readonly uri: string;
  readonly imageUrl?: string;
  readonly videoUrl?: string;
}

/**
 * Creates a creation persistence handler for a wizard flow
 */
export function createCreationPersistence(config: CreationPersistenceConfig = {}) {
  const { collectionName = "creations" } = config;
  const repository = createCreationsRepository(collectionName);

  return {
    /**
     * Save creation with status="processing" when generation starts
     * Returns the creation ID for later update
     */
    saveAsProcessing: async (
      userId: string,
      data: ProcessingCreationData,
    ): Promise<string> => {
      const creationId = `${data.scenarioId}_${Date.now()}`;

      await repository.create(userId, {
        id: creationId,
        uri: "",
        type: data.scenarioId,
        prompt: data.prompt,
        status: "processing" as const,
        createdAt: new Date(),
        isShared: false,
        isFavorite: false,
        metadata: {
          scenarioId: data.scenarioId,
          scenarioTitle: data.scenarioTitle,
        },
      });

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[CreationPersistence] Saved as processing", { creationId });
      }

      return creationId;
    },

    /**
     * Update creation to status="completed" when generation finishes
     */
    updateToCompleted: async (
      userId: string,
      creationId: string,
      data: CompletedCreationData,
    ): Promise<void> => {
      await repository.update(userId, creationId, {
        uri: data.uri,
        status: "completed" as const,
        output: {
          imageUrl: data.imageUrl,
          videoUrl: data.videoUrl,
        },
      });

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[CreationPersistence] Updated to completed", { creationId });
      }
    },

    /**
     * Update creation to status="failed" when generation fails
     */
    updateToFailed: async (
      userId: string,
      creationId: string,
      error: string,
    ): Promise<void> => {
      await repository.update(userId, creationId, {
        status: "failed" as const,
        metadata: { error },
      });

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[CreationPersistence] Updated to failed", { creationId, error });
      }
    },
  };
}

export type CreationPersistence = ReturnType<typeof createCreationPersistence>;
