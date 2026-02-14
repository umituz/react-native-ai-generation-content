/**
 * TextInputScreen Types
 */

export interface TextInputScreenTranslations {
  readonly title: string;
  readonly subtitle?: string;
  readonly placeholder: string;
  readonly continueButton: string;
  readonly backButton?: string;
  readonly examplesTitle?: string;
  readonly contentNotAllowed?: string;
  readonly contentNotAllowedMessage?: string;
}

export interface TextInputScreenConfig {
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly multiline?: boolean;
}

export interface TextInputScreenProps {
  readonly stepId: string;
  readonly translations: TextInputScreenTranslations;
  readonly config?: TextInputScreenConfig;
  readonly examplePrompts?: string[];
  readonly initialValue?: string;
  readonly onBack: () => void;
  readonly onContinue: (text: string) => void;
}
