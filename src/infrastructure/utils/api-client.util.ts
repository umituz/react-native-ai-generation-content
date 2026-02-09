/**
 * API Client Utilities
 * Provides standardized HTTP request handling and response processing
 */

import { withErrorHandling, getErrorMessage, retryWithBackoff, isNetworkError } from "./error-handling.util";

export interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
  headers: Headers;
}

/**
 * Default request timeout in milliseconds
 */
const DEFAULT_TIMEOUT = 30000;

/**
 * Creates an AbortController with timeout
 */
function createTimeoutController(timeout?: number): AbortController | undefined {
  if (!timeout) {
    return undefined;
  }

  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout);
  return controller;
}

/**
 * Makes an HTTP request with error handling and retry logic
 */
export async function fetchWithTimeout<T>(
  url: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    timeout = DEFAULT_TIMEOUT,
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
          delayMs: 1000,
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
 */
export async function get<T>(
  url: string,
  options: Omit<RequestOptions, "method" | "body"> = {}
): Promise<ApiResponse<T>> {
  return fetchWithTimeout<T>(url, { ...options, method: "GET" });
}

/**
 * Makes a POST request
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
 */
export async function del<T>(
  url: string,
  options: Omit<RequestOptions, "method" | "body"> = {}
): Promise<ApiResponse<T>> {
  return fetchWithTimeout<T>(url, { ...options, method: "DELETE" });
}

/**
 * Makes a PATCH request
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

/**
 * Builds query string from object
 */
export function buildQueryString(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}

/**
 * Appends query parameters to URL
 */
export function appendQueryParams(
  url: string,
  params: Record<string, unknown>
): string {
  const queryString = buildQueryString(params);
  if (!queryString) {
    return url;
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${queryString}`;
}
