/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/use-generation';
import { ImageCaptioningRequest, ImageCaptioningResult } from '../domain/entities';

export interface UseImageCaptioningReturn {
    generateCaption: (request: ImageCaptioningRequest) => Promise<ImageCaptioningResult>;
    isGenerating: boolean;
    result: ImageCaptioningResult | null;
    error: Error | null;
}

export const useImageCaptioning = (): UseImageCaptioningReturn => {
    const { generate, isGenerating, error, result: genResult } = useGeneration({ model: "deprecated" });
    const [result, setResult] = useState<ImageCaptioningResult | null>(null);

    const generateCaption = useCallback(async (request: ImageCaptioningRequest) => {
        await generate(request as any);

        if (genResult?.data) {
            setResult(genResult.data as ImageCaptioningResult);
            return genResult.data as ImageCaptioningResult;
        }

        throw new Error('Caption generation failed to return a result');
    }, [generate, genResult]);

    return {
        generateCaption,
        isGenerating,
        result,
        error: error as any,
    };
};
