/**
 * Prompt Input Component
 * @description Text input with sample prompt chips
 */

import React, { memo } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import {
    AtomicText,
    useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { PromptInputProps } from "../../domain/entities";
import { DEFAULT_SAMPLE_PROMPTS } from "../../infrastructure/constants";

export const PromptInput: React.FC<PromptInputProps> = memo(
    function PromptInput({
        value,
        onChangeText,
        isProcessing,
        label,
        placeholder,
        samplePrompts = DEFAULT_SAMPLE_PROMPTS,
        samplePromptsLabel,
    }) {
        const tokens = useAppDesignTokens();

        return (
            <View style={styles.container}>
                {label && (
                    <AtomicText
                        
                        style={[
                            styles.label,
                            {
                                color: tokens.colors.textPrimary,
                                marginBottom: tokens.spacing.sm,
                            },
                        ]}
                    >
                        {label}
                    </AtomicText>
                )}

                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={tokens.colors.textTertiary}
                    multiline
                    
                    editable={!isProcessing}
                    style={[
                        styles.input,
                        {
                            backgroundColor: tokens.colors.surface,
                            borderColor: tokens.colors.border,
                            color: tokens.colors.textPrimary,
                        },
                    ]}
                />

                {samplePrompts.length > 0 && (
                    <>
                        {samplePromptsLabel && (
                            <AtomicText
                                
                                style={[
                                    styles.sampleLabel,
                                    {
                                        color: tokens.colors.textSecondary,
                                        marginTop: tokens.spacing.md,
                                        marginBottom: tokens.spacing.sm,
                                    },
                                ]}
                            >
                                {samplePromptsLabel}
                            </AtomicText>
                        )}

                        <View style={styles.sampleContainer}>
                            {samplePrompts.map((prompt) => (
                                <TouchableOpacity
                                    key={prompt.id}
                                    style={[
                                        styles.sampleChip,
                                        {
                                            backgroundColor: tokens.colors.surfaceSecondary,
                                            borderColor: tokens.colors.border,
                                        },
                                    ]}
                                    onPress={() => onChangeText(prompt.text)}
                                    disabled={isProcessing}
                                >
                                    <AtomicText
                                        
                                        style={{ color: tokens.colors.textSecondary }}
                                        
                                    >
                                        {prompt.text}
                                    </AtomicText>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                )}
            </View>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
    },
    label: {
        fontWeight: "600",
    },
    input: {
        minHeight: 120,
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        textAlignVertical: "top",
        lineHeight: 24,
    },
    sampleLabel: {
        fontWeight: "500",
    },
    sampleContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    sampleChip: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
    },
});
