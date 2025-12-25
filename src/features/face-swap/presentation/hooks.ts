/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/use-generation';
import { FaceSwapRequest, FaceSwapResult } from '../domain/entities';

export interface UseFaceSwapReturn {
    swapFace: (request: FaceSwapRequest) => Promise<FaceSwapResult>;
    isSwapping: boolean;
    result: FaceSwapResult | null;
    error: Error | null;
}

export const useFaceSwap = (): UseFaceSwapReturn => {
    // @ts-ignore - Deprecated feature, kept for backward compatibility
    const { generate, isGenerating, error, result: genResult } = useGeneration<FaceSwapResult>({ model: 'face-swap' });
    const [result, setResult] = useState<FaceSwapResult | null>(null);

    const swapFace = useCallback(async (request: FaceSwapRequest) => {
        // @ts-ignore - Deprecated feature
        await generate(request);

        if (genResult?.data) {
            setResult(genResult.data as FaceSwapResult);
            return genResult.data as FaceSwapResult;
        }

        throw new Error('Face swap failed to return a result');
    }, [generate, genResult]);

    return {
        swapFace,
        isSwapping: isGenerating,
        result,
        error: error as any,
    };
};
