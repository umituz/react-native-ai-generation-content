/**
 * Flow Step Data Types
 */

/**
 * Step data structure
 */
export interface PhotoStepData {
  id: string;
  imageUri: string | null;
  previewUrl?: string;
  name?: string;
  isValid?: boolean;
  validationStatus?: "pending" | "validating" | "valid" | "invalid";
}

/**
 * Text input step data
 */
export interface TextInputStepData {
  id: string;
  text: string;
  isValid?: boolean;
}
