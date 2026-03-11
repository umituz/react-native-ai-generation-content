/**
 * Image Input Preprocessor
 *
 * Converts local file URIs (file://, ph://, content://) to base64 strings
 * before passing params to any AI provider. This ensures providers only
 * receive base64 or HTTPS URLs — never platform-specific file URIs.
 *
 * Uses @umituz/react-native-design-system/filesystem for file I/O.
 * Used by useImageGenerationExecutor to preprocess params automatically.
 */

import { readFileAsBase64 } from "@umituz/react-native-design-system/filesystem";

const LOCAL_URI_PREFIXES = ["file://", "ph://", "content://"];

const isLocalFileUri = (value: unknown): value is string =>
  typeof value === "string" &&
  LOCAL_URI_PREFIXES.some((p) => value.startsWith(p));

/** Known field names that may contain image URIs */
const IMAGE_FIELDS = [
  "image",
  "image_url",
  "image_urls",
  "images",
  "reference_image",
  "source_image",
  "target_image",
  "driver_image_url",
  "face_image",
  "mask_image",
] as const;

/**
 * Read a local file URI as base64.
 */
async function readLocalUri(uri: string): Promise<string> {
  const result = await readFileAsBase64(uri);
  if (!result) throw new Error(`Failed to read file: ${uri}`);
  return result;
}

/**
 * Resolve a single value: convert local file URI to base64, pass others through.
 */
async function resolveValue(value: string): Promise<string> {
  return isLocalFileUri(value) ? readLocalUri(value) : value;
}

/**
 * Preprocess generation params: scan known image fields and convert
 * local file URIs to base64. Returns a new object (never mutates input).
 */
export async function preprocessImageInputs(
  params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const result = { ...params };
  let converted = 0;

  for (const field of IMAGE_FIELDS) {
    const value = result[field];
    if (value === undefined || value === null) continue;

    if (typeof value === "string" && isLocalFileUri(value)) {
      result[field] = await resolveValue(value);
      converted++;
    } else if (Array.isArray(value)) {
      const hasLocalUri = value.some(isLocalFileUri);
      if (hasLocalUri) {
        result[field] = await Promise.all(
          value.map((v) =>
            typeof v === "string" ? resolveValue(v) : v,
          ),
        );
        converted++;
      }
    }
  }

  if (converted > 0 && typeof __DEV__ !== "undefined" && __DEV__) {
    console.log(
      `[ImagePreprocessor] Converted ${converted} field(s) from file URI to base64`,
    );
  }

  return result;
}
