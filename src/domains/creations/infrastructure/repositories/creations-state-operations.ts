/**
 * Creation State Operations
 * State-specific operations like sharing, favoriting, and rating
 */

import { updateDoc } from "firebase/firestore";
import type { GetDocRef } from "./CreationsFetcher";
import { submitFeedback } from "@umituz/react-native-subscription";

/**
 * Updates the shared status of a creation
 */
export async function updateCreationShared(
  getDocRef: GetDocRef,
  userId: string,
  creationId: string,
  isShared: boolean
): Promise<boolean> {
  const docRef = getDocRef(userId, creationId);
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
  getDocRef: GetDocRef,
  userId: string,
  creationId: string,
  isFavorite: boolean
): Promise<boolean> {
  const docRef = getDocRef(userId, creationId);
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
  getDocRef: GetDocRef,
  userId: string,
  creationId: string,
  rating: number,
  description?: string
): Promise<boolean> {
  const docRef = getDocRef(userId, creationId);
  if (!docRef) return false;

  try {
    await updateDoc(docRef, { rating, ratedAt: new Date() });

    // Submit feedback if description or rating is provided
    if (description || rating) {
      try {
        await submitFeedback({
          userId,
          userEmail: null,
          type: "creation_rating",
          title: `Creation Rating: ${rating} Stars`,
          description: description || `User rated creation ${rating} stars`,
          rating,
          status: "pending",
        });
      } catch {
        // Feedback submission failed but rating was saved - continue
      }
    }
    return true;
  } catch {
    return false;
  }
}
