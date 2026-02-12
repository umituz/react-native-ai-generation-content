/**
 * Creation Search Utilities
 * Single Responsibility: Filtering and searching
 */

/**
 * Filter creations by search query (client-side)
 */
export function filterBySearch<T extends { prompt?: string; type?: string; provider?: string }>(
  items: T[],
  searchQuery?: string,
): T[] {
  if (!searchQuery || searchQuery.trim().length === 0) {
    return items;
  }

  const query = searchQuery.toLowerCase().trim();

  return items.filter((item) =>
    item.prompt?.toLowerCase().includes(query) ||
    item.type?.toLowerCase().includes(query) ||
    item.provider?.toLowerCase().includes(query)
  );
}
