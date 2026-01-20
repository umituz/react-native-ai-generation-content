/**
 * Text to Image Wizard Config
 * Config-driven wizard steps for text-to-image generation
 */

import type { WizardFeatureConfig } from "../domain/entities/wizard-feature.types";
import type { TextInputStepConfig } from "../domain/entities/wizard-step.types";

const promptStep: TextInputStepConfig = {
  id: "prompt",
  type: "text_input",
  required: true,
  titleKey: "text2image.hero.title",
  subtitleKey: "text2image.hero.subtitle",
  placeholderKey: "text2image.prompt.placeholder",
  minLength: 3,
  maxLength: 1000,
  multiline: true,
};

export const TEXT_TO_IMAGE_WIZARD_CONFIG: WizardFeatureConfig = {
  id: "text-to-image",
  name: "Text to Image",
  steps: [promptStep],
};
