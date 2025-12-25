/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/useGeneration';
import { UpscaleRequest, UpscaleResult } from '../domain/entities';

export interface UseUpscalingReturn {
    upscale: (request: UpscaleRequest) => Promise<UpscaleResult>;
    isUpscaling: boolean;
    result: UpscaleResult | null;
    error: Error | null;
}

export const useUpscaling = (): UseUpscalingReturn => {
    // @ts-expect-error - Generic constraints issue
    const { generate, isGenerating, error } = useGeneration<UpscaleRequest, UpscaleResult>();
    const [result, setResult] = useState<UpscaleResult | null>(null);

    const upscale = useCallback(async (request: UpscaleRequest) => {
        // @ts-expect-error - Generic constraints issue
        const response = await generate('upscaling', request);

        if (response) {
            setResult(response as UpscaleResult);
            return response as UpscaleResult;
        }

        throw new Error('Upscaling failed to return a result');
    }, [generate]);

    return {
        upscale,
        isUpscaling: isGenerating,
        result,
        error: error as any,
    };
};
