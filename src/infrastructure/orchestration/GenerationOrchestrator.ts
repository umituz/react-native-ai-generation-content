/**
 * AI Generation Orchestrator
 * Single Responsibility: Orchestrate common AI generation business operations
 * 
 * Generic orchestrator for 100+ apps with dependency injection
 * Handles: Network check, content moderation, credit processing, refunds
 */

import { contentModerationService, ContentPolicyViolationError } from '../../domains/content-moderation';

declare const __DEV__: boolean;

export interface CreditService {
  getBalance(userId: string): Promise<number>;
  deduct(userId: string, amount: number): Promise<boolean>;
  add(userId: string, amount: number): Promise<void>;
}

export interface PaywallService {
  show(requiredCredits: number): void;
}

export interface NetworkService {
  isOnline(): boolean;
}

export interface AuthService {
  getUserId(): string | null;
  isAuthenticated(): boolean;
}

export interface GenerationMetadata {
  creditCost?: number;
  numImages?: number;
  duration?: number;
  isPremium?: boolean;
  [key: string]: unknown;
}

export type GenerationCapability =
  | 'text-to-image'
  | 'text-to-video'
  | 'image-to-video'
  | 'text-to-voice';

export class NetworkUnavailableError extends Error {
  constructor() {
    super('No internet connection. Please check your network and try again.');
    this.name = 'NetworkUnavailableError';
  }
}

export class InsufficientCreditsError extends Error {
  constructor(
    public required: number,
    public current: number,
    public capability: string,
  ) {
    super(
      `Insufficient credits. Required: ${required}, Current: ${current}`,
    );
    this.name = 'InsufficientCreditsError';
  }
}

export class AuthenticationRequiredError extends Error {
  constructor() {
    super('User not authenticated. This operation requires authentication.');
    this.name = 'AuthenticationRequiredError';
  }
}

export interface OrchestratorConfig {
  creditService: CreditService;
  paywallService: PaywallService;
  networkService: NetworkService;
  authService: AuthService;
  calculateCreditCost: (
    capability: GenerationCapability,
    metadata?: GenerationMetadata,
  ) => number;
}

export class GenerationOrchestrator {
  constructor(private config: OrchestratorConfig) {}

  /**
   * Require authenticated user - throws if not authenticated
   */
  private requireAuthenticatedUser(): string {
    const { authService } = this.config;
    const isAuthenticated = authService.isAuthenticated();
    const userId = authService.getUserId();

    if (!isAuthenticated || !userId) {
      throw new AuthenticationRequiredError();
    }

    return userId;
  }

  /**
   * Check network availability - throws if offline
   */
  requireNetwork(): void {
    if (!this.config.networkService.isOnline()) {
      throw new NetworkUnavailableError();
    }
  }

  /**
   * Moderate content before generation
   */
  async moderateContent(
    _userId: string,
    contentType: 'text' | 'image',
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

  /**
   * Calculate credit cost for generation
   */
  calculateCreditCost(
    capability: GenerationCapability,
    metadata?: GenerationMetadata,
  ): number {
    if (metadata?.creditCost && typeof metadata.creditCost === 'number') {
      return metadata.creditCost;
    }

    return this.config.calculateCreditCost(capability, metadata);
  }

  /**
   * Check credits BEFORE generation starts
   * Shows paywall if insufficient
   * @returns true if can proceed, false if paywall was shown
   */
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

  /**
   * Process credits (deduct) for generation
   * @returns deducted amount
   */
  async processCredits(
    _userId: string,
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
      throw new InsufficientCreditsError(
        creditCost,
        currentCredits,
        capability,
      );
    }

    return creditCost;
  }

  /**
   * Refund credits after generation failure
   * Default behavior: REFUND all errors except user-caused ones
   */
  async refundCreditsIfApplicable(
    _userId: string,
    amount: number,
    error: unknown,
  ): Promise<void> {
    if (amount <= 0) return;

    // Non-refundable errors: User's fault or policy violations
    const isNonRefundable =
      error instanceof ContentPolicyViolationError ||
      error instanceof InsufficientCreditsError ||
      (error instanceof Error &&
        (error.message.toLowerCase().includes('invalid input') ||
          error.message.toLowerCase().includes('cancelled') ||
          error.message.toLowerCase().includes('user cancel')));

    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('[GenerationOrchestrator] 🔄 Refund check:', {
        amount,
        isNonRefundable,
        errorType: error instanceof Error ? error.name : typeof error,
        errorMessage: error instanceof Error ? error.message : String(error),
      });
    }

    // Default: REFUND all errors except user-caused ones
    if (!isNonRefundable) {
      const actualUserId = this.requireAuthenticatedUser();

      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('[GenerationOrchestrator] ✅ Refunding credits:', {
          userId: actualUserId,
          amount,
        });
      }

      await this.config.creditService.add(actualUserId, amount);
    }
  }
}
