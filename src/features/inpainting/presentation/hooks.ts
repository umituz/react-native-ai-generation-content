/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/use-generation';
import { InpaintingRequest, InpaintingResult } from '../domain/entities';

export interface UseInpaintingReturn {
    inpaint: (request: InpaintingRequest) => Promise<InpaintingResult>;
    isInpainting: boolean;
    result: InpaintingResult | null;
    error: Error | null;
}

export const useInpainting = (): UseInpaintingReturn => {
    const { generate, isGenerating, error, result: genResult } = useGeneration({ model: "deprecated" });
    const [result, setResult] = useState<InpaintingResult | null>(null);

    const inpaint = useCallback(async (request: InpaintingRequest) => {
        await generate(request as any);

        if (genResult?.data) {
            setResult(genResult.data as InpaintingResult);
            return genResult.data as InpaintingResult;
        }

        throw new Error('Inpainting failed to return a result');
    }, [generate, genResult]);

    return {
        inpaint,
        isInpainting: isGenerating,
        result,
        error: error as any,
    };
};
