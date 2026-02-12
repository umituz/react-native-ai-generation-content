/**
 * Creations Writer
 * Main class that orchestrates all creation write operations
 */

import type { GetUserCollection, GetDocRef } from "./CreationsFetcher";
import type { Creation } from "../../domain/entities/Creation";
import * as operations from "./creations-operations";
import * as stateOperations from "./creations-state-operations";

/**
 * Handles write operations for creations
 */
export class CreationsWriter {
  constructor(
    private readonly getUserCollection: GetUserCollection,
    private readonly getDocRef: GetDocRef,
  ) {}

  async create(userId: string, creation: Creation): Promise<void> {
    return operations.createCreation(this.getUserCollection, this.getDocRef, userId, creation);
  }

  async update(userId: string, id: string, updates: Partial<Creation>): Promise<boolean> {
    return operations.updateCreation(this.getDocRef, userId, id, updates);
  }

  async delete(userId: string, creationId: string): Promise<boolean> {
    return operations.deleteCreation(this.getDocRef, userId, creationId);
  }

  async hardDelete(userId: string, creationId: string): Promise<boolean> {
    return operations.hardDeleteCreation(this.getDocRef, userId, creationId);
  }

  async restore(userId: string, creationId: string): Promise<boolean> {
    return operations.restoreCreation(this.getDocRef, userId, creationId);
  }

  async updateShared(userId: string, creationId: string, isShared: boolean): Promise<boolean> {
    return stateOperations.updateCreationShared(this.getDocRef, userId, creationId, isShared);
  }

  async updateFavorite(userId: string, creationId: string, isFavorite: boolean): Promise<boolean> {
    return stateOperations.updateCreationFavorite(this.getDocRef, userId, creationId, isFavorite);
  }

  async rate(userId: string, creationId: string, rating: number, description?: string): Promise<boolean> {
    return stateOperations.rateCreation(this.getDocRef, userId, creationId, rating, description);
  }
}
