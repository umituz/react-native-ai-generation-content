/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/useGeneration';
import { AudioGenerationRequest, AudioGenerationResult } from '../domain/entities';

export interface UseAudioGenerationReturn {
    generateAudio: (request: AudioGenerationRequest) => Promise<AudioGenerationResult>;
    isGenerating: boolean;
    result: AudioGenerationResult | null;
    error: Error | null;
}

export const useAudioGeneration = (): UseAudioGenerationReturn => {
    // @ts-expect-error - Generic constraints issue
    const { generate, isGenerating, error } = useGeneration<AudioGenerationRequest, AudioGenerationResult>();
    const [result, setResult] = useState<AudioGenerationResult | null>(null);

    const generateAudio = useCallback(async (request: AudioGenerationRequest) => {
        // @ts-expect-error - Generic constraints issue
        const response = await generate('audio-generation', request);

        if (response) {
            setResult(response as AudioGenerationResult);
            return response as AudioGenerationResult;
        }

        throw new Error('Audio generation failed to return a result');
    }, [generate]);

    return {
        generateAudio,
        isGenerating,
        result,
        error: error as any,
    };
};
