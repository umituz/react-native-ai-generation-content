/**
 * GenerationProgressBar
 * Individual progress bar component for AI generation
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText, useAppDesignTokens } from "@umituz/react-native-design-system";
import { clampProgress, roundProgress } from "../../infrastructure/utils/progress.utils";

export interface GenerationProgressBarProps {
    progress: number;
    textColor?: string;
    progressColor?: string;
    backgroundColor?: string;
}

export const GenerationProgressBar: React.FC<GenerationProgressBarProps> = ({
    progress,
    textColor,
    progressColor,
    backgroundColor,
}) => {
    const tokens = useAppDesignTokens();
    const clampedProgress = clampProgress(progress);

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.background,
                    { backgroundColor: backgroundColor || tokens.colors.borderLight },
                ]}
            >
                <View
                    style={[
                        styles.fill,
                        {
                            backgroundColor: progressColor || tokens.colors.primary,
                            width: `${clampedProgress}%`,
                        },
                    ]}
                />
            </View>
            <AtomicText
                style={[
                    styles.text,
                    { color: textColor || tokens.colors.textPrimary },
                ]}
            >
                {roundProgress(clampedProgress)}%
            </AtomicText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 16,
        alignItems: "center",
    },
    background: {
        width: "100%",
        height: 8,
        borderRadius: 4,
        overflow: "hidden",
    },
    fill: {
        height: "100%",
        borderRadius: 4,
    },
    text: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 8,
    },
});
