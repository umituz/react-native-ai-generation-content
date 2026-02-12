/**
 * Result Creation Types
 */

/**
 * Recent creation item
 */
export interface RecentCreation {
  readonly id: string;
  readonly imageUrl: string;
  readonly title: string;
  readonly date: string;
  readonly isFavorite?: boolean;
}
