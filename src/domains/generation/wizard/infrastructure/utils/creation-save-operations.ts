/**
 * Creation Save Operations
 * Infrastructure: Saves creation as processing
 */

import type { ICreationsRepository } from "../../../../creations/domain/repositories";
import type { ProcessingCreationData } from "./creation-persistence.types";

declare const __DEV__: boolean;

/**
 * Save creation with status="processing" when generation starts
 * Returns the creation ID for later update
 */
export async function saveAsProcessing(
  repository: ICreationsRepository,
  userId: string,
  data: ProcessingCreationData
): Promise<string> {
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
}
