
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AtomicText, useAppDesignTokens, type DesignTokens } from "@umituz/react-native-design-system";

interface DetailStoryProps {
    readonly story: string;
}

export const DetailStory: React.FC<DetailStoryProps> = ({ story }) => {
    const tokens = useAppDesignTokens();
    const styles = useStyles(tokens);

    if (!story) return null;

    return (
        <View style={styles.container}>
            <View style={styles.storyContainer}>
                <AtomicText style={styles.quoteMark}>&quot;</AtomicText>
                <AtomicText style={styles.text}>{story}</AtomicText>
                <View style={styles.quoteEndRow}>
                    <AtomicText style={[styles.quoteMark, styles.quoteEnd]}>&quot;</AtomicText>
                </View>
            </View>
        </View>
    );
};

const useStyles = (tokens: DesignTokens) => StyleSheet.create({
    container: {
        paddingHorizontal: tokens.spacing.lg,
        marginBottom: tokens.spacing.lg,
    },
    storyContainer: {
        padding: tokens.spacing.lg,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: tokens.colors.border,
        backgroundColor: tokens.colors.surface,
    },
    quoteMark: {
        fontSize: 48,
        lineHeight: 48,
        color: tokens.colors.primary,
        opacity: 0.4,
        marginBottom: -16,
    },
    quoteEndRow: {
        alignItems: 'flex-end',
        marginTop: -16,
    },
    quoteEnd: {
        marginBottom: 0,
    },
    text: {
        fontSize: 16,
        lineHeight: 26,
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: '500',
        color: tokens.colors.textPrimary,
        paddingBottom: 4,
    },
});
