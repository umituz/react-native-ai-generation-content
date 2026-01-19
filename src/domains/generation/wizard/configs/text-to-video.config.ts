/**
 * Text to Video Wizard Config
 * Config-driven wizard steps for text-to-video generation
 */

import type { WizardFeatureConfig } from "../domain/entities/wizard-config.types";

export const TEXT_TO_VIDEO_WIZARD_CONFIG: WizardFeatureConfig = {
  id: "text-to-video",
  name: "Text to Video",
  steps: [
    {
      id: "prompt",
      type: "text_input",
      required: true,
      placeholderKey: "textToVideo.promptPlaceholder",
      minLength: 3,
      maxLength: 500,
      multiline: true,
    },
    {
      id: "duration",
      type: "selection",
      selectionType: "duration",
      options: [
        { id: "5s", label: "5 seconds", value: 5 },
        { id: "10s", label: "10 seconds", value: 10 },
      ],
      required: true,
      defaultValue: "5s",
    },
  ],
};
