import React, { forwardRef, useCallback, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BottomSheetModal, BottomSheetModalRef } from '@umituz/react-native-bottom-sheet';
import { useAppDesignTokens, AtomicText, AtomicIcon } from '@umituz/react-native-design-system';

export interface FilterOption {
    id: string;
    label: string;
    icon?: string;
}

export interface FilterCategory {
    id: string;
    title: string;
    multiSelect?: boolean;
    options: FilterOption[];
}

interface FilterBottomSheetProps {
    categories: FilterCategory[];
    selectedIds: string[];
    onFilterPress: (id: string, categoryId: string) => void;
    onClearFilters: () => void;
    title: string;
    snapPoints?: string[];
}

export const FilterBottomSheet = forwardRef<BottomSheetModalRef, FilterBottomSheetProps>((props, ref) => {
    const { categories, selectedIds, onFilterPress, onClearFilters, title, snapPoints: propSnapPoints } = props;
    const tokens = useAppDesignTokens();
    const styles = useStyles(tokens);

    const snapPoints = useMemo(() => propSnapPoints || ['50%', '75%'], [propSnapPoints]);

    const renderOption = useCallback((option: FilterOption, category: FilterCategory) => {
        const isSelected = selectedIds.includes(option.id);

        return (
            <TouchableOpacity
                key={option.id}
                style={[styles.option, isSelected && styles.optionSelected]}
                onPress={() => onFilterPress(option.id, category.id)}
            >
                <View style={styles.optionContent}>
                    {option.icon && (
                        <View style={styles.optionIcon}>
                            <AtomicIcon
                                name={option.icon as any}
                                size="sm"
                                color={isSelected ? "primary" : "onSurface"}
                            />
                        </View>
                    )}
                    <AtomicText
                        style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}
                    >
                        {option.label}
                    </AtomicText>
                </View>
                {isSelected && (
                    <AtomicIcon name="check" size="sm" color="primary" />
                )}
            </TouchableOpacity>
        );
    }, [onFilterPress, selectedIds, styles]);

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={snapPoints}
        >
            <View style={styles.header}>
                <AtomicText style={styles.headerTitle}>{title}</AtomicText>
                <TouchableOpacity onPress={onClearFilters}>
                    <AtomicText style={styles.clearButton}>Clear</AtomicText>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {categories.map(category => (
                    <View key={category.id} style={styles.categoryContainer}>
                        <AtomicText style={styles.categoryTitle}>{category.title}</AtomicText>
                        <View style={styles.optionsContainer}>
                            {category.options.map(option => renderOption(option, category))}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </BottomSheetModal>
    );
});

const useStyles = (tokens: any) => StyleSheet.create({
    content: {
        padding: tokens.spacing.md,
        paddingBottom: tokens.spacing.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: tokens.spacing.md,
        paddingBottom: tokens.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: tokens.colors.outline,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: tokens.colors.textPrimary,
    },
    clearButton: {
        color: tokens.colors.primary,
        fontSize: 14,
        fontWeight: '600',
    },
    categoryContainer: {
        marginTop: tokens.spacing.md,
    },
    categoryTitle: {
        marginBottom: tokens.spacing.xs,
        color: tokens.colors.textSecondary,
        fontSize: 16,
        fontWeight: '600',
    },
    optionsContainer: {
        backgroundColor: tokens.colors.background,
        borderRadius: tokens.borderRadius.md,
        overflow: 'hidden',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: tokens.spacing.md,
        backgroundColor: tokens.colors.background,
        borderBottomWidth: 1,
        borderBottomColor: tokens.colors.surface,
    },
    optionSelected: {
        backgroundColor: tokens.colors.surface,
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionIcon: {
        marginRight: tokens.spacing.sm,
    },
    optionLabel: {
        color: tokens.colors.text,
        fontSize: 14,
    },
    optionLabelSelected: {
        color: tokens.colors.primary,
        fontWeight: 'bold',
    },
});
