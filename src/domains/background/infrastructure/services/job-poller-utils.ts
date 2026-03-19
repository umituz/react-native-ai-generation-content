/**
 * Job Poller Service - Utility Functions
 */

/**
 * Wrap a promise with abort signal support
 * Rejects if signal is aborted before promise resolves
 */
export function withAbortSignal<T>(
  promise: Promise<T>,
  signal: AbortSignal | undefined,
  timeoutMs?: number,
): Promise<T> {
  if (!signal && !timeoutMs) {
    return promise;
  }

  return new Promise<T>((resolve, reject) => {
    // Handle abort signal
    if (signal?.aborted) {
      reject(new Error("Operation aborted"));
      return;
    }

    let isResolved = false;
    const abortHandler = () => {
      if (isResolved) return;
      isResolved = true;
      if (timeoutId) clearTimeout(timeoutId);
      reject(new Error("Operation aborted"));
    };

    signal?.addEventListener("abort", abortHandler, { once: true });

    // Handle timeout
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (timeoutMs) {
      timeoutId = setTimeout(() => {
        if (isResolved) return;
        isResolved = true;
        signal?.removeEventListener("abort", abortHandler);
        reject(new Error(`Operation timeout after ${timeoutMs}ms`));
      }, timeoutMs);
    }

    promise
      .then((result) => {
        if (isResolved) return;
        isResolved = true;
        signal?.removeEventListener("abort", abortHandler);
        if (timeoutId) clearTimeout(timeoutId);
        resolve(result);
      })
      .catch((error) => {
        if (isResolved) return;
        isResolved = true;
        signal?.removeEventListener("abort", abortHandler);
        if (timeoutId) clearTimeout(timeoutId);
        reject(error);
      });
  });
}

/**
 * Validate request ID
 */
export function validateRequestId(requestId: string | undefined): { valid: boolean; error?: string } {
  if (!requestId || typeof requestId !== "string" || requestId.trim() === "") {
    return {
      valid: false,
      error: "Invalid requestId provided",
    };
  }
  return { valid: true };
}

/**
 * Validate model
 */
export function validateModel(model: string | undefined): { valid: boolean; error?: string } {
  if (!model || typeof model !== "string" || model.trim() === "") {
    return {
      valid: false,
      error: "Invalid model provided",
    };
  }
  return { valid: true };
}

/**
 * Log transient error during polling
 */
export function logTransientError(
  attempt: number,
  requestId: string,
  model: string,
  consecutiveErrors: number,
  error: unknown
): void {
  if (__DEV__) {
    console.warn("[JobPoller] Transient error during polling", {
      attempt: attempt + 1,
      requestId,
      model,
      consecutiveErrors,
      error: error instanceof Error ? error.message : String(error),
      code: (error as { code?: string })?.code,
    });
  }
}

/**
 * Log max consecutive errors reached
 */
export function logMaxConsecutiveErrors(
  maxConsecutiveErrors: number,
  requestId: string,
  model: string
): void {
  if (__DEV__) {
    console.error("[JobPoller] Max consecutive errors reached", {
      maxConsecutiveErrors,
      requestId,
      model,
    });
  }
}
