/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/useGeneration';
import { ColorizationRequest, ColorizationResult } from '../domain/entities';

export interface UseColorizationReturn {
    colorize: (request: ColorizationRequest) => Promise<ColorizationResult>;
    isColorizing: boolean;
    result: ColorizationResult | null;
    error: Error | null;
}

export const useColorization = (): UseColorizationReturn => {
    // @ts-expect-error - Generic constraints issue
    const { generate, isGenerating, error } = useGeneration<ColorizationRequest, ColorizationResult>();
    const [result, setResult] = useState<ColorizationResult | null>(null);

    const colorize = useCallback(async (request: ColorizationRequest) => {
        // @ts-expect-error - Generic constraints issue
        const response = await generate('colorization', request);

        if (response) {
            setResult(response as ColorizationResult);
            return response as ColorizationResult;
        }

        throw new Error('Colorization failed to return a result');
    }, [generate]);

    return {
        colorize,
        isColorizing: isGenerating,
        result,
        error: error as any,
    };
};
