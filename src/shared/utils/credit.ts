/**
 * Credit Calculation Utilities
 * Provides consistent credit calculation operations
 */

/**
 * Validates if a value is a valid credit amount
 * @param credits - Credit value to validate
 * @returns True if valid (non-negative number)
 */
export function isValidCreditAmount(credits: number): boolean {
  return typeof credits === "number" && !isNaN(credits) && credits >= 0 && isFinite(credits);
}

/**
 * Calculates total credits from multiple items
 * @param items - Array of credit costs
 * @returns Total credits
 */
export function sumCredits(...items: number[]): number {
  return items.reduce((sum, credits) => {
    if (!isValidCreditAmount(credits)) return sum;
    return sum + credits;
  }, 0);
}

/**
 * Calculates credits per unit from total cost
 * @param totalCost - Total cost in base currency
 * @param units - Number of units
 * @returns Cost per unit
 */
export function calculateCostPerUnit(totalCost: number, units: number): number {
  if (units <= 0) return 0;
  return totalCost / units;
}

/**
 * Calculates total cost from per-unit cost
 * @param costPerUnit - Cost per single unit
 * @param units - Number of units
 * @returns Total cost
 */
export function calculateTotalCost(costPerUnit: number, units: number): number {
  if (units <= 0) return 0;
  return costPerUnit * units;
}

/**
 * Formats credits for display
 * @param credits - Credit amount
 * @returns Formatted string
 */
export function formatCredits(credits: number): string {
  if (!isValidCreditAmount(credits)) return "0";
  return Math.floor(credits).toString();
}

/**
 * Parses credits from a string value
 * @param value - String value to parse
 * @param defaultValue - Default value if parsing fails (default: 0)
 * @returns Parsed credits
 */
export function parseCredits(value: string, defaultValue: number = 0): number {
  const parsed = parseFloat(value);
  if (isNaN(parsed)) return defaultValue;
  return Math.max(0, parsed);
}
