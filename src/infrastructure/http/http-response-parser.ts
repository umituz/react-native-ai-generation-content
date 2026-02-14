/**
 * HTTP Response Parser
 * Infrastructure: Parses HTTP responses to typed data
 */

import { HTTP_CONTENT_TYPE } from "./http-methods.constants";

/**
 * Parses response based on content type
 * Note: Type T is not validated at runtime - caller must ensure type safety
 */
export async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");

  if (contentType?.includes(HTTP_CONTENT_TYPE.JSON)) {
    try {
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to parse JSON response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // For non-JSON responses, return text
  // WARNING: Type T is not validated - caller is responsible for type safety
  try {
    const text = await response.text();
    return text as T;
  } catch (error) {
    throw new Error(`Failed to parse text response: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
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
