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
  // Background job tracking - FAL queue
  readonly requestId?: string;
  readonly model?: string;
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
        requestId: data.requestId,
        model: data.model,
        metadata: {
          scenarioId: data.scenarioId,
          scenarioTitle: data.scenarioTitle,
        },
      });

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[CreationPersistence] Saved as processing", {
          creationId,
          requestId: data.requestId,
          model: data.model,
        });
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
      const output: { imageUrl?: string; videoUrl?: string } = {};
      if (data.imageUrl) output.imageUrl = data.imageUrl;
      if (data.videoUrl) output.videoUrl = data.videoUrl;

      await repository.update(userId, creationId, {
        uri: data.uri,
        status: "completed" as const,
        output,
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

    /**
     * Update creation with FAL queue requestId and model after job submission
     * Call this after fal.queue.submit() returns
     */
    updateRequestId: async (
      userId: string,
      creationId: string,
      requestId: string,
      model: string,
    ): Promise<void> => {
      await repository.update(userId, creationId, {
        requestId,
        model,
      });

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[CreationPersistence] Updated requestId", { creationId, requestId, model });
      }
    },
  };
}

export type CreationPersistence = ReturnType<typeof createCreationPersistence>;
