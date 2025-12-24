/**
 * Creations Repository Implementation
 * Extends BaseRepository from @umituz/react-native-firestore
 *
 * Architecture:
 * - Extends BaseRepository for centralized database access
 * - Fully dynamic path structure (configurable per app)
 * - Fully dynamic document mapping (configurable per app)
 * - App-agnostic: Works with any app, no app-specific code
 *
 * This class is designed to be used across hundreds of apps.
 */

declare const __DEV__: boolean;

import {
  collection,
  doc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { BaseRepository } from "@umituz/react-native-firebase";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";
import type { Creation, CreationDocument } from "../../domain/entities/Creation";
import { mapDocumentToCreation } from "../../domain/entities/Creation";
import type {
  PathBuilder,
  DocumentMapper,
} from "../../domain/value-objects/CreationsConfig";

/**
 * Repository options for dynamic configuration
 * Apps can customize path structure and document mapping
 */
export interface RepositoryOptions {
  /**
   * Custom path builder function
   * @example (userId) => ["users", userId, "photos"]
   * @example (userId) => ["creations", userId, "items"]
   */
  readonly pathBuilder?: PathBuilder;

  /**
   * Custom document mapper function
   * Maps Firestore documents to Creation entity
   */
  readonly documentMapper?: DocumentMapper;
}

/**
 * Default path builder: users/{userId}/{collectionName}
 */
const createDefaultPathBuilder =
  (collectionName: string): PathBuilder =>
    (userId: string) =>
      ["users", userId, collectionName];

export class CreationsRepository
  extends BaseRepository
  implements ICreationsRepository {
  private readonly pathBuilder: PathBuilder;
  private readonly documentMapper: DocumentMapper;

  constructor(
    private readonly collectionName: string,
    options?: RepositoryOptions,
  ) {
    super();
    this.pathBuilder =
      options?.pathBuilder ?? createDefaultPathBuilder(collectionName);
    this.documentMapper = options?.documentMapper ?? mapDocumentToCreation;
  }

  private getUserCollection(userId: string) {
    const db = this.getDb();
    if (!db) return null;
    const pathSegments = this.pathBuilder(userId);
    return collection(db, pathSegments[0], ...pathSegments.slice(1));
  }

  private getDocRef(userId: string, creationId: string) {
    const db = this.getDb();
    if (!db) return null;
    const pathSegments = this.pathBuilder(userId);
    return doc(db, pathSegments[0], ...pathSegments.slice(1), creationId);
  }

  async getAll(userId: string): Promise<Creation[]> {
    if (__DEV__) {
      console.log("[CreationsRepository] getAll()", { userId });
    }

    const userCollection = this.getUserCollection(userId);
    if (!userCollection) return [];

    try {
      const q = query(userCollection, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      if (__DEV__) {
        console.log("[CreationsRepository] Fetched:", snapshot.docs.length);
      }

      return snapshot.docs.map((docSnap) => {
        const data = docSnap.data() as CreationDocument;
        return this.documentMapper(docSnap.id, data);
      });
    } catch (error) {
      if (__DEV__) {
        console.error("[CreationsRepository] getAll() ERROR", error);
      }
      return [];
    }
  }

  async getById(userId: string, id: string): Promise<Creation | null> {
    if (__DEV__) {
      console.log("[CreationsRepository] getById()", { userId, id });
    }

    const docRef = this.getDocRef(userId, id);
    if (!docRef) return null;

    try {
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        if (__DEV__) {
          console.log("[CreationsRepository] Document not found");
        }
        return null;
      }

      const data = docSnap.data() as CreationDocument;
      return this.documentMapper(docSnap.id, data);
    } catch (error) {
      if (__DEV__) {
        console.error("[CreationsRepository] getById() ERROR", error);
      }
      return null;
    }
  }

  async create(userId: string, creation: Creation): Promise<void> {
    const docRef = this.getDocRef(userId, creation.id);
    if (!docRef) throw new Error("Firestore not initialized");

    const data: CreationDocument = {
      type: creation.type,
      prompt: creation.prompt,
      uri: creation.uri, // Use uri
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
      console.log("[CreationsRepository] update()", { userId, id, updates });
    }

    const docRef = this.getDocRef(userId, id);
    if (!docRef) return false;

    try {
      const updateData: Record<string, any> = {};

      if (updates.metadata !== undefined) {
        updateData.metadata = updates.metadata;
      }
      if (updates.isShared !== undefined) {
        updateData.isShared = updates.isShared;
      }
      if (updates.isFavorite !== undefined) {
        updateData.isFavorite = updates.isFavorite;
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
        console.error("[CreationsRepository] update() ERROR", error);
      }
      return false;
    }
  }

  async delete(userId: string, creationId: string): Promise<boolean> {
    const docRef = this.getDocRef(userId, creationId);
    if (!docRef) return false;

    try {
      await deleteDoc(docRef);
      return true;
    } catch {
      return false;
    }
  }

  async deleteMultiple(userId: string, creationIds: string[]): Promise<boolean> {
    try {
      const promises = creationIds.map((id) => this.delete(userId, id));
      const results = await Promise.all(promises);
      return results.every((r) => r);
    } catch {
      return false;
    }
  }

  async toggleFavorite(userId: string, creationId: string): Promise<boolean> {
    const docRef = this.getDocRef(userId, creationId);
    if (!docRef) return false;

    try {
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return false;

      const current = docSnap.data() as CreationDocument;
      await updateDoc(docRef, { isFavorite: !current.isFavorite });
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
    const docRef = this.getDocRef(userId, creationId);
    if (!docRef) return false;

    try {
      await updateDoc(docRef, { isShared });
      return true;
    } catch {
      return false;
    }
  }
}
