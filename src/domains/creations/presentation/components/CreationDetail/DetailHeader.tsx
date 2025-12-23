
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AtomicText, AtomicIcon, useAppDesignTokens } from "@umituz/react-native-design-system";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface DetailHeaderProps {
    readonly title: string;
    readonly date: string;
    readonly onClose: () => void;
}

export const DetailHeader: React.FC<DetailHeaderProps> = ({ title, date, onClose }) => {
    const tokens = useAppDesignTokens();
    const insets = useSafeAreaInsets();
    const styles = useStyles(tokens, insets);

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <AtomicIcon name="arrow-back" size={24} customColor={tokens.colors.textPrimary} />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <AtomicText style={styles.title} numberOfLines={1}>{title}</AtomicText>
                <View style={styles.dateBadge}>
                    <AtomicIcon name="calendar-outline" size={12} customColor={tokens.colors.primary} />
                    <AtomicText style={styles.dateText}>{date}</AtomicText>
                </View>
            </View>

            <View style={styles.placeholder} />
        </View>
    );
};

const useStyles = (tokens: any, insets: any) => StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: insets.top + tokens.spacing.sm,
        paddingBottom: tokens.spacing.md,
        paddingHorizontal: tokens.spacing.md,
        backgroundColor: tokens.colors.backgroundPrimary,
        borderBottomWidth: 1,
        borderBottomColor: tokens.colors.border,
        zIndex: 10,
    },
    closeButton: {
        padding: tokens.spacing.xs,
        marginRight: tokens.spacing.sm,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: tokens.colors.textPrimary,
        marginBottom: 4,
        textAlign: 'center',
    },
    dateBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: tokens.colors.primary + '15',
    },
    dateText: {
        fontSize: 12,
        fontWeight: '600',
        color: tokens.colors.primary,
    },
    placeholder: {
        width: 40,
    },
});
