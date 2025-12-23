/**
 * Repository Factory
 * Creates repository instance with given configuration
 *
 * Architecture:
 * - Factory pattern for repository creation
 * - Supports dynamic path structure per app
 * - Supports custom document mapping per app
 * - App-agnostic: No Firestore instance needed (BaseRepository handles it)
 *
 * This factory is designed to be used across hundreds of apps.
 */

import {
  CreationsRepository,
  type RepositoryOptions,
} from "../repositories/CreationsRepository";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";

/**
 * Creates a new CreationsRepository instance
 *
 * @param collectionName - Firestore collection name
 * @param options - Optional repository configuration
 * @returns ICreationsRepository instance
 *
 * @example
 * // Basic usage with default path (users/{userId}/photos)
 * const repo = createCreationsRepository("photos");
 *
 * @example
 * // Custom path structure
 * const repo = createCreationsRepository("creations", {
 *   pathBuilder: (userId) => ["gallery", userId, "items"],
 * });
 *
 * @example
 * // Custom document mapper
 * const repo = createCreationsRepository("photos", {
 *   documentMapper: (id, data) => ({
 *     id,
 *     uri: data.imageUrl,
 *     type: data.category,
 *     createdAt: data.timestamp?.toDate() || new Date(),
 *     isShared: data.public ?? false,
 *   }),
 * });
 */
export function createCreationsRepository(
  collectionName: string,
  options?: RepositoryOptions,
): ICreationsRepository {
  return new CreationsRepository(collectionName, options);
}
