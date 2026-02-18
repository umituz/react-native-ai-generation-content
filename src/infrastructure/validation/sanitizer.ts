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

  let sanitized = input.trim();

  // Remove dangerous HTML tags and protocols
  sanitized = sanitized
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/data:(?!image\/)/gi, "") // Allow data:image/ for valid use cases
    .replace(/vbscript:/gi, "")
    .replace(/file:/gi, "")
    .replace(/on\w+\s*=/gi, "");

  // Remove SQL injection patterns
  sanitized = sanitized
    .replace(/--/g, "")
    .replace(/;\s*drop\s+/gi, "")
    .replace(/;\s*delete\s+/gi, "")
    .replace(/;\s*insert\s+/gi, "")
    .replace(/;\s*update\s+/gi, "");

  // Remove Unicode escape sequences that could bypass filters
  sanitized = sanitized.replace(/\\u[\da-fA-F]{4}/g, "");

  // Limit length to prevent DoS
  return sanitized.slice(0, 10000);
}

