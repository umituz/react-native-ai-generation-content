/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/useGeneration';
import { PhotoRestorationRequest, PhotoRestorationResult } from '../domain/entities';

export interface UsePhotoRestorationReturn {
    restorePhoto: (request: PhotoRestorationRequest) => Promise<PhotoRestorationResult>;
    isRestoring: boolean;
    result: PhotoRestorationResult | null;
    error: Error | null;
}

export const usePhotoRestoration = (): UsePhotoRestorationReturn => {
    // @ts-expect-error - Generic constraints issue
    const { generate, isGenerating, error } = useGeneration<PhotoRestorationRequest, PhotoRestorationResult>();
    const [result, setResult] = useState<PhotoRestorationResult | null>(null);

    const restorePhoto = useCallback(async (request: PhotoRestorationRequest) => {
        // @ts-expect-error - Generic constraints issue
        const response = await generate('photo-restoration', request);

        if (response) {
            setResult(response as PhotoRestorationResult);
            return response as PhotoRestorationResult;
        }

        throw new Error('Photo restoration failed to return a result');
    }, [generate]);

    return {
        restorePhoto,
        isRestoring: isGenerating,
        result,
        error: error as any,
    };
};
