/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/use-generation';
import { AudioGenerationRequest, AudioGenerationResult } from '../domain/entities';

export interface UseAudioGenerationReturn {
    generateAudio: (request: AudioGenerationRequest) => Promise<AudioGenerationResult>;
    isGenerating: boolean;
    result: AudioGenerationResult | null;
    error: Error | null;
}

export const useAudioGeneration = (): UseAudioGenerationReturn => {
    const { generate, isGenerating, error, result: genResult } = useGeneration({ model: "deprecated" });
    const [result, setResult] = useState<AudioGenerationResult | null>(null);

    const generateAudio = useCallback(async (request: AudioGenerationRequest) => {
        await generate(request as any);

        if (genResult?.data) {
            setResult(genResult.data as AudioGenerationResult);
            return genResult.data as AudioGenerationResult;
        }

        throw new Error('Audio generation failed to return a result');
    }, [generate, genResult]);

    return {
        generateAudio,
        isGenerating,
        result,
        error: error as any,
    };
};
