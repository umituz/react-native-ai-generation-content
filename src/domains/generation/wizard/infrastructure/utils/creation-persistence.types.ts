/**
 * Creation Persistence Types
 * Domain: Value objects for creation persistence
 */

export interface CreationPersistenceConfig {
  readonly collectionName?: string;
}

export interface ProcessingCreationData {
  readonly scenarioId: string;
  readonly scenarioTitle: string;
  readonly prompt: string;
  readonly requestId?: string;
  readonly model?: string;
}

export interface CompletedCreationData {
  readonly uri: string;
  readonly imageUrl?: string;
  readonly videoUrl?: string;
}
