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
  TextToImageInput,
  TextToImageOutput,
} from "./domain/generation.types";

export { ExecutorFactory, type GenerationType as ExecutorGenerationType } from "./infrastructure/executors/executor-factory";

export * from "./wizard";
export * from "./infrastructure/flow";

// Flow config types from domain
export {
  StepType,
  type GateResult,
  type AuthGateConfig,
  type CreditGateConfig,
  type FlowState,
  type FlowActions,
  type FlowCallbacks,
  type FlowConfiguration,
  type StepDefinition,
} from "../../domain/entities/flow-config.types";
