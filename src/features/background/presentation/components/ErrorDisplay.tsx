/**
 * Error Display Component
 * @description Displays error messages
 */

import * as React from "react";
import { memo } from "react";
import { View, StyleSheet } from "react-native";
import {
    AtomicText,
    AtomicIcon,
    useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { ErrorDisplayProps } from "../../domain/entities";

export const ErrorDisplay: React.FC<ErrorDisplayProps> = memo(
    function ErrorDisplay({ error }) {
        const tokens = useAppDesignTokens();

        if (!error) {
            return null;
        }

        return (
            <View
                style={[
                    styles.container,
                    { backgroundColor: tokens.colors.errorContainer },
                ]}
            >
                <AtomicIcon
                    name="alert-circle"
                    size="sm"
                    color="error"
                />
                <AtomicText
                    type="bodyMedium"
                    color="error"
                    style={styles.errorText}
                >
                    {error}
                </AtomicText>
            </View>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 16,
        borderRadius: 12,
        marginVertical: 12,
    },
    errorText: {
        flex: 1,
    },
});
