import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { Image } from 'expo-image';

interface DetailImageProps {
    readonly uri: string;
}

const HORIZONTAL_PADDING = 16;
const ASPECT_RATIO = 16 / 9;

export const DetailImage: React.FC<DetailImageProps> = ({ uri }) => {
    const tokens = useAppDesignTokens();
    const { width } = useWindowDimensions();
    const imageWidth = width - (HORIZONTAL_PADDING * 2);
    const imageHeight = imageWidth / ASPECT_RATIO;

    return (
        <View style={styles.container}>
            <View style={[styles.frame, { width: imageWidth, height: imageHeight, backgroundColor: tokens.colors.surface }]}>
                <Image source={{ uri }} style={styles.image} contentFit="cover" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: HORIZONTAL_PADDING,
        marginVertical: 16,
    },
    frame: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
