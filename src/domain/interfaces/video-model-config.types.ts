/**
 * VideoModelConfig - Model-Agnostic Configuration Interface
 * Encapsulates ALL model-specific behavior in a single config object.
 * Adding a new model = creating one config file. No other changes needed.
 */

export interface ModelCapabilityOption {
  readonly id: string;
  readonly label: string;
  readonly value: string | number;
}

export interface VideoModelConfig {
  /** Fal.ai model endpoint (e.g., "fal-ai/ltx-video-13b-distilled/image-to-video") */
  readonly modelId: string;

  /** Human-readable display name */
  readonly displayName: string;

  /** What this model supports (drives wizard UI) */
  readonly capabilities: {
    readonly resolutions: ReadonlyArray<ModelCapabilityOption>;
    readonly durations: ReadonlyArray<ModelCapabilityOption>;
    readonly aspectRatios?: ReadonlyArray<ModelCapabilityOption>;
    readonly defaults: {
      readonly resolution: string;
      readonly duration: number;
      readonly aspectRatio?: string;
    };
  };

  /**
   * Maps generic WizardVideoInput to model-specific API parameters.
   * This is the core adapter function - eliminates all model-specific if/else checks.
   */
  readonly buildInput: (input: {
    readonly prompt: string;
    readonly sourceImageBase64?: string;
    readonly targetImageBase64?: string;
    readonly duration?: number;
    readonly aspectRatio?: string;
    readonly resolution?: string;
  }) => Record<string, unknown>;

  /**
   * Pricing data for credit calculation.
   * Keys are resolution IDs matching capabilities.resolutions[].id
   */
  readonly pricing: {
    readonly costPerSecond: Record<string, number>;
  };
}
