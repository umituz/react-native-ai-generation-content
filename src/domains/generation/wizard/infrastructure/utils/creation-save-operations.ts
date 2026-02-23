/**
 * Creation Save Operations
 * Infrastructure: Saves creation as processing
 */

import type { ICreationsRepository } from "../../../../creations/domain/repositories";
import type { ProcessingCreationData } from "./creation-persistence.types";


/**
 * Save creation with status="processing" when generation starts
 * Returns the creation ID for later update
 */
export async function saveAsProcessing(
  repository: ICreationsRepository,
  userId: string,
  data: ProcessingCreationData
): Promise<{ creationId: string; startedAt: Date }> {
  const creationId = `${data.scenarioId}_${Date.now()}`;

  const startedAt = new Date();

  await repository.create(userId, {
    id: creationId,
    uri: "",
    type: data.scenarioId,
    prompt: data.prompt,
    provider: data.provider,
    status: "processing" as const,
    createdAt: new Date(),
    startedAt,
    isShared: false,
    isFavorite: false,
    requestId: data.requestId,
    model: data.model,
    metadata: {
      scenarioId: data.scenarioId,
      scenarioTitle: data.scenarioTitle,
      ...(data.duration && { duration: data.duration }),
      ...(data.resolution && { resolution: data.resolution }),
      ...(data.creditCost && { creditCost: data.creditCost }),
      ...(data.aspectRatio && { aspectRatio: data.aspectRatio }),
      ...(data.outputType && { outputType: data.outputType }),
    },
  });

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[CreationPersistence] Saved as processing", {
      creationId,
      requestId: data.requestId,
      model: data.model,
    });
  }

  return { creationId, startedAt };
}
