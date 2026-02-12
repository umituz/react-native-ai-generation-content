/**
 * HTTP Response Parser
 * Infrastructure: Parses HTTP responses to typed data
 */

import { HTTP_CONTENT_TYPE } from "./http-methods.constants";

/**
 * Parses response based on content type
 */
export async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");

  if (contentType?.includes(HTTP_CONTENT_TYPE.JSON)) {
    return response.json();
  }

  return response.text() as T;
}

/**
 * Creates successful API response
 */
export function createSuccessResponse<T>(data: T): {
  data: T;
  error: null;
  status: number;
  headers: Headers;
} {
  return {
    data,
    error: null,
    status: 200,
    headers: new Headers(),
  };
}

/**
 * Creates error API response
 */
export function createErrorResponse(errorMessage: string): {
  data: null;
  error: string;
  status: number;
  headers: Headers;
} {
  return {
    data: null,
    error: errorMessage,
    status: 0,
    headers: new Headers(),
  };
}
