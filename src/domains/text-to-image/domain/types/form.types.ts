/**
 * Text-to-Image Form Types
 * Generic form state types for text-to-image generation
 */

export type AspectRatio = "16:9" | "9:16" | "1:1";

export type ImageSize =
  | "512x512"
  | "768x768"
  | "1024x1024"
  | "1024x1792"
  | "1792x1024";

export type OutputFormat = "png" | "jpeg";

export type NumImages = 1 | 2 | 3 | 4;

export interface StyleOption {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface TextToImageFormState {
  prompt: string;
  aspectRatio: AspectRatio;
  size: ImageSize;
  numImages: NumImages;
  negativePrompt: string;
  guidanceScale: number;
  selectedModel: string | null;
  outputFormat: OutputFormat;
  selectedStyle: string;
}

export interface TextToImageFormActions {
  setPrompt: (prompt: string) => void;
  setAspectRatio: (ratio: AspectRatio) => void;
  setSize: (size: ImageSize) => void;
  setNumImages: (num: NumImages) => void;
  setNegativePrompt: (prompt: string) => void;
  setGuidanceScale: (scale: number) => void;
  setSelectedModel: (model: string | null) => void;
  setOutputFormat: (format: OutputFormat) => void;
  setSelectedStyle: (style: string) => void;
  reset: () => void;
}

export interface TextToImageFormDefaults {
  aspectRatio?: AspectRatio;
  size?: ImageSize;
  numImages?: NumImages;
  guidanceScale?: number;
  outputFormat?: OutputFormat;
  selectedStyle?: string;
}
