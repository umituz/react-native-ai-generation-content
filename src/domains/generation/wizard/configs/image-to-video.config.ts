/**
 * Image to Video Wizard Config
 * Config-driven wizard steps for image-to-video generation
 */

import type { WizardFeatureConfig } from "../domain/entities/wizard-config.types";

export const IMAGE_TO_VIDEO_WIZARD_CONFIG: WizardFeatureConfig = {
  id: "image-to-video",
  name: "Image to Video",
  steps: [
    {
      id: "photo_1",
      type: "photo_upload",
      label: "Your Photo",
      showFaceDetection: false,
      showPhotoTips: true,
      required: true,
    },
    {
      id: "motion_prompt",
      type: "text_input",
      required: false,
      placeholderKey: "imageToVideo.motionPromptPlaceholder",
      maxLength: 200,
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
