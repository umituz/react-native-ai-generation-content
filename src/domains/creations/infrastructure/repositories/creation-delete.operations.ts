/**
 * Creation Delete Operations
 * Single Responsibility: Delete/restore operations with centralized error handling
 */

import { updateDoc, deleteDoc } from "firebase/firestore";
import type { GetDocRef } from "./CreationsFetcher";
import { logOperationError, logOperationSuccess, logInvalidRef } from "./creation-error-handler.util";

/**
 * Soft deletes a creation by setting deletedAt timestamp
 */
export async function deleteCreation(
  getDocRef: GetDocRef,
  userId: string,
  creationId: string
): Promise<boolean> {
  const docRef = getDocRef(userId, creationId);
  const context = { userId, creationId };

  if (!docRef) {
    logInvalidRef("Delete", context);
    return false;
  }

  try {
    await updateDoc(docRef, { deletedAt: new Date() });
    logOperationSuccess("Delete", context);
    return true;
  } catch (error) {
    logOperationError("Delete", context, error);
    return false;
  }
}

/**
 * Permanently deletes a creation from Firestore
 */
export async function hardDeleteCreation(
  getDocRef: GetDocRef,
  userId: string,
  creationId: string
): Promise<boolean> {
  const docRef = getDocRef(userId, creationId);
  const context = { userId, creationId };

  if (!docRef) {
    logInvalidRef("HardDelete", context);
    return false;
  }

  try {
    await deleteDoc(docRef);
    logOperationSuccess("HardDelete", context);
    return true;
  } catch (error) {
    logOperationError("HardDelete", context, error);
    return false;
  }
}

/**
 * Restores a soft-deleted creation by clearing deletedAt
 */
export async function restoreCreation(
  getDocRef: GetDocRef,
  userId: string,
  creationId: string
): Promise<boolean> {
  const docRef = getDocRef(userId, creationId);
  const context = { userId, creationId };

  if (!docRef) {
    logInvalidRef("Restore", context);
    return false;
  }

  try {
    await updateDoc(docRef, { deletedAt: null });
    logOperationSuccess("Restore", context);
    return true;
  } catch (error) {
    logOperationError("Restore", context, error);
    return false;
  }
}
