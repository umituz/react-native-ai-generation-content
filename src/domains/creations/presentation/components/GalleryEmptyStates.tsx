/**
 * Gallery Empty States
 * Handles different empty state scenarios for gallery
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicSkeleton, type DesignTokens } from "@umituz/react-native-design-system";
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
function CreationCardSkeleton({ tokens }: { tokens: DesignTokens }) {
    const styles = createSkeletonStyles(tokens);
    return (
        <View style={styles.card}>
            {/* Thumbnail skeleton */}
            <AtomicSkeleton
                pattern="custom"
                custom={[{ width: 100, height: 100, borderRadius: 0 }]}
            />
            {/* Content skeleton */}
            <View style={styles.content}>
                <View style={styles.textArea}>
                    <AtomicSkeleton
                        pattern="custom"
                        custom={[
                            { width: 120, height: 18, borderRadius: 4, marginBottom: 8 },
                            { width: 100, height: 14, borderRadius: 4 },
                        ]}
                    />
                </View>
                {/* Action buttons skeleton */}
                <View style={styles.actions}>
                    {[1, 2, 3, 4].map((i) => (
                        <AtomicSkeleton
                            key={i}
                            pattern="custom"
                            custom={[{ width: 36, height: 36, borderRadius: 18 }]}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
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

    // 1. Loading State - Show skeleton cards
    if (isLoading && (!creations || creations?.length === 0)) {
        return (
            <View style={styles.skeletonContainer}>
                {[1, 2, 3].map((i) => (
                    <CreationCardSkeleton key={i} tokens={tokens} />
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
        flexDirection: 'row',
        backgroundColor: tokens.colors.surface,
        borderRadius: tokens.spacing.md,
        overflow: 'hidden',
        marginBottom: tokens.spacing.md,
    },
    content: {
        flex: 1,
        padding: tokens.spacing.md,
        justifyContent: 'space-between',
    },
    textArea: {
        gap: tokens.spacing.xs,
    },
    actions: {
        flexDirection: 'row',
        gap: tokens.spacing.sm,
    },
});
