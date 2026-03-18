/**
 * App Services Interface
 * Defines contracts for app-specific services that package uses
 * Apps implement these interfaces to provide their specific logic
 */

/**
 * Metadata types for credit cost calculation
 */
interface CreditCostMetadata {
  readonly model?: string;
  readonly duration?: number;
  readonly resolution?: string;
  readonly quality?: string;
  readonly [key: string]: string | number | boolean | undefined;
}

/**
 * Network service interface
 * Handles network availability checks
 */
export interface INetworkService {
  /**
   * Check if device is online
   */
  isOnline: () => boolean;

  /**
   * Require network connection - throws if offline
   */
  requireNetwork: () => void;
}

/**
 * Credit service interface
 * Handles credit operations (check, deduct, refund)
 */
export interface ICreditService {
  /**
   * Check if user has enough credits
   * @param cost - Required credit amount
   * @returns true if has enough credits
   */
  checkCredits: (cost: number) => Promise<boolean>;

  /**
   * Deduct credits from user balance
   * @param cost - Amount to deduct
   */
  deductCredits: (cost: number) => Promise<void>;

  /**
   * Refund credits on failure (non-user caused errors)
   * @param amount - Amount to refund
   * @param error - Original error (used to determine if refund is applicable)
   */
  refundCredits: (amount: number, error?: unknown) => Promise<void>;

  /**
   * Calculate credit cost for operation
   * @param capability - Generation capability type
   * @param metadata - Additional metadata for cost calculation
   */
  calculateCost: (
    capability: string,
    metadata?: CreditCostMetadata,
  ) => number;
}

/**
 * Paywall service interface
 * Shows paywall UI when credits insufficient
 */
export interface IPaywallService {
  /**
   * Show paywall to user
   * @param requiredCredits - Credits needed for operation
   */
  showPaywall: (requiredCredits: number) => void;
}
