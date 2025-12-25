/**
 * Gallery Empty States
 * Handles different empty state scenarios for gallery
 */

import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import type { DesignTokens } from "@umituz/react-native-design-system";
import { EmptyState } from "./EmptyState";
import type { Creation } from "../../domain/entities/Creation";

interface GalleryEmptyStatesProps {
    isLoading: boolean;
    creations: Creation[] | undefined;
    isFiltered: boolean;
    tokens: DesignTokens;
    t: (key: string) => string;
    emptyTitle: string;
    emptyDescription: string;
    emptyActionLabel?: string;
    onEmptyAction?: () => void;
    onClearFilters: () => void;
}

export function GalleryEmptyStates({
    isLoading,
    creations,
    isFiltered,
    tokens,
    t,
    emptyTitle,
    emptyDescription,
    emptyActionLabel,
    onEmptyAction,
    onClearFilters,
}: GalleryEmptyStatesProps) {
    const styles = createStyles(tokens);

    // 1. Loading State
    if (isLoading && (!creations || creations?.length === 0)) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={tokens.colors.primary} />
            </View>
        );
    }

    // 2. System Empty State (User has NO creations at all)
    if (!creations || creations?.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <EmptyState
                    title={emptyTitle}
                    description={emptyDescription}
                    actionLabel={emptyActionLabel}
                    onAction={onEmptyAction}
                />
            </View>
        );
    }

    // 3. Filter Empty State (User has creations, but filter returns none)
    if (isFiltered) {
        return (
            <View style={styles.centerContainer}>
                <EmptyState
                    title={t("common.no_results") || "No results"}
                    description={t("common.no_results_description") || "Try changing your filters"}
                    actionLabel={t("common.clear_all") || "Clear All"}
                    onAction={onClearFilters}
                />
            </View>
        );
    }

    return null;
}

const createStyles = (tokens: DesignTokens) => StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 400,
        paddingHorizontal: tokens.spacing.xl,
    },
});
