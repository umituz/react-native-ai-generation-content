/**
 * Image to Video Wizard Config
 * Config-driven wizard steps for image-to-video generation
 */

import type { WizardFeatureConfig } from "../domain/entities/wizard-feature.types";

export const IMAGE_TO_VIDEO_WIZARD_CONFIG: WizardFeatureConfig = {
  id: "image-to-video",
  name: "Image to Video",
  steps: [
    {
      id: "photo_1",
      type: "photo_upload",
      titleKey: "imageToVideo.selectPhoto",
      subtitleKey: "imageToVideo.selectPhotoHint",
      showFaceDetection: false,
      showPhotoTips: true,
      required: true,
    },
    {
      id: "motion_prompt",
      type: "text_input",
      titleKey: "imageToVideo.motionPrompt",
      placeholderKey: "imageToVideo.motionPromptPlaceholder",
      required: false,
      maxLength: 200,
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
