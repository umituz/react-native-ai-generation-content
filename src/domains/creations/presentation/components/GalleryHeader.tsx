import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AtomicText, AtomicIcon, useAppDesignTokens } from "@umituz/react-native-design-system";

interface GalleryHeaderProps {
    readonly title: string;
    readonly count: number;
    readonly countLabel: string;
    readonly isFiltered: boolean;
    readonly onFilterPress: () => void;
    readonly filterLabel?: string;
    readonly filterIcon?: any;
    readonly onFavoritesPress?: () => void;
    readonly showOnlyFavorites?: boolean;
    readonly style?: any;
    readonly subtitle?: string;
    readonly isFilterEnabled?: boolean;
    readonly showCount?: boolean;
}

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({
    title,
    count,
    countLabel,
    isFiltered,
    onFilterPress,
    filterLabel = 'Filter',
    filterIcon = 'filter-outline',
    onFavoritesPress,
    showOnlyFavorites = false,
    subtitle,
    isFilterEnabled = true,
    showCount = true,
    style,
}) => {
    const tokens = useAppDesignTokens();
    const styles = useStyles(tokens);

    return (
        <View style={[styles.headerArea, style]}>
            <View style={styles.titleArea}>
                {!!title && <AtomicText style={styles.title}>{title}</AtomicText>}
                <AtomicText style={styles.subtitle}>
                    {subtitle || (showCount ? `${count} ${countLabel}` : '')}
                </AtomicText>
            </View>
            <View style={styles.actions}>
                {onFavoritesPress && (
                    <TouchableOpacity
                        onPress={onFavoritesPress}
                        style={[styles.actionButton, showOnlyFavorites && styles.actionButtonActive]}
                        activeOpacity={0.7}
                    >
                        <AtomicIcon
                            name={showOnlyFavorites ? "heart" : "heart-outline"}
                            size="sm"
                            color={showOnlyFavorites ? "error" : "secondary"}
                        />
                    </TouchableOpacity>
                )}
                {isFilterEnabled && (
                    <TouchableOpacity
                        onPress={onFilterPress}
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
                )}
            </View>
        </View>
    );
};

const useStyles = (tokens: any) => StyleSheet.create({
    headerArea: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
        marginBottom: tokens.spacing.sm,
    },
    titleArea: {
        flex: 1,
        marginRight: tokens.spacing.md,
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
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: tokens.colors.surfaceVariant,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    actionButtonActive: {
        backgroundColor: tokens.colors.primary + "15",
        borderColor: tokens.colors.primary + "30",
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
        height: 40,
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
