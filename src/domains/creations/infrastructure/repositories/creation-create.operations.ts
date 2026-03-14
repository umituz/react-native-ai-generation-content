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

  // Build data object with only defined values (Firestore rejects undefined)
  // Use type assertion to bypass readonly restriction for conditional fields
  const data: CreationDocument = {
    type: creation.type,
    uri: creation.uri,
    createdAt: creation.createdAt,
    metadata: creation.metadata ?? {},
    isShared: creation.isShared ?? false,
    isFavorite: creation.isFavorite ?? false,
    ...(creation.status && { status: creation.status }),
    ...(creation.output && { output: creation.output }),
    ...(creation.prompt && { prompt: creation.prompt }),
    ...(creation.provider && { provider: creation.provider }),
    ...(creation.requestId && { requestId: creation.requestId }),
    ...(creation.model && { model: creation.model }),
    ...(creation.startedAt && { startedAt: creation.startedAt }),
  } as CreationDocument;

  try {
    await setDoc(docRef, data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to create creation ${creation.id}: ${errorMessage}`);
  }
}
