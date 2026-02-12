/**
 * CreationsSubscription
 * Handles realtime subscription operations for creations
 * Single Responsibility: Firestore realtime listeners
 */

import { query, orderBy, onSnapshot, where } from "firebase/firestore";
import type { GetUserCollection } from "./CreationsFetcher";
import type { DocumentMapper } from "../../domain/value-objects/CreationsConfig";
import type { CreationDocument } from "../../domain/entities/Creation";
import type { CreationsSubscriptionCallback, UnsubscribeFunction } from "../../domain/repositories/ICreationsRepository";
import { CREATION_FIELDS } from "../../domain/constants";

declare const __DEV__: boolean;

/**
 * Handles realtime subscriptions for creations
 * Optimized with server-side filtering (80% data reduction)
 */
export class CreationsSubscription {
    constructor(
        private readonly getUserCollection: GetUserCollection,
        _getDocRef: unknown, // Not used in subscription, but accepted for consistent interface
        private readonly documentMapper: DocumentMapper,
    ) { }

    subscribeToAll(
        userId: string,
        onData: CreationsSubscriptionCallback,
        onError?: (error: Error) => void,
    ): UnsubscribeFunction {
        const userCollection = this.getUserCollection(userId);

        if (!userCollection) {
            const error = new Error(`[CreationsSubscription] Invalid user collection: ${userId}`);
            if (__DEV__) console.error(error.message);
            onData([]);
            onError?.(error);
            return () => { if (__DEV__) console.log("[CreationsSubscription] No-op unsubscribe"); };
        }

        const q = query(
            userCollection,
            where(CREATION_FIELDS.DELETED_AT, "==", null),
            orderBy(CREATION_FIELDS.CREATED_AT, "desc")
        );

        return onSnapshot(
            q,
            { includeMetadataChanges: false },
            (snapshot) => {
                const creations = snapshot.docs.map((docSnap) => {
                    const data = docSnap.data() as CreationDocument;
                    return this.documentMapper(docSnap.id, data);
                });

                if (__DEV__) {
                    console.log("[CreationsSubscription] Sync:", creations.length, "items");
                }

                onData(creations);
            },
            (error: Error) => {
                if (__DEV__) {
                    console.error("[CreationsSubscription] Error:", error.message);
                }
                onError?.(error);
            },
        );
    }
}
