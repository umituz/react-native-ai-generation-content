/**
 * Solo Video Wizard Config
 * Flow: Photo → Video Settings (resolution, aspect_ratio, quality_mode, duration) → Generation
 *
 * Two-step generation:
 * 1. Generate image from photo + prompt (p-image-edit)
 * 2. Generate video from that image (p-video)
 */

import type { WizardFeatureConfig } from "../domain/entities/wizard-feature.types";

export const SOLO_VIDEO_WIZARD_CONFIG: WizardFeatureConfig = {
  id: "solo-video",
  name: "Solo Video",
  steps: [
    {
      id: "photo_1",
      type: "photo_upload",
      titleKey: "soloVideo.selectPhoto",
      subtitleKey: "soloVideo.selectPhotoHint",
      showFaceDetection: false,
      showPhotoTips: true,
      required: true,
    },
    {
      id: "quality_mode",
      type: "selection",
      titleKey: "soloVideo.qualityMode.title",
      subtitleKey: "soloVideo.qualityMode.subtitle",
      selectionType: "custom",
      options: [
        {
          id: "normal",
          label: "Normal Quality",
          value: "normal",
        },
        {
          id: "draft",
          label: "Draft Mode (Faster, Cheaper)",
          value: "draft",
        },
      ],
      required: true,
      defaultValue: "draft", // Default to draft mode for faster generation and reduced timeouts
      layout: "list",
    },
  ],
};
