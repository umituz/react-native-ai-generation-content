/**
 * HTTP Request Executor
 * Infrastructure: Handles low-level fetch operations
 */

import { env } from "../config/env.config";
import { createTimeoutController } from "./timeout.util";
import { DEFAULT_HEADERS } from "./http-methods.constants";
import type { RequestOptions } from "./api-client.types";

/**
 * Executes HTTP request with timeout
 */
export async function executeRequest(
  url: string,
  options: RequestOptions = {}
): Promise<Response> {
  const {
    timeout = env.apiDefaultTimeoutMs,
    headers = {},
    ...fetchOptions
  } = options;

  const controller = createTimeoutController(timeout);

  return fetch(url, {
    ...fetchOptions,
    headers: {
      ...DEFAULT_HEADERS,
      ...headers,
    },
    signal: controller?.signal,
  });
}

/**
 * Checks if response is successful
 */
export function isSuccessResponse(response: Response): boolean {
  return response.ok;
}

/**
 * Extracts error message from failed response
 */
export async function extractErrorMessage(response: Response): Promise<string> {
  const errorText = await response.text().catch(() => "Unknown error");
  return `HTTP ${response.status}: ${errorText}`;
}
