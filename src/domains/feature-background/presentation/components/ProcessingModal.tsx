/**
 * Processing Modal Component
 * @description Modal shown during processing with progress
 */

import React, { memo } from "react";
import { Modal, View, StyleSheet, ActivityIndicator } from "react-native";
import {
    AtomicText,
    useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { ProcessingModalProps } from "../../domain/entities";

export const ProcessingModal: React.FC<ProcessingModalProps> = memo(
    function ProcessingModal({ visible, progress = 0, title }) {
        const tokens = useAppDesignTokens();

        return (
            <Modal
                visible={visible}
                transparent
                animationType="fade"
                statusBarTranslucent
            >
                <View style={styles.overlay}>
                    <View
                        style={[
                            styles.content,
                            { backgroundColor: tokens.colors.surface },
                        ]}
                    >
                        <ActivityIndicator
                            size="large"
                            color={tokens.colors.primary}
                        />
                        {title && (
                            <AtomicText
                                type="bodyLarge"
                                style={[
                                    styles.title,
                                    { color: tokens.colors.textPrimary },
                                ]}
                            >
                                {title}
                            </AtomicText>
                        )}
                        {progress > 0 && (
                            <View style={styles.progressContainer}>
                                <View
                                    style={[
                                        styles.progressBar,
                                        { backgroundColor: tokens.colors.surfaceSecondary },
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.progressFill,
                                            {
                                                backgroundColor: tokens.colors.primary,
                                                width: `${Math.min(progress, 100)}%`,
                                            },
                                        ]}
                                    />
                                </View>
                                <AtomicText
                                    type="bodySmall"
                                    style={{ color: tokens.colors.textSecondary }}
                                >
                                    {Math.round(progress)}%
                                </AtomicText>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        );
    }
);

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        padding: 32,
        borderRadius: 20,
        alignItems: "center",
        minWidth: 200,
    },
    title: {
        marginTop: 16,
        textAlign: "center",
    },
    progressContainer: {
        marginTop: 16,
        alignItems: "center",
        width: "100%",
    },
    progressBar: {
        width: "100%",
        height: 6,
        borderRadius: 3,
        overflow: "hidden",
        marginBottom: 8,
    },
    progressFill: {
        height: "100%",
        borderRadius: 3,
    },
});
