/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/useGeneration';
import { SketchToImageRequest, SketchToImageResult } from '../domain/entities';

export interface UseSketchToImageReturn {
    generateFromSketch: (request: SketchToImageRequest) => Promise<SketchToImageResult>;
    isGenerating: boolean;
    result: SketchToImageResult | null;
    error: Error | null;
}

export const useSketchToImage = (): UseSketchToImageReturn => {
    // @ts-expect-error - Generic constraints issue
    const { generate, isGenerating, error } = useGeneration<SketchToImageRequest, SketchToImageResult>();
    const [result, setResult] = useState<SketchToImageResult | null>(null);

    const generateFromSketch = useCallback(async (request: SketchToImageRequest) => {
        // @ts-expect-error - Generic constraints issue
        const response = await generate('sketch-to-image', request);

        if (response) {
            setResult(response as SketchToImageResult);
            return response as SketchToImageResult;
        }

        throw new Error('Sketch to image generation failed to return a result');
    }, [generate]);

    return {
        generateFromSketch,
        isGenerating,
        result,
        error: error as any,
    };
};
