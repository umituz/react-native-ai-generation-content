import type { Firestore } from "firebase/firestore";
import { collection, doc } from "firebase/firestore";
import type { PathBuilder } from "../../domain/value-objects/CreationsConfig";

/**
 * Resolves Firestore paths for creations
 * Single Responsibility: Path resolution
 */
export class FirestorePathResolver {
    constructor(
        private readonly pathBuilder: PathBuilder,
        private readonly db: Firestore | null,
    ) { }

    getUserCollection(userId: string) {
        if (!this.db) return null;
        const pathSegments = this.pathBuilder(userId);
        return collection(this.db, pathSegments[0], ...pathSegments.slice(1));
    }

    getDocRef(userId: string, creationId: string) {
        if (!this.db) return null;
        const pathSegments = this.pathBuilder(userId);
        return doc(this.db, pathSegments[0], ...pathSegments.slice(1), creationId);
    }
}
