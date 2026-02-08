/**
 * AutoSkipPreview Component
 * Automatically continues to the next step on mount
 * Used in wizard flows to skip the preview step
 */

import { useEffect, useRef } from "react";

export interface AutoSkipPreviewProps {
  readonly onContinue: () => void;
}

export const AutoSkipPreview: React.FC<AutoSkipPreviewProps> = ({ onContinue }) => {
  const hasContinued = useRef(false);

  useEffect(() => {
    if (!hasContinued.current) {
      hasContinued.current = true;
      onContinue();
    }
  }, [onContinue]);

  return null;
};
