import React from "react";
import { ImageGallery } from "@umituz/react-native-image";
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
    const handleImageChange = async (uri: string) => {
        if (selectedCreationId && onImageEdit) {
            await onImageEdit(uri, selectedCreationId);
        }
    };

    return (
        <ImageGallery
            images={creations.map((c) => ({ uri: c.uri }))}
            visible={visible}
            index={index}
            onDismiss={onDismiss}
            onIndexChange={onIndexChange}
            {...(enableEditing && { enableEditing } as any)}
            {...(onImageEdit && { onImageChange: handleImageChange } as any)}
        />
    );
};
