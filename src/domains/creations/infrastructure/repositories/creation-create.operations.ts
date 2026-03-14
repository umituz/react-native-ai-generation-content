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
    deletedAt: undefined,
    metadata: creation.metadata ?? {},
    isShared: creation.isShared ?? false,
    isFavorite: creation.isFavorite ?? false,
    status: creation.status ?? undefined,
    output: creation.output ?? undefined,
    prompt: creation.prompt ?? undefined,
    provider: creation.provider ?? undefined,
    requestId: creation.requestId ?? undefined,
    model: creation.model ?? undefined,
    startedAt: creation.startedAt ?? undefined,
  };

  try {
    await setDoc(docRef, data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to create creation ${creation.id}: ${errorMessage}`);
  }
}
