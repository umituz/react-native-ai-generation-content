/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/use-generation';
import { SketchToImageRequest, SketchToImageResult } from '../domain/entities';

export interface UseSketchToImageReturn {
    generateFromSketch: (request: SketchToImageRequest) => Promise<SketchToImageResult>;
    isGenerating: boolean;
    result: SketchToImageResult | null;
    error: Error | null;
}

export const useSketchToImage = (): UseSketchToImageReturn => {
    const { generate, isGenerating, error, result: genResult } = useGeneration({ model: "deprecated" });
    const [result, setResult] = useState<SketchToImageResult | null>(null);

    const generateFromSketch = useCallback(async (request: SketchToImageRequest) => {
        await generate(request as any);

        if (genResult?.data) {
            setResult(genResult.data as SketchToImageResult);
            return genResult.data as SketchToImageResult;
        }

        throw new Error('Sketch to image generation failed to return a result');
    }, [generate, genResult]);

    return {
        generateFromSketch,
        isGenerating,
        result,
        error: error as any,
    };
};
