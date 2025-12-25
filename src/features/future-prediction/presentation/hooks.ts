/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/useGeneration';
import { FuturePredictionRequest, FuturePredictionResult } from '../domain/entities';

export interface UseFuturePredictionReturn {
    predictFuture: (request: FuturePredictionRequest) => Promise<FuturePredictionResult>;
    isPredicting: boolean;
    result: FuturePredictionResult | null;
    error: Error | null;
}

export const useFuturePrediction = (): UseFuturePredictionReturn => {
    // @ts-expect-error - Generic constraints issue
    const { generate, isGenerating, error } = useGeneration<FuturePredictionRequest, FuturePredictionResult>();
    const [result, setResult] = useState<FuturePredictionResult | null>(null);

    const predictFuture = useCallback(async (request: FuturePredictionRequest) => {
        // @ts-expect-error - Generic constraints issue
        const response = await generate('future-prediction', request);

        if (response) {
            setResult(response as FuturePredictionResult);
            return response as FuturePredictionResult;
        }

        throw new Error('Future prediction failed to return a result');
    }, [generate]);

    return {
        predictFuture,
        isPredicting: isGenerating,
        result,
        error: error as any,
    };
};
