/**
 * AI Provider Types - Core interfaces for AI generation providers
 * Re-exports from canonical domain sources
 *
 * @module @umituz/react-native-ai-generation-content/core
 */

// Main provider types from ai-provider.interface
export type {
  // Feature Types
  ImageFeatureType,
  VideoFeatureType,
  // Config
  AIProviderConfig,
  // Status
  AIJobStatusType,
  AILogEntry,
  JobSubmission,
  JobStatus,
  // Progress
  ProviderProgressInfo,
  SubscribeOptions,
  RunOptions,
  // Capabilities
  ProviderCapabilities,
  // Input Data
  ImageFeatureInputData,
  VideoFeatureInputData,
  // Main Provider Interface
  IAIProvider,
} from "../../domain/interfaces/ai-provider.interface";

// Segregated provider sub-interfaces
export type { IAIProviderLifecycle } from "../../domain/interfaces/provider-lifecycle.interface";
export type { IAIProviderCapabilities } from "../../domain/interfaces/provider-capabilities.interface";
export type { IAIProviderJobManager } from "../../domain/interfaces/provider-job-manager.interface";
export type { IAIProviderExecutor } from "../../domain/interfaces/provider-executor.interface";
export type { IAIProviderImageFeatures } from "../../domain/interfaces/provider-image-features.interface";
export type { IAIProviderVideoFeatures } from "../../domain/interfaces/provider-video-features.interface";
