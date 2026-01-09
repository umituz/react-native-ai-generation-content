/**
 * useLoveMessageGenerator Hook
 * Business logic for Love Message Generation
 */

import { useState, useCallback, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { MessageType, MessageTone } from "../../domain/types";
import { generateLoveMessage } from "../../infrastructure/services/LoveMessageService";
import { PartnerProfileRepository } from "../../infrastructure/persistence/PartnerProfileRepository";

export enum GeneratorStep {
  PARTNER = 0,
  VIBE = 1,
  DETAILS = 2,
  RESULT = 3
}

export const useLoveMessageGenerator = (config: {
  onBack: () => void;
  initialType?: MessageType;
}) => {
  const isFocused = useIsFocused();

  const [currentStep, setCurrentStep] = useState<GeneratorStep>(GeneratorStep.PARTNER);
  const [partnerName, setPartnerName] = useState("");
  const [selectedType, setSelectedType] = useState(config.initialType || MessageType.ROMANTIC);
  const [selectedTone, setSelectedTone] = useState(MessageTone.ROMANTIC);
  const [details, setDetails] = useState("");
  const [useProfile, setUseProfile] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isFocused) {
      const checkProfile = async () => {
        const profile = await PartnerProfileRepository.getProfile();
        if (profile) {
          setHasProfile(true);
          if (!partnerName) setPartnerName(profile.name);
        } else {
          setHasProfile(false);
        }
      };
      checkProfile();
    }
  }, [isFocused, partnerName]);

  const handleNext = useCallback(() => {
    if (currentStep < GeneratorStep.DETAILS) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      config.onBack();
    }
  }, [currentStep, config]);

  const handleGenerate = useCallback(async () => {
    if (!partnerName.trim() || isGenerating) return;

    try {
      setIsGenerating(true);
      const message = await generateLoveMessage({
        partnerName,
        type: selectedType,
        tone: selectedTone,
        details,
        usePartnerProfile: useProfile,
      });

      setGeneratedMessage(message);
      setCurrentStep(GeneratorStep.RESULT);
    } catch {
      // Error handled in usecase
    } finally {
      setIsGenerating(false);
    }
  }, [partnerName, selectedType, selectedTone, details, useProfile, isGenerating]);

  const startOver = useCallback(() => {
    setCurrentStep(GeneratorStep.PARTNER);
    setGeneratedMessage("");
  }, []);

  return {
    currentStep,
    partnerName,
    setPartnerName,
    selectedType,
    setSelectedType,
    selectedTone,
    setSelectedTone,
    details,
    setDetails,
    useProfile,
    setUseProfile,
    hasProfile,
    generatedMessage,
    isGenerating,
    handleNext,
    handleBack,
    handleGenerate,
    startOver,
  };
};
