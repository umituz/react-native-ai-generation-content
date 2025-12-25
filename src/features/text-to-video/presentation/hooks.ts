/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/useGeneration';
import { TextToVideoRequest, TextToVideoResult } from '../domain/entities';

export interface UseTextToVideoReturn {
    generateVideo: (request: TextToVideoRequest) => Promise<TextToVideoResult>;
    isGenerating: boolean;
    result: TextToVideoResult | null;
    error: Error | null;
}

export const useTextToVideo = (): UseTextToVideoReturn => {
    // @ts-expect-error - Generic constraints issue
    const { generate, isGenerating, error } = useGeneration<TextToVideoRequest, TextToVideoResult>();
    const [result, setResult] = useState<TextToVideoResult | null>(null);

    const generateVideo = useCallback(async (request: TextToVideoRequest) => {
        // @ts-expect-error - Generic constraints issue
        const response = await generate('text-to-video', request);

        if (response) {
            setResult(response as TextToVideoResult);
            return response as TextToVideoResult;
        }

        throw new Error('Video generation failed to return a result');
    }, [generate]);

    return {
        generateVideo,
        isGenerating,
        result,
        error: error as any,
    };
};
