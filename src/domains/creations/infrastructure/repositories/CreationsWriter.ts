import { setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { type FirestorePathResolver } from "@umituz/react-native-firebase";
import type { Creation, CreationDocument } from "../../domain/entities/Creation";

declare const __DEV__: boolean;

/**
 * Handles write operations for creations
 * Single Responsibility: Write operations
 */
export class CreationsWriter {
    constructor(private readonly pathResolver: FirestorePathResolver) { }

    async create(userId: string, creation: Creation): Promise<void> {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
             
            console.log("[CreationsWriter] create() start", { userId, creationId: creation.id });
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
        };

        try {
            await setDoc(docRef, data);
            if (typeof __DEV__ !== "undefined" && __DEV__) {
                 
                console.log("[CreationsWriter] create() success", { creationId: creation.id });
            }
        } catch (error) {
            if (typeof __DEV__ !== "undefined" && __DEV__) {
                 
                console.error("[CreationsWriter] create() error", error);
            }
            throw error;
        }
    }

    async update(
        userId: string,
        id: string,
        updates: Partial<Creation>,
    ): Promise<boolean> {
        if (__DEV__) {
             
            console.log("[CreationsRepository] update()", { userId, id, updates });
        }

        const docRef = this.pathResolver.getDocRef(userId, id);
        if (!docRef) return false;

        try {
            const updateData: Record<string, unknown> = {};

            if (updates.metadata !== undefined) {
                updateData.metadata = updates.metadata;
            }
            if (updates.isShared !== undefined) {
                updateData.isShared = updates.isShared;
            }
            if (updates.uri !== undefined) {
                updateData.uri = updates.uri;
            }
            if (updates.type !== undefined) {
                updateData.type = updates.type;
            }
            if (updates.prompt !== undefined) {
                updateData.prompt = updates.prompt;
            }
            if (updates.status !== undefined) {
                updateData.status = updates.status;
            }
            if (updates.output !== undefined) {
                updateData.output = updates.output;
            }
            if (updates.rating !== undefined) {
                updateData.rating = updates.rating;
            }
            if (updates.ratedAt !== undefined) {
                updateData.ratedAt = updates.ratedAt;
            }
            if (updates.isFavorite !== undefined) {
                updateData.isFavorite = updates.isFavorite;
            }

            await updateDoc(docRef, updateData);
            return true;
        } catch (error) {
            if (__DEV__) {
                 
                console.error("[CreationsRepository] update() ERROR", error);
            }
            return false;
        }
    }

    async delete(userId: string, creationId: string): Promise<boolean> {
        const docRef = this.pathResolver.getDocRef(userId, creationId);
        if (!docRef) return false;

        try {
            await deleteDoc(docRef);
            return true;
        } catch {
            return false;
        }
    }

    async updateShared(
        userId: string,
        creationId: string,
        isShared: boolean,
    ): Promise<boolean> {
        const docRef = this.pathResolver.getDocRef(userId, creationId);
        if (!docRef) return false;

        try {
            await updateDoc(docRef, { isShared });
            return true;
        } catch {
            return false;
        }
    }

    async updateFavorite(
        userId: string,
        creationId: string,
        isFavorite: boolean,
    ): Promise<boolean> {
        const docRef = this.pathResolver.getDocRef(userId, creationId);
        if (!docRef) return false;

        try {
            await updateDoc(docRef, { isFavorite });
            return true;
        } catch {
            return false;
        }
    }

    async rate(
        userId: string,
        creationId: string,
        rating: number,
    ): Promise<boolean> {
        const docRef = this.pathResolver.getDocRef(userId, creationId);
        if (!docRef) return false;

        try {
            await updateDoc(docRef, {
                rating,
                ratedAt: new Date(),
            });
            return true;
        } catch {
            return false;
        }
    }
}
