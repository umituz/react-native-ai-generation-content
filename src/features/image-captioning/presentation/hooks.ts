/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/useGeneration';
import { ImageCaptioningRequest, ImageCaptioningResult } from '../domain/entities';

export interface UseImageCaptioningReturn {
    generateCaption: (request: ImageCaptioningRequest) => Promise<ImageCaptioningResult>;
    isGenerating: boolean;
    result: ImageCaptioningResult | null;
    error: Error | null;
}

export const useImageCaptioning = (): UseImageCaptioningReturn => {
    // @ts-expect-error - Generic constraints issue
    const { generate, isGenerating, error } = useGeneration<ImageCaptioningRequest, ImageCaptioningResult>();
    const [result, setResult] = useState<ImageCaptioningResult | null>(null);

    const generateCaption = useCallback(async (request: ImageCaptioningRequest) => {
        // @ts-expect-error - Generic constraints issue
        const response = await generate('image-captioning', request);

        if (response) {
            setResult(response as ImageCaptioningResult);
            return response as ImageCaptioningResult;
        }

        throw new Error('Caption generation failed to return a result');
    }, [generate]);

    return {
        generateCaption,
        isGenerating,
        result,
        error: error as any,
    };
};
