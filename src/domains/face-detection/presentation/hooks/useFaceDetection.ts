/**
 * useFaceDetection Hook
 *
 * React hook for face detection functionality using shared kernel.
 */

import { useCallback } from "react";
import type {
  FaceValidationState,
  FaceDetectionResult,
} from "../../domain/entities/FaceDetection";
import { analyzeImageForFace, type AIAnalyzerFunction } from "../../infrastructure/analyzers/faceAnalyzer";
import { isValidFace } from "../../infrastructure/validators/faceValidator";
import { useFeatureState } from "../../../../shared-kernel/application/hooks";
import { handleError } from "../../../../shared-kernel/infrastructure/validation";

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

export const useFaceDetection = ({ aiAnalyzer, model }: UseFaceDetectionProps): UseFaceDetectionReturn => {
  const { state, actions } = useFeatureState<FaceDetectionResult>();

  const validateImage = useCallback(async (base64Image: string): Promise<FaceDetectionResult> => {
    try {
      actions.startProcessing();

      const result = await analyzeImageForFace(base64Image, aiAnalyzer, model);

      actions.setSuccess(result);
      return result;
    } catch (error) {
      const appError = handleError(error, {
        logErrors: true,
        showUserMessage: true,
      });

      actions.setError(appError.message);
      throw error;
    }
  }, [aiAnalyzer, model, actions]);

  const reset = useCallback(() => {
    actions.reset();
  }, [actions]);

  const isValid = state.output !== null ? isValidFace(state.output) : false;

  return {
    state: {
      ...state,
      isValidating: state.isProcessing,
    },
    validateImage,
    isValid,
    reset,
  };
};
