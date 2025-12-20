/**
 * History Tracking Middleware Factory
 * Generic history saving with app-provided config
 */

import type { GenerationMiddleware } from "../../domain/entities";

export interface HistoryEntry {
  type: string;
  prompt: string;
  result: string | null;
  success: boolean;
  error?: string;
  userId: string;
  metadata?: Record<string, unknown>;
  timestamp: unknown;
}

export interface HistoryConfig {
  /**
   * Save generation to history
   * App provides storage implementation (Firestore, API, etc.)
   */
  saveToHistory: (entry: HistoryEntry) => Promise<void>;

  /**
   * Create timestamp for history entry
   * App-specific (serverTimestamp for Firestore, new Date() for API, etc.)
   */
  createTimestamp: () => unknown;
}

/**
 * Create history tracking middleware
 * Saves generation history after completion
 */
export function createHistoryTrackingMiddleware(
  config: HistoryConfig,
): GenerationMiddleware {
  return {
    async afterGenerate(context) {
      if (!context.userId) {
        return;
      }

      try {
        const operationType =
          (context.request.input?.type as string) || "default";
        const prompt =
          (context.request.input?.prompt as string) || "";

        const entry: HistoryEntry = {
          type: operationType,
          prompt,
          result: context.result.success ? String(context.result.data) : null,
          success: context.result.success,
          error: context.result.error,
          userId: context.userId,
          metadata: context.result.metadata as Record<string, unknown>,
          timestamp: config.createTimestamp(),
        };

        await config.saveToHistory(entry);
      } catch {
        // Silent fail
      }
    },
  };
}
