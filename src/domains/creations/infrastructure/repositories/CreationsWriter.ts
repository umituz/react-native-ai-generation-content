import type { IPathResolver } from "@umituz/react-native-firebase";
import type { Creation } from "../../domain/entities/Creation";
import * as operations from "./creations-operations";
import * as stateOperations from "./creations-state-operations";

export class CreationsWriter {
  constructor(
    private readonly pathResolver: IPathResolver,
  ) {}

  async create(userId: string, creation: Creation): Promise<void> {
    return operations.createCreation(this.pathResolver, userId, creation);
  }

  async update(userId: string, id: string, updates: Partial<Creation>): Promise<boolean> {
    return operations.updateCreation(this.pathResolver, userId, id, updates);
  }

  async delete(userId: string, creationId: string): Promise<boolean> {
    return operations.deleteCreation(this.pathResolver, userId, creationId);
  }

  async hardDelete(userId: string, creationId: string): Promise<boolean> {
    return operations.hardDeleteCreation(this.pathResolver, userId, creationId);
  }

  async restore(userId: string, creationId: string): Promise<boolean> {
    return operations.restoreCreation(this.pathResolver, userId, creationId);
  }

  async updateShared(userId: string, creationId: string, isShared: boolean): Promise<boolean> {
    return stateOperations.updateCreationShared(this.pathResolver, userId, creationId, isShared);
  }

  async updateFavorite(userId: string, creationId: string, isFavorite: boolean): Promise<boolean> {
    return stateOperations.updateCreationFavorite(this.pathResolver, userId, creationId, isFavorite);
  }

  async rate(userId: string, creationId: string, rating: number, description?: string): Promise<boolean> {
    return stateOperations.rateCreation(this.pathResolver, userId, creationId, rating, description);
  }
}
