/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/use-generation';
import { TextToVideoRequest, TextToVideoResult } from '../domain/entities';

export interface UseTextToVideoReturn {
    generateVideo: (request: TextToVideoRequest) => Promise<TextToVideoResult>;
    isGenerating: boolean;
    result: TextToVideoResult | null;
    error: Error | null;
}

export const useTextToVideo = (): UseTextToVideoReturn => {
    const { generate, isGenerating, error, result: genResult } = useGeneration({ model: "deprecated" });
    const [result, setResult] = useState<TextToVideoResult | null>(null);

    const generateVideo = useCallback(async (request: TextToVideoRequest) => {
        await generate(request as any);

        if (genResult?.data) {
            setResult(genResult.data as TextToVideoResult);
            return genResult.data as TextToVideoResult;
        }

        throw new Error('Video generation failed to return a result');
    }, [generate, genResult]);

    return {
        generateVideo,
        isGenerating,
        result,
        error: error as any,
    };
};
