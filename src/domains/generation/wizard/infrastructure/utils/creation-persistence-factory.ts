/**
 * Creation Persistence Factory
 * Creates a persistence handler bound to the creations repository
 */

import { createCreationsRepository } from "../../../../creations/infrastructure/adapters";
import type { ProcessingCreationData, CompletedCreationData } from "./creation-persistence.types";
import { saveAsProcessing } from "./creation-save-operations";
import { updateToCompleted, updateToFailed, updateRequestId } from "./creation-update-operations";

const COLLECTION_NAME = "creations";

export function createCreationPersistence() {
  const repository = createCreationsRepository(COLLECTION_NAME);

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
