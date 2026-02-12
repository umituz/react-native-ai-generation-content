/**
 * AI Provider Interface - Barrel Export
 * Provider-agnostic interface for AI generation services
 *
 * Architecture:
 * - Feature Types: ImageFeatureType, VideoFeatureType enums
 * - Configuration: AIProviderConfig for initialization
 * - Status: Job status tracking types
 * - Progress: Progress tracking and callback options
 * - Capabilities: Provider feature support definition
 * - Input: Input data structures for features
 * - Main Interface: Composed IAIProvider using Interface Segregation Principle
 */

// Feature Types
export type { ImageFeatureType, VideoFeatureType } from "./ai-provider-feature-types";

// Configuration
export type { AIProviderConfig } from "./ai-provider-config.types";

// Status Types
export type {
  AIJobStatusType,
  AILogEntry,
  JobSubmission,
  JobStatus,
} from "./ai-provider-status.types";

// Progress & Options
export type {
  ProviderProgressInfo,
  SubscribeOptions,
  RunOptions,
} from "./ai-provider-progress.types";

// Capabilities
export type { ProviderCapabilities } from "./ai-provider-capabilities.types";

// Input Data
export type {
  ImageFeatureInputData,
  VideoFeatureInputData,
} from "./ai-provider-input.types";

// Main Interface Composition (Interface Segregation Principle)
import type { IAIProviderLifecycle } from "./provider-lifecycle.interface";
import type { IAIProviderCapabilities } from "./provider-capabilities.interface";
import type { IAIProviderJobManager } from "../../domains/background/domain/interfaces/provider-job-manager.interface";
import type { IAIProviderExecutor } from "./provider-executor.interface";
import type { IAIProviderImageFeatures } from "./provider-image-features.interface";
import type { IAIProviderVideoFeatures } from "./provider-video-features.interface";

/**
 * Main AI Provider Interface
 * Composition of segregated interfaces following SOLID principles
 */
export interface IAIProvider
  extends IAIProviderLifecycle,
    IAIProviderCapabilities,
    IAIProviderJobManager,
    IAIProviderExecutor,
    IAIProviderImageFeatures,
    IAIProviderVideoFeatures {
  readonly providerId: string;
  readonly providerName: string;
}
