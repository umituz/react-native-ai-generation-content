/**
 * Creation Update Operations
 * Infrastructure: Updates creation status
 */

import type { ICreationsRepository } from "../../../../creations/domain/repositories";
import type { Creation, CreationOutput } from "../../../../creations/domain/entities/Creation";
import type { CompletedCreationData } from "./creation-persistence.types";


/**
 * Update creation to status="completed" when generation finishes
 */
export async function updateToCompleted(
  repository: ICreationsRepository,
  userId: string,
  creationId: string,
  data: CompletedCreationData
): Promise<void> {
  const output: CreationOutput = {
    ...(data.imageUrl && { imageUrl: data.imageUrl }),
    ...(data.videoUrl && { videoUrl: data.videoUrl }),
    ...(data.thumbnailUrl && { thumbnailUrl: data.thumbnailUrl }),
  };

  const completedAt = new Date();
  const durationMs =
    data.generationStartedAt !== undefined
      ? completedAt.getTime() - data.generationStartedAt
      : undefined;

  await repository.update(userId, creationId, {
    uri: data.uri,
    status: "completed" as const,
    output,
    completedAt,
    ...(durationMs !== undefined && { durationMs }),
  } as Partial<Creation>);

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[CreationPersistence] Updated to completed", { creationId });
  }
}

/**
 * Update creation to status="failed" when generation fails
 */
export async function updateToFailed(
  repository: ICreationsRepository,
  userId: string,
  creationId: string,
  error: string
): Promise<void> {
  await repository.update(userId, creationId, {
    status: "failed" as const,
    metadata: { error },
    completedAt: new Date(),
  } as Partial<Creation>);

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[CreationPersistence] Updated to failed", { creationId, error });
  }
}

/**
 * Update creation with queue requestId after job submission
 */
export async function updateRequestId(
  repository: ICreationsRepository,
  userId: string,
  creationId: string,
  requestId: string,
  model: string
): Promise<void> {
  await repository.update(userId, creationId, {
    requestId,
    model,
  });

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[CreationPersistence] Updated requestId", { creationId, requestId, model });
  }
}
