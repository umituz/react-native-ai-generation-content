/**
 * ModelSelector Component
 * Generic model selection dropdown for AI generation
 * Package: @umituz/react-native-ai-generation-content
 *
 * @description
 * Universal model selector component that works with any AI model type.
 * Designed for 100+ applications with different model requirements.
 *
 * @example
 * ```tsx
 * <ModelSelector
 *   models={videoModels}
 *   selectedModel={selected}
 *   onSelectModel={(id) => setSelected(id)}
 *   label="Select Video Model"
 * />
 * ```
 */

import React, { useState } from "react";
import { ModelSelectorTrigger } from "./ModelSelectorTrigger";
import { ModelSelectorModal } from "./ModelSelectorModal";

export interface ModelOption {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly cost?: number;
  readonly badge?: string;
}

export interface ModelSelectorProps {
  readonly models: ModelOption[];
  readonly selectedModel: ModelOption | null;
  readonly onSelectModel: (modelId: string) => void;
  readonly label?: string;
  readonly isLoading?: boolean;
  readonly translations?: {
    readonly selectModel?: string;
    readonly credits?: string;
    readonly close?: string;
  };
}

/**
 * ModelSelector - Orchestrates trigger and modal components
 * Following SOLID principles: Single Responsibility
 */
export const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  selectedModel,
  onSelectModel,
  label,
  isLoading = false,
  translations = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    selectModel = "Select Model",
    credits = "credits",
    close = "Close",
  } = translations;

  const handleSelect = (modelId: string) => {
    onSelectModel(modelId);
    setIsOpen(false);
  };

  const displayName = selectedModel?.name || label || selectModel;

  return (
    <>
      <ModelSelectorTrigger
        displayName={displayName}
        isLoading={isLoading}
        onPress={() => setIsOpen(true)}
      />

      <ModelSelectorModal
        isOpen={isOpen}
        models={models}
        selectedModel={selectedModel}
        onClose={() => setIsOpen(false)}
        onSelect={handleSelect}
        selectModelLabel={selectModel}
        creditsLabel={credits}
        closeLabel={close}
      />
    </>
  );
};
