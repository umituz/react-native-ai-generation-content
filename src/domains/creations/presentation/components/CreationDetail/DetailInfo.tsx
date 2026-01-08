import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AtomicText, AtomicIcon, useAppDesignTokens, type DesignTokens } from "@umituz/react-native-design-system";

interface DetailInfoProps {
    readonly title: string;
    readonly date: string;
}

export const DetailInfo: React.FC<DetailInfoProps> = ({ title, date }) => {
    const tokens = useAppDesignTokens();
    const styles = useStyles(tokens);

    return (
        <View style={styles.container}>
            <AtomicText style={styles.title}>{title}</AtomicText>
            <View style={styles.dateBadge}>
                <AtomicIcon name="calendar-outline" size="sm" color="primary" />
                <AtomicText style={styles.dateText}>{date}</AtomicText>
            </View>
        </View>
    );
};

const useStyles = (tokens: DesignTokens) => StyleSheet.create({
    container: {
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
        gap: tokens.spacing.xs,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: tokens.colors.textPrimary,
    },
    dateBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        backgroundColor: tokens.colors.primary + '15',
    },
    dateText: {
        fontSize: 13,
        fontWeight: '600',
        color: tokens.colors.primary,
    },
});
