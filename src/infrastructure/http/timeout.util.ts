/**
 * Timeout Controller Utility
 * Creates AbortController instances with timeout support
 */

/**
 * Creates an AbortController with timeout
 * @param timeout - Timeout in milliseconds
 * @returns AbortController instance or undefined if no timeout specified
 */
export function createTimeoutController(
  timeout?: number
): AbortController | undefined {
  if (!timeout) {
    return undefined;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  controller.signal.addEventListener('abort', () => {
    clearTimeout(timeoutId);
  }, { once: true });

  return controller;
}
