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
      if (typeof __DEV__ !== "undefined" && __DEV__) console.error("[CreationsWriter] create() error", error);
      throw error;
    }
  }

  async update(userId: string, id: string, updates: Partial<Creation>): Promise<boolean> {
    if (typeof __DEV__ !== "undefined" && __DEV__) console.log("[CreationsWriter] update()", { userId, id });

    const docRef = this.pathResolver.getDocRef(userId, id);
    if (!docRef) return false;

    try {
      const updateData: Record<string, unknown> = {};
      for (const field of UPDATABLE_FIELDS) {
        if (updates[field] !== undefined) updateData[field] = updates[field];
      }
      await updateDoc(docRef, updateData);
      return true;
    } catch (error) {
      if (typeof __DEV__ !== "undefined" && __DEV__) console.error("[CreationsWriter] update() error", error);
      return false;
    }
  }

  async delete(userId: string, creationId: string): Promise<boolean> {
    const docRef = this.pathResolver.getDocRef(userId, creationId);
    if (!docRef) return false;
    try {
      await updateDoc(docRef, { deletedAt: new Date() });
      return true;
    } catch {
      return false;
    }
  }

  async hardDelete(userId: string, creationId: string): Promise<boolean> {
    const docRef = this.pathResolver.getDocRef(userId, creationId);
    if (!docRef) return false;
    try {
      await deleteDoc(docRef);
      return true;
    } catch {
      return false;
    }
  }

  async restore(userId: string, creationId: string): Promise<boolean> {
    const docRef = this.pathResolver.getDocRef(userId, creationId);
    if (!docRef) return false;
    try {
      await updateDoc(docRef, { deletedAt: null });
      return true;
    } catch {
      return false;
    }
  }

  async updateShared(userId: string, creationId: string, isShared: boolean): Promise<boolean> {
    const docRef = this.pathResolver.getDocRef(userId, creationId);
    if (!docRef) return false;
    try {
      await updateDoc(docRef, { isShared });
      return true;
    } catch {
      return false;
    }
  }

  async updateFavorite(userId: string, creationId: string, isFavorite: boolean): Promise<boolean> {
    const docRef = this.pathResolver.getDocRef(userId, creationId);
    if (!docRef) return false;
    try {
      await updateDoc(docRef, { isFavorite });
      return true;
    } catch {
      return false;
    }
  }

  async rate(userId: string, creationId: string, rating: number, description?: string): Promise<boolean> {
    const docRef = this.pathResolver.getDocRef(userId, creationId);
    if (!docRef) return false;

    try {
      await updateDoc(docRef, { rating, ratedAt: new Date() });
      if (description || rating) {
        await submitFeedback({
          userId,
          userEmail: null,
          type: "creation_rating",
          title: `Creation Rating: ${rating} Stars`,
          description: description || `User rated creation ${rating} stars`,
          rating,
          status: "pending",
        });
      }
      return true;
    } catch (error) {
      if (typeof __DEV__ !== "undefined" && __DEV__) console.error("[CreationsWriter] rate() error", error);
      return false;
    }
  }
}
