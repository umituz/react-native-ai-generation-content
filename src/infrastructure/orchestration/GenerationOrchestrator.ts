/**
 * AI Generation Orchestrator
 * Single Responsibility: Orchestrate common AI generation business operations
 *
 * Generic orchestrator for 100+ apps with dependency injection
 * Handles: Network check, content moderation, credit processing, refunds
 */

import {
  contentModerationService,
  ContentPolicyViolationError,
} from "../../domains/content-moderation";
import type {
  OrchestratorConfig,
  GenerationCapability,
  GenerationMetadata,
} from "./orchestrator.types";
import {
  NetworkUnavailableError,
  InsufficientCreditsError,
  AuthenticationRequiredError,
} from "./orchestrator.errors";

declare const __DEV__: boolean;

export class GenerationOrchestrator {
  constructor(private config: OrchestratorConfig) {}

  private requireAuthenticatedUser(): string {
    const { authService } = this.config;
    const isAuthenticated = authService.isAuthenticated();
    const userId = authService.getUserId();

    if (!isAuthenticated || !userId) {
      throw new AuthenticationRequiredError();
    }

    return userId;
  }

  requireNetwork(): void {
    if (!this.config.networkService.isOnline()) {
      throw new NetworkUnavailableError();
    }
  }

  async moderateContent(
    contentType: "text" | "image",
    content: string,
    metadata?: GenerationMetadata,
  ): Promise<void> {
    const actualUserId = this.requireAuthenticatedUser();

    const moderationResult = await contentModerationService.moderate({
      userId: actualUserId,
      contentType,
      content,
      metadata,
    });

    if (!moderationResult.isAllowed) {
      throw new ContentPolicyViolationError(
        moderationResult.violations,
        moderationResult.violations[0]?.suggestion,
      );
    }
  }

  calculateCreditCost(
    capability: GenerationCapability,
    metadata?: GenerationMetadata,
  ): number {
    if (metadata?.creditCost && typeof metadata.creditCost === "number") {
      return metadata.creditCost;
    }

    return this.config.calculateCreditCost(capability, metadata);
  }

  async checkCreditsAndShowPaywall(
    capability: GenerationCapability,
    metadata?: GenerationMetadata,
  ): Promise<boolean> {
    const creditCost = this.calculateCreditCost(capability, metadata);
    const actualUserId = this.requireAuthenticatedUser();

    const currentCredits =
      await this.config.creditService.getBalance(actualUserId);

    if (currentCredits < creditCost) {
      this.config.paywallService.show(creditCost);
      return false;
    }

    return true;
  }

  async processCredits(
    capability: GenerationCapability,
    metadata?: GenerationMetadata,
  ): Promise<number> {
    const actualUserId = this.requireAuthenticatedUser();
    const creditCost = this.calculateCreditCost(capability, metadata);

    const currentCredits =
      await this.config.creditService.getBalance(actualUserId);

    const success = await this.config.creditService.deduct(
      actualUserId,
      creditCost,
    );

    if (!success) {
      this.config.paywallService.show(creditCost);
      throw new InsufficientCreditsError(creditCost, currentCredits, capability);
    }

    return creditCost;
  }

  async refundCreditsIfApplicable(
    amount: number,
    error: unknown,
  ): Promise<void> {
    if (amount <= 0) return;

    const isNonRefundable =
      error instanceof ContentPolicyViolationError ||
      error instanceof InsufficientCreditsError ||
      (error instanceof Error &&
        (error.message.toLowerCase().includes("invalid input") ||
          error.message.toLowerCase().includes("cancelled") ||
          error.message.toLowerCase().includes("user cancel")));

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[GenerationOrchestrator] Refund check:", {
        amount,
        isNonRefundable,
        errorType: error instanceof Error ? error.name : typeof error,
        errorMessage: error instanceof Error ? error.message : String(error),
      });
    }

    if (!isNonRefundable) {
      try {
        const actualUserId = this.requireAuthenticatedUser();

        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[GenerationOrchestrator] Refunding credits:", {
            userId: actualUserId,
            amount,
          });
        }

        await this.config.creditService.add(actualUserId, amount);
      } catch (refundErr) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error("[GenerationOrchestrator] Refund failed:", refundErr);
        }
      }
    }
  }
}
