import React, { useMemo } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { EmptyState } from "./EmptyState";
import type { CreationsConfig } from "../../domain/value-objects/CreationsConfig";

interface CreationsGalleryEmptyStateProps {
    readonly isLoading: boolean;
    readonly hasCreations: boolean;
    readonly config: CreationsConfig;
    readonly t: (key: string) => string;
    readonly emptyActionLabel?: string;
    readonly onEmptyAction?: () => void;
    readonly clearFilters: () => void;
}

export const CreationsGalleryEmptyState: React.FC<CreationsGalleryEmptyStateProps> = ({
    isLoading,
    hasCreations,
    config,
    t,
    emptyActionLabel,
    onEmptyAction,
    clearFilters,
}) => {
    const tokens = useAppDesignTokens();
    const styles = useStyles(tokens);

    return useMemo(() => {
        // 1. Loading State
        if (isLoading && !hasCreations) {
            return (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={tokens.colors.primary} />
                </View>
            );
        }

        // 2. System Empty State (User has NO creations at all)
        // We check 'hasCreations' which represents the full list presence
        if (!hasCreations) {
            return (
                <View style={styles.centerContainer}>
                    <EmptyState
                        title={t(config.translations.empty)}
                        description={t(config.translations.emptyDescription)}
                        actionLabel={emptyActionLabel}
                        onAction={onEmptyAction}
                    />
                </View>
            );
        }

        // 3. Filter Empty State (User has creations, but filter returns none)
        // This component is rendered when the list is empty, but hasCreations is true.
        return (
            <View style={styles.centerContainer}>
                <EmptyState
                    title={t("common.no_results") || "No results"}
                    description={t("common.no_results_description") || "Try changing your filters"}
                    actionLabel={t("common.clear_all") || "Clear All"}
                    onAction={clearFilters}
                />
            </View>
        );
    }, [isLoading, hasCreations, config, t, emptyActionLabel, onEmptyAction, clearFilters, styles.centerContainer, tokens.colors.primary]);
};

const useStyles = (tokens: any) => StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 400,
        paddingHorizontal: tokens.spacing.xl
    },
});
