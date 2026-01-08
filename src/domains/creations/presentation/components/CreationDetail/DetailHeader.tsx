import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AtomicIcon, useAppDesignTokens, type DesignTokens } from "@umituz/react-native-design-system";

interface DetailHeaderProps {
    readonly onClose: () => void;
}

export const DetailHeader: React.FC<DetailHeaderProps> = ({ onClose }) => {
    const tokens = useAppDesignTokens();
    const styles = useStyles(tokens);

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <AtomicIcon name="arrow-back" size="md" color="onSurface" />
            </TouchableOpacity>
        </View>
    );
};

const useStyles = (tokens: DesignTokens) => StyleSheet.create({
    headerContainer: {
        paddingVertical: tokens.spacing.xs,
        paddingHorizontal: tokens.spacing.sm,
        backgroundColor: tokens.colors.background,
    },
    closeButton: {
        padding: tokens.spacing.xs,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
