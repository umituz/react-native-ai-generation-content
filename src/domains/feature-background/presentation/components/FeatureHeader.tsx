/**
 * Feature Header Component
 * @description Header with hero image and description
 */

import React, { memo } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import {
    AtomicText,
    useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { FeatureHeaderProps } from "../../domain/entities";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_WIDTH = SCREEN_WIDTH - 32;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.5;

export const FeatureHeader: React.FC<FeatureHeaderProps> = memo(
    function FeatureHeader({ heroImage, description }) {
        const tokens = useAppDesignTokens();

        if (!heroImage && !description) {
            return null;
        }

        return (
            <View style={styles.container}>
                {heroImage && (
                    <View
                        style={[
                            styles.imageContainer,
                            { backgroundColor: tokens.colors.surface },
                        ]}
                    >
                        <Image
                            source={heroImage}
                            style={[
                                styles.heroImage,
                                { width: IMAGE_WIDTH, height: IMAGE_HEIGHT },
                            ]}
                            resizeMode="cover"
                        />
                    </View>
                )}
                {description && (
                    <AtomicText
                        type="bodyMedium"
                        style={[
                            styles.description,
                            {
                                color: tokens.colors.textSecondary,
                                marginTop: tokens.spacing.md,
                            },
                        ]}
                    >
                        {description}
                    </AtomicText>
                )}
            </View>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
    },
    imageContainer: {
        borderRadius: 16,
        overflow: "hidden",
    },
    heroImage: {
        borderRadius: 16,
    },
    description: {
        textAlign: "center",
        lineHeight: 22,
        paddingHorizontal: 8,
    },
});
