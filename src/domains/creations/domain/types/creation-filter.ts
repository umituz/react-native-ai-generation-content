/**
 * Creation Filter Types
 * Advanced filtering options for creations
 */

import type { CreationTypeId, CreationStatus, CreationCategory } from "./creation-types";
import { getCategoryForCreation } from "./creation-categories";

/**
 * Filter options for querying creations
 */
export interface CreationFilter {
  /** Filter by specific type, category, or all */
  type?: CreationTypeId | CreationCategory;
  /** Filter by status */
  status?: CreationStatus | "all";
  /** Filter by date range start (timestamp in ms) */
  startDate?: number;
  /** Filter by date range end (timestamp in ms) */
  endDate?: number;
  /** Search query for prompt or metadata */
  searchQuery?: string;
  /** Sort field */
  sortField?: "createdAt" | "updatedAt" | "type" | "status";
  /** Sort order */
  sortOrder?: "asc" | "desc";
  /** Limit number of results */
  limit?: number;
  /** Cursor for pagination (timestamp in ms) */
  cursor?: number;
}

/**
 * Default filter configuration
 */
export const DEFAULT_CREATION_FILTER: CreationFilter = {
  type: "all",
  status: "all",
  sortField: "createdAt",
  sortOrder: "desc",
  limit: 50,
};

/**
 * Filter option for UI display
 */
export interface FilterOption {
  id: string;
  /** Display label */
  label: string;
  /** i18n key for label (use when generating options) */
  labelKey?: string;
  icon?: string;
  count?: number;
}

/**
 * Media filter options
 */
export const MEDIA_FILTER_OPTIONS: FilterOption[] = [
  { id: "all", label: "All", labelKey: "creations.filter.all", icon: "grid-outline" },
  { id: "image", label: "Images", labelKey: "creations.filter.images", icon: "image-outline" },
  { id: "video", label: "Videos", labelKey: "creations.filter.videos", icon: "videocam-outline" },
];

/**
 * Status filter options
 */
export const STATUS_FILTER_OPTIONS: FilterOption[] = [
  { id: "all", label: "All", labelKey: "creations.filter.allStatus", icon: "list-outline" },
  { id: "completed", label: "Completed", labelKey: "creations.filter.completed", icon: "checkmark-circle-outline" },
  { id: "processing", label: "Processing", labelKey: "creations.filter.processing", icon: "reload-outline" },
  { id: "failed", label: "Failed", labelKey: "creations.filter.failed", icon: "close-circle-outline" },
  { id: "pending", label: "Pending", labelKey: "creations.filter.pending", icon: "time-outline" },
];

/**
 * Creation statistics
 */
export interface CreationStats {
  total: number;
  byCategory: Record<CreationCategory, number>;
  byStatus: Record<CreationStatus, number>;
  byType: Partial<Record<CreationTypeId, number>>;
}

/**
 * Calculate stats from creations array
 */
export function calculateCreationStats(
  creations: Array<{
    type?: string;
    status?: string;
    output?: { videoUrl?: string; imageUrl?: string; imageUrls?: string[] };
    uri?: string;
  }>
): CreationStats {
  const stats: CreationStats = {
    total: creations.length,
    byCategory: { all: creations.length, image: 0, video: 0 },
    byStatus: { pending: 0, queued: 0, processing: 0, completed: 0, failed: 0 },
    byType: {},
  };

  for (const creation of creations) {
    // Count by type
    if (creation.type) {
      const typeId = creation.type as CreationTypeId;
      stats.byType[typeId] = (stats.byType[typeId] || 0) + 1;
    }

    // Count by status
    if (creation.status) {
      const status = creation.status as CreationStatus;
      if (status in stats.byStatus) {
        stats.byStatus[status]++;
      }
    }
  }

  // Calculate category counts based on OUTPUT content (most reliable)
  for (const creation of creations) {
    const category = getCategoryForCreation(creation) as Exclude<CreationCategory, "all">;
    stats.byCategory[category]++;
  }

  return stats;
}
