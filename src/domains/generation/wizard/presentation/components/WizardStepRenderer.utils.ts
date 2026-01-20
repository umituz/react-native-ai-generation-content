import type {
  WizardStepConfig,
  TextInputStepConfig,
  PhotoUploadStepConfig,
  SelectionStepConfig,
} from "../../domain/entities/wizard-step.types";
import type { UploadedImage } from "../../../../../presentation/hooks/generation/useAIGenerateState";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isWizardStepConfig(value: unknown): value is WizardStepConfig {
  return isRecord(value);
}

function isUploadedImage(value: unknown): value is UploadedImage {
  if (!isRecord(value)) return false;
  return typeof value.uri === "string";
}

export function getWizardStepConfig(config: unknown): WizardStepConfig | undefined {
  if (isWizardStepConfig(config)) return config;
  return undefined;
}

export function getTextInputConfig(config: unknown): TextInputStepConfig | undefined {
  if (!isRecord(config)) return undefined;
  if (config.type === "text_input") return config as unknown as TextInputStepConfig;
  return undefined;
}

export function getPhotoUploadConfig(config: unknown): PhotoUploadStepConfig | undefined {
  if (!isRecord(config)) return undefined;
  if (config.type === "photo_upload") return config as unknown as PhotoUploadStepConfig;
  return undefined;
}

export function getUploadedImage(data: unknown): UploadedImage | undefined {
  if (isUploadedImage(data)) return data;
  return undefined;
}

export function getSelectionConfig(config: unknown): SelectionStepConfig | undefined {
  if (!isRecord(config)) return undefined;
  if (config.type === "selection") return config as unknown as SelectionStepConfig;
  return undefined;
}
