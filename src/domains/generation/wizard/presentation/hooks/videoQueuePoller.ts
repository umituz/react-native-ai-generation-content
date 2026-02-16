import { providerRegistry } from "../../../../../infrastructure/services/provider-registry.service";
import { extractResultUrl, type GenerationUrls } from "./generation-result.utils";
import { QUEUE_STATUS } from "../../../../../domain/constants/queue-status.constants";

declare const __DEV__: boolean;

/** Max consecutive transient errors before aborting */
const MAX_CONSECUTIVE_ERRORS = 5;

/**
 * Extract meaningful error message from various error formats.
 * Fal AI client throws ValidationError with empty .message but details in .body/.detail
 */
function extractErrorMessage(err: unknown): string {
  if (!err) return "Generation failed";

  // Standard Error with message
  if (err instanceof Error && err.message && err.message.length > 0) {
    return err.message;
  }

  // Fal AI ValidationError - has .body.detail array
  const errObj = err as Record<string, unknown>;
  if (errObj.body && typeof errObj.body === "object") {
    const body = errObj.body as Record<string, unknown>;
    if (Array.isArray(body.detail) && body.detail.length > 0) {
      const first = body.detail[0] as { msg?: string; type?: string } | undefined;
      if (first?.msg) return first.msg;
    }
  }

  // Direct .detail array on error object
  if (Array.isArray(errObj.detail) && errObj.detail.length > 0) {
    const first = errObj.detail[0] as { msg?: string } | undefined;
    if (first?.msg) return first.msg;
  }

  // Fallback to string conversion
  const str = String(err);
  return str.length > 0 && str !== "[object Object]" ? str : "Generation failed";
}

interface PollParams {
  requestId: string;
  model: string;
  isPollingRef: React.MutableRefObject<boolean>;
  pollingRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>;
  consecutiveErrorsRef: React.MutableRefObject<number>;
  onComplete: (urls: GenerationUrls) => Promise<void>;
  onError: (error: string) => Promise<void>;
}

export const pollQueueStatus = async (params: PollParams): Promise<void> => {
  const { requestId, model, isPollingRef, pollingRef, consecutiveErrorsRef, onComplete, onError } = params;

  if (isPollingRef.current) {
    return;
  }
  isPollingRef.current = true;

  const provider = providerRegistry.getActiveProvider();
  if (!provider) {
    isPollingRef.current = false;
    return;
  }

  try {
    const status = await provider.getJobStatus(model, requestId);
    if (__DEV__) console.log("[VideoQueueGeneration] Poll:", status.status);

    // Reset consecutive errors on successful poll
    consecutiveErrorsRef.current = 0;

    if (status.status === QUEUE_STATUS.COMPLETED || status.status === QUEUE_STATUS.FAILED) {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }

      if (status.status === QUEUE_STATUS.COMPLETED) {
        try {
          const result = await provider.getJobResult(model, requestId);
          if (__DEV__) {
            console.log("[VideoQueuePoller] 📦 Raw result from provider:", JSON.stringify(result, null, 2));
          }
          const urls = extractResultUrl(result);
          if (__DEV__) {
            console.log("[VideoQueuePoller] 🎬 Extracted URLs:", urls);
          }
          await onComplete(urls);
        } catch (resultErr) {
          const errorMessage = extractErrorMessage(resultErr);
          if (__DEV__) {
            console.error("[VideoQueueGeneration] ❌ Result error:", errorMessage);
            console.error("[VideoQueueGeneration] ❌ Full error:", resultErr);
          }
          await onError(errorMessage);
        }
      } else {
        await onError("Generation failed");
      }
    }
  } catch (err) {
    consecutiveErrorsRef.current += 1;
    const errorMessage = err instanceof Error ? err.message : "Generation failed";

    if (consecutiveErrorsRef.current >= MAX_CONSECUTIVE_ERRORS) {
      // Too many consecutive errors - abort
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
      if (__DEV__) console.error("[VideoQueueGeneration] Max consecutive errors reached, aborting:", errorMessage);
      await onError(errorMessage);
    } else {
      // Transient error - continue polling
      if (__DEV__) {
        console.warn(
          `[VideoQueueGeneration] Transient poll error (${consecutiveErrorsRef.current}/${MAX_CONSECUTIVE_ERRORS}):`,
          errorMessage,
        );
      }
    }
  } finally {
    isPollingRef.current = false;
  }
};
