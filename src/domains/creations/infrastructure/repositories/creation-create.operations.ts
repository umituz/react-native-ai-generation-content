/**
 * Creation Create Operations
 */

import { setDoc } from "firebase/firestore";
import type { GetUserCollection, GetDocRef } from "./CreationsFetcher";
import type { Creation, CreationDocument } from "../../domain/entities/Creation";

/**
 * Creates a new creation document
 */
export async function createCreation(
  _getUserCollection: GetUserCollection,
  getDocRef: GetDocRef,
  userId: string,
  creation: Creation
): Promise<void> {
  const docRef = getDocRef(userId, creation.id);
  if (!docRef) throw new Error("Firestore not initialized");

  const data: CreationDocument = {
    type: creation.type,
    uri: creation.uri,
    createdAt: creation.createdAt,
    metadata: creation.metadata || {},
    isShared: creation.isShared || false,
    isFavorite: creation.isFavorite || false,
    ...(creation.status !== undefined && { status: creation.status }),
    ...(creation.output !== undefined && { output: creation.output }),
    ...(creation.prompt !== undefined && { prompt: creation.prompt }),
    ...(creation.requestId !== undefined && { requestId: creation.requestId }),
    ...(creation.model !== undefined && { model: creation.model }),
  };

  try {
    await setDoc(docRef, data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to create creation ${creation.id}: ${errorMessage}`);
  }
}
