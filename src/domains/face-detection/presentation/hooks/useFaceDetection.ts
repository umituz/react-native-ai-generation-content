/**
 * useFaceDetection Hook
 *
 * React hook for face detection functionality.
 */

import { useState, useCallback } from "react";
import type {
  FaceValidationState,
  FaceDetectionResult,
} from "../../domain/entities/FaceDetection";
import { analyzeImageForFace, type AIAnalyzerFunction } from "../../infrastructure/analyzers/faceAnalyzer";
import { isValidFace } from "../../infrastructure/validators/faceValidator";

interface UseFaceDetectionProps {
  aiAnalyzer: AIAnalyzerFunction;
  model: string;
}

interface UseFaceDetectionReturn {
  state: FaceValidationState;
  validateImage: (base64Image: string) => Promise<FaceDetectionResult>;
  isValid: boolean;
  reset: () => void;
}

const initialState: FaceValidationState = {
  isValidating: false,
  result: null,
  error: null,
};

export const useFaceDetection = ({ aiAnalyzer, model }: UseFaceDetectionProps): UseFaceDetectionReturn => {
  const [state, setState] = useState<FaceValidationState>(initialState);

  const validateImage = useCallback(async (base64Image: string) => {
    setState({ isValidating: true, result: null, error: null });

    try {
      const result = await analyzeImageForFace(base64Image, aiAnalyzer, model);
      setState({ isValidating: false, result, error: null });
      return result;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Validation failed";
      setState({ isValidating: false, result: null, error: message });
      throw error;
    }
  }, [aiAnalyzer, model]);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const isValid = state.result !== null && state.result !== undefined ? isValidFace(state.result) : false;

  return {
    state,
    validateImage,
    isValid,
    reset,
  };
};
