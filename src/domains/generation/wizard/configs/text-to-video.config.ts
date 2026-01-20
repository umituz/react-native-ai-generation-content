/**
 * Text to Video Wizard Config
 * Config-driven wizard steps for text-to-video generation
 */

import type { WizardFeatureConfig } from "../domain/entities/wizard-feature.types";

export const TEXT_TO_VIDEO_WIZARD_CONFIG: WizardFeatureConfig = {
  id: "text-to-video",
  name: "Text to Video",
  steps: [
    {
      id: "prompt",
      type: "text_input",
      required: true,
      titleKey: "textToVideo.hero.title",
      subtitleKey: "textToVideo.hero.subtitle",
      placeholderKey: "textToVideo.prompt.placeholder",
      minLength: 3,
      maxLength: 500,
      multiline: true,
    },
    {
      id: "resolution",
      type: "selection",
      titleKey: "generation.resolution.title",
      selectionType: "resolution",
      options: [
        { id: "720p", label: "720p", value: "720p" },
        { id: "default", label: "Default", value: "default" },
      ],
      required: true,
      defaultValue: "720p",
    },
    {
      id: "aspect_ratio",
      type: "selection",
      titleKey: "generation.aspectRatio.title",
      selectionType: "aspect_ratio",
      options: [
        { id: "16:9", label: "16:9", value: "16:9" },
        { id: "9:16", label: "9:16", value: "9:16" },
      ],
      required: true,
      defaultValue: "16:9",
    },
    {
      id: "duration",
      type: "selection",
      titleKey: "generation.duration.title",
      selectionType: "duration",
      options: [
        { id: "4s", label: "4 seconds", value: 4 },
        { id: "8s", label: "8 seconds", value: 8 },
        { id: "12s", label: "12 seconds", value: 12 },
      ],
      required: true,
      defaultValue: "4s",
    },
  ],
};
