import type { WizardStepConfig } from "../../domain/entities/wizard-config.types";
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

export function getUploadedImage(data: unknown): UploadedImage | undefined {
  if (isUploadedImage(data)) return data;
  return undefined;
}
