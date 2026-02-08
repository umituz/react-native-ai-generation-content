/**
 * Creation CRUD Operations
 * Core create, read, update, delete operations for creations
 */

import { setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { type FirestorePathResolver } from "@umituz/react-native-firebase";
import type { Creation, CreationDocument } from "../../domain/entities/Creation";

const UPDATABLE_FIELDS = [
  "metadata", "isShared", "uri", "type", "prompt", "status",
  "output", "rating", "ratedAt", "isFavorite", "deletedAt",
  "requestId", "model",
] as const;

/**
 * Creates a new creation document
 */
export async function createCreation(
  pathResolver: FirestorePathResolver,
  userId: string,
  creation: Creation
): Promise<void> {
  const docRef = pathResolver.getDocRef(userId, creation.id);
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

/**
 * Updates a creation document
 */
export async function updateCreation(
  pathResolver: FirestorePathResolver,
  userId: string,
  id: string,
  updates: Partial<Creation>
): Promise<boolean> {
  const docRef = pathResolver.getDocRef(userId, id);
  if (!docRef) return false;

  try {
    const updateData: Record<string, unknown> = {};
    for (const field of UPDATABLE_FIELDS) {
      if (updates[field] !== undefined) updateData[field] = updates[field];
    }
    await updateDoc(docRef, updateData);
    return true;
  } catch {
    return false;
  }
}

/**
 * Soft deletes a creation (marks as deleted)
 */
export async function deleteCreation(
  pathResolver: FirestorePathResolver,
  userId: string,
  creationId: string
): Promise<boolean> {
  const docRef = pathResolver.getDocRef(userId, creationId);
  if (!docRef) return false;

  try {
    await updateDoc(docRef, { deletedAt: new Date() });
    return true;
  } catch {
    return false;
  }
}

/**
 * Hard deletes a creation (removes from database)
 */
export async function hardDeleteCreation(
  pathResolver: FirestorePathResolver,
  userId: string,
  creationId: string
): Promise<boolean> {
  const docRef = pathResolver.getDocRef(userId, creationId);
  if (!docRef) return false;

  try {
    await deleteDoc(docRef);
    return true;
  } catch {
    return false;
  }
}

/**
 * Restores a soft-deleted creation
 */
export async function restoreCreation(
  pathResolver: FirestorePathResolver,
  userId: string,
  creationId: string
): Promise<boolean> {
  const docRef = pathResolver.getDocRef(userId, creationId);
  if (!docRef) return false;

  try {
    await updateDoc(docRef, { deletedAt: null });
    return true;
  } catch {
    return false;
  }
}
