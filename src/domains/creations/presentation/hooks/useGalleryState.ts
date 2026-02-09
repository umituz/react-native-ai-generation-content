/**
 * useGalleryState Hook
 * Manages the state for the gallery screen including selection and media URL handling
 */

import { useState, useEffect, useRef, useMemo } from "react";
import type { Creation } from "../../domain/entities/Creation";
import { getPreviewUrl } from "../../domain/utils";

export interface GalleryStateOptions {
  initialCreationId?: string;
  creations: Creation[] | undefined;
}

export interface GalleryStateReturn {
  selectedCreation: Creation | null;
  showRatingPicker: boolean;
  selectedImageUrl: string | undefined;
  selectedVideoUrl: string | undefined;
  hasMediaToShow: boolean;
  showPreview: boolean;
  setSelectedCreation: (creation: Creation | null) => void;
  setShowRatingPicker: (show: boolean) => void;
}

export function useGalleryState(options: GalleryStateOptions): GalleryStateReturn {
  const { initialCreationId, creations } = options;
  const [selectedCreation, setSelectedCreation] = useState<Creation | null>(null);
  const [showRatingPicker, setShowRatingPicker] = useState(false);
  const hasAutoSelectedRef = useRef(false);

  // Auto-select creation when initialCreationId is provided
  useEffect(() => {
    if (initialCreationId && creations && creations.length > 0 && !hasAutoSelectedRef.current) {
      const creation = creations.find((c) => c.id === initialCreationId);
      if (creation) {
        hasAutoSelectedRef.current = true;
        setSelectedCreation(creation);
      }
    }
  }, [initialCreationId, creations]);

  // Extract media URLs from selected creation
  const selectedImageUrl = useMemo(
    () => selectedCreation ? (getPreviewUrl(selectedCreation.output) || selectedCreation.uri) : undefined,
    [selectedCreation]
  );

  const selectedVideoUrl = useMemo(
    () => selectedCreation?.output?.videoUrl,
    [selectedCreation]
  );

  const hasMediaToShow = useMemo(
    () => Boolean(selectedImageUrl || selectedVideoUrl),
    [selectedImageUrl, selectedVideoUrl]
  );

  const showPreview = useMemo(
    () => Boolean(selectedCreation && hasMediaToShow),
    [selectedCreation, hasMediaToShow]
  );

  return {
    selectedCreation,
    showRatingPicker,
    selectedImageUrl,
    selectedVideoUrl,
    hasMediaToShow,
    showPreview,
    setSelectedCreation,
    setShowRatingPicker,
  };
}
