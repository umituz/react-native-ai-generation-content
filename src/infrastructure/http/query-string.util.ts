/**
 * Query String Utilities
 * Helper functions for building and manipulating query strings
 */

/**
 * Builds query string from object
 * @param params - Object with query parameters
 * @returns Query string (without leading ?)
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
 * @param url - Base URL
 * @param params - Query parameters to append
 * @returns URL with query parameters
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
