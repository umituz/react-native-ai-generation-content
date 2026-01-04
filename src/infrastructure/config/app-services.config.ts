/**
 * App Services Configuration
 * Singleton for storing app-provided service implementations
 */

import type { IAppServices, PartialAppServices } from "../../domain/interfaces/app-services.interface";

declare const __DEV__: boolean;

let appServices: IAppServices | null = null;

/**
 * Default no-op implementations for optional services
 */
const defaultAnalytics = {
  track: () => {
    // No-op by default
  },
};

/**
 * Configure app services
 * Must be called before using any generation features
 * @param services - App-specific service implementations
 */
export function configureAppServices(services: IAppServices): void {
  if (appServices !== null) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
      console.log("[AppServices] Already configured, skipping");
    }
    return;
  }

  if (typeof __DEV__ !== "undefined" && __DEV__) {
     
    console.log("[AppServices] Configuring app services");
  }

  appServices = {
    ...services,
    analytics: services.analytics || defaultAnalytics,
  };
}

/**
 * Update specific app services
 * Useful for lazy initialization
 * @param updates - Partial service updates
 */
export function updateAppServices(updates: PartialAppServices): void {
  if (!appServices) {
    throw new Error(
      "[AppServices] Must call configureAppServices before updateAppServices",
    );
  }

  appServices = {
    ...appServices,
    ...updates,
  };
}

/**
 * Get configured app services
 * @throws Error if services not configured
 */
export function getAppServices(): IAppServices {
  if (!appServices) {
    throw new Error(
      "[AppServices] App services not configured. Call configureAppServices first.",
    );
  }

  return appServices;
}

/**
 * Check if app services are configured
 */
export function isAppServicesConfigured(): boolean {
  return appServices !== null;
}

/**
 * Reset app services (useful for testing)
 */
export function resetAppServices(): void {
  appServices = null;
}

/**
 * Get network service
 * @throws Error if not configured
 */
export function getNetworkService(): IAppServices["network"] {
  return getAppServices().network;
}

/**
 * Get credit service
 * @throws Error if not configured
 */
export function getCreditService(): IAppServices["credits"] {
  return getAppServices().credits;
}

/**
 * Get paywall service
 * @throws Error if not configured
 */
export function getPaywallService(): IAppServices["paywall"] {
  return getAppServices().paywall;
}

/**
 * Get auth service
 * @throws Error if not configured
 */
export function getAuthService(): IAppServices["auth"] {
  return getAppServices().auth;
}

/**
 * Get analytics service
 * @throws Error if not configured
 */
export function getAnalyticsService(): IAppServices["analytics"] {
  return getAppServices().analytics;
}
