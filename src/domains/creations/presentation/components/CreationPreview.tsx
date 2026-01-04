/**
 * CreationPreview Component
 * Smart wrapper that delegates to CreationImagePreview or CreationVideoPreview
 * based on creation type
 */

import React from "react";
import type { CreationStatus, CreationTypeId } from "../../domain/types";
import { CreationImagePreview } from "./CreationImagePreview";
import { CreationVideoPreview } from "./CreationVideoPreview";

/** Video creation types */
const VIDEO_TYPES: CreationTypeId[] = ["text-to-video", "image-to-video"];

/** Check if creation type is a video type */
function isVideoType(type?: CreationTypeId | string): boolean {
  return VIDEO_TYPES.includes(type as CreationTypeId);
}

interface CreationPreviewProps {
  /** Preview image/thumbnail URL */
  readonly uri?: string | null;
  /** Thumbnail URL for videos (optional, if different from uri) */
  readonly thumbnailUrl?: string | null;
  /** Creation status */
  readonly status?: CreationStatus;
  /** Creation type for determining preview type */
  readonly type?: CreationTypeId | string;
  /** Aspect ratio (default: 16/9) */
  readonly aspectRatio?: number;
  /** Custom height (overrides aspectRatio) */
  readonly height?: number;
  /** Show loading indicator when in progress */
  readonly showLoadingIndicator?: boolean;
}

export function CreationPreview({
  uri,
  thumbnailUrl,
  status = "completed",
  type = "text-to-image",
  aspectRatio = 16 / 9,
  height,
  showLoadingIndicator = true,
}: CreationPreviewProps) {
  // For video types, use CreationVideoPreview
  if (isVideoType(type)) {
    return (
      <CreationVideoPreview
        thumbnailUrl={thumbnailUrl || uri}
        videoUrl={uri}
        status={status}
        type={type as CreationTypeId}
        aspectRatio={aspectRatio}
        height={height}
        showLoadingIndicator={showLoadingIndicator}
      />
    );
  }

  // For image types, use CreationImagePreview
  return (
    <CreationImagePreview
      uri={uri}
      status={status}
      type={type as CreationTypeId}
      aspectRatio={aspectRatio}
      height={height}
      showLoadingIndicator={showLoadingIndicator}
    />
  );
}
