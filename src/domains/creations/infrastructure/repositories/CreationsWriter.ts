import { setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import type { Creation, CreationDocument } from "../../domain/entities/Creation";
import type { FirestorePathResolver } from "./FirestorePathResolver";

declare const __DEV__: boolean;

/**
 * Handles write operations for creations
 * Single Responsibility: Write operations
 */
export class CreationsWriter {
    constructor(private readonly pathResolver: FirestorePathResolver) { }

    async create(userId: string, creation: Creation): Promise<void> {
        const docRef = this.pathResolver.getDocRef(userId, creation.id);
        if (!docRef) throw new Error("Firestore not initialized");

        const data: CreationDocument = {
            type: creation.type,
            prompt: creation.prompt,
            uri: creation.uri,
            createdAt: creation.createdAt,
            metadata: creation.metadata || {},
            isShared: creation.isShared || false,
            isFavorite: creation.isFavorite || false,
        };

        await setDoc(docRef, data);
    }

    async update(
        userId: string,
        id: string,
        updates: Partial<Creation>,
    ): Promise<boolean> {
        if (__DEV__) {
            // eslint-disable-next-line no-console
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

            await updateDoc(docRef, updateData);
            return true;
        } catch (error) {
            if (__DEV__) {
                // eslint-disable-next-line no-console
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
}
