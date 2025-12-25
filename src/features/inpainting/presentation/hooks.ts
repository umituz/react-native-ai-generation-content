/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/useGeneration';
import { InpaintingRequest, InpaintingResult } from '../domain/entities';

export interface UseInpaintingReturn {
    inpaint: (request: InpaintingRequest) => Promise<InpaintingResult>;
    isInpainting: boolean;
    result: InpaintingResult | null;
    error: Error | null;
}

export const useInpainting = (): UseInpaintingReturn => {
    // @ts-expect-error - Generic constraints issue
    const { generate, isGenerating, error } = useGeneration<InpaintingRequest, InpaintingResult>();
    const [result, setResult] = useState<InpaintingResult | null>(null);

    const inpaint = useCallback(async (request: InpaintingRequest) => {
        // @ts-expect-error - Generic constraints issue
        const response = await generate('inpainting', request);

        if (response) {
            setResult(response as InpaintingResult);
            return response as InpaintingResult;
        }

        throw new Error('Inpainting failed to return a result');
    }, [generate]);

    return {
        inpaint,
        isInpainting: isGenerating,
        result,
        error: error as any,
    };
};
