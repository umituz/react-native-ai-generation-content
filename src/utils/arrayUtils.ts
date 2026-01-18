/**
 * Deduplicates an array of objects based on a specific key.
 * Keeps the first occurrence of each item with a unique key.
 *
 * @param array The array to deduplicate
 * @param keyFn A function that returns the unique key for each item
 * @returns A new array with duplicate items removed
 */
export const distinctBy = <T>(array: readonly T[], keyFn: (item: T) => string | number): T[] => {
  const seen = new Set<string | number>();
  const result: T[] = [];

  for (const item of array) {
    const key = keyFn(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }

  return result;
};
