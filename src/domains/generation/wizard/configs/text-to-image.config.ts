/**
 * Text to Image Wizard Config
 * Config-driven wizard steps for text-to-image generation
 */

import type { WizardFeatureConfig } from "../domain/entities/wizard-config.types";

export const TEXT_TO_IMAGE_WIZARD_CONFIG: WizardFeatureConfig = {
  id: "text-to-image",
  name: "Text to Image",
  steps: [
    {
      id: "prompt",
      type: "text_input",
      required: true,
      placeholderKey: "textToImage.promptPlaceholder",
      minLength: 3,
      maxLength: 1000,
      multiline: true,
    },
    {
      id: "style",
      type: "selection",
      selectionType: "style",
      options: [],
      required: false,
    },
  ],
};
