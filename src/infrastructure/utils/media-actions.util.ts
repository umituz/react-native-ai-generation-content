/**
 * Media Actions Utilities
 * Provides save to gallery and share functionality for generated media
 */

declare const __DEV__: boolean;

export interface MediaActionResult {
  readonly success: boolean;
  readonly error?: string;
}

export interface MediaActionTranslations {
  readonly success?: string;
  readonly error?: string;
  readonly permissionDenied?: string;
  readonly saveFailed?: string;
  readonly shareFailed?: string;
  readonly shareNotAvailable?: string;
}

export interface ToastConfig {
  readonly show: (config: {
    type: "success" | "error";
    text1: string;
    text2?: string;
  }) => void;
}

/**
 * Downloads a file from URL to local storage
 * @param uri - URL or local path
 * @param prefix - File name prefix
 * @returns Local file path
 */
const downloadToLocal = async (
  uri: string,
  prefix: string = "media"
): Promise<string> => {
  if (!uri.startsWith("http")) {
    return uri;
  }

  const FileSystem = require("expo-file-system");
  const fileExt = uri.split(".").pop()?.split("?")[0] || "jpg";
  const fileRef =
    FileSystem.documentDirectory + `${prefix}_${Date.now()}.${fileExt}`;
  const { uri: downloadedUri } = await FileSystem.downloadAsync(uri, fileRef);
  return downloadedUri;
};

/**
 * Saves media to device gallery
 * @param uri - URL or local path of the media
 * @param translations - Optional translated messages
 * @param toast - Optional toast instance for notifications
 * @returns Result with success status
 */
export const saveMediaToGallery = async (
  uri: string,
  translations?: MediaActionTranslations,
  toast?: ToastConfig
): Promise<MediaActionResult> => {
  try {
    const MediaLibrary = require("expo-media-library");

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      const errorMsg = translations?.permissionDenied || "Permission denied";
      toast?.show({
        type: "error",
        text1: translations?.error || "Error",
        text2: errorMsg,
      });
      return { success: false, error: errorMsg };
    }

    const localUri = await downloadToLocal(uri, "download");
    await MediaLibrary.saveToLibraryAsync(localUri);

    toast?.show({
      type: "success",
      text1: translations?.success || "Success",
      text2: "Saved to gallery",
    });

    return { success: true };
  } catch (error) {
    // Debug logging in development
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[MediaActions] Save failed:", error);
    }
    const errorMsg = translations?.saveFailed || "Failed to save media";
    toast?.show({
      type: "error",
      text1: translations?.error || "Error",
      text2: errorMsg,
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : errorMsg,
    };
  }
};

/**
 * Shares media using device share sheet
 * @param uri - URL or local path of the media
 * @param translations - Optional translated messages
 * @param toast - Optional toast instance for notifications
 * @returns Result with success status
 */
export const shareMedia = async (
  uri: string,
  translations?: MediaActionTranslations,
  toast?: ToastConfig
): Promise<MediaActionResult> => {
  try {
    const Sharing = require("expo-sharing");

    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      const errorMsg =
        translations?.shareNotAvailable ||
        "Sharing is not available on this device";
      toast?.show({
        type: "error",
        text1: translations?.error || "Error",
        text2: errorMsg,
      });
      return { success: false, error: errorMsg };
    }

    const localUri = await downloadToLocal(uri, "share");
    await Sharing.shareAsync(localUri);

    return { success: true };
  } catch (error) {
    // Debug logging in development
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[MediaActions] Share failed:", error);
    }
    const errorMsg = translations?.shareFailed || "Failed to share media";
    toast?.show({
      type: "error",
      text1: translations?.error || "Error",
      text2: errorMsg,
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : errorMsg,
    };
  }
};

/**
 * Creates save handler for use in wizard flows
 * @param translations - Translated messages
 * @param toast - Toast instance for notifications
 * @returns Save handler function
 */
export const createSaveHandler = (
  translations?: MediaActionTranslations,
  toast?: ToastConfig
) => {
  return async (uri: string): Promise<void> => {
    await saveMediaToGallery(uri, translations, toast);
  };
};

/**
 * Creates share handler for use in wizard flows
 * @param translations - Translated messages
 * @param toast - Toast instance for notifications
 * @returns Share handler function
 */
export const createShareHandler = (
  translations?: MediaActionTranslations,
  toast?: ToastConfig
) => {
  return async (uri: string): Promise<void> => {
    await shareMedia(uri, translations, toast);
  };
};

/**
 * Creates both save and share handlers
 * @param translations - Translated messages
 * @param toast - Toast instance for notifications
 * @returns Object with onSave and onShare handlers
 */
export const createMediaHandlers = (
  translations?: MediaActionTranslations,
  toast?: ToastConfig
) => {
  return {
    onSave: createSaveHandler(translations, toast),
    onShare: createShareHandler(translations, toast),
  };
};
