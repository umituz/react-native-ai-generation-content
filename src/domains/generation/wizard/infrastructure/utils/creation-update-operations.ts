/**
 * Creation Update Operations
 * Infrastructure: Updates creation status and flushes generation logs to Firestore
 */

import { getFirestore, doc, setDoc } from "firebase/firestore";
import type { ICreationsRepository } from "../../../../creations/domain/repositories";
import type { Creation, CreationOutput } from "../../../../creations/domain/entities/Creation";
import type { CompletedCreationData } from "./creation-persistence.types";
import { consumeGenerationLogs } from "../../../../../infrastructure/services/generation-log-store";


/**
 * Flush generation logs to Firestore subcollection.
 * Writes to: users/{userId}/creations/{creationId}/logs/session
 * Non-blocking: errors are caught and logged, never propagated.
 */
async function flushLogsToFirestore(
  userId: string,
  creationId: string,
  logSessionId?: string,
): Promise<void> {
  if (!logSessionId) return;
  const logs = consumeGenerationLogs(logSessionId);
  if (logs.length === 0) return;

  try {
    const db = getFirestore();
    const logDocRef = doc(db, 'users', userId, 'creations', creationId, 'logs', 'session');
    await setDoc(logDocRef, {
      entries: logs,
      count: logs.length,
      createdAt: new Date(),
    });
  } catch (error) {
    // Never let log flushing break the main flow
    console.warn(
      '[CreationPersistence] Failed to flush logs to Firestore:',
      error instanceof Error ? error.message : String(error),
    );
  }
}

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
    ...(data.audioUrl && { audioUrl: data.audioUrl }),
    ...(data.thumbnailUrl && { thumbnailUrl: data.thumbnailUrl }),
  };

  const completedAt = new Date();
  const rawDuration =
    data.generationStartedAt !== undefined
      ? completedAt.getTime() - data.generationStartedAt
      : undefined;
  const durationMs = rawDuration !== undefined && rawDuration >= 0 ? rawDuration : undefined;
  const hasOutput = Object.keys(output).length > 0;

  await repository.update(userId, creationId, {
    uri: data.uri,
    status: "completed" as const,
    ...(hasOutput && { output }),
    completedAt,
    ...(durationMs !== undefined && { durationMs }),
  } as Partial<Creation>);

  // Flush generation logs to Firestore — awaited to ensure logs are persisted
  await flushLogsToFirestore(userId, creationId, data.logSessionId);
}

/**
 * Update creation to status="failed" when generation fails
 */
export async function updateToFailed(
  repository: ICreationsRepository,
  userId: string,
  creationId: string,
  error: string,
  logSessionId?: string,
): Promise<void> {
  await repository.update(userId, creationId, {
    status: "failed" as const,
    metadata: { error },
    completedAt: new Date(),
  } as Partial<Creation>);

  // Flush generation logs to Firestore — awaited to ensure logs are persisted
  await flushLogsToFirestore(userId, creationId, logSessionId);
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
}
