/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/useGeneration';
import { FaceSwapRequest, FaceSwapResult } from '../domain/entities';

export interface UseFaceSwapReturn {
    swapFace: (request: FaceSwapRequest) => Promise<FaceSwapResult>;
    isSwapping: boolean;
    result: FaceSwapResult | null;
    error: Error | null;
}

export const useFaceSwap = (): UseFaceSwapReturn => {
    // @ts-expect-error - Generic constraints issue
    const { generate, isGenerating, error } = useGeneration<FaceSwapRequest, FaceSwapResult>();
    const [result, setResult] = useState<FaceSwapResult | null>(null);

    const swapFace = useCallback(async (request: FaceSwapRequest) => {
        // @ts-expect-error - Generic constraints issue
        const response = await generate('face-swap', request);

        if (response) {
            setResult(response as FaceSwapResult);
            return response as FaceSwapResult;
        }

        throw new Error('Face swap failed to return a result');
    }, [generate]);

    return {
        swapFace,
        isSwapping: isGenerating,
        result,
        error: error as any,
    };
};
