/**
 * useResultActions Hook
 * Handles save and share actions for AI generation results
 */

import { useState, useCallback } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { File, Paths } from "expo-file-system/next";
import type {
  UseResultActionsOptions,
  UseResultActionsReturn,
} from "../types/result-preview.types";

/**
 * Check if a string is a base64 data URL or raw base64
 */
const isBase64DataUrl = (str: string): boolean => {
  return str.startsWith("data:image/");
};

/**
 * Check if a string is raw base64 (not a URL and not a data URL)
 */
const isRawBase64 = (str: string): boolean => {
  return !str.startsWith("http") && !str.startsWith("data:image/") && !str.startsWith("file://");
};

/**
 * Convert raw base64 to data URL format
 */
const toDataUrl = (str: string): string => {
  if (isBase64DataUrl(str)) return str;
  if (isRawBase64(str)) return `data:image/jpeg;base64,${str}`;
  return str;
};

/**
 * Save base64 image to file system
 */
const saveBase64ToFile = async (
  base64Data: string,
): Promise<string> => {
  const timestamp = Date.now();
  const filename = `ai_generation_${timestamp}.jpg`;
  const file = new File(Paths.cache, filename);

  // Extract pure base64 data (remove data URL prefix if present)
  const pureBase64 = base64Data.replace(/^data:image\/\w+;base64,/, "");

  // Convert base64 to Uint8Array
  const binaryString = atob(pureBase64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Write file
  file.write(bytes);

  return file.uri;
};

/**
 * Hook for managing result actions (save/share)
 */
export const useResultActions = (
  options: UseResultActionsOptions = {},
): UseResultActionsReturn => {
  const {
    imageUrl,
    onSaveSuccess,
    onSaveError,
    onShareStart,
    onShareEnd,
  } = options;

  const [isSharing, setIsSharing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /**
   * Save image to device gallery
   */
  const handleDownload = useCallback(async () => {
    if (!imageUrl) {
      onSaveError?.(new Error("No image URL provided"));
      return;
    }

    try {
      setIsSaving(true);

      // Request permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Media library permission not granted");
      }

      // Convert to data URL if raw base64
      const normalizedUrl = toDataUrl(imageUrl);
      let fileUri = normalizedUrl;

      // If it's a base64 string, save to file first
      if (isBase64DataUrl(normalizedUrl)) {
        fileUri = await saveBase64ToFile(normalizedUrl);
      }

      // Save to media library
      await MediaLibrary.saveToLibraryAsync(fileUri);

      onSaveSuccess?.();
    } catch (error) {
      const errorObj =
        error instanceof Error ? error : new Error(String(error));
      onSaveError?.(errorObj);
    } finally {
      setIsSaving(false);
    }
  }, [imageUrl, onSaveSuccess, onSaveError]);

  /**
   * Share image
   */
  const handleShare = useCallback(async () => {
    if (!imageUrl) {
      return;
    }

    try {
      setIsSharing(true);
      onShareStart?.();

      // Convert to data URL if raw base64
      const normalizedUrl = toDataUrl(imageUrl);
      let shareUrl = normalizedUrl;

      // If it's a base64 string, save to file first for sharing
      if (isBase64DataUrl(normalizedUrl)) {
        shareUrl = await saveBase64ToFile(normalizedUrl);
      }

      // Use expo-sharing for cross-platform file sharing
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(shareUrl, {
          mimeType: "image/jpeg",
          dialogTitle: "Share Image",
        });
        onShareEnd?.(false);
      } else {
        onShareEnd?.(true);
      }
    } catch (error: unknown) {
      // User cancelled or error - silently handle
      if (__DEV__) console.log("Share cancelled or failed:", error);
      onShareEnd?.(true);
    } finally {
      setIsSharing(false);
    }
  }, [imageUrl, onShareStart, onShareEnd]);

  return {
    isSaving,
    isSharing,
    handleDownload,
    handleShare,
  };
};
