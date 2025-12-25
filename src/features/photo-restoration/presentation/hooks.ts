/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/use-generation';
import { PhotoRestorationRequest, PhotoRestorationResult } from '../domain/entities';

export interface UsePhotoRestorationReturn {
    restorePhoto: (request: PhotoRestorationRequest) => Promise<PhotoRestorationResult>;
    isRestoring: boolean;
    result: PhotoRestorationResult | null;
    error: Error | null;
}

export const usePhotoRestoration = (): UsePhotoRestorationReturn => {
    const { generate, isGenerating, error, result: genResult } = useGeneration({ model: "deprecated" });
    const [result, setResult] = useState<PhotoRestorationResult | null>(null);

    const restorePhoto = useCallback(async (request: PhotoRestorationRequest) => {
        await generate(request as any);

        if (genResult?.data) {
            setResult(genResult.data as PhotoRestorationResult);
            return genResult.data as PhotoRestorationResult;
        }

        throw new Error('Photo restoration failed to return a result');
    }, [generate, genResult]);

    return {
        restorePhoto,
        isRestoring: isGenerating,
        result,
        error: error as any,
    };
};
