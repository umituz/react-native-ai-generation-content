/**
 * Feature Utilities
 * Uses ONLY configured app services - no alternatives
 */

import * as FileSystem from "expo-file-system";
import { getAuthService, getCreditService, getPaywallService, isAppServicesConfigured } from "../config/app-services.config";

declare const __DEV__: boolean;

export type ImageSelector = () => Promise<string | null>;
export type VideoSaver = (uri: string) => Promise<void>;
export type AlertFunction = (title: string, message: string) => void;

export interface FeatureUtilsConfig {
  selectImage: ImageSelector;
  saveVideo: VideoSaver;
}

export async function prepareImage(uri: string): Promise<string> {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  if (!base64) {
    throw new Error("Failed to convert image to base64");
  }

  return base64;
}

export function createDevCallbacks(featureName: string) {
  return {
    onSuccess: (result: unknown) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
         
        console.log(`[${featureName}] Success:`, result);
      }
    },
    onError: (error: unknown) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
         
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
    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
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
    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
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
