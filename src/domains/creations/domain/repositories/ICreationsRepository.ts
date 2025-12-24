/**
 * Creations Repository Interface
 * Defines the contract for creations data access
 */

import type { Creation } from "../entities/Creation";

export interface ICreationsRepository {
  getAll(userId: string): Promise<Creation[]>;
  getById(userId: string, id: string): Promise<Creation | null>;
  create(userId: string, creation: Creation): Promise<void>;
  update(
    userId: string,
    id: string,
    updates: Partial<Creation>,
  ): Promise<boolean>;
  delete(userId: string, creationId: string): Promise<boolean>;
  deleteMultiple(userId: string, creationIds: string[]): Promise<boolean>;
  toggleFavorite(userId: string, creationId: string): Promise<boolean>;
  updateShared(
    userId: string,
    creationId: string,
    isShared: boolean,
  ): Promise<boolean>;
}
