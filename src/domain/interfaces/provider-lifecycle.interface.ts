/**
 * Provider Lifecycle Interface
 * Single Responsibility: Provider initialization and lifecycle management
 */

import type { AIProviderConfig } from "./ai-provider.interface";

export interface IAIProviderLifecycle {
  /**
   * Initialize provider with configuration
   */
  initialize(config: AIProviderConfig): void;

  /**
   * Check if provider is initialized and ready
   */
  isInitialized(): boolean;

  /**
   * Reset provider state to uninitialized
   */
  reset(): void;
}
