/**
 * Credit Check Middleware Factory
 * Generic credit checking with app-provided config
 */

import type { GenerationMiddleware } from "../../domain/entities";

export interface CreditCheckConfig {
  /**
   * Get credit type from operation type
   * App-specific logic
   */
  getCreditType: (operationType: string) => string;

  /**
   * Check if user has available credits
   * App provides implementation
   */
  checkCredits: (
    userId: string | undefined,
    operationType: string,
  ) => Promise<{
    success: boolean;
    error?: string;
    creditType?: string;
  }>;

  /**
   * Deduct credits after successful generation
   * App provides implementation
   */
  deductCredits: (
    userId: string | undefined,
    creditType: string,
  ) => Promise<void>;
}

/**
 * Create credit check middleware
 * Checks credits before generation, deducts after success
 */
export function createCreditCheckMiddleware(
  config: CreditCheckConfig,
): GenerationMiddleware {
  return {
    async beforeGenerate(context) {
      const operationType =
        (context.request.input?.type as string) || "default";

      const result = await config.checkCredits(
        context.userId,
        operationType,
      );

      if (!result.success) {
        throw new Error(result.error || "credits_exhausted");
      }

      context.metadata = {
        ...context.metadata,
        creditType: result.creditType || config.getCreditType(operationType),
      };
    },

    async afterGenerate(context) {
      if (context.result.success && context.metadata?.creditType) {
        await config.deductCredits(
          context.userId,
          context.metadata.creditType as string,
        );
      }
    },
  };
}
