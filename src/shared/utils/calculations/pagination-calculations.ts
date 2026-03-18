/**
 * Pagination Calculations
 */

/**
 * Calculate filtered count with predicate
 */
export function calculateFilteredCount<T>(
  items: readonly T[],
  predicate: (item: T) => boolean
): number {
  return items.reduce((count, item) => (predicate(item) ? count + 1 : count), 0);
}

/**
 * Calculate pagination slice
 */
export function calculatePaginationSlice(
  totalItems: number,
  page: number,
  pageSize: number
): { start: number; end: number; count: number } {
  const start = page * pageSize;
  const end = Math.min(start + pageSize, totalItems);
  const count = end - start;
  return { start, end, count };
}

/**
 * Calculate if more items exist for pagination
 */
export function calculateHasMore(
  currentCount: number,
  currentPage: number,
  pageSize: number
): boolean {
  return currentCount >= currentPage * pageSize;
}
