/**
 * HTTP Fetch Handler
 * Infrastructure: Orchestrates request execution with error handling
 */

import { withErrorHandling, getErrorMessage, retryWithBackoff, isNetworkError } from "../utils/error-handling.util";
import { env } from "../config/env.config";
import type { RequestOptions, ApiResponse } from "./api-client.types";
import { executeRequest, isSuccessResponse, extractErrorMessage } from "./http-request-executor";
import { parseResponse, createSuccessResponse, createErrorResponse } from "./http-response-parser";

/**
 * Fetches data with timeout, retry, and error handling
 */
export async function fetchWithTimeout<T>(
  url: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { retries = 0 } = options;

  const operation = async (): Promise<T> => {
    const response = await executeRequest(url, options);

    if (!isSuccessResponse(response)) {
      const errorMessage = await extractErrorMessage(response);
      throw new Error(errorMessage);
    }

    return parseResponse<T>(response);
  };

  const result = await withErrorHandling(
    async () => {
      if (retries > 0) {
        return retryWithBackoff(operation, {
          maxRetries: retries,
          delayMs: env.apiRetryDelayMs,
          shouldRetry: (error) => isNetworkError(error),
        });
      }
      return operation();
    },
    (error) => {
      console.error("[API Client] Request failed:", error);
    }
  );

  if (result.error) {
    return createErrorResponse(getErrorMessage(result.error));
  }

  return createSuccessResponse(result.data ?? null as T);
}
