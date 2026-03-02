/**
 * Provider Lifecycle Interface
 * Single Responsibility: Provider initialization and lifecycle management
 */

import type { AIProviderConfig } from "./ai-provider.interface";

/** Log entry from generation session */
export interface ProviderLogEntry {
  readonly timestamp: number;
  readonly elapsed: number;
  readonly level: 'info' | 'warn' | 'error';
  readonly tag: string;
  readonly message: string;
  readonly data?: Record<string, unknown>;
}

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

  /**
   * Get log entries from a specific generation session.
   * If sessionId omitted, uses the most recent session (not safe for concurrent use).
   */
  getSessionLogs?(sessionId?: string): ProviderLogEntry[];

  /**
   * End log session and return all entries. Clears the buffer.
   * If sessionId omitted, uses the most recent session (not safe for concurrent use).
   */
  endLogSession?(sessionId?: string): ProviderLogEntry[];
}
