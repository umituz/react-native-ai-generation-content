/**
 * Solo Video Wizard Config
 * Flow: Photo → Prompt (with info about two-step generation) → Audio (optional) → Generation
 *
 * Two-step generation:
 * 1. Generate image from photo + prompt (nano-banana-2/edit)
 * 2. Generate video from that image (I2V model)
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
      id: "video_prompt",
      type: "text_input",
      titleKey: "soloVideo.prompt",
      subtitleKey: "soloVideo.promptInfo",
      placeholderKey: "soloVideo.promptPlaceholder",
      required: true,
      minLength: 3,
      maxLength: 500,
      multiline: true,
    },
    {
      id: "background_audio",
      type: "audio_picker",
      titleKey: "soloVideo.audioTitle",
      subtitleKey: "soloVideo.audioSubtitle",
      required: false,
      maxFileSizeMB: 20,
    },
  ],
};
