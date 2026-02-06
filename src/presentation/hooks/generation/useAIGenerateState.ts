import { useState, useCallback } from "react";

export enum AIGenerateStep {
  INFO = "INFO",
  UPLOAD_1 = "UPLOAD_1",
  UPLOAD_2 = "UPLOAD_2",
  CONFIG = "CONFIG",
  GENERATING = "GENERATING",
  RESULT = "RESULT",
}

export interface UploadedImage {
  uri: string;
  previewUrl?: string;
  name?: string;
  width?: number;
  height?: number;
  fileSize?: number;
}

export function useAIGenerateState() {
  const [currentStep, setCurrentStep] = useState<AIGenerateStep>(
    AIGenerateStep.INFO,
  );
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("modern");
  const [selectedDuration, setSelectedDuration] = useState(15);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const toggleAdvanced = useCallback(() => {
    setShowAdvanced((prev) => !prev);
  }, []);

  const goToStep = useCallback((step: AIGenerateStep) => {
    setCurrentStep(step);
  }, []);

  const setStepImage = useCallback((index: number, image: UploadedImage) => {
    setImages((prev) => {
      const next = [...prev];
      next[index] = image;
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setImages([]);
    setPrompt("");
    setSelectedStyle("modern");
    setSelectedDuration(15);
    setIsGenerating(false);
    setProgress(0);
    setResult(null);
    setCurrentStep(AIGenerateStep.INFO);
  }, []);

  return {
    currentStep,
    setCurrentStep: goToStep,
    images,
    setImages,
    setStepImage,
    prompt,
    setPrompt,
    selectedStyle,
    setSelectedStyle,
    selectedDuration,
    setSelectedDuration,
    showAdvanced,
    toggleAdvanced,
    isGenerating,
    setIsGenerating,
    progress,
    setProgress,
    result,
    setResult,
    reset,
  };
}
