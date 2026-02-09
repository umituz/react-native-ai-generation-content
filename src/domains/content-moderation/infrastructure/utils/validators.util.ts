/**
 * Content Moderation Validators
 * Reusable validation functions for content moderation
 */

/**
 * Validates that content is not empty and is a string
 */
export function validateContentPresence(content: unknown): boolean {
  return Boolean(content && typeof content === "string");
}

/**
 * Validates content length against maximum
 */
export function validateContentLength(content: string, maxLength: number): boolean {
  return content.length <= maxLength;
}

/**
 * Validates URI protocol
 */
export function validateUriProtocol(uri: string, allowedProtocols: readonly string[]): boolean {
  const lowerUri = uri.toLowerCase();
  return allowedProtocols.some((protocol) => lowerUri.startsWith(protocol));
}

/**
 * Validates URI
 */
export function validateUri(
  uri: string,
  options: {
    maxLength?: number;
    allowedProtocols?: readonly string[];
  } = {}
): { isValid: boolean; error?: { type: string; message: string } } {
  if (!validateContentPresence(uri)) {
    return { isValid: false, error: { type: "empty-uri", message: "empty URI" } };
  }

  if (options.maxLength && !validateContentLength(uri, options.maxLength)) {
    return { isValid: false, error: { type: "uri-too-long", message: "URI too long" } };
  }

  if (options.allowedProtocols && !validateUriProtocol(uri, options.allowedProtocols)) {
    return { isValid: false, error: { type: "invalid-protocol", message: "invalid protocol" } };
  }

  return { isValid: true };
}
