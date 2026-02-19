/**
 * CreationsSubscription
 * Handles realtime subscription operations for creations
 * Single Responsibility: Firestore realtime listeners
 */

import { query, orderBy, onSnapshot } from "firebase/firestore";
import type { IPathResolver } from "@umituz/react-native-firebase";
import type { DocumentMapper } from "../../domain/value-objects/CreationsConfig";
import type { CreationDocument } from "../../domain/entities/Creation";
import type { CreationsSubscriptionCallback, UnsubscribeFunction } from "../../domain/repositories/ICreationsRepository";
import { CREATION_FIELDS } from "../../domain/constants";


export class CreationsSubscription {
    constructor(
        private readonly pathResolver: IPathResolver,
        private readonly documentMapper: DocumentMapper,
    ) { }

    subscribeToAll(
        userId: string,
        onData: CreationsSubscriptionCallback,
        onError?: (error: Error) => void,
    ): UnsubscribeFunction {
        const userCollection = this.pathResolver.getUserCollection(userId);

        if (!userCollection) {
            const error = new Error(`[CreationsSubscription] Invalid user collection: ${userId}`);
            if (__DEV__) console.error(error.message);
            onData([]);
            onError?.(error);
            return () => { if (__DEV__) console.log("[CreationsSubscription] No-op unsubscribe"); };
        }

        const q = query(
            userCollection,
            orderBy(CREATION_FIELDS.CREATED_AT, "desc")
        );

        return onSnapshot(
            q,
            { includeMetadataChanges: false },
            (snapshot) => {
                const creations = snapshot.docs
                    .map((docSnap) => {
                        const data = docSnap.data() as CreationDocument;
                        return this.documentMapper(docSnap.id, data);
                    })
                    .filter((c) => c.deletedAt == null);

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
