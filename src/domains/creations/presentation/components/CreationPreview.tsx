/**
 * CreationPreview Component
 * Smart wrapper that delegates to CreationImagePreview or CreationVideoPreview
 * based on output content type (not creation type)
 */

import React from "react";
import { isVideoUrl } from "@umituz/react-native-design-system";
import type { CreationStatus, CreationTypeId } from "../../domain/types";
import { CreationImagePreview } from "./CreationImagePreview";
import { CreationVideoPreview } from "./CreationVideoPreview";

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
  // Determine preview type based on URI content, not creation type
  // This handles scenario-based videos (solo_martial_artist, ski_resort, etc.)
  const hasVideoContent = uri && isVideoUrl(uri);

  // For video content, use CreationVideoPreview
  if (hasVideoContent) {
    return (
      <CreationVideoPreview
        thumbnailUrl={thumbnailUrl}
        videoUrl={uri}
        status={status}
        type={type as CreationTypeId}
        aspectRatio={aspectRatio}
        height={height}
        showLoadingIndicator={showLoadingIndicator}
      />
    );
  }

  // For image content, use CreationImagePreview
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
