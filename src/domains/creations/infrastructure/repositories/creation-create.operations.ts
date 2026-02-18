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
    metadata: creation.metadata || {},
    isShared: creation.isShared || false,
    isFavorite: creation.isFavorite || false,
    ...(creation.status !== undefined && { status: creation.status }),
    ...(creation.output !== undefined && { output: creation.output }),
    ...(creation.prompt !== undefined && { prompt: creation.prompt }),
    ...(creation.requestId !== undefined && { requestId: creation.requestId }),
    ...(creation.model !== undefined && { model: creation.model }),
    ...(creation.startedAt !== undefined && { startedAt: creation.startedAt }),
  };

  try {
    await setDoc(docRef, data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to create creation ${creation.id}: ${errorMessage}`);
  }
}
