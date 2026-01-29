/**
 * Creations Repository Interface
 * Defines the contract for creations data access
 */

import type { Creation } from "../entities/Creation";

export type CreationsSubscriptionCallback = (creations: Creation[]) => void;
export type UnsubscribeFunction = () => void;

export interface ICreationsRepository {
  getAll(userId: string): Promise<Creation[]>;
  /** Realtime subscription to all creations */
  subscribeToAll(
    userId: string,
    onData: CreationsSubscriptionCallback,
    onError?: (error: Error) => void,
  ): UnsubscribeFunction;
  getById(userId: string, id: string): Promise<Creation | null>;
  create(userId: string, creation: Creation): Promise<void>;
  update(
    userId: string,
    id: string,
    updates: Partial<Creation>,
  ): Promise<boolean>;
  /** Soft delete - sets deletedAt timestamp */
  delete(userId: string, creationId: string): Promise<boolean>;
  /** Hard delete - permanently removes from database */
  hardDelete(userId: string, creationId: string): Promise<boolean>;
  /** Restore a soft-deleted creation */
  restore(userId: string, creationId: string): Promise<boolean>;
  updateShared(
    userId: string,
    creationId: string,
    isShared: boolean,
  ): Promise<boolean>;
  updateFavorite(
    userId: string,
    creationId: string,
    isFavorite: boolean,
  ): Promise<boolean>;
  rate(
    userId: string,
    creationId: string,
    rating: number,
    description?: string,
  ): Promise<boolean>;
}
