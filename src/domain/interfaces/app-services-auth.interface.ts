/**
 * App Services - Auth Interface
 * Authentication service interface
 */

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
