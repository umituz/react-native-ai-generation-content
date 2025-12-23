
import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { useAppDesignTokens } from "@umituz/react-native-design-system";

interface DetailImageProps {
    readonly uri: string;
}

const { width } = Dimensions.get('window');

export const DetailImage: React.FC<DetailImageProps> = ({ uri }) => {
    const tokens = useAppDesignTokens();
    const styles = useStyles(tokens);

    return (
        <View style={styles.container}>
            <View style={styles.frame}>
                <Image source={{ uri }} style={styles.image} resizeMode="cover" />
            </View>
        </View>
    );
};

const useStyles = (tokens: any) => StyleSheet.create({
    container: {
        paddingHorizontal: tokens.spacing.lg,
        marginVertical: tokens.spacing.lg,
    },
    frame: {
        width: width - (tokens.spacing.lg * 2),
        height: width - (tokens.spacing.lg * 2),
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: tokens.colors.surface,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
