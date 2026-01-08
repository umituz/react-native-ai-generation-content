
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AtomicText, AtomicIcon, useAppDesignTokens, type DesignTokens } from "@umituz/react-native-design-system";

interface DetailActionsProps {
    readonly onShare: () => void;
    readonly onDelete: () => void;
    readonly onViewResult?: () => void;
    readonly shareLabel: string;
    readonly deleteLabel: string;
    readonly viewResultLabel?: string;
}

export const DetailActions: React.FC<DetailActionsProps> = ({
    onShare,
    onDelete,
    onViewResult,
    shareLabel,
    deleteLabel,
    viewResultLabel
}) => {
    const tokens = useAppDesignTokens();
    const styles = useStyles(tokens);

    return (
        <View style={styles.container}>
            {onViewResult && viewResultLabel && (
                <TouchableOpacity
                    style={[styles.button, styles.viewResultButton]}
                    onPress={onViewResult}
                    activeOpacity={0.7}
                >
                    <AtomicIcon name="eye-outline" size="sm" color="onPrimary" />
                    <AtomicText style={styles.buttonText}>{viewResultLabel}</AtomicText>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={[styles.button, styles.shareButton]}
                onPress={onShare}
                activeOpacity={0.7}
            >
                <AtomicIcon name="share-social-outline" size="sm" color="onPrimary" />
                <AtomicText style={styles.buttonText}>{shareLabel}</AtomicText>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={onDelete}
                activeOpacity={0.7}
            >
                <AtomicIcon name="trash-outline" size="sm" color="error" />
                <AtomicText style={[styles.buttonText, { color: tokens.colors.error }]}>
                    {deleteLabel}
                </AtomicText>
            </TouchableOpacity>
        </View>
    );
};

const useStyles = (tokens: DesignTokens) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: tokens.spacing.md,
        paddingHorizontal: tokens.spacing.lg,
        marginBottom: tokens.spacing.xxl,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 16,
        gap: 8,
        minWidth: 110,
    },
    viewResultButton: {
        backgroundColor: tokens.colors.primary,
    },
    shareButton: {
        backgroundColor: tokens.colors.primary,
    },
    deleteButton: {
        backgroundColor: tokens.colors.error + '10',
    },
    buttonText: {
        fontWeight: '700',
        color: tokens.colors.textInverse,
        fontSize: 15,
    },
});
