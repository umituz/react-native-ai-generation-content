/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/use-generation';
import { FuturePredictionRequest, FuturePredictionResult } from '../domain/entities';

export interface UseFuturePredictionReturn {
    predictFuture: (request: FuturePredictionRequest) => Promise<FuturePredictionResult>;
    isPredicting: boolean;
    result: FuturePredictionResult | null;
    error: Error | null;
}

export const useFuturePrediction = (): UseFuturePredictionReturn => {
    const { generate, isGenerating, error, result: genResult } = useGeneration({ model: "deprecated" });
    const [result, setResult] = useState<FuturePredictionResult | null>(null);

    const predictFuture = useCallback(async (request: FuturePredictionRequest) => {
        await generate(request as any);

        if (genResult?.data) {
            setResult(genResult.data as FuturePredictionResult);
            return genResult.data as FuturePredictionResult;
        }

        throw new Error('Future prediction failed to return a result');
    }, [generate, genResult]);

    return {
        predictFuture,
        isPredicting: isGenerating,
        result,
        error: error as any,
    };
};
