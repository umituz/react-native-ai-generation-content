/**
 * useTextToVideoForm Hook - Handlers
 * Frame manipulation handlers for text-to-video form
 */

import type { FrameData } from "../../domain/types";

export function createFrameChangeHandler(
  setFrames: React.Dispatch<React.SetStateAction<FrameData[]>>,
  framesLength: number,
) {
  return (fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || fromIndex >= framesLength || toIndex < 0 || toIndex >= framesLength) {
      if (__DEV__) {
        console.warn("[TextToVideoForm] Invalid frame indices:", { fromIndex, toIndex, length: framesLength });
      }
      return;
    }

    if (fromIndex === toIndex) return;

    setFrames((prevFrames) => {
      const newFrames = [...prevFrames];
      const [movedFrame] = newFrames.splice(fromIndex, 1);
      newFrames.splice(toIndex, 0, movedFrame);
      return newFrames;
    });
  };
}

export function createFrameDeleteHandler(
  setFrames: React.Dispatch<React.SetStateAction<FrameData[]>>,
  framesLength: number,
) {
  return (index: number) => {
    if (index < 0 || index >= framesLength) {
      if (__DEV__) {
        console.warn("[TextToVideoForm] Invalid frame index:", index);
      }
      return;
    }
    setFrames((prevFrames) => prevFrames.filter((_, i) => i !== index));
  };
}
