/**
 * Background Feature Component
 * @description Main feature component composing all sub-components
 */

import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import type {
    BackgroundFeatureConfig,
    SamplePrompt,
} from "../../domain/entities";
import { ImagePicker } from "./ImagePicker";
import { PromptInput } from "./PromptInput";
import { GenerateButton } from "./GenerateButton";
import { ResultDisplay } from "./ResultDisplay";
import { ErrorDisplay } from "./ErrorDisplay";
import { ProcessingModal } from "./ProcessingModal";
import { FeatureHeader } from "./FeatureHeader";
import { useBackgroundFeature } from "../hooks";
import type { ImageSourcePropType } from "react-native";

export interface BackgroundFeatureProps {
    readonly config: BackgroundFeatureConfig;
    readonly onSelectImage: () => Promise<string | null>;
    readonly heroImage?: ImageSourcePropType;
    readonly description?: string;
    readonly promptLabel?: string;
    readonly promptPlaceholder?: string;
    readonly samplePrompts?: readonly SamplePrompt[];
    readonly samplePromptsLabel?: string;
    readonly generateButtonText?: string;
    readonly saveButtonText?: string;
    readonly resetButtonText?: string;
    readonly processingText?: string;
    readonly placeholderText?: string;
}

export const BackgroundFeature: React.FC<BackgroundFeatureProps> = ({
    config,
    onSelectImage,
    heroImage,
    description,
    promptLabel,
    promptPlaceholder,
    samplePrompts,
    samplePromptsLabel,
    generateButtonText,
    saveButtonText,
    resetButtonText,
    processingText,
    placeholderText,
}) => {
    const tokens = useAppDesignTokens();
    const [prompt, setPrompt] = useState("");

    const feature = useBackgroundFeature({
        processRequest: config.onProcess,
        onSelectImage,
    });

    const handleProcess = useCallback(async () => {
        await feature.process(prompt);
        if (feature.processedUrl && config.onSuccess) {
            config.onSuccess({
                success: true,
                imageUrl: feature.processedUrl,
            });
        }
    }, [feature, prompt, config]);

    const handleSave = useCallback(async () => {
        if (feature.processedUrl && config.onSave) {
            await config.onSave(feature.processedUrl);
        }
    }, [feature.processedUrl, config]);

    const handleReset = useCallback(() => {
        feature.reset();
        setPrompt("");
    }, [feature]);

    const isDisabled = !feature.imageUri || !prompt.trim();

    return (
        <>
            <ScrollView
                style={[styles.container, { padding: tokens.spacing.lg }]}
                showsVerticalScrollIndicator={false}
            >
                <FeatureHeader
                    heroImage={heroImage}
                    description={description}
                />

                <ImagePicker
                    imageUri={feature.imageUri}
                    isProcessing={feature.isProcessing}
                    onSelectImage={feature.selectImage}
                    placeholderText={placeholderText}
                />

                <PromptInput
                    value={prompt}
                    onChangeText={setPrompt}
                    isProcessing={feature.isProcessing}
                    label={promptLabel}
                    placeholder={promptPlaceholder}
                    samplePrompts={samplePrompts}
                    samplePromptsLabel={samplePromptsLabel}
                />

                <ErrorDisplay error={feature.error} />

                <ResultDisplay
                    imageUrl={feature.processedUrl}
                    isProcessing={feature.isProcessing}
                    onSave={handleSave}
                    onReset={handleReset}
                    saveButtonText={saveButtonText}
                    resetButtonText={resetButtonText}
                />

                <GenerateButton
                    isDisabled={isDisabled}
                    isProcessing={feature.isProcessing}
                    onPress={handleProcess}
                    buttonText={generateButtonText}
                />
            </ScrollView>

            <ProcessingModal
                visible={feature.isProcessing}
                progress={feature.progress}
                title={processingText}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
