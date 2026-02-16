/**
 * SelectionScreen Types
 */

export interface SelectionOption {
  readonly id: string;
  readonly label: string;
  readonly icon?: string;
  readonly value: unknown;
}

export interface SelectionScreenTranslations {
  readonly title: string;
  readonly subtitle?: string;
  readonly continueButton: string;
  readonly backButton?: string;
}

export interface SelectionScreenConfig {
  readonly multiSelect?: boolean;
  readonly required?: boolean;
  readonly layout?: "grid" | "list";
}

export interface SelectionScreenProps {
  readonly stepId: string;
  readonly translations: SelectionScreenTranslations;
  readonly options: readonly SelectionOption[];
  readonly config?: SelectionScreenConfig;
  readonly initialValue?: string | string[];
  /** Calculated credit cost - passed from parent */
  readonly creditCost?: number;
  readonly onBack: () => void;
  readonly onContinue: (selectedValue: string | string[]) => void;
}
