import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ImageGallery } from "@umituz/react-native-image";
import { AtomicIcon, AtomicText, useAppDesignTokens } from "@umituz/react-native-design-system";
import type { Creation } from "../../domain/entities/Creation";

interface CreationImageViewerProps {
    readonly creations: Creation[];
    readonly visible: boolean;
    readonly index: number;
    readonly enableEditing?: boolean;
    readonly onDismiss: () => void;
    readonly onIndexChange: (index: number) => void;
    readonly onImageEdit?: (uri: string, creationId: string) => void | Promise<void>;
    readonly selectedCreationId?: string;
}

export const CreationImageViewer: React.FC<CreationImageViewerProps> = ({
    creations,
    visible,
    index,
    enableEditing = false,
    onDismiss,
    onIndexChange,
    onImageEdit,
    selectedCreationId,
}) => {
    const tokens = useAppDesignTokens();
    const insets = useSafeAreaInsets();

    const handleImageChange = async (uri: string) => {
        if (selectedCreationId && onImageEdit) {
            await onImageEdit(uri, selectedCreationId);
        }
    };

    const HeaderComponent = ({ imageIndex }: { imageIndex: number }) => (
        <View style={[styles.header, { paddingTop: Math.max(insets.top, tokens.spacing.sm) }]} pointerEvents="box-none">
            <View style={styles.counter}>
                <AtomicText style={styles.counterText}>
                    {imageIndex + 1} / {creations.length}
                </AtomicText>
            </View>
            <TouchableOpacity
                onPress={onDismiss}
                style={styles.closeButton}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <AtomicIcon name="close" size="lg" color="onPrimary" />
            </TouchableOpacity>
        </View>
    );

    const styles = StyleSheet.create({
        header: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: tokens.spacing.lg,
            zIndex: 999,
        },
        counter: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.xs,
            borderRadius: 999,
            justifyContent: 'center',
        },
        counterText: {
            ...tokens.typography.bodyMedium,
            color: '#FFFFFF',
            fontWeight: '600',
        },
        closeButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    return (
        <ImageGallery
            images={creations.map((c) => ({ uri: c.uri }))}
            visible={visible}
            index={index}
            onDismiss={onDismiss}
            onIndexChange={onIndexChange}
            HeaderComponent={HeaderComponent}
            {...(enableEditing && { enableEditing } as any)}
            {...(onImageEdit && { onImageChange: handleImageChange } as any)}
        />
    );
};
