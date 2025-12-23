/**
 * GenerationProgressContent
 * Content for the AI generation progress modal
 */

import React from "react";
import { AtomicText, View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, useAppDesignTokens } AtomicText } from "@umituz/react-native-design-system";
import { AtomicText, GenerationProgressBar } from "./GenerationProgressBar";

export interface GenerationProgressContentProps {
    progress: number;
    title?: string;
    message?: string;
    hint?: string;
    dismissLabel?: string;
    onDismiss?: () => void;
    backgroundColor?: string;
    textColor?: string;
    progressColor?: string;
    progressBackgroundColor?: string;
    dismissButtonColor?: string;
}

export const GenerationProgressContent: React.FC<
    GenerationProgressContentProps
> = ({
    progress,
    title,
    message,
    hint,
    dismissLabel,
    onDismiss,
    backgroundColor,
    textColor,
    progressColor,
    progressBackgroundColor,
    dismissButtonColor,
}) => {
        const tokens = useAppDesignTokens();

        const activeTextColor = textColor || tokens.colors.textPrimary;
        const activeBgColor = backgroundColor || tokens.colors.surface;

        return (
            <View style={[styles.modal, { backgroundColor: activeBgColor }]}>
                {title && (
                    <AtomicText type="bodyMedium" style={[styles.title, { color: activeTextColor }]}>{title}</AtomicText>
                )}

                {message && (
                    <AtomicText type="bodyMedium" style={[styles.message, { color: activeTextColor }]}>
                        {message}
                    </AtomicText>
                )}

                <GenerationProgressBar
                    progress={progress}
                    textColor={activeTextColor}
                    progressColor={progressColor}
                    backgroundColor={progressBackgroundColor}
                />

                {hint && (
                    <AtomicText type="bodyMedium" style={[styles.hint, { color: activeTextColor }]}>{hint}</AtomicText>
                )}

                {onDismiss && (
                    <TouchableOpacity
                        style={[
                            styles.dismissButton,
                            { backgroundColor: dismissButtonColor || tokens.colors.primary },
                        ]}
                        onPress={onDismiss}
                    >
                        <AtomicText type="bodyMedium" style={styles.dismissText}>{dismissLabel || "OK"}</AtomicText>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

const styles = StyleSheet.create({
    modal: {
        width: "100%",
        maxWidth: 400,
        borderRadius: 24,
        padding: 32,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 12,
        textAlign: "center",
    },
    message: {
        fontSize: 16,
        marginBottom: 24,
        textAlign: "center",
        opacity: 0.8,
    },
    hint: {
        fontSize: 14,
        textAlign: "center",
        fontStyle: "italic",
        opacity: 0.6,
        marginBottom: 16,
    },
    dismissButton: {
        marginTop: 8,
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 12,
        minWidth: 140,
        alignItems: "center",
    },
    dismissText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});
