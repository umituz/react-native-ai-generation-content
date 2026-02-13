import type { IPathResolver } from "@umituz/react-native-firebase";
export type { IPathResolver };
import type { DocumentMapper } from "../../domain/value-objects/CreationsConfig";
import type { Creation } from "../../domain/entities/Creation";
import type { CreationsSubscriptionCallback, UnsubscribeFunction } from "../../domain/repositories/ICreationsRepository";
import { CreationsQuery } from "./CreationsQuery";
import { CreationsSubscription } from "./CreationsSubscription";

export class CreationsFetcher {
    private readonly query: CreationsQuery;
    private readonly subscription: CreationsSubscription;

    constructor(
        pathResolver: IPathResolver,
        documentMapper: DocumentMapper,
    ) {
        this.query = new CreationsQuery(pathResolver, documentMapper);
        this.subscription = new CreationsSubscription(pathResolver, documentMapper);
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
