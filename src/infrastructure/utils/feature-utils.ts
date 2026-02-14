/**
 * Feature Utilities
 * Uses ONLY configured app services - no alternatives
 */

import { readFileAsBase64 } from "@umituz/react-native-design-system";
import { getAuthService, getCreditService, getPaywallService, isAppServicesConfigured } from "../config/app-services.config";
import { env } from "../config/env.config";

declare const __DEV__: boolean;

export type ImageSelector = () => Promise<string | null>;
export type VideoSaver = (uri: string) => Promise<void>;
export type AlertFunction = (title: string, message: string) => void;

export interface FeatureUtilsConfig {
  selectImage: ImageSelector;
  saveVideo: VideoSaver;
}

export async function prepareImage(uri: string): Promise<string> {
  if (__DEV__) {
    console.log("[prepareImage] Starting with URI:", uri);
  }

  if (!uri) {
    throw new Error("[prepareImage] No URI provided");
  }

  try {
    const base64 = await readFileAsBase64(uri);

    if (__DEV__) {
      console.log("[prepareImage] Base64 length:", base64?.length || 0);
    }

    if (!base64) {
      throw new Error("[prepareImage] Failed to convert image to base64");
    }

    // Validate base64 size to prevent memory exhaustion
    const maxSizeBytes = env.validationMaxBase64SizeMb * 1024 * 1024;
    if (base64.length > maxSizeBytes) {
      throw new Error(
        `[prepareImage] Image exceeds maximum size of ${env.validationMaxBase64SizeMb}MB. ` +
        `Current size: ${(base64.length / (1024 * 1024)).toFixed(2)}MB`
      );
    }

    return base64;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (__DEV__) {
      console.error("[prepareImage] Error:", message);
    }
    throw new Error(`[prepareImage] Failed: ${message}`);
  }
}

export function createDevCallbacks(featureName: string) {
  return {
    onSuccess: (result: unknown) => {
      if (__DEV__) {
         
        console.log(`[${featureName}] Success:`, result);
      }
    },
    onError: (error: unknown) => {
      if (__DEV__) {
         
        console.error(`[${featureName}] Error:`, error);
      }
    },
  };
}

/**
 * Credit guard - ONLY uses configured app services
 */
async function checkCreditGuard(cost: number, featureName: string): Promise<boolean> {
  if (!isAppServicesConfigured()) {
    throw new Error(`[${featureName}] App services not configured. Call configureAppServices() at startup.`);
  }

  const authService = getAuthService();
  const creditService = getCreditService();
  const paywallService = getPaywallService();

  if (!authService.isAuthenticated()) {
    if (__DEV__) {
       
      console.log(`[${featureName}] Auth required`);
    }
    try {
      authService.requireAuth();
    } catch {
      return false;
    }
    return false;
  }

  const hasCredits = await creditService.checkCredits(cost);
  if (!hasCredits) {
    if (__DEV__) {
       
      console.log(`[${featureName}] Insufficient credits`);
    }
    paywallService.showPaywall(cost);
    return false;
  }

  return true;
}

export function createFeatureUtils(config: FeatureUtilsConfig) {
  return {
    selectImage: config.selectImage,
    saveVideo: config.saveVideo,
    checkCreditGuard,
    prepareImage,
    createDevCallbacks,
  };
}
