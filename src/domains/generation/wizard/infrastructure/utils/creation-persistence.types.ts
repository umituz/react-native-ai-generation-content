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
  readonly duration?: number;
  readonly resolution?: string;
  readonly creditCost?: number;
  readonly aspectRatio?: string;
  readonly provider?: string;
  readonly outputType?: string;
}

export interface CompletedCreationData {
  readonly uri: string;
  readonly imageUrl?: string;
  readonly videoUrl?: string;
  readonly thumbnailUrl?: string;
  /** Unix timestamp (ms) when generation was submitted; used to compute durationMs */
  readonly generationStartedAt?: number;
}
