/**
 * Creation Persistence Factory
 * Infrastructure: Creates persistence handler instance
 */

import { createCreationsRepository } from "../../../../creations/infrastructure/adapters";
import type { CreationPersistenceConfig, ProcessingCreationData, CompletedCreationData } from "./creation-persistence.types";
import { saveAsProcessing } from "./creation-save-operations";
import { updateToCompleted, updateToFailed, updateRequestId } from "./creation-update-operations";

/**
 * Creates a creation persistence handler for a wizard flow
 */
export function createCreationPersistence(config: CreationPersistenceConfig = {}) {
  const { collectionName = "creations" } = config;
  const repository = createCreationsRepository(collectionName);

  return {
    saveAsProcessing: (userId: string, data: ProcessingCreationData) =>
      saveAsProcessing(repository, userId, data),

    updateToCompleted: (userId: string, creationId: string, data: CompletedCreationData) =>
      updateToCompleted(repository, userId, creationId, data),

    updateToFailed: (userId: string, creationId: string, error: string) =>
      updateToFailed(repository, userId, creationId, error),

    updateRequestId: (userId: string, creationId: string, requestId: string, model: string) =>
      updateRequestId(repository, userId, creationId, requestId, model),
  };
}

export type CreationPersistence = ReturnType<typeof createCreationPersistence>;
