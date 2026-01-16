/**
 * Generation Domain
 * Generic, feature-agnostic AI generation system
 */

// Presentation Layer
export {
  useAIGeneration,
  type UseAIGenerationProps,
  type UseAIGenerationReturn,
  type AlertMessages,
} from "./presentation/useAIGeneration.hook";

// Application Layer
export { featureRegistry } from "./application/feature-registry";
export { createGenerationStrategy } from "./application/generation-strategy.factory";

// Domain Layer
export type {
  FeatureConfig,
  FeatureRegistration,
  GenerationType,
  InputType,
  OutputType,
} from "./domain/feature-config.types";

export type {
  GenerationExecutor,
  GenerationOptions,
  GenerationResult,
  ImageGenerationInput,
  ImageGenerationOutput,
  VideoGenerationInput,
  VideoGenerationOutput,
  MemeGenerationInput,
  MemeGenerationOutput,
} from "./domain/generation.types";
