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
        { id: "480p", label: "Standard (480p)", value: "480p" },
        { id: "720p", label: "HD (720p)", value: "720p" },
      ],
      required: true,
      defaultValue: "480p",
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
      defaultValue: "9:16",
    },
    {
      id: "duration",
      type: "selection",
      titleKey: "generation.duration.title",
      selectionType: "duration",
      layout: "list",
      options: [
        { id: "4s", label: "4 seconds", value: 4 },
        { id: "5s", label: "5 seconds", value: 5 },
        { id: "6s", label: "6 seconds", value: 6 },
      ],
      required: true,
      defaultValue: "4s",
    },
  ],
};
