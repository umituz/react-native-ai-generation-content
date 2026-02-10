/**
 * HTTP Client Utilities
 * Core HTTP request handling with error handling and retry logic
 */

import { withErrorHandling, getErrorMessage, retryWithBackoff, isNetworkError } from "../utils/error-handling.util";
import { env } from "../config/env.config";
import type { RequestOptions, ApiResponse } from "./api-client.types";
import { createTimeoutController } from "./timeout.util";

/**
 * Makes an HTTP request with error handling and retry logic
 * @param url - Request URL
 * @param options - Request options
 * @returns API response with data or error
 */
export async function fetchWithTimeout<T>(
  url: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    timeout = env.apiDefaultTimeoutMs,
    retries = 0,
    headers = {},
    ...fetchOptions
  } = options;

  const controller = createTimeoutController(timeout);

  const operation = async (): Promise<T> => {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      signal: controller?.signal,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return response.json();
    }

    return response.text() as T;
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
    return {
      data: null,
      error: getErrorMessage(result.error),
      status: 0,
      headers: new Headers(),
    };
  }

  return {
    data: result.data ?? null,
    error: null,
    status: 200,
    headers: new Headers(),
  };
}

/**
 * Makes a GET request
 * @param url - Request URL
 * @param options - Request options
 * @returns API response
 */
export async function get<T>(
  url: string,
  options: Omit<RequestOptions, "method" | "body"> = {}
): Promise<ApiResponse<T>> {
  return fetchWithTimeout<T>(url, { ...options, method: "GET" });
}

/**
 * Makes a POST request
 * @param url - Request URL
 * @param data - Request body data
 * @param options - Request options
 * @returns API response
 */
export async function post<T>(
  url: string,
  data: unknown,
  options: Omit<RequestOptions, "method"> = {}
): Promise<ApiResponse<T>> {
  return fetchWithTimeout<T>(url, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Makes a PUT request
 * @param url - Request URL
 * @param data - Request body data
 * @param options - Request options
 * @returns API response
 */
export async function put<T>(
  url: string,
  data: unknown,
  options: Omit<RequestOptions, "method"> = {}
): Promise<ApiResponse<T>> {
  return fetchWithTimeout<T>(url, {
    ...options,
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * Makes a DELETE request
 * @param url - Request URL
 * @param options - Request options
 * @returns API response
 */
export async function del<T>(
  url: string,
  options: Omit<RequestOptions, "method" | "body"> = {}
): Promise<ApiResponse<T>> {
  return fetchWithTimeout<T>(url, { ...options, method: "DELETE" });
}

/**
 * Makes a PATCH request
 * @param url - Request URL
 * @param data - Request body data
 * @param options - Request options
 * @returns API response
 */
export async function patch<T>(
  url: string,
  data: unknown,
  options: Omit<RequestOptions, "method"> = {}
): Promise<ApiResponse<T>> {
  return fetchWithTimeout<T>(url, {
    ...options,
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
