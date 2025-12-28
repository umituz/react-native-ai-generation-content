/**
 * App Services Interface
 * Defines contracts for app-specific services that package uses
 * Apps implement these interfaces to provide their specific logic
 */

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
    metadata?: Record<string, unknown>,
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

/**
 * Auth service interface
 * Handles user authentication
 */
export interface IAuthService {
  /**
   * Get current user ID
   * @returns User ID or null if not authenticated
   */
  getUserId: () => string | null;

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => boolean;

  /**
   * Require authenticated user - throws if not authenticated
   * @returns User ID
   */
  requireAuth: () => string;
}

/**
 * Analytics service interface (optional)
 * Tracks events for analytics
 */
export interface IAnalyticsService {
  /**
   * Track an event
   * @param event - Event name
   * @param data - Event data
   */
  track: (event: string, data: Record<string, unknown>) => void;
}

/**
 * Combined app services interface
 * Apps implement this to provide all required services
 */
export interface IAppServices {
  readonly network: INetworkService;
  readonly credits: ICreditService;
  readonly paywall: IPaywallService;
  readonly auth: IAuthService;
  readonly analytics?: IAnalyticsService;
}

/**
 * Partial app services for optional configuration
 */
export type PartialAppServices = Partial<IAppServices>;
