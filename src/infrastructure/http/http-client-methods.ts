/**
 * HTTP Client Methods
 * Infrastructure: Public API for HTTP operations
 */

import type { RequestOptions, ApiResponse } from "./api-client.types";
import { fetchWithTimeout } from "./http-fetch-handler";
import { HTTP_METHOD } from "./http-methods.constants";

/**
 * Makes a GET request
 */
export async function get<T>(
  url: string,
  options: Omit<RequestOptions, "method" | "body"> = {}
): Promise<ApiResponse<T>> {
  return fetchWithTimeout<T>(url, { ...options, method: HTTP_METHOD.GET });
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
    method: HTTP_METHOD.POST,
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
    method: HTTP_METHOD.PUT,
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
  return fetchWithTimeout<T>(url, { ...options, method: HTTP_METHOD.DELETE });
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
    method: HTTP_METHOD.PATCH,
    body: JSON.stringify(data),
  });
}
