/**
 * Creation Update Operations
 */

import { updateDoc } from "firebase/firestore";
import type { IPathResolver } from "@umituz/react-native-firebase";
import type { Creation } from "../../domain/entities/Creation";
import { UPDATABLE_FIELDS } from "../../domain/constants";


export async function updateCreation(
  pathResolver: IPathResolver,
  userId: string,
  id: string,
  updates: Partial<Creation>
): Promise<boolean> {
  const docRef = pathResolver.getDocRef(userId, id);

  if (!docRef) {
    throw new Error(
      `Cannot update: Document not found for user ${userId}, creation ${id}`
    );
  }

  const updateData: Record<string, unknown> = {};
  for (const field of UPDATABLE_FIELDS) {
    if (updates[field as keyof Creation] !== undefined) {
      updateData[field] = updates[field as keyof Creation];
    }
  }

  if (Object.keys(updateData).length === 0) {
    if (__DEV__) {
      console.warn("[updateCreation] No fields to update", { id });
    }
    return true;
  }

  try {
    await updateDoc(docRef, updateData);
    if (__DEV__) {
      console.log("[updateCreation] Updated", {
        id,
        fields: Object.keys(updateData),
      });
    }
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to update creation ${id}: ${message}`);
  }
}
