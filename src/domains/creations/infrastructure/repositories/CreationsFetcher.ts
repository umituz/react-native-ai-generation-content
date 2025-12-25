import { getDocs, getDoc, query, orderBy } from "firebase/firestore";
import { type FirestorePathResolver } from "@umituz/react-native-firebase";
import type { DocumentMapper } from "../../domain/value-objects/CreationsConfig";
import type { Creation, CreationDocument } from "../../domain/entities/Creation";

declare const __DEV__: boolean;

/**
 * Handles fetching creations from Firestore
 * Single Responsibility: Read operations
 */
export class CreationsFetcher {
    constructor(
        private readonly pathResolver: FirestorePathResolver,
        private readonly documentMapper: DocumentMapper,
    ) { }

    async getAll(userId: string): Promise<Creation[]> {
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log("[CreationsRepository] getAll()", { userId });
        }

        const userCollection = this.pathResolver.getUserCollection(userId);
        if (!userCollection) return [];

        try {
            const q = query(userCollection, orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);

            if (__DEV__) {
                // eslint-disable-next-line no-console
                console.log("[CreationsRepository] Fetched:", snapshot.docs.length);
            }

            return snapshot.docs.map((docSnap) => {
                const data = docSnap.data() as CreationDocument;
                return this.documentMapper(docSnap.id, data);
            });
        } catch (error) {
            if (__DEV__) {
                // eslint-disable-next-line no-console
                console.error("[CreationsRepository] getAll() ERROR", error);
            }
            return [];
        }
    }

    async getById(userId: string, id: string): Promise<Creation | null> {
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log("[CreationsRepository] getById()", { userId, id });
        }

        const docRef = this.pathResolver.getDocRef(userId, id);
        if (!docRef) return null;

        try {
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                if (__DEV__) {
                    // eslint-disable-next-line no-console
                    console.log("[CreationsRepository] Document not found");
                }
                return null;
            }

            const data = docSnap.data() as CreationDocument;
            return this.documentMapper(docSnap.id, data);
        } catch (error) {
            if (__DEV__) {
                // eslint-disable-next-line no-console
                console.error("[CreationsRepository] getById() ERROR", error);
            }
            return null;
        }
    }
}
