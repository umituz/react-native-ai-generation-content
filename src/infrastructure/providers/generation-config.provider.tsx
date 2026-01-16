/**
 * Generation Config Provider
 * Provides app-specific configuration to the package
 * NO hard-coded models, everything comes from app!
 */

import React, { createContext, useContext, type ReactNode } from "react";

declare const __DEV__: boolean;

// ============================================================================
// Types
// ============================================================================

export interface GenerationModels {
  /** Image generation with face identity preservation (couple photos) */
  readonly imageCoupleMultiRef: string;
  /** Text-to-image generation */
  readonly imageTextToImage: string;
  /** Image-to-video generation */
  readonly imageToVideo: string;
  /** Text-to-video generation */
  readonly textToVideo: string;
  /** AI Kiss video */
  readonly aiKiss?: string;
  /** AI Hug video */
  readonly aiHug?: string;
  /** Face swap */
  readonly faceSwap?: string;
  /** Meme generation (caption) */
  readonly memeCaption?: string;
  /** Meme generation (image) */
  readonly memeImage?: string;
  /** Text to voice */
  readonly textToVoice?: string;
}

export interface GenerationConfigContextValue {
  /** AI models configuration from app */
  readonly models: GenerationModels;
  /** Get model for specific feature type */
  readonly getModel: (featureType: keyof GenerationModels) => string;
}

// ============================================================================
// Context
// ============================================================================

const GenerationConfigContext = createContext<GenerationConfigContextValue | null>(null);

// ============================================================================
// Provider
// ============================================================================

export interface GenerationConfigProviderProps {
  readonly children: ReactNode;
  readonly models: GenerationModels;
}

export const GenerationConfigProvider: React.FC<GenerationConfigProviderProps> = ({
  children,
  models,
}) => {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[GenerationConfigProvider] Initialized with models:", {
      imageCoupleMultiRef: models.imageCoupleMultiRef,
      imageTextToImage: models.imageTextToImage,
      imageToVideo: models.imageToVideo,
      textToVideo: models.textToVideo,
    });
  }

  const getModel = (featureType: keyof GenerationModels): string => {
    const model = models[featureType];
    if (!model) {
      throw new Error(
        `Model not configured for feature: ${featureType}. Please configure in app's GenerationConfigProvider.`
      );
    }
    return model;
  };

  const value: GenerationConfigContextValue = {
    models,
    getModel,
  };

  return (
    <GenerationConfigContext.Provider value={value}>
      {children}
    </GenerationConfigContext.Provider>
  );
};

// ============================================================================
// Hook
// ============================================================================

export const useGenerationConfig = (): GenerationConfigContextValue => {
  const context = useContext(GenerationConfigContext);

  if (!context) {
    throw new Error(
      "useGenerationConfig must be used within GenerationConfigProvider. " +
      "Wrap your app with <GenerationConfigProvider models={{...}}>"
    );
  }

  return context;
};
