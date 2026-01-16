/**
 * Feature Registry
 * Centralized registry for all AI generation features
 * Apps register features they need during initialization
 */

import type {
  FeatureConfig,
  FeatureRegistration,
} from "../domain/feature-config.types";

declare const __DEV__: boolean;

class FeatureRegistryImpl implements FeatureRegistration {
  private features = new Map<string, FeatureConfig>();

  register(featureId: string, config: FeatureConfig): void {
    if (this.features.has(featureId)) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.warn(
          `[FeatureRegistry] Feature '${featureId}' already registered. Overwriting.`,
        );
      }
    }

    this.features.set(featureId, config);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[FeatureRegistry] Feature registered", {
        featureId,
        type: config.type,
        model: config.model,
        creditCost: config.creditCost,
        inputType: config.inputType,
        outputType: config.outputType,
      });
    }
  }

  get(featureId: string): FeatureConfig {
    const config = this.features.get(featureId);

    if (!config) {
      const availableFeatures = Array.from(this.features.keys()).join(", ");

      throw new Error(
        `Feature not found: ${featureId}.\n\n` +
          `Available features: ${availableFeatures || "none"}.\n` +
          `Please register '${featureId}' using featureRegistry.register() in your app initialization.`,
      );
    }

    return config;
  }

  getAll(): FeatureConfig[] {
    return Array.from(this.features.values());
  }

  has(featureId: string): boolean {
    return this.features.has(featureId);
  }

  unregister(featureId: string): void {
    const existed = this.features.delete(featureId);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      if (existed) {
        console.log("[FeatureRegistry] Feature unregistered", { featureId });
      } else {
        console.warn(
          `[FeatureRegistry] Cannot unregister '${featureId}': not found`,
        );
      }
    }
  }

  clear(): void {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[FeatureRegistry] Clearing all features");
    }
    this.features.clear();
  }

  logRegisteredFeatures(): void {
    const features = this.getAll();

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[FeatureRegistry] Registered features:", {
        count: features.length,
        features: features.map((f) => ({
          id: f.id,
          type: f.type,
          outputType: f.outputType,
        })),
      });
    }
  }
}

export const featureRegistry = new FeatureRegistryImpl();
