/**
 * Result Display Component
 * @description Displays processed image with save/reset actions
 */

import React, { memo } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
    AtomicText,
    AtomicIcon,
    useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { ResultDisplayProps } from "../../domain/entities";

export const ResultDisplay: React.FC<ResultDisplayProps> = memo(
    function ResultDisplay({
        imageUrl,
        isProcessing,
        onSave,
        onReset,
        saveButtonText,
        resetButtonText,
    }) {
        const tokens = useAppDesignTokens();

        if (!imageUrl || isProcessing) {
            return null;
        }

        return (
            <View style={styles.container}>
                <View style={[styles.resultContainer, { borderColor: tokens.colors.borderLight }]}>
                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.resultImage}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            { backgroundColor: tokens.colors.backgroundSecondary },
                        ]}
                        onPress={onReset}
                    >
                        <AtomicIcon
                            name="refresh-cw"
                            size="md"
                           
                        />
                        <AtomicText
                            
                            style={[styles.actionText, { color: tokens.colors.textPrimary }]}
                        >
                            {resetButtonText}
                        </AtomicText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            { backgroundColor: tokens.colors.success },
                        ]}
                        onPress={onSave}
                    >
                        <AtomicIcon
                            name="download"
                            size="md"
                           
                        />
                        <AtomicText
                            
                            style={[
                                styles.actionText,
                                { color: tokens.colors.backgroundPrimary },
                            ]}
                        >
                            {saveButtonText}
                        </AtomicText>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        marginBottom: 16,
    },
    resultContainer: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 24,
        overflow: "hidden",
        marginBottom: 16,
        borderWidth: 1,
    },
    resultImage: {
        width: "100%",
        height: "100%",
    },
    actionsContainer: {
        flexDirection: "row",
        gap: 12,
    },
    actionButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        borderRadius: 16,
        gap: 8,
    },
    actionText: {
        fontWeight: "600",
    },
});
