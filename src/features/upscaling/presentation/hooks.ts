/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/use-generation';
import { UpscaleRequest, UpscaleResult } from '../domain/entities';

export interface UseUpscalingReturn {
    upscale: (request: UpscaleRequest) => Promise<UpscaleResult>;
    isUpscaling: boolean;
    result: UpscaleResult | null;
    error: Error | null;
}

export const useUpscaling = (): UseUpscalingReturn => {
    const { generate, isGenerating, error, result: genResult } = useGeneration({ model: "deprecated" });
    const [result, setResult] = useState<UpscaleResult | null>(null);

    const upscale = useCallback(async (request: UpscaleRequest) => {
        await generate(request as any);

        if (genResult?.data) {
            setResult(genResult.data as UpscaleResult);
            return genResult.data as UpscaleResult;
        }

        throw new Error('Upscaling failed to return a result');
    }, [generate, genResult]);

    return {
        upscale,
        isUpscaling: isGenerating,
        result,
        error: error as any,
    };
};
