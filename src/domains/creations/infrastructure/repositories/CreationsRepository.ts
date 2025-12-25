import { BaseRepository } from "@umituz/react-native-firebase";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";
import type { Creation } from "../../domain/entities/Creation";
import { mapDocumentToCreation } from "../../domain/entities/Creation";
import type {
  PathBuilder,
  DocumentMapper,
} from "../../domain/value-objects/CreationsConfig";
import { FirestorePathResolver } from "./FirestorePathResolver";
import { CreationsFetcher } from "./CreationsFetcher";
import { CreationsWriter } from "./CreationsWriter";

/**
 * Repository options for dynamic configuration
 * Apps can customize path structure and document mapping
 */
export interface RepositoryOptions {
  readonly pathBuilder?: PathBuilder;
  readonly documentMapper?: DocumentMapper;
}

/**
 * Default path builder: users/{userId}/{collectionName}
 */
const createDefaultPathBuilder =
  (collectionName: string): PathBuilder =>
    (userId: string) =>
      ["users", userId, collectionName];

/**
 * Creations Repository Implementation
 * Delegates to specialized classes for different responsibilities
 * 
 * Architecture:
 * - Extends BaseRepository for centralized database access
 * - Uses FirestorePathResolver for path resolution
 * - Uses CreationsFetcher for read operations
 * - Uses CreationsWriter for write operations
 * - Fully dynamic and configurable per app
 */
export class CreationsRepository
  extends BaseRepository
  implements ICreationsRepository {
  private readonly pathResolver: FirestorePathResolver;
  private readonly fetcher: CreationsFetcher;
  private readonly writer: CreationsWriter;

  constructor(
    private readonly _collectionName: string,
    options?: RepositoryOptions,
  ) {
    super();

    const pathBuilder = options?.pathBuilder ?? createDefaultPathBuilder(_collectionName);
    const documentMapper = options?.documentMapper ?? mapDocumentToCreation;

    this.pathResolver = new FirestorePathResolver(pathBuilder, this.getDb());
    this.fetcher = new CreationsFetcher(this.pathResolver, documentMapper);
    this.writer = new CreationsWriter(this.pathResolver);
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
}
