/**
 * Layout Result Render Props Types
 * Result section render props for feature layouts
 */

/**
 * Result render props
 */
export interface ResultRenderProps {
  imageUrl: string;
  imageSize: number;
}

/**
 * Processing modal render props
 */
export interface ProcessingModalRenderProps {
  visible: boolean;
  progress: number;
}

/**
 * Custom result render props (includes feature state for comparison views)
 */
export interface CustomResultRenderProps {
  processedUrl: string;
  originalImageUri: string;
  imageSize: number;
  onSave: () => void;
  onReset: () => void;
}
