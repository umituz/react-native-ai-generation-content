/**
 * App Services - Optional Interfaces
 * Optional service interfaces (analytics, feature utils)
 */

/**
 * Analytics event data
 */
interface AnalyticsEventData {
  readonly [key: string]: string | number | boolean | null | undefined;
}

/**
 * Analytics service interface (optional)
 * Tracks events for analytics
 */
export interface IAnalyticsService {
  /**
   * Track an event
   * @param event - Event name
   * @param data - Event data
   */
  track: (event: string, data: AnalyticsEventData) => void;
}

/**
 * Feature utils interface (optional)
 * Provides utility functions for AI features
 */
export interface IFeatureUtils {
  /**
   * Select image from gallery
   * @returns Image URI or null if cancelled
   */
  selectImage: () => Promise<string | null>;

  /**
   * Save video to device library
   * @param uri - Video URI to save
   */
  saveVideo: (uri: string) => Promise<void>;
}
