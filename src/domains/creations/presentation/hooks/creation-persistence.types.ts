/**
 * Creation Persistence Types
 * Type definitions for persistence hook
 */

export interface UseCreationPersistenceConfig {
  readonly type: string;
  readonly collectionName?: string;
  readonly creditCost?: number;
  readonly onCreditDeduct?: (cost: number) => Promise<void | boolean>;
}

export interface BaseProcessingStartData {
  readonly creationId: string;
}

export interface BaseProcessingResult {
  readonly creationId?: string;
  readonly imageUrl?: string;
  readonly videoUrl?: string;
}

export interface UseCreationPersistenceReturn {
  readonly onProcessingStart: <T extends BaseProcessingStartData>(data: T) => void;
  readonly onProcessingComplete: <T extends BaseProcessingResult>(result: T) => void;
  readonly onError: (error: string, creationId?: string) => void;
}
