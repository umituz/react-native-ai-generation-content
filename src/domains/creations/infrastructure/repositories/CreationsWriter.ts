import { setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { type FirestorePathResolver } from "@umituz/react-native-firebase";
import { submitFeedback } from "@umituz/react-native-subscription";
import type { Creation, CreationDocument } from "../../domain/entities/Creation";

declare const __DEV__: boolean;

const UPDATABLE_FIELDS = [
  "metadata", "isShared", "uri", "type", "prompt", "status",
  "output", "rating", "ratedAt", "isFavorite", "deletedAt",
  "requestId", "model",
] as const;

/**
 * Handles write operations for creations
 */
export class CreationsWriter {
  constructor(private readonly pathResolver: FirestorePathResolver) {}

  async create(userId: string, creation: Creation): Promise<void> {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[CreationsWriter] create()", { userId, creationId: creation.id });
    }

    const docRef = this.pathResolver.getDocRef(userId, creation.id);
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
      if (typeof __DEV__ !== "undefined" && __DEV__) console.log("[CreationsWriter] create() success");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[CreationsWriter] create() error", {
          userId,
          creationId: creation.id,
          error: errorMessage,
        });
      }
      throw new Error(`Failed to create creation ${creation.id}: ${errorMessage}`);
    }
  }

  async update(userId: string, id: string, updates: Partial<Creation>): Promise<boolean> {
    if (typeof __DEV__ !== "undefined" && __DEV__) console.log("[CreationsWriter] update()", { userId, id });

    const docRef = this.pathResolver.getDocRef(userId, id);
    if (!docRef) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[CreationsWriter] update() - Firestore not initialized", { userId, id });
      }
      return false;
    }

    try {
      const updateData: Record<string, unknown> = {};
      for (const field of UPDATABLE_FIELDS) {
        if (updates[field] !== undefined) updateData[field] = updates[field];
      }
      await updateDoc(docRef, updateData);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[CreationsWriter] update() error", {
          userId,
          creationId: id,
          error: errorMessage,
        });
      }
      return false;
    }
  }

  async delete(userId: string, creationId: string): Promise<boolean> {
    const docRef = this.pathResolver.getDocRef(userId, creationId);
    if (!docRef) return false;
    try {
      await updateDoc(docRef, { deletedAt: new Date() });
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[CreationsWriter] delete() error", {
          userId,
          creationId,
          error: errorMessage,
        });
      }
      return false;
    }
  }

  async hardDelete(userId: string, creationId: string): Promise<boolean> {
    const docRef = this.pathResolver.getDocRef(userId, creationId);
    if (!docRef) return false;
    try {
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[CreationsWriter] hardDelete() error", {
          userId,
          creationId,
          error: errorMessage,
        });
      }
      return false;
    }
  }

  async restore(userId: string, creationId: string): Promise<boolean> {
    const docRef = this.pathResolver.getDocRef(userId, creationId);
    if (!docRef) return false;
    try {
      await updateDoc(docRef, { deletedAt: null });
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[CreationsWriter] restore() error", {
          userId,
          creationId,
          error: errorMessage,
        });
      }
      return false;
    }
  }

  async updateShared(userId: string, creationId: string, isShared: boolean): Promise<boolean> {
    const docRef = this.pathResolver.getDocRef(userId, creationId);
    if (!docRef) return false;
    try {
      await updateDoc(docRef, { isShared });
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[CreationsWriter] updateShared() error", {
          userId,
          creationId,
          isShared,
          error: errorMessage,
        });
      }
      return false;
    }
  }

  async updateFavorite(userId: string, creationId: string, isFavorite: boolean): Promise<boolean> {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[CreationsWriter] updateFavorite()", { userId, creationId, isFavorite });
    }
    const docRef = this.pathResolver.getDocRef(userId, creationId);
    if (!docRef) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.warn("[CreationsWriter] updateFavorite() - Firestore not initialized", {
          userId,
          creationId,
        });
      }
      return false;
    }
    try {
      await updateDoc(docRef, { isFavorite });
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[CreationsWriter] updateFavorite() success");
      }
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[CreationsWriter] updateFavorite() error", {
          userId,
          creationId,
          isFavorite,
          error: errorMessage,
        });
      }
      return false;
    }
  }

  async rate(userId: string, creationId: string, rating: number, description?: string): Promise<boolean> {
    const docRef = this.pathResolver.getDocRef(userId, creationId);
    if (!docRef) return false;

    try {
      await updateDoc(docRef, { rating, ratedAt: new Date() });
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
        } catch (feedbackError) {
          // Log but don't fail - the rating was saved successfully
          const feedbackErrorMessage = feedbackError instanceof Error
            ? feedbackError.message
            : String(feedbackError);
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.warn("[CreationsWriter] rate() - feedback submission failed", {
              userId,
              creationId,
              error: feedbackErrorMessage,
            });
          }
        }
      }
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[CreationsWriter] rate() error", {
          userId,
          creationId,
          rating,
          error: errorMessage,
        });
      }
      return false;
    }
  }
}
