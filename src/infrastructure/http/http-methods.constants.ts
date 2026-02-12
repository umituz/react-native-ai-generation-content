/**
 * HTTP Methods Constants
 * Domain knowledge: Standard HTTP methods
 */

export const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
} as const;

export type HttpMethod = typeof HTTP_METHOD[keyof typeof HTTP_METHOD];

export const HTTP_CONTENT_TYPE = {
  JSON: "application/json",
  TEXT: "text/plain",
} as const;

export const DEFAULT_HEADERS = {
  "Content-Type": HTTP_CONTENT_TYPE.JSON,
} as const;
