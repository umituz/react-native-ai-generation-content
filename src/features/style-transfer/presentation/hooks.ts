/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useGeneration } from '../../../presentation/hooks/use-generation';
import { StyleTransferRequest, StyleTransferResult } from '../domain/entities';

export interface UseStyleTransferReturn {
    transferStyle: (request: StyleTransferRequest) => Promise<StyleTransferResult>;
    isTransferring: boolean;
    result: StyleTransferResult | null;
    error: Error | null;
}

export const useStyleTransfer = (): UseStyleTransferReturn => {
    const { generate, isGenerating, error, result: genResult } = useGeneration({ model: "deprecated" });
    const [result, setResult] = useState<StyleTransferResult | null>(null);

    const transferStyle = useCallback(async (request: StyleTransferRequest) => {
        await generate(request as any);

        if (genResult?.data) {
            setResult(genResult.data as StyleTransferResult);
            return genResult.data as StyleTransferResult;
        }

        throw new Error('Style transfer failed to return a result');
    }, [generate, genResult]);

    return {
        transferStyle,
        isTransferring: isGenerating,
        result,
        error: error as any,
    };
};
