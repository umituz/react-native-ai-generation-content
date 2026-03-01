/**
 * Gallery Empty States
 * Handles different empty state scenarios for gallery
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicSkeleton } from "@umituz/react-native-design-system/atoms";
import { type DesignTokens } from "@umituz/react-native-design-system/theme";
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

/** Skeleton card matching CreationCard layout */
const CreationCardSkeleton: React.FC<{ tokens: DesignTokens }> = ({ tokens }) => {
    const styles = createSkeletonStyles(tokens);
    return (
        <View style={styles.card}>
            {/* Full-width image skeleton */}
            <AtomicSkeleton
                pattern="custom"
                custom={[{ width: "100%" as unknown as number, height: 200, borderRadius: 0 }]}
            />
            {/* Bottom bar skeleton */}
            <View style={styles.bottomBar}>
                <AtomicSkeleton
                    pattern="custom"
                    custom={[{ width: 140, height: 16, borderRadius: 4 }]}
                />
                <View style={styles.actions}>
                    {[1, 2, 3].map((id) => (
                        <AtomicSkeleton
                            key={id}
                            pattern="custom"
                            custom={[{ width: 32, height: 32, borderRadius: 16 }]}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
}

export const GalleryEmptyStates: React.FC<GalleryEmptyStatesProps> = ({
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
}) => {
    const styles = createStyles(tokens);

    // 1. Loading State - Show skeleton cards
    if (isLoading && (!creations || creations?.length === 0)) {
        return (
            <View style={styles.skeletonContainer}>
                {[1, 2, 3].map((id: number) => (
                    <CreationCardSkeleton key={id} tokens={tokens} />
                ))}
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
                    title={t("common.no_results")}
                    description={t("common.no_results_description")}
                    actionLabel={t("common.clear_all")}
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
    skeletonContainer: {
        flex: 1,
        paddingHorizontal: tokens.spacing.md,
        paddingTop: tokens.spacing.md,
    },
});

const createSkeletonStyles = (tokens: DesignTokens) => StyleSheet.create({
    card: {
        backgroundColor: tokens.colors.surface,
        borderRadius: tokens.spacing.md,
        overflow: 'hidden',
        marginBottom: tokens.spacing.md,
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: tokens.spacing.md,
    },
    actions: {
        flexDirection: 'row',
        gap: tokens.spacing.sm,
    },
});
