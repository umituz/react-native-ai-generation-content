import { providerRegistry } from "../../../../../infrastructure/services/provider-registry.service";
import { extractResultUrl, type GenerationUrls } from "./generation-result.utils";
import { QUEUE_STATUS } from "../../../../../domain/constants/queue-status.constants";

declare const __DEV__: boolean;

interface PollParams {
  requestId: string;
  model: string;
  isPollingRef: React.MutableRefObject<boolean>;
  pollingRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>;
  onComplete: (urls: GenerationUrls) => Promise<void>;
  onError: (error: string) => Promise<void>;
}

export const pollQueueStatus = async (params: PollParams): Promise<void> => {
  const { requestId, model, isPollingRef, pollingRef, onComplete, onError } = params;

  if (isPollingRef.current) return;

  const provider = providerRegistry.getActiveProvider();
  if (!provider) return;

  isPollingRef.current = true;
  try {
    const status = await provider.getJobStatus(model, requestId);
    if (__DEV__) console.log("[VideoQueueGeneration] Poll:", status.status);

    if (status.status === QUEUE_STATUS.COMPLETED || status.status === QUEUE_STATUS.FAILED) {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }

      if (status.status === QUEUE_STATUS.COMPLETED) {
        try {
          const result = await provider.getJobResult(model, requestId);
          await onComplete(extractResultUrl(result));
        } catch (resultErr) {
          const errorMessage = resultErr instanceof Error ? resultErr.message : "Generation failed";
          if (__DEV__) console.error("[VideoQueueGeneration] Result error:", errorMessage);
          await onError(errorMessage);
        }
      } else {
        await onError("Generation failed");
      }
    }
  } catch (err) {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    const errorMessage = err instanceof Error ? err.message : "Generation failed";
    if (__DEV__) console.error("[VideoQueueGeneration] Poll error:", errorMessage);
    await onError(errorMessage);
  } finally {
    isPollingRef.current = false;
  }
};
