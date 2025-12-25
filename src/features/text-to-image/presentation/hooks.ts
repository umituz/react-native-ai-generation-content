/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/use-generation';
import { TextToImageRequest, TextToImageResult } from '../domain/entities';

export interface UseTextToImageReturn {
    generateImage: (request: TextToImageRequest) => Promise<TextToImageResult>;
    isGenerating: boolean;
    result: TextToImageResult | null;
    error: Error | null;
}

export const useTextToImage = (): UseTextToImageReturn => {
    const { generate, isGenerating, error, result: genResult } = useGeneration({ model: "deprecated" });
    const [result, setResult] = useState<TextToImageResult | null>(null);

    const generateImage = useCallback(async (request: TextToImageRequest) => {
        await generate(request as any);

        if (genResult?.data) {
            setResult(genResult.data as TextToImageResult);
            return genResult.data as TextToImageResult;
        }

        throw new Error('Image generation failed to return a result');
    }, [generate, genResult]);

    return {
        generateImage,
        isGenerating,
        result,
        error: error as any,
    };
};
