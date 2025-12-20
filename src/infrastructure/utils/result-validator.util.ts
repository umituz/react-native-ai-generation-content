/**
 * Result Validator Utility
 * Validates AI generation job results
 */

declare const __DEV__: boolean;

export interface ResultValidation {
  isValid: boolean;
  hasError: boolean;
  errorMessage?: string;
  hasOutput: boolean;
}

export interface ValidateResultOptions {
  /** Custom output field names to check */
  outputFields?: string[];
  /** Whether empty results are allowed */
  allowEmpty?: boolean;
}

const DEFAULT_OUTPUT_FIELDS = [
  "data",
  "output",
  "image",
  "image_url",
  "images",
  "video",
  "video_url",
  "url",
  "result",
  "text",
  "content",
];

/**
 * Validate job result and detect errors
 * Checks for error fields even if job status was COMPLETED
 */
export function validateResult(
  result: unknown,
  options?: ValidateResultOptions,
): ResultValidation {
  const { outputFields = DEFAULT_OUTPUT_FIELDS, allowEmpty = false } =
    options ?? {};

  // Handle null/undefined
  if (result === null || result === undefined) {
    return {
      isValid: allowEmpty,
      hasError: !allowEmpty,
      errorMessage: allowEmpty ? undefined : "Result is empty",
      hasOutput: false,
    };
  }

  // Handle non-object results
  if (typeof result !== "object") {
    return {
      isValid: true,
      hasError: false,
      hasOutput: true,
    };
  }

  const resultObj = result as Record<string, unknown>;

  // Check for error fields
  const errorValue = resultObj.error || resultObj.detail;
  const errorString = errorValue ? String(errorValue).toLowerCase() : "";

  const hasInternalServerError =
    errorString.includes("internal server error") ||
    errorString.includes("500") ||
    errorString === "internal server error";

  // Check for empty object
  const isEmpty = Object.keys(resultObj).length === 0;

  // Check for output in expected fields
  const hasOutput = outputFields.some((field) => {
    const value = resultObj[field];
    if (!value) return false;

    // Handle nested output structures
    if (typeof value === "object" && value !== null) {
      const nested = value as Record<string, unknown>;
      return !!(
        nested.url ||
        nested.image_url ||
        nested.video_url ||
        Object.keys(nested).length > 0
      );
    }

    return true;
  });

  // Determine if result has error
  const hasError =
    hasInternalServerError || (isEmpty && !hasOutput && !allowEmpty);

  const validation: ResultValidation = {
    isValid: !hasError && (hasOutput || allowEmpty),
    hasError,
    errorMessage: hasError && errorValue ? String(errorValue) : undefined,
    hasOutput,
  };

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    // eslint-disable-next-line no-console
    console.log("[ResultValidator] Validation result:", {
      isValid: validation.isValid,
      hasOutput: validation.hasOutput,
      hasError: validation.hasError,
      checkedFields: outputFields.join(", "),
    });
  }

  return validation;
}

/**
 * Extract output URL from result
 * Supports various AI provider response formats
 */
export function extractOutputUrl(
  result: unknown,
  urlFields?: string[],
): string | undefined {
  if (!result || typeof result !== "object") {
    return undefined;
  }

  const fields = urlFields ?? [
    "url",
    "image_url",
    "video_url",
    "output_url",
    "result_url",
  ];

  const resultObj = result as Record<string, unknown>;

  // Check top-level fields
  for (const field of fields) {
    const value = resultObj[field];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  // Check nested data/output objects
  const nested =
    (resultObj.data as Record<string, unknown>) ||
    (resultObj.output as Record<string, unknown>) ||
    (resultObj.result as Record<string, unknown>);

  if (nested && typeof nested === "object") {
    for (const field of fields) {
      const value = nested[field];
      if (typeof value === "string" && value.length > 0) {
        return value;
      }
    }

    // Check for nested image/video objects
    const media =
      (nested.image as Record<string, unknown>) ||
      (nested.video as Record<string, unknown>);
    if (media && typeof media === "object" && typeof media.url === "string") {
      return media.url;
    }
  }

  return undefined;
}

/**
 * Extract multiple output URLs from result
 */
export function extractOutputUrls(
  result: unknown,
  urlFields?: string[],
): string[] {
  if (!result || typeof result !== "object") {
    return [];
  }

  const urls: string[] = [];
  const resultObj = result as Record<string, unknown>;

  // Check for arrays
  const arrayFields = ["images", "videos", "outputs", "results", "urls"];
  for (const field of arrayFields) {
    const arr = resultObj[field];
    if (Array.isArray(arr)) {
      for (const item of arr) {
        const url = extractOutputUrl(item, urlFields);
        if (url) {
          urls.push(url);
        }
      }
    }
  }

  // Check nested data/output
  const nested = resultObj.data || resultObj.output;
  if (nested && typeof nested === "object") {
    for (const field of arrayFields) {
      const arr = (nested as Record<string, unknown>)[field];
      if (Array.isArray(arr)) {
        for (const item of arr) {
          const url = extractOutputUrl(item, urlFields);
          if (url) {
            urls.push(url);
          }
        }
      }
    }
  }

  // If no array found, try single URL
  if (urls.length === 0) {
    const singleUrl = extractOutputUrl(result, urlFields);
    if (singleUrl) {
      urls.push(singleUrl);
    }
  }

  return urls;
}
