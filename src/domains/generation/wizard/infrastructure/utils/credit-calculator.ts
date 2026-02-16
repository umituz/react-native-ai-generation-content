/**
 * Generic Credit Calculator
 * Package is GENERIC - knows nothing about specific pricing
 * All costs are determined by the APP
 *
 * This package ONLY converts USD cost to credits using app-provided formula
 */

/**
 * Credit pricing configuration
 * These are the ONLY constants the package knows about
 */
const CREDIT_CONFIG = {
  CUSTOMER_PRICE_PER_CREDIT: 0.10,
  MARKUP_MULTIPLIER: 3.5,
} as const;

/**
 * Convert USD cost to credits
 * This is the ONLY calculation the package does
 * Formula: credits = ceil((cost * markup) / credit_price)
 *
 * @param costInUSD - The cost in USD (provided by app)
 * @throws {Error} If cost is invalid
 */
export function convertCostToCredits(costInUSD: number): number {
  if (!costInUSD || typeof costInUSD !== "number" || costInUSD < 0) {
    throw new Error(
      `[convertCostToCredits] Invalid cost: ${costInUSD}. Must be a non-negative number.`
    );
  }

  const { CUSTOMER_PRICE_PER_CREDIT, MARKUP_MULTIPLIER } = CREDIT_CONFIG;
  const credits = (costInUSD * MARKUP_MULTIPLIER) / CUSTOMER_PRICE_PER_CREDIT;

  return Math.ceil(credits);
}

/**
 * Get credit configuration
 * Exposes config for app to use if needed
 */
export function getCreditConfig() {
  return {
    customerPricePerCredit: CREDIT_CONFIG.CUSTOMER_PRICE_PER_CREDIT,
    markupMultiplier: CREDIT_CONFIG.MARKUP_MULTIPLIER,
  };
}
