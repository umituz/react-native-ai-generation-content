 
if (typeof __DEV__ !== "undefined" && __DEV__) console.log("📍 [LIFECYCLE] CreationsRepository.ts - Module loading");

import { BaseRepository, FirestorePathResolver } from "@umituz/react-native-firebase";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";
import type { Creation } from "../../domain/entities/Creation";
import { mapDocumentToCreation } from "../../domain/entities/Creation";
import type { DocumentMapper } from "../../domain/value-objects/CreationsConfig";
import { CreationsFetcher } from "./CreationsFetcher";
import { CreationsWriter } from "./CreationsWriter";

/**
 * Repository options for dynamic configuration
 * Apps can customize document mapping
 */
export interface RepositoryOptions {
  readonly documentMapper?: DocumentMapper;
}

/**
 * Creations Repository Implementation
 * Delegates to specialized classes for different responsibilities
 * 
 * Architecture:
 * - Extends BaseRepository for centralized database access
 * - Uses FirestorePathResolver for path resolution
 * - Uses CreationsFetcher for read operations
 * - Uses CreationsWriter for write operations
 * - Standard path: users/{userId}/{collectionName}
 */
export class CreationsRepository
  extends BaseRepository
  implements ICreationsRepository {
  private readonly pathResolver: FirestorePathResolver;
  private readonly fetcher: CreationsFetcher;
  private readonly writer: CreationsWriter;

  constructor(
    collectionName: string,
    options?: RepositoryOptions,
  ) {
     
    if (typeof __DEV__ !== "undefined" && __DEV__) console.log("📍 [LIFECYCLE] CreationsRepository - Constructor start");
    super();

    const documentMapper = options?.documentMapper ?? mapDocumentToCreation;

     
    if (typeof __DEV__ !== "undefined" && __DEV__) console.log("📍 [LIFECYCLE] CreationsRepository - Getting db");
    const db = this.getDb();
     
    if (typeof __DEV__ !== "undefined" && __DEV__) console.log("📍 [LIFECYCLE] CreationsRepository - db:", db ? "available" : "null");

    this.pathResolver = new FirestorePathResolver(collectionName, db);
    this.fetcher = new CreationsFetcher(this.pathResolver, documentMapper);
    this.writer = new CreationsWriter(this.pathResolver);
     
    if (typeof __DEV__ !== "undefined" && __DEV__) console.log("📍 [LIFECYCLE] CreationsRepository - Constructor end");
  }

  async getAll(userId: string): Promise<Creation[]> {
    return this.fetcher.getAll(userId);
  }

  async getById(userId: string, id: string): Promise<Creation | null> {
    return this.fetcher.getById(userId, id);
  }

  async create(userId: string, creation: Creation): Promise<void> {
    return this.writer.create(userId, creation);
  }

  async update(
    userId: string,
    id: string,
    updates: Partial<Creation>,
  ): Promise<boolean> {
    return this.writer.update(userId, id, updates);
  }

  async delete(userId: string, creationId: string): Promise<boolean> {
    return this.writer.delete(userId, creationId);
  }

  async hardDelete(userId: string, creationId: string): Promise<boolean> {
    return this.writer.hardDelete(userId, creationId);
  }

  async restore(userId: string, creationId: string): Promise<boolean> {
    return this.writer.restore(userId, creationId);
  }

  async updateShared(
    userId: string,
    creationId: string,
    isShared: boolean,
  ): Promise<boolean> {
    return this.writer.updateShared(userId, creationId, isShared);
  }

  async updateFavorite(
    userId: string,
    creationId: string,
    isFavorite: boolean,
  ): Promise<boolean> {
    return this.writer.updateFavorite(userId, creationId, isFavorite);
  }

  async rate(
    userId: string,
    creationId: string,
    rating: number,
    description?: string,
  ): Promise<boolean> {
    return this.writer.rate(userId, creationId, rating, description);
  }
}
