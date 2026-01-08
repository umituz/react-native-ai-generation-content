import React from 'react';
import { View, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { Image } from 'expo-image';

interface DetailImageProps {
    readonly uri: string;
    readonly onPress?: () => void;
}

const HORIZONTAL_PADDING = 16;
const ASPECT_RATIO = 16 / 9;

export const DetailImage: React.FC<DetailImageProps> = ({ uri, onPress }) => {
    const tokens = useAppDesignTokens();
    const { width } = useWindowDimensions();
    const imageWidth = width - (HORIZONTAL_PADDING * 2);
    const imageHeight = imageWidth / ASPECT_RATIO;

    const content = (
        <View style={[styles.frame, { width: imageWidth, height: imageHeight, backgroundColor: tokens.colors.surface }]}>
            <Image source={{ uri }} style={styles.image} contentFit="cover" />
        </View>
    );

    return (
        <View style={styles.container}>
            {onPress ? (
                <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
                    {content}
                </TouchableOpacity>
            ) : (
                content
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: HORIZONTAL_PADDING,
        marginTop: 8,
        marginBottom: 12,
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
