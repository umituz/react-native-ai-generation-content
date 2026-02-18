/**
 * Creation Error Handler Utility
 * Single Responsibility: Centralized error logging
 */


export function logOperationError(
  operation: string,
  context: { userId: string; creationId: string },
  error: unknown
): void {
  if (!__DEV__) return;

  console.error(`[Creation${operation}] Failed:`, {
    ...context,
    error: error instanceof Error ? error.message : String(error),
    code: (error as { code?: string })?.code,
  });
}

export function logOperationSuccess(
  operation: string,
  context: { userId: string; creationId: string }
): void {
  if (!__DEV__) return;
  console.log(`[Creation${operation}] Success:`, context);
}

export function logInvalidRef(
  operation: string,
  context: { userId: string; creationId: string }
): void {
  if (!__DEV__) return;
  console.error(`[Creation${operation}] Invalid document reference:`, context);
}
