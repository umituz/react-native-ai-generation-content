/**
 * Creation Delete Operations
 */

import { updateDoc, deleteDoc } from "firebase/firestore";
import { type FirestorePathResolver } from "@umituz/react-native-firebase";

declare const __DEV__: boolean;

/**
 * Soft deletes a creation
 */
export async function deleteCreation(
  pathResolver: FirestorePathResolver,
  userId: string,
  creationId: string
): Promise<boolean> {
  const docRef = pathResolver.getDocRef(userId, creationId);
  if (!docRef) {
    if (__DEV__) {
      console.error("[CreationDelete] Cannot delete: Invalid document reference", {
        userId,
        creationId,
      });
    }
    return false;
  }

  try {
    await updateDoc(docRef, { deletedAt: new Date() });
    if (__DEV__) {
      console.log("[CreationDelete] Soft deleted successfully", { userId, creationId });
    }
    return true;
  } catch (error) {
    if (__DEV__) {
      console.error("[CreationDelete] Soft delete failed", {
        userId,
        creationId,
        error: error instanceof Error ? error.message : String(error),
        code: (error as { code?: string })?.code,
      });
    }
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
  if (!docRef) {
    if (__DEV__) {
      console.error("[CreationDelete] Cannot hard delete: Invalid document reference", {
        userId,
        creationId,
      });
    }
    return false;
  }

  try {
    await deleteDoc(docRef);
    if (__DEV__) {
      console.log("[CreationDelete] Hard deleted successfully", { userId, creationId });
    }
    return true;
  } catch (error) {
    if (__DEV__) {
      console.error("[CreationDelete] Hard delete failed", {
        userId,
        creationId,
        error: error instanceof Error ? error.message : String(error),
        code: (error as { code?: string })?.code,
      });
    }
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
  if (!docRef) {
    if (__DEV__) {
      console.error("[CreationDelete] Cannot restore: Invalid document reference", {
        userId,
        creationId,
      });
    }
    return false;
  }

  try {
    await updateDoc(docRef, { deletedAt: null });
    if (__DEV__) {
      console.log("[CreationDelete] Restored successfully", { userId, creationId });
    }
    return true;
  } catch (error) {
    if (__DEV__) {
      console.error("[CreationDelete] Restore failed", {
        userId,
        creationId,
        error: error instanceof Error ? error.message : String(error),
        code: (error as { code?: string })?.code,
      });
    }
    return false;
  }
}
