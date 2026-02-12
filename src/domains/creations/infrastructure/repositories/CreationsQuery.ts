/**
 * CreationsQuery
 * Handles read operations (getAll, getById) for creations
 * Single Responsibility: Firestore query operations
 */

import { getDocs, getDoc, query, orderBy, where } from "firebase/firestore";
import type { GetUserCollection, GetDocRef } from "./CreationsFetcher";
import type { DocumentMapper } from "../../domain/value-objects/CreationsConfig";
import type { Creation, CreationDocument } from "../../domain/entities/Creation";
import { CREATION_FIELDS } from "../../domain/constants";

declare const __DEV__: boolean;

/**
 * Handles query operations for creations
 */
export class CreationsQuery {
    constructor(
        private readonly getUserCollection: GetUserCollection,
        private readonly getDocRef: GetDocRef,
        private readonly documentMapper: DocumentMapper,
    ) { }

    /**
     * Get all creations for a user
     * Optimized query: Server-side filtering for non-deleted items
     */
    async getAll(userId: string): Promise<Creation[]> {
        const userCollection = this.getUserCollection(userId);
        if (!userCollection) return [];

        try {
            const q = query(
                userCollection,
                where(CREATION_FIELDS.DELETED_AT, "==", null),
                orderBy(CREATION_FIELDS.CREATED_AT, "desc")
            );
            const snapshot = await getDocs(q);

            const creations = snapshot.docs.map((docSnap) => {
                const data = docSnap.data() as CreationDocument;
                return this.documentMapper(docSnap.id, data);
            });

            if (__DEV__) {
                console.log("[CreationsQuery] Fetched creations:", {
                    count: creations.length,
                    hasDeletedFilter: true,
                });
            }

            return creations;
        } catch (error) {
            if (__DEV__) {
                console.error("[CreationsQuery] getAll() error:", error);
            }
            return [];
        }
    }

    /**
     * Get a single creation by ID
     */
    async getById(userId: string, id: string): Promise<Creation | null> {
        const docRef = this.getDocRef(userId, id);
        if (!docRef) return null;

        try {
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                return null;
            }

            const data = docSnap.data() as CreationDocument;
            return this.documentMapper(docSnap.id, data);
        } catch (error) {
            if (__DEV__) {
                console.error("[CreationsQuery] getById() error:", error);
            }
            return null;
        }
    }
}
