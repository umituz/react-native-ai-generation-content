import React, { useMemo, useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDesignTokens, ImageGallery } from "@umituz/react-native-design-system";
import type { Creation } from '../../domain/entities/Creation';
import type { CreationsConfig } from '../../domain/value-objects/CreationsConfig';
import { hasVideoContent, getPreviewUrl } from '../../domain/utils';
import { DetailHeader } from '../components/CreationDetail/DetailHeader';
import { DetailImage } from '../components/CreationDetail/DetailImage';
import { DetailVideo } from '../components/CreationDetail/DetailVideo';
import { DetailStory } from '../components/CreationDetail/DetailStory';
import { DetailActions } from '../components/CreationDetail/DetailActions';
import { getLocalizedTitle } from '../utils/filterUtils';

/** Video creation types */
const VIDEO_TYPES = ['text-to-video', 'image-to-video'] as const;

interface CreationDetailScreenProps {
    readonly creation: Creation;
    readonly config: CreationsConfig;
    readonly onClose: () => void;
    readonly onShare: (creation: Creation) => void;
    readonly onDelete: (creation: Creation) => void;
    readonly onViewResult?: (creation: Creation) => void;
    readonly t: (key: string) => string;
}

interface CreationMetadata {
    readonly names?: string;
    readonly story?: string;
    readonly description?: string;
    readonly date?: string;
}

export const CreationDetailScreen: React.FC<CreationDetailScreenProps> = ({
    creation,
    config,
    onClose,
    onShare,
    onDelete,
    onViewResult,
    t
}) => {
    const tokens = useAppDesignTokens();
    const insets = useSafeAreaInsets();
    const [showFullScreen, setShowFullScreen] = useState(false);

    const handleImagePress = useCallback(() => {
        setShowFullScreen(true);
    }, []);

    const handleDismissFullScreen = useCallback(() => {
        setShowFullScreen(false);
    }, []);

    // Extract data safely
    const metadata = (creation.metadata || {}) as CreationMetadata;

    // Resolve title:
    // 1. Manually set names in metadata
    // 2. Localized title from config types mapping
    // 3. Fallback to raw creation type (formatted)
    const title = metadata.names || getLocalizedTitle(config, t, creation.type);
    const story = metadata.story || metadata.description || "";
    const date = metadata.date || new Date(creation.createdAt).toLocaleDateString();

    // Detect if this is a video creation
    const isVideo = useMemo(() => {
        if (VIDEO_TYPES.includes(creation.type as typeof VIDEO_TYPES[number])) return true;
        if (hasVideoContent(creation.output)) return true;
        return false;
    }, [creation.type, creation.output]);

    // Get video URL and thumbnail for video content
    const videoUrl = creation.output?.videoUrl || creation.uri;
    const thumbnailUrl = getPreviewUrl(creation.output) || undefined;

    return (
        <View style={[styles.container, { backgroundColor: tokens.colors.background }]}>
            <View style={{ paddingTop: insets.top }}>
                <DetailHeader
                    title={title}
                    date={date}
                    onClose={onClose}
                />
            </View>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 32 }]}
                showsVerticalScrollIndicator={false}
            >
                {isVideo ? (
                    <DetailVideo videoUrl={videoUrl} _thumbnailUrl={thumbnailUrl} />
                ) : (
                    <DetailImage uri={creation.uri} onPress={handleImagePress} />
                )}

                {story ? (
                    <DetailStory story={story} />
                ) : null}

                <DetailActions
                    onShare={() => onShare(creation)}
                    onDelete={() => onDelete(creation)}
                    onViewResult={onViewResult ? () => onViewResult(creation) : undefined}
                    shareLabel={t("result.shareButton")}
                    deleteLabel={t("common.delete")}
                    viewResultLabel={onViewResult ? t("result.viewResult") : undefined}
                />
            </ScrollView>

            {!isVideo && (
                <ImageGallery
                    images={[{ uri: creation.uri }]}
                    visible={showFullScreen}
                    onDismiss={handleDismissFullScreen}
                    index={0}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 8,
    },
});
