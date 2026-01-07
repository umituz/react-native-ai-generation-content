/**
 * CreationsFilterBar Helper Functions
 */

import type {
  FilterButton,
  MediaFilterLabels,
  StatusFilterLabels,
} from "./CreationsFilterBar.types";

/**
 * Helper to create filter buttons from filter state
 */
export function createMediaFilterButtons(
  activeFilter: string,
  onSelect: (filter: string) => void,
  labels: MediaFilterLabels
): FilterButton[] {
  return [
    {
      id: "all",
      label: labels.all,
      icon: "grid",
      active: activeFilter === "all",
      onPress: () => onSelect("all"),
    },
    {
      id: "image",
      label: labels.images,
      icon: "image",
      active: activeFilter === "image",
      onPress: () => onSelect("image"),
    },
    {
      id: "video",
      label: labels.videos,
      icon: "film",
      active: activeFilter === "video",
      onPress: () => onSelect("video"),
    },
    {
      id: "voice",
      label: labels.voice,
      icon: "mic",
      active: activeFilter === "voice",
      onPress: () => onSelect("voice"),
    },
  ];
}

/**
 * Helper to create status filter buttons
 */
export function createStatusFilterButtons(
  activeFilter: string,
  onSelect: (filter: string) => void,
  labels: StatusFilterLabels
): FilterButton[] {
  return [
    {
      id: "all",
      label: labels.all,
      icon: "options",
      active: activeFilter === "all",
      onPress: () => onSelect("all"),
    },
    {
      id: "completed",
      label: labels.completed,
      icon: "checkmark-circle",
      active: activeFilter === "completed",
      onPress: () => onSelect("completed"),
    },
    {
      id: "processing",
      label: labels.processing,
      icon: "refresh",
      active: activeFilter === "processing",
      onPress: () => onSelect("processing"),
    },
    {
      id: "pending",
      label: labels.pending,
      icon: "time",
      active: activeFilter === "pending",
      onPress: () => onSelect("pending"),
    },
    {
      id: "failed",
      label: labels.failed,
      icon: "close-circle",
      active: activeFilter === "failed",
      onPress: () => onSelect("failed"),
    },
  ];
}
