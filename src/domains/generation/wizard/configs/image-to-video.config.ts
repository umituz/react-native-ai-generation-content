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
      id: "duration",
      type: "selection",
      titleKey: "generation.duration.title",
      selectionType: "duration",
      options: [{ id: "4s", label: "4 seconds", value: 4 }],
      required: true,
      defaultValue: "4s",
    },
  ],
};
