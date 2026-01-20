/**
 * Wizard Step Factories
 * Factory functions for creating wizard step configurations
 */

import type { WizardFeatureConfig } from "../../generation/wizard/domain/entities/wizard-feature.types";
import { WizardInputType, type WizardConfigFactory } from "./wizard-input.types";

function createDualImageConfig(scenarioId: string): WizardFeatureConfig {
  return {
    id: scenarioId,
    name: scenarioId,
    steps: [
      {
        id: "photo_1",
        type: "photo_upload",
        titleKey: "photoUpload.first.title",
        subtitleKey: "photoUpload.first.subtitle",
        showFaceDetection: true,
        showPhotoTips: true,
        required: true,
      },
      {
        id: "photo_2",
        type: "photo_upload",
        titleKey: "photoUpload.second.title",
        subtitleKey: "photoUpload.second.subtitle",
        showFaceDetection: true,
        showPhotoTips: true,
        required: true,
      },
    ],
  };
}

function createSingleImageConfig(scenarioId: string): WizardFeatureConfig {
  return {
    id: scenarioId,
    name: scenarioId,
    steps: [
      {
        id: "photo_1",
        type: "photo_upload",
        titleKey: "photoUpload.single.title",
        subtitleKey: "photoUpload.single.subtitle",
        showFaceDetection: false,
        showPhotoTips: true,
        required: true,
      },
    ],
  };
}

function createTextInputConfig(scenarioId: string): WizardFeatureConfig {
  return {
    id: scenarioId,
    name: scenarioId,
    steps: [
      {
        id: "text_input",
        type: "text_input",
        titleKey: "textInput.title",
        subtitleKey: "textInput.subtitle",
        placeholderKey: "textInput.placeholder",
        minLength: 10,
        maxLength: 500,
        multiline: true,
        required: true,
      },
    ],
  };
}

function createDualImageFaceConfig(scenarioId: string): WizardFeatureConfig {
  return {
    id: scenarioId,
    name: scenarioId,
    steps: [
      {
        id: "photo_1",
        type: "photo_upload",
        titleKey: "photoUpload.source.title",
        subtitleKey: "photoUpload.source.subtitle",
        showFaceDetection: true,
        showPhotoTips: true,
        required: true,
      },
      {
        id: "photo_2",
        type: "photo_upload",
        titleKey: "photoUpload.target.title",
        subtitleKey: "photoUpload.target.subtitle",
        showFaceDetection: false,
        showPhotoTips: true,
        required: true,
      },
    ],
  };
}

/**
 * Registry of config factories by input type
 */
export const CONFIG_FACTORIES: Record<WizardInputType, WizardConfigFactory> = {
  [WizardInputType.DUAL_IMAGE]: createDualImageConfig,
  [WizardInputType.SINGLE_IMAGE]: createSingleImageConfig,
  [WizardInputType.TEXT_INPUT]: createTextInputConfig,
  [WizardInputType.DUAL_IMAGE_FACE]: createDualImageFaceConfig,
};

/**
 * Get factory for a specific input type
 */
export function getConfigFactory(inputType: WizardInputType): WizardConfigFactory {
  return CONFIG_FACTORIES[inputType];
}
