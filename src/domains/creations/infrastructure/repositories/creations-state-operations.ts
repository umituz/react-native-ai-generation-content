/**
 * Creation State Operations
 * State-specific operations like sharing, favoriting, and rating
 */

import { updateDoc } from "firebase/firestore";
import type { IPathResolver } from "./CreationsFetcher";

/**
 * Updates the shared status of a creation
 */
export async function updateCreationShared(
  pathResolver: IPathResolver,
  userId: string,
  creationId: string,
  isShared: boolean
): Promise<boolean> {
  const docRef = pathResolver.getDocRef(userId, creationId);
  if (!docRef) return false;

  try {
    await updateDoc(docRef, { isShared });
    return true;
  } catch {
    return false;
  }
}

/**
 * Updates the favorite status of a creation
 */
export async function updateCreationFavorite(
  pathResolver: IPathResolver,
  userId: string,
  creationId: string,
  isFavorite: boolean
): Promise<boolean> {
  const docRef = pathResolver.getDocRef(userId, creationId);
  if (!docRef) return false;

  try {
    await updateDoc(docRef, { isFavorite });
    return true;
  } catch {
    return false;
  }
}

/**
 * Rates a creation and optionally submits feedback
 */
export async function rateCreation(
  pathResolver: IPathResolver,
  userId: string,
  creationId: string,
  rating: number,
  description?: string
): Promise<boolean> {
  const docRef = pathResolver.getDocRef(userId, creationId);
  if (!docRef) return false;

  try {
    const updates: Record<string, unknown> = {
      rating,
      ratedAt: new Date(),
    };

    if (description) {
      updates.ratingText = description;
    }

    await updateDoc(docRef, updates);
    return true;
  } catch {
    return false;
  }
}
