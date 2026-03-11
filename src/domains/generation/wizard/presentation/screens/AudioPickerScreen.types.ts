/**
 * AudioPickerScreen Types
 */

export interface AudioPickerScreenTranslations {
  readonly title: string;
  readonly subtitle?: string;
  readonly selectButton: string;
  readonly skipButton: string;
  readonly continueButton: string;
  readonly selectedLabel: string;
  readonly fileTooLarge?: string;
  readonly unsupportedFormat?: string;
}

export interface AudioPickerScreenProps {
  readonly stepId: string;
  readonly translations: AudioPickerScreenTranslations;
  /** Allowed MIME types */
  readonly allowedTypes?: readonly string[];
  /** Max file size in MB */
  readonly maxFileSizeMB?: number;
  /** Whether this step can be skipped */
  readonly optional?: boolean;
  /** Calculated credit cost from parent */
  readonly creditCost?: number;
  readonly onBack: () => void;
  /** Called with audio URI, or empty string if skipped */
  readonly onContinue: (audioUri: string) => void;
}
