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
    metadata: creation.metadata ?? {},
    isShared: creation.isShared ?? false,
    isFavorite: creation.isFavorite ?? false,
  };

  // Add optional fields only if they have values (Firestore rejects undefined)
  if (creation.status) data.status = creation.status;
  if (creation.output) data.output = creation.output;
  if (creation.prompt) data.prompt = creation.prompt;
  if (creation.provider) data.provider = creation.provider;
  if (creation.requestId) data.requestId = creation.requestId;
  if (creation.model) data.model = creation.model;
  if (creation.startedAt) data.startedAt = creation.startedAt;

  try {
    await setDoc(docRef, data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to create creation ${creation.id}: ${errorMessage}`);
  }
}
