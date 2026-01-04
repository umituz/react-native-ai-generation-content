/**
 * Provider Registry Service
 * Manages AI provider registration and selection
 */

import type { IAIProvider } from "../../domain/interfaces";

declare const __DEV__: boolean;

class ProviderRegistry {
  private providers: Map<string, IAIProvider> = new Map();
  private activeProviderId: string | null = null;

  register(provider: IAIProvider): void {
    if (this.providers.has(provider.providerId)) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
         
        console.warn(
          `[ProviderRegistry] Provider ${provider.providerId} already registered`,
        );
      }
      return;
    }

    this.providers.set(provider.providerId, provider);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
      console.log(
        `[ProviderRegistry] Registered provider: ${provider.providerId}`,
      );
    }
  }

  unregister(providerId: string): void {
    if (this.activeProviderId === providerId) {
      this.activeProviderId = null;
    }
    this.providers.delete(providerId);
  }

  setActiveProvider(providerId: string): void {
    if (!this.providers.has(providerId)) {
      throw new Error(`Provider ${providerId} is not registered`);
    }
    this.activeProviderId = providerId;

    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
      console.log(`[ProviderRegistry] Active provider set to: ${providerId}`);
    }
  }

  getActiveProvider(): IAIProvider | null {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
      console.log("[ProviderRegistry] getActiveProvider() called", {
        activeProviderId: this.activeProviderId,
        registeredProviders: Array.from(this.providers.keys()),
      });
    }

    if (!this.activeProviderId) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
         
        console.warn("[ProviderRegistry] No active provider set!");
      }
      return null;
    }

    const provider = this.providers.get(this.activeProviderId) ?? null;

    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
      console.log("[ProviderRegistry] getActiveProvider() returning", {
        providerId: provider?.providerId,
        isInitialized: provider?.isInitialized(),
      });
    }

    return provider;
  }

  getProvider(providerId: string): IAIProvider | null {
    return this.providers.get(providerId) ?? null;
  }

  getActiveProviderId(): string | null {
    return this.activeProviderId;
  }

  listProviders(): Array<{ id: string; name: string; initialized: boolean }> {
    return Array.from(this.providers.values()).map((provider) => ({
      id: provider.providerId,
      name: provider.providerName,
      initialized: provider.isInitialized(),
    }));
  }

  hasProvider(providerId: string): boolean {
    return this.providers.has(providerId);
  }

  clear(): void {
    this.providers.clear();
    this.activeProviderId = null;
  }
}

export const providerRegistry = new ProviderRegistry();
