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
  /** Static credit cost - used when no calculator provided */
  readonly creditCost?: number;
  /** Live credit calculator - returns credit cost for given selection value */
  readonly calculateCreditForSelection?: (value: string | string[]) => number;
  readonly onBack: () => void;
  readonly onContinue: (selectedValue: string | string[]) => void;
}
