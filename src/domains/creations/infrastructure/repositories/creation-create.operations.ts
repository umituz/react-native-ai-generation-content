/**
 * Creation Create Operations
 */

import { setDoc } from "firebase/firestore";
import type { IPathResolver } from "@umituz/react-native-firebase";
import type { Creation, CreationDocument } from "../../domain/entities/Creation";

export async function createCreation(
  pathResolver: IPathResolver,
  userId: string,
  creation: Creation
): Promise<void> {
  const docRef = pathResolver.getDocRef(userId, creation.id);
  if (!docRef) throw new Error("Firestore not initialized");

  const data: CreationDocument = {
    type: creation.type,
    uri: creation.uri,
    createdAt: creation.createdAt,
    deletedAt: null,
    metadata: creation.metadata ?? {},
    isShared: creation.isShared ?? false,
    isFavorite: creation.isFavorite ?? false,
    status: creation.status ?? null,
    output: creation.output ?? null,
    prompt: creation.prompt ?? null,
    provider: creation.provider ?? null,
    requestId: creation.requestId ?? null,
    model: creation.model ?? null,
    startedAt: creation.startedAt ?? null,
  };

  try {
    await setDoc(docRef, data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to create creation ${creation.id}: ${errorMessage}`);
  }
}
