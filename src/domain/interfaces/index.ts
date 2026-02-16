/**
 * Domain Interfaces
 * Provider-agnostic contracts
 */

export * from "./ai-provider.interface";
export * from "./app-services.interface";

// Interface Segregation - Split provider interfaces
export type { IAIProviderLifecycle } from "./provider-lifecycle.interface";
export type { IAIProviderCapabilities } from "./provider-capabilities.interface";
export type { IAIProviderJobManager } from "../../domains/background/domain/interfaces/provider-job-manager.interface";
export type { IAIProviderExecutor } from "./provider-executor.interface";
export type { IAIProviderImageFeatures } from "./provider-image-features.interface";
export type { IAIProviderVideoFeatures } from "./provider-video-features.interface";

// Video Model Configuration
export type { VideoModelConfig, ModelCapabilityOption } from "./video-model-config.types";
