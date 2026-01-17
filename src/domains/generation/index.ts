export {
  useAIGeneration,
  type UseAIGenerationProps,
  type UseAIGenerationReturn,
  type AlertMessages,
} from "./presentation/useAIGeneration.hook";

export { featureRegistry } from "./application/feature-registry";
export { createGenerationStrategy } from "./application/generation-strategy.factory";

export type {
  FeatureConfig,
  FeatureRegistration,
  GenerationType,
  InputType,
  OutputType,
  VisualStyleConfig,
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

export * from "./wizard";
export * from "./infrastructure/flow";
