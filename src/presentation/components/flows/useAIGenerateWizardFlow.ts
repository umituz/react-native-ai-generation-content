
import { useMemo, useCallback, useEffect } from "react";
import { useAIGenerateState, AIGenerateStep } from "../../hooks/generation/useAIGenerateState";
import { getAIFeatureConfig, hasAIFeature } from "../../screens/ai-feature/registry";

interface UseAIGenerateWizardFlowProps {
  featureType: string;
  onGenerate: (data: any) => Promise<string | null>;
  onBack?: () => void;
}

export function useAIGenerateWizardFlow({
  featureType,
  onGenerate,
  onBack: onBackProp,
}: UseAIGenerateWizardFlowProps) {
  const state = useAIGenerateState();
  const { 
    currentStep, setCurrentStep, isGenerating, setIsGenerating, 
    setProgress, setResult, images, prompt, selectedStyle, 
    selectedDuration, setStepImage 
  } = state;

  const imageCountRequired = useMemo(() => {
    if (!featureType || !hasAIFeature(featureType)) return 0;
    const config = getAIFeatureConfig(featureType as any);
    if (config.mode === "dual" || config.mode === "dual-video") return 2;
    if (config.mode === "single" || config.mode === "single-with-prompt")
      return 1;
    return 0;
  }, [featureType]);

  useEffect(() => {
    if (currentStep === AIGenerateStep.INFO) {
      if (imageCountRequired > 0) {
        setCurrentStep(AIGenerateStep.UPLOAD_1);
      } else {
        setCurrentStep(AIGenerateStep.CONFIG);
      }
    }
  }, [featureType, imageCountRequired, setCurrentStep, currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep === AIGenerateStep.UPLOAD_1) {
      onBackProp?.();
    } else if (currentStep === AIGenerateStep.UPLOAD_2) {
      setCurrentStep(AIGenerateStep.UPLOAD_1);
    } else if (currentStep === AIGenerateStep.CONFIG) {
      if (imageCountRequired > 1) {
        setCurrentStep(AIGenerateStep.UPLOAD_2);
      } else if (imageCountRequired > 0) {
        setCurrentStep(AIGenerateStep.UPLOAD_1);
      } else {
        onBackProp?.();
      }
    } else if (currentStep === AIGenerateStep.RESULT) {
      setCurrentStep(AIGenerateStep.CONFIG);
    }
  }, [currentStep, setCurrentStep, imageCountRequired, onBackProp]);

  const handleNext = useCallback(() => {
    if (currentStep === AIGenerateStep.UPLOAD_1) {
      if (imageCountRequired > 1) {
        setCurrentStep(AIGenerateStep.UPLOAD_2);
      } else {
        setCurrentStep(AIGenerateStep.CONFIG);
      }
    } else if (currentStep === AIGenerateStep.UPLOAD_2) {
      setCurrentStep(AIGenerateStep.CONFIG);
    }
  }, [currentStep, setCurrentStep, imageCountRequired]);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    setProgress(10);
    setCurrentStep(AIGenerateStep.GENERATING);

    try {
      const output = await onGenerate({
        prompt,
        style: selectedStyle,
        duration: selectedDuration,
        images,
      });
      setResult(output);
      setCurrentStep(AIGenerateStep.RESULT);
    } catch (error) {
      console.error("Generation failed", error);
      setCurrentStep(AIGenerateStep.CONFIG);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  }, [onGenerate, prompt, selectedStyle, selectedDuration, images, setCurrentStep, setIsGenerating, setProgress, setResult]);

  return {
    ...state,
    imageCountRequired,
    handleBack,
    handleNext,
    handleGenerate,
  };
}
