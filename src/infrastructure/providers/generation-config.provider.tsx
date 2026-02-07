/**
 * Generation Config Provider
 * Provides app-specific AI models configuration
 * For scenarios, use configureScenarios() from scenario-registry
 */

import React, { createContext, useContext, useCallback, useMemo, type ReactNode } from "react";

declare const __DEV__: boolean;

export interface GenerationModels {
  readonly imageMultiRef?: string;
  readonly imageTextToImage?: string;
  readonly imageToVideo?: string;
  readonly textToVideo?: string;
  readonly faceSwap?: string;
  readonly memeCaption?: string;
  readonly memeImage?: string;
  readonly textToVoice?: string;
}

export interface GenerationConfigValue {
  readonly models: GenerationModels;
  readonly getModel: (featureType: keyof GenerationModels) => string;
}

const GenerationConfigContext = createContext<GenerationConfigValue | null>(
  null,
);

export interface GenerationConfigProviderProps {
  readonly children: ReactNode;
  readonly models: GenerationModels;
}

export const GenerationConfigProvider: React.FC<
  GenerationConfigProviderProps
> = ({ children, models }) => {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    const configuredModels = Object.entries(models)
      .filter(([, value]) => !!value)
      .map(([key]) => key);
    console.log("[GenerationConfigProvider] Models:", configuredModels);
  }

  const getModel = useCallback((featureType: keyof GenerationModels): string => {
    const model = models[featureType];
    if (!model) {
      const available = Object.keys(models).filter(
        (key) => models[key as keyof GenerationModels],
      );
      throw new Error(
        `Model not configured: ${featureType}. Available: ${available.join(", ") || "none"}`,
      );
    }
    return model;
  }, [models]);

  const value = useMemo<GenerationConfigValue>(() => ({ models, getModel }), [models, getModel]);

  return (
    <GenerationConfigContext.Provider value={value}>
      {children}
    </GenerationConfigContext.Provider>
  );
};

export const useGenerationConfig = (): GenerationConfigValue => {
  const context = useContext(GenerationConfigContext);
  if (!context) {
    throw new Error(
      "useGenerationConfig must be used within GenerationConfigProvider",
    );
  }
  return context;
};
