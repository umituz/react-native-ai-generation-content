/**
 * Mode Selector Component
 * @description Horizontal scrollable mode selection toolbar
 */

import * as React from "react";
import { memo } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {
    AtomicIcon,
    useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { ModeSelectorProps } from "../../domain/entities";

export const ModeSelector: React.FC<ModeSelectorProps> = memo(
    function ModeSelector({ activeMode, onModeChange, isProcessing, modes }) {
        const tokens = useAppDesignTokens();

        return (
            <View
                style={[
                    styles.container,
                    { backgroundColor: tokens.colors.surface },
                ]}
            >
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {modes.map((mode) => {
                        const isActive = activeMode === mode.id;
                        return (
                            <TouchableOpacity
                                key={mode.id}
                                style={[
                                    styles.modeButton,
                                    isActive && {
                                        backgroundColor: tokens.colors.primary,
                                    },
                                ]}
                                onPress={() => !isProcessing && onModeChange(mode.id)}
                                disabled={isProcessing}
                                activeOpacity={0.7}
                            >
                                <AtomicIcon
                                    name={mode.icon}
                                    size="md"
                                    color={isActive ? "onPrimary" : "onSurface"}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    scrollContent: {
        flexDirection: "row",
        gap: 8,
        paddingHorizontal: 8,
    },
    modeButton: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
});
