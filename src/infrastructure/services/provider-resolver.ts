/**
 * Provider Resolver
 * Resolves the correct AI provider based on providerId.
 * Falls back to the active provider when no providerId is specified.
 */

import type { IAIProvider } from "../../domain/interfaces";
import { providerRegistry } from "./provider-registry.service";

/**
 * Resolve an AI provider by ID, falling back to the active provider.
 *
 * @param providerId - Explicit provider ID (e.g. "fal", "pruna"). When given,
 *   the matching registered provider is returned. When omitted or when the
 *   specified provider is not available, the registry's active provider is used.
 * @throws Error if no usable provider is found.
 */
export function resolveProvider(providerId?: string): IAIProvider {
  // 1. Try explicit provider
  if (providerId) {
    const provider = providerRegistry.getProvider(providerId);
    if (provider?.isInitialized()) {
      return provider;
    }

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.warn(
        `[ProviderResolver] Provider "${providerId}" not available, falling back to active provider`,
      );
    }
  }

  // 2. Fallback to active provider
  const active = providerRegistry.getActiveProvider();
  if (active?.isInitialized()) {
    return active;
  }

  throw new Error(
    providerId
      ? `AI provider "${providerId}" is not registered or initialized, and no active fallback is available`
      : "No AI provider is initialized. Call initializeProvider() first.",
  );
}
