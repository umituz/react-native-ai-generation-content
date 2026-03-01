/**
 * useResultActions Hook
 * Handles save and share actions for AI generation results
 */

import { useState, useCallback } from "react";

import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { isVideoUrl, isBase64DataUrl, toDataUrl, saveBase64ToFile, downloadMediaToFile } from "@umituz/react-native-design-system/media";
import type { UseResultActionsOptions, UseResultActionsReturn } from "../types/result-preview.types";

export const useResultActions = (options: UseResultActionsOptions = {}): UseResultActionsReturn => {
  const { imageUrl, videoUrl, onSaveSuccess, onSaveError, onShareStart, onShareEnd } = options;

  const [isSharing, setIsSharing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const mediaUrl = videoUrl || imageUrl;

  const handleDownload = useCallback(async () => {
    if (!mediaUrl) {
      onSaveError?.(new Error("No media URL provided"));
      return;
    }

    try {
      setIsSaving(true);

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") throw new Error("Media library permission not granted");

      const isVideo = Boolean(videoUrl) || isVideoUrl(mediaUrl);
      let fileUri = mediaUrl;

      if (!isVideo) {
        const normalizedUrl = toDataUrl(mediaUrl);
        if (isBase64DataUrl(normalizedUrl)) {
          fileUri = await saveBase64ToFile(normalizedUrl);
        } else if (normalizedUrl.startsWith("http")) {
          fileUri = await downloadMediaToFile(normalizedUrl, false);
        }
      } else if (mediaUrl.startsWith("http")) {
        fileUri = await downloadMediaToFile(mediaUrl, true);
      }

      await MediaLibrary.saveToLibraryAsync(fileUri);
      onSaveSuccess?.();
    } catch (error) {
      onSaveError?.(error instanceof Error ? error : new Error(String(error)));
    } finally {
      setIsSaving(false);
    }
  }, [mediaUrl, videoUrl, onSaveSuccess, onSaveError]);

  const handleShare = useCallback(async () => {
    if (!mediaUrl) return;

    try {
      setIsSharing(true);
      onShareStart?.();

      const isVideo = Boolean(videoUrl) || isVideoUrl(mediaUrl);
      let shareUrl = mediaUrl;

      if (!isVideo) {
        const normalizedUrl = toDataUrl(mediaUrl);
        if (isBase64DataUrl(normalizedUrl)) {
          shareUrl = await saveBase64ToFile(normalizedUrl);
        } else if (normalizedUrl.startsWith("http")) {
          shareUrl = await downloadMediaToFile(normalizedUrl, false);
        }
      } else if (mediaUrl.startsWith("http")) {
        shareUrl = await downloadMediaToFile(mediaUrl, true);
      }

      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        const mimeType = isVideo ? "video/mp4" : "image/jpeg";
        await Sharing.shareAsync(shareUrl, { mimeType, dialogTitle: isVideo ? "Share Video" : "Share Image" });
        onShareEnd?.(false);
      } else {
        onShareEnd?.(true);
      }
    } catch (error: unknown) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        console.log("[ResultActions] Share cancelled or failed:", errorMsg);
      }
      onShareEnd?.(true);
    } finally {
      setIsSharing(false);
    }
  }, [mediaUrl, videoUrl, onShareStart, onShareEnd]);

  return { isSaving, isSharing, handleDownload, handleShare };
};
