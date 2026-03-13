/**
 * CreationsQuery
 * Handles read operations (getAll, getById) for creations
 * Single Responsibility: Firestore query operations
 */

import { getDocs, getDoc, query, orderBy } from "firebase/firestore";
import type { IPathResolver } from "@umituz/react-native-firebase";
import type { DocumentMapper } from "../../domain/value-objects/CreationsConfig";
import type { Creation, CreationDocument } from "../../domain/entities/Creation";
import { CREATION_FIELDS } from "../../domain/constants";


export class CreationsQuery {
    constructor(
        private readonly pathResolver: IPathResolver,
        private readonly documentMapper: DocumentMapper,
    ) { }

    /**
     * Get all creations for a user
     *
     * NOTE: Client-side filtering for deletedAt is used here for simplicity.
     * For better performance with large datasets, consider:
     * 1. Adding a where clause: where(CREATION_FIELDS.DELETED_AT, "==", null)
     * 2. Creating a composite index on (deletedAt, createdAt)
     *
     * Current implementation fetches all documents including soft-deleted ones,
     * which is acceptable for small-to-medium datasets but may impact performance
     * at scale.
     */
    async getAll(userId: string): Promise<Creation[]> {
        const userCollection = this.pathResolver.getUserCollection(userId);
        if (!userCollection) return [];

        try {
            const q = query(
                userCollection,
                orderBy(CREATION_FIELDS.CREATED_AT, "desc")
            );
            const snapshot = await getDocs(q);

            const creations = snapshot.docs
                .map((docSnap) => {
                    const data = docSnap.data() as CreationDocument;
                    return this.documentMapper(docSnap.id, data);
                })
                .filter((c) => c.deletedAt == null);

            if (__DEV__) {
                console.log("[CreationsQuery] Fetched creations:", {
                    count: creations.length,
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
        const docRef = this.pathResolver.getDocRef(userId, id);
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
