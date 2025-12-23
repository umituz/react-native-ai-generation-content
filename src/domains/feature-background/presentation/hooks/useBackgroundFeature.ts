/**
 * useBackgroundFeature Hook
 * @description Main hook for background feature state and actions
 */

import { useCallback, useState } from "react";
import type {
    BackgroundFeatureState,
    BackgroundProcessResult,
    UseBackgroundFeatureConfig,
    StudioMode,
} from "../../domain/entities";

export interface UseBackgroundFeatureReturn extends BackgroundFeatureState {
    readonly selectImage: () => Promise<void>;
    readonly process: (prompt?: string) => Promise<void>;
    readonly save: () => Promise<void>;
    readonly reset: () => void;
    readonly setPrompt: (prompt: string) => void;
    readonly setMode: (mode: StudioMode) => void;
}

export function useBackgroundFeature(
    config: UseBackgroundFeatureConfig
): UseBackgroundFeatureReturn {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>("");
    const [processedUrl, setProcessedUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<StudioMode>(
        config.defaultMode ?? "transparent"
    );

    const selectImage = useCallback(async (): Promise<void> => {
        if (!config.onSelectImage) {
            return;
        }

        try {
            const uri = await config.onSelectImage();
            if (uri) {
                setImageUri(uri);
                setError(null);
                setProcessedUrl(null);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to select image");
        }
    }, [config]);

    const process = useCallback(
        async (newPrompt?: string): Promise<void> => {
            if (!imageUri) {
                setError("Please select an image first");
                return;
            }

            const currentPrompt = newPrompt ?? prompt;
            setIsProcessing(true);
            setProgress(0);
            setError(null);

            try {
                const result: BackgroundProcessResult = await config.processRequest({
                    imageUri,
                    prompt: currentPrompt,
                    mode,
                    onProgress: setProgress,
                });

                if (result.success && result.imageUrl) {
                    setProcessedUrl(result.imageUrl);
                } else {
                    setError(result.error || "Processing failed");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Processing failed");
            } finally {
                setIsProcessing(false);
                setProgress(0);
            }
        },
        [imageUri, prompt, mode, config]
    );

    const save = useCallback(async (): Promise<void> => {
        if (!processedUrl) {
            return;
        }
    }, [processedUrl]);

    const reset = useCallback((): void => {
        setImageUri(null);
        setPrompt("");
        setProcessedUrl(null);
        setIsProcessing(false);
        setProgress(0);
        setError(null);
    }, []);

    return {
        imageUri,
        prompt,
        processedUrl,
        isProcessing,
        progress,
        error,
        mode,
        selectImage,
        process,
        save,
        reset,
        setPrompt,
        setMode,
    };
}
