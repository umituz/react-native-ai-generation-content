/**
 * Simple Generation Wrapper
 * High-level API for simple text/image generation without background jobs
 */

import type { GenerationResult } from "../../domain/entities";
import { enhancePromptWithLanguage } from "./language.wrapper";
import { ModerationWrapper } from "./moderation.wrapper";

export interface SimpleGenerationInput {
  prompt: string;
  userId?: string;
  type?: string;
  languageCode?: string;
  metadata?: Record<string, any>;
}

export interface SimpleGenerationConfig<T = any> {
  checkCredits?: (userId: string, type: string) => Promise<boolean>;
  deductCredits?: (userId: string, type: string) => Promise<void>;
  execute: (prompt: string, metadata?: Record<string, any>) => Promise<T>;
}

export async function generateWithSimpleWrapper<T = string>(
  input: SimpleGenerationInput,
  config: SimpleGenerationConfig<T>,
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

    return createSuccessResult(result);
  } catch (error) {
    return createErrorResult(
      error instanceof Error ? error.message : "generation_failed",
    );
  }
}

function createSuccessResult<T>(data: T): GenerationResult<T> {
  return {
    success: true,
    data,
    metadata: {
      model: "default",
      startTime: Date.now(),
      endTime: Date.now(),
      duration: 0,
    },
  };
}

function createErrorResult<T>(error: string): GenerationResult<T> {
  return {
    success: false,
    error,
    metadata: {
      model: "default",
      startTime: Date.now(),
      endTime: Date.now(),
      duration: 0,
    },
  };
}
