import type { CollectionReference, DocumentReference, DocumentData } from "firebase/firestore";
import type { DocumentMapper } from "../../domain/value-objects/CreationsConfig";
import type { Creation } from "../../domain/entities/Creation";
import type { CreationsSubscriptionCallback, UnsubscribeFunction } from "../../domain/repositories/ICreationsRepository";
import { CreationsQuery } from "./CreationsQuery";
import { CreationsSubscription } from "./CreationsSubscription";

/**
 * Path resolver functions from BaseRepository
 */
export type GetUserCollection = (userId: string) => CollectionReference<DocumentData> | null;
export type GetDocRef = (userId: string, documentId: string) => DocumentReference<DocumentData> | null;

/**
 * CreationsFetcher
 * Orchestrates read operations for creations
 * Delegates to specialized classes for queries and subscriptions
 *
 * Architecture: Facade pattern
 * - Query operations → CreationsQuery
 * - Subscription operations → CreationsSubscription
 */
export class CreationsFetcher {
    private readonly query: CreationsQuery;
    private readonly subscription: CreationsSubscription;

    constructor(
        getUserCollection: GetUserCollection,
        getDocRef: GetDocRef,
        documentMapper: DocumentMapper,
    ) {
        this.query = new CreationsQuery(getUserCollection, getDocRef, documentMapper);
        this.subscription = new CreationsSubscription(getUserCollection, getDocRef, documentMapper);
    }

    /**
     * Get all creations for a user
     */
    async getAll(userId: string): Promise<Creation[]> {
        return this.query.getAll(userId);
    }

    /**
     * Get a single creation by ID
     */
    async getById(userId: string, id: string): Promise<Creation | null> {
        return this.query.getById(userId, id);
    }

    /**
     * Subscribe to realtime updates for user's creations
     */
    subscribeToAll(
        userId: string,
        onData: CreationsSubscriptionCallback,
        onError?: (error: Error) => void,
    ): UnsubscribeFunction {
        return this.subscription.subscribeToAll(userId, onData, onError);
    }
}
