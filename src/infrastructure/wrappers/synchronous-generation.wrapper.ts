/**
 * Synchronous Generation Wrapper
 * Direct API execution for text/image generation (wait for result)
 * For background job execution, use async generation instead
 */

import type { GenerationResult } from "../../domain/entities";
import { enhancePromptWithLanguage } from "./language.wrapper";
import { ModerationWrapper } from "./moderation.wrapper";

export interface SynchronousGenerationInput {
  prompt: string;
  userId?: string;
  type?: string;
  languageCode?: string;
  metadata?: Record<string, unknown>;
}

export interface SynchronousGenerationConfig<T = unknown> {
  checkCredits?: (userId: string, type: string) => Promise<boolean>;
  deductCredits?: (userId: string, type: string) => Promise<void>;
  execute: (prompt: string, metadata?: Record<string, unknown>) => Promise<T>;
  /** Model ID for metadata tracking */
  model?: string;
}

export async function generateSynchronously<T = string>(
  input: SynchronousGenerationInput,
  config: SynchronousGenerationConfig<T>,
): Promise<GenerationResult<T>> {
  // Check user ID if required
  if (config.checkCredits && !input.userId) {
    return createErrorResult("user_id_required");
  }

  // Check credits if configured
  if (config.checkCredits && input.userId) {
    const hasCredits = await config.checkCredits(
      input.userId,
      input.type || "generation",
    );
    if (!hasCredits) {
      return createErrorResult("insufficient_credits");
    }
  }

  // Check content moderation if configured
  if (ModerationWrapper.isConfigured()) {
    const moderationResult = await ModerationWrapper.checkContent(input.prompt);
    if (!moderationResult.allowed) {
      return createErrorResult(
        moderationResult.error || "content_policy_violation",
      );
    }
  }

  // Enhance prompt with language
  const enhancedPrompt = enhancePromptWithLanguage(
    input.prompt,
    input.languageCode,
  );

  // Execute generation
  try {
    const result = await config.execute(enhancedPrompt, input.metadata);

    // Deduct credits if configured
    if (config.deductCredits && input.userId) {
      await config.deductCredits(input.userId, input.type || "generation");
    }

    return createSuccessResult(result, config.model || "unknown");
  } catch (error) {
    return createErrorResult(
      error instanceof Error ? error.message : "generation_failed",
      config.model || "unknown",
    );
  }
}

function createSuccessResult<T>(data: T, model: string): GenerationResult<T> {
  return {
    success: true,
    data,
    metadata: {
      model,
      startTime: Date.now(),
      endTime: Date.now(),
      duration: 0,
    },
  };
}

function createErrorResult<T>(error: string, model: string): GenerationResult<T> {
  return {
    success: false,
    error,
    metadata: {
      model,
      startTime: Date.now(),
      endTime: Date.now(),
      duration: 0,
    },
  };
}
