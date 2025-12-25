/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/useGeneration';
import { StyleTransferRequest, StyleTransferResult } from '../domain/entities';

export interface UseStyleTransferReturn {
    transferStyle: (request: StyleTransferRequest) => Promise<StyleTransferResult>;
    isTransferring: boolean;
    result: StyleTransferResult | null;
    error: Error | null;
}

export const useStyleTransfer = (): UseStyleTransferReturn => {
    // @ts-expect-error - Generic constraints issue
    const { generate, isGenerating, error } = useGeneration<StyleTransferRequest, StyleTransferResult>();
    const [result, setResult] = useState<StyleTransferResult | null>(null);

    const transferStyle = useCallback(async (request: StyleTransferRequest) => {
        // @ts-expect-error - Generic constraints issue
        const response = await generate('style-transfer', request);

        if (response) {
            setResult(response as StyleTransferResult);
            return response as StyleTransferResult;
        }

        throw new Error('Style transfer failed to return a result');
    }, [generate]);

    return {
        transferStyle,
        isTransferring: isGenerating,
        result,
        error: error as any,
    };
};
