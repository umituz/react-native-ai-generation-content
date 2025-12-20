/**
 * Middleware Types
 * Generic middleware pattern for generation workflow
 */

import type { GenerationRequest, GenerationResult } from "./generation.types";

/**
 * Context passed to middleware hooks
 */
export interface MiddlewareContext {
  request: GenerationRequest;
  userId?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Result context passed to afterGenerate hook
 */
export interface MiddlewareResultContext<T> extends MiddlewareContext {
  result: GenerationResult<T>;
}

/**
 * Middleware hook executed before generation
 * Can throw error to prevent generation
 */
export type BeforeGenerateHook = (
  context: MiddlewareContext,
) => Promise<void> | void;

/**
 * Middleware hook executed after generation (success or failure)
 * Cannot modify result, used for logging/tracking
 */
export type AfterGenerateHook<T = unknown> = (
  context: MiddlewareResultContext<T>,
) => Promise<void> | void;

/**
 * Complete middleware configuration
 */
export interface GenerationMiddleware {
  /** Hook executed before generation starts */
  beforeGenerate?: BeforeGenerateHook;
  /** Hook executed after generation completes (success or failure) */
  afterGenerate?: AfterGenerateHook;
}

/**
 * Middleware chain configuration
 */
export interface MiddlewareChain {
  /** Array of middleware to execute in order */
  middleware: GenerationMiddleware[];
}
