/**
 * Creations Configuration Value Object
 * Defines the configuration for creations feature
 */

import type { Creation, CreationDocument } from "../entities/Creation";
import type { FilterCategory } from "../../presentation/components/FilterBottomSheet";

export interface CreationType {
  readonly id: string;
  readonly labelKey: string;
  readonly icon: string;
}

export interface CreationsTranslations {
  readonly title: string;
  readonly subtitle: string;
  readonly empty: string;
  readonly emptyDescription: string;
  readonly deleteTitle: string;
  readonly deleteMessage: string;
  readonly photoCount: string;
  readonly filterAll: string;
  readonly filterLabel: string;
  readonly filterTitle: string;
}

/**
 * Document mapper function type
 * Allows apps to map their specific document structure to Creation
 */
export type DocumentMapper = (id: string, data: CreationDocument) => Creation;

export interface CreationsConfig {
  readonly collectionName: string;
  readonly types: readonly CreationType[];
  readonly filterCategories?: readonly FilterCategory[];
  readonly translations: CreationsTranslations;
  readonly maxThumbnails?: number;
  readonly gridColumns?: number;
  readonly documentMapper?: DocumentMapper;
}

export const DEFAULT_TRANSLATIONS: CreationsTranslations = {
  title: "creations.title",
  subtitle: "creations.subtitle",
  empty: "creations.empty",
  emptyDescription: "creations.emptyDescription",
  deleteTitle: "creations.deleteTitle",
  deleteMessage: "creations.deleteMessage",
  photoCount: "creations.photoCount",
  filterAll: "creations.filterAll",
  filterLabel: "common.filter",
  filterTitle: "common.filter",
};

export const DEFAULT_CONFIG: CreationsConfig = {
  collectionName: "creations",
  types: [],
  translations: DEFAULT_TRANSLATIONS,
  maxThumbnails: 4,
  gridColumns: 2,
};
