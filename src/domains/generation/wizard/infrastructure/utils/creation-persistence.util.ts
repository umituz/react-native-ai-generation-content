/**
 * Creation Persistence Utility - Barrel Export
 * Handles all Firestore creation operations for wizard generation
 *
 * Architecture:
 * - Domain: Types and value objects
 * - Infrastructure: Save/update operations, factory
 */

export type {
  CreationPersistenceConfig,
  ProcessingCreationData,
  CompletedCreationData,
} from "./creation-persistence.types";
export { createCreationPersistence, type CreationPersistence } from "./creation-persistence-factory";
