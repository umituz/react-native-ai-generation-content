/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/use-generation';
import { ColorizationRequest, ColorizationResult } from '../domain/entities';

export interface UseColorizationReturn {
    colorize: (request: ColorizationRequest) => Promise<ColorizationResult>;
    isColorizing: boolean;
    result: ColorizationResult | null;
    error: Error | null;
}

export const useColorization = (): UseColorizationReturn => {
    const { generate, isGenerating, error, result: genResult } = useGeneration({ model: "deprecated" });
    const [result, setResult] = useState<ColorizationResult | null>(null);

    const colorize = useCallback(async (request: ColorizationRequest) => {
        await generate(request as any);

        if (genResult?.data) {
            setResult(genResult.data as ColorizationResult);
            return genResult.data as ColorizationResult;
        }

        throw new Error('Colorization failed to return a result');
    }, [generate, genResult]);

    return {
        colorize,
        isColorizing: isGenerating,
        result,
        error: error as any,
    };
};
