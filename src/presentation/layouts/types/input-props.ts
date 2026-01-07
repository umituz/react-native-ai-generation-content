/**
 * Layout Input Render Props Types
 * Input section render props for feature layouts
 */

/**
 * Input render props for single image
 */
export interface SingleImageInputRenderProps {
  imageUri: string | null;
  onSelect: () => void;
  isDisabled: boolean;
  isProcessing: boolean;
}

/**
 * Input render props for dual image
 */
export interface DualImageInputRenderProps {
  sourceImageUri: string | null;
  targetImageUri: string | null;
  onSelectSource: () => void;
  onSelectTarget: () => void;
  isDisabled: boolean;
  isProcessing: boolean;
}

/**
 * Input render props for single image with prompt
 */
export interface SingleImageWithPromptInputRenderProps extends SingleImageInputRenderProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
}
