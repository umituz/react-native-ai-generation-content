/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/useGeneration';
import { TextToImageRequest, TextToImageResult } from '../domain/entities';

export interface UseTextToImageReturn {
    generateImage: (request: TextToImageRequest) => Promise<TextToImageResult>;
    isGenerating: boolean;
    result: TextToImageResult | null;
    error: Error | null;
}

export const useTextToImage = (): UseTextToImageReturn => {
    // @ts-expect-error - Generic constraints issue
    const { generate, isGenerating, error } = useGeneration<TextToImageRequest, TextToImageResult>();
    const [result, setResult] = useState<TextToImageResult | null>(null);

    const generateImage = useCallback(async (request: TextToImageRequest) => {
        // @ts-expect-error - Generic constraints issue
        const response = await generate('text-to-image', request);

        if (response) {
            setResult(response as TextToImageResult);
            return response as TextToImageResult;
        }

        throw new Error('Image generation failed to return a result');
    }, [generate]);

    return {
        generateImage,
        isGenerating,
        result,
        error: error as any,
    };
};
