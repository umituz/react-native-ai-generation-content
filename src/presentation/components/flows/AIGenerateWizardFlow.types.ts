
export interface AIGenerateWizardTranslations {
  readonly headerTitle: string;
  readonly uploadSubtitle: string;
  readonly uploadSubtitle2: string;
  readonly continue: string;
  readonly tapToUpload: string;
  readonly selectPhoto: string;
  readonly change: string;
  readonly analyzing: string;
  readonly error: string;
  readonly uploadFailed: string;
  readonly aiDisclosure: string;
  readonly heroTitle: string;
  readonly heroSubtitle: string;
  readonly presetsTitle: string;
  readonly showAdvancedLabel: string;
  readonly hideAdvancedLabel: string;
  readonly promptTitle: string;
  readonly promptPlaceholder: string;
  readonly styleTitle: string;
  readonly durationTitle: string;
  readonly generateButton: string;
  readonly generatingButton: string;
  readonly processingTitle: string;
  readonly processingMessage: string;
  readonly processingHint: string;
  readonly successTitle: string;
  readonly saveButton: string;
  readonly shareButton: string;
  readonly tryAgainButton: string;
  readonly fileTooLarge: string;
  readonly maxFileSize: string;
}

export interface WizardStyleOption {
  readonly id: string;
  readonly label: string;
  readonly icon?: string;
}

export interface PresetOption {
  readonly id: string;
  readonly label: string;
  readonly prompt?: string;
  readonly icon?: string;
}

export interface AIGenerateWizardFlowProps {
  readonly featureType: string;
  readonly translations: AIGenerateWizardTranslations;
  readonly styleOptions: WizardStyleOption[];
  readonly presets: PresetOption[];
  readonly durationOptions: number[];
  readonly onGenerate: (data: {
    prompt: string;
    style: string;
    duration: number;
    images: { uri: string }[];
  }) => Promise<string | null | void>;
  readonly onBack?: () => void;
  readonly onSave?: (uri: string) => Promise<void>;
  readonly onShare?: (uri: string) => Promise<void>;
  readonly onStepChange?: (stepId: string) => void;
  readonly t: (key: string) => string;
}
