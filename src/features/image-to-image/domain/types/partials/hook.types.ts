/**
 * Image Feature Hook Types
 * Hook interfaces for all image processing features
 */

import type { SingleImageConfig, DualImageConfig } from "./config.types";
import type { BaseSingleImageState, BaseDualImageState } from "./state.types";

/**
 * Base hook props for single image features
 */
export interface BaseSingleImageHookProps<
  TConfig extends SingleImageConfig = SingleImageConfig,
> {
  config: TConfig;
  onSelectImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  /** Called before processing starts. Return false to cancel. */
  onBeforeProcess?: () => Promise<boolean>;
}

/**
 * Base hook props for dual image features
 */
export interface BaseDualImageHookProps<
  TConfig extends DualImageConfig = DualImageConfig,
> {
  config: TConfig;
  onSelectSourceImage: () => Promise<string | null>;
  onSelectTargetImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  /** Called before processing starts. Return false to cancel. */
  onBeforeProcess?: () => Promise<boolean>;
}

/**
 * Base hook return for single image features
 */
export interface BaseSingleImageHookReturn extends BaseSingleImageState {
  selectImage: () => Promise<void>;
  process: () => Promise<void>;
  save: () => Promise<void>;
  reset: () => void;
}

/**
 * Base hook return for dual image features
 */
export interface BaseDualImageHookReturn extends BaseDualImageState {
  selectSourceImage: () => Promise<void>;
  selectTargetImage: () => Promise<void>;
  process: () => Promise<void>;
  save: () => Promise<void>;
  reset: () => void;
}
