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
  /** Provider model endpoint ID */
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

  /** Maps generic wizard input to model-specific API parameters */
  readonly buildInput: (input: {
    readonly prompt: string;
    readonly sourceImageBase64?: string;
    readonly targetImageBase64?: string;
    readonly duration?: number;
    readonly aspectRatio?: string;
    readonly resolution?: string;
  }) => Record<string, unknown>;

  /** Pricing data for credit calculation (keys = resolution IDs) */
  readonly pricing: {
    readonly costPerSecond: Record<string, number>;
  };
}
