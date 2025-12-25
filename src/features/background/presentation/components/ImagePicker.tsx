/**
 * Image Picker Component
 * @description Image selection component with placeholder state
 */

import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
    AtomicText,
    AtomicIcon,
    useAppDesignTokens,
} from "@umituz/react-native-design-system";
import type { ImagePickerProps } from "../../domain/entities";

export const ImagePicker: React.FC<ImagePickerProps> = memo(
    function ImagePicker({
        imageUri,
        isProcessing,
        onSelectImage,
        placeholderText,
    }) {
        const tokens = useAppDesignTokens();

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={[
                        styles.imagePickerBox,
                        { backgroundColor: tokens.colors.surface },
                    ]}
                    onPress={onSelectImage}
                    disabled={isProcessing}
                    activeOpacity={0.8}
                >
                    {imageUri ? (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: imageUri }} style={styles.image} />
                            <View style={styles.imageOverlay}>
                                <View
                                    style={[
                                        styles.editBadge,
                                        { backgroundColor: tokens.colors.primary },
                                    ]}
                                >
                                    <AtomicIcon
                                        name="image-plus"
                                        size="md"
                                       
                                    />
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View
                            style={[
                                styles.placeholderContainer,
                                { backgroundColor: tokens.colors.surface },
                            ]}
                        >
                            <View
                                style={[
                                    styles.uploadIconContainer,
                                    { backgroundColor: tokens.colors.surfaceSecondary },
                                ]}
                            >
                                <AtomicIcon
                                    name="upload"
                                    size="lg"
                                   
                                />
                            </View>
                            <AtomicText
                                
                                style={[
                                    styles.placeholderText,
                                    { color: tokens.colors.primary },
                                ]}
                            >
                                {placeholderText}
                            </AtomicText>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        alignItems: "center",
    },
    imagePickerBox: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 20,
        overflow: "hidden",
    },
    imageContainer: {
        flex: 1,
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imageOverlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "25%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: 16,
    },
    editBadge: {
        borderRadius: 20,
        padding: 10,
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    uploadIconContainer: {
        borderRadius: 50,
        padding: 24,
        marginBottom: 16,
    },
    placeholderText: {
        textAlign: "center",
        fontWeight: "600",
    },
});
