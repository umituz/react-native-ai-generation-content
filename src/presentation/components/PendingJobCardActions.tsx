/**
 * PendingJobCardActions
 * Action buttons for the PendingJobCard
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, useAppDesignTokens } from "@umituz/react-native-design-system";

export interface PendingJobCardActionsProps {
    id: string;
    isFailed: boolean;
    onCancel?: (id: string) => void;
    onRetry?: (id: string) => void;
    textColor?: string;
    errorColor?: string;
    backgroundColor?: string;
}

export const PendingJobCardActions: React.FC<PendingJobCardActionsProps> = ({
    id,
    isFailed,
    onCancel,
    onRetry,
    textColor,
    errorColor,
    backgroundColor,
}) => {
    const tokens = useAppDesignTokens();

    const styles = StyleSheet.create({
        actions: {
            flexDirection: "row",
            gap: 8,
            marginTop: 8,
        },
        actionButton: {
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: backgroundColor || tokens.colors.backgroundSecondary,
            justifyContent: "center",
            alignItems: "center",
        },
        text: {
            color: textColor || tokens.colors.textPrimary,
        },
        errorText: {
            color: errorColor || tokens.colors.error,
        },
    });

    return (
        <View style={styles.actions}>
            {isFailed && onRetry && (
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => onRetry(id)}
                >
                    <AtomicText type="bodyMedium" style={styles.text}>↻</AtomicText>
                </TouchableOpacity>
            )}
            {onCancel && (
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => onCancel(id)}
                >
                    <AtomicText type="bodyMedium" style={styles.errorText}>✕</AtomicText>
                </TouchableOpacity>
            )}
        </View>
    );
};
