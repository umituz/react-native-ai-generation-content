/**
 * Input Sanitization Utilities
 * Sanitizes user input to prevent XSS and injection attacks
 */

/**
 * Sanitizes user input to prevent XSS and injection attacks
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== "string") {
    return "";
  }

  return input
    .trim()
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/data:/gi, "")
    .replace(/vbscript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/--/g, "")
    .replace(/;\s*drop\s+/gi, "")
    .replace(/['"\\]/g, "")
    .slice(0, 10000);
}

/**
 * Sanitizes object by removing dangerous properties
 */
export function sanitizeObject<T extends Record<string, unknown>>(input: T): T {
  if (!input || typeof input !== "object") {
    return input;
  }

  const sanitized = { ...input } as T;
  const dangerousKeys = ["__proto__", "constructor", "prototype"];

  for (const key of dangerousKeys) {
    delete (sanitized as Record<string, unknown>)[key];
  }

  return sanitized;
}
