/**
 * ImageSelectionGrid Type Definitions
 */

export interface ImageSelectionGridTranslations {
  selectedImages: string;
  selectImages: string;
  chooseUpTo: string;
  addMore: string;
}

export interface ImageSelectionGridProps {
  images: string[];
  maxImages: number;
  onSelectImages: () => void;
  onRemoveImage: (index: number) => void;
  translations: ImageSelectionGridTranslations;
}
