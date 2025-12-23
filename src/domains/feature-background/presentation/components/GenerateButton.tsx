/**
 * Generate Button Component
 * @description Action button to trigger processing
 */

import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import {
    AtomicText,
    AtomicIcon,
    useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { GenerateButtonProps } from "../../domain/entities";

export const GenerateButton: React.FC<GenerateButtonProps> = memo(
    function GenerateButton({
        isDisabled,
        isProcessing,
        onPress,
        buttonText,
    }) {
        const tokens = useAppDesignTokens();

        const disabled = isDisabled || isProcessing;

        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled}
                activeOpacity={0.8}
                style={[
                    styles.container,
                    {
                        backgroundColor: disabled
                            ? tokens.colors.surfaceSecondary
                            : tokens.colors.primary,
                    },
                ]}
            >
                {isProcessing ? (
                    <ActivityIndicator color={tokens.colors.backgroundPrimary} />
                ) : (
                    <>
                        <AtomicIcon
                            name="sparkles"
                            size={20}
                            color={disabled ? "surfaceVariant" : "onPrimary"}
                            style={styles.icon}
                        />
                        <AtomicText
                            type="headlineSmall"
                            style={[
                                styles.text,
                                {
                                    color: disabled
                                        ? tokens.colors.textTertiary
                                        : tokens.colors.backgroundPrimary,
                                },
                            ]}
                        >
                            {buttonText}
                        </AtomicText>
                    </>
                )}
            </TouchableOpacity>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        marginVertical: 24,
        borderRadius: 28,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    icon: {
        marginRight: 8,
    },
    text: {
        fontWeight: "bold",
    },
});
