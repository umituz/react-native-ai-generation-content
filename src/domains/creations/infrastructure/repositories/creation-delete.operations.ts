/**
 * Creation Delete Operations
 */

import { updateDoc, deleteDoc } from "firebase/firestore";
import { type FirestorePathResolver } from "@umituz/react-native-firebase";

/**
 * Soft deletes a creation
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
 * Hard deletes a creation
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
