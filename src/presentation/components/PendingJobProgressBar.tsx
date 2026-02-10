/**
 * PendingJobProgressBar
 * Individual progress bar for the PendingJobCard
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { clampProgress } from "../../infrastructure/utils/progress.utils";

export interface PendingJobProgressBarProps {
    progress: number;
    backgroundColor?: string;
    fillColor?: string;
}

export const PendingJobProgressBar: React.FC<PendingJobProgressBarProps> = ({
    progress,
    backgroundColor,
    fillColor,
}) => {
    const tokens = useAppDesignTokens();
    const clampedProgress = clampProgress(progress);

    return (
        <View
            style={[
                styles.progressContainer,
                { backgroundColor: backgroundColor || tokens.colors.borderLight },
            ]}
        >
            <View
                style={[
                    styles.progressFill,
                    {
                        backgroundColor: fillColor || tokens.colors.primary,
                        width: `${clampedProgress}%`,
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    progressContainer: {
        height: 4,
        borderRadius: 2,
        marginTop: 8,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        borderRadius: 2,
    },
});
