declare const __DEV__: boolean;

import React from 'react';
import { View, TouchableOpacity, StyleSheet, type ViewStyle } from 'react-native';
import { AtomicText, AtomicIcon, useAppDesignTokens, type DesignTokens } from "@umituz/react-native-design-system";

interface GalleryHeaderProps {
    readonly title: string;
    readonly count: number;
    readonly countLabel: string;
    readonly isFiltered: boolean;
    readonly onFilterPress: () => void;
    readonly filterLabel?: string;
    readonly filterIcon?: string;
    readonly style?: ViewStyle;
}

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({
    title,
    count,
    countLabel,
    isFiltered,
    onFilterPress,
    filterLabel = 'Filter',
    filterIcon = 'filter-outline',
    style,
}) => {
    const tokens = useAppDesignTokens();
    const styles = useStyles(tokens);

    return (
        <View style={[styles.headerArea, style]}>
            <View>
                <AtomicText style={styles.title}>{title}</AtomicText>
                <AtomicText style={styles.subtitle}>
                    {count} {countLabel}
                </AtomicText>
            </View>
            <TouchableOpacity
                onPress={() => {
                    if (__DEV__) {
                        // eslint-disable-next-line no-console
                        console.log('[GalleryHeader] Filter button pressed');
                    }
                    onFilterPress();
                }}
                style={[styles.filterButton, isFiltered && styles.filterButtonActive]}
                activeOpacity={0.7}
            >
                <AtomicIcon
                    name={filterIcon}
                    size="sm"
                    color={isFiltered ? "primary" : "secondary"}
                />
                <AtomicText style={[styles.filterText, { color: isFiltered ? tokens.colors.primary : tokens.colors.textSecondary }]}>
                    {filterLabel}
                </AtomicText>
                {isFiltered && (
                    <View style={styles.badge} />
                )}
            </TouchableOpacity>
        </View>
    );
};

const useStyles = (tokens: DesignTokens) => StyleSheet.create({
    headerArea: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
        marginBottom: tokens.spacing.sm,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: tokens.colors.textPrimary,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: tokens.colors.textSecondary,
        opacity: 0.6
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.xs,
        paddingVertical: tokens.spacing.xs,
        paddingHorizontal: tokens.spacing.md,
        borderRadius: 999,
        backgroundColor: tokens.colors.surfaceVariant,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    filterButtonActive: {
        backgroundColor: tokens.colors.primary + "15",
        borderColor: tokens.colors.primary + "30",
    },
    filterText: {
        fontSize: 14,
        fontWeight: "500",
    },
    badge: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: tokens.colors.primary,
        position: 'absolute',
        top: 6,
        right: 6,
    },
});
