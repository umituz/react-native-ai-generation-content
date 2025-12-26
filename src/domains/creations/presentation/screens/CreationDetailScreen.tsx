import React from 'react';
import { StyleSheet } from 'react-native';
import { useAppDesignTokens, type DesignTokens, ScreenLayout } from "@umituz/react-native-design-system";
import type { Creation } from '../../domain/entities/Creation';
import { DetailHeader } from '../components/CreationDetail/DetailHeader';
import { DetailImage } from '../components/CreationDetail/DetailImage';
import { DetailStory } from '../components/CreationDetail/DetailStory';
import { DetailActions } from '../components/CreationDetail/DetailActions';

import { useCreationsProvider } from '../components/CreationsProvider';

interface CreationDetailScreenProps {
    readonly creation: Creation;
    readonly onClose: () => void;
    readonly onShare: (creation: Creation) => void;
    readonly onDelete: (creation: Creation) => void;
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
    onClose,
    onShare,
    onDelete,
    t
}) => {
    const tokens = useAppDesignTokens();
    const { getLocalizedTitle } = useCreationsProvider();

    // Extract data safely
    const metadata = (creation.metadata || {}) as CreationMetadata;

    // Resolve title:
    // 1. Manually set names in metadata
    // 2. Localized title from config types mapping
    // 3. Fallback to raw creation type (formatted)
    const title = metadata.names || getLocalizedTitle(creation.type);
    const story = metadata.story || metadata.description || "";
    const date = metadata.date || new Date(creation.createdAt).toLocaleDateString();

    const styles = useStyles(tokens);

    return (
        <ScreenLayout
            scrollable={true}
            edges={['top', 'bottom']}
            backgroundColor={tokens.colors.background}
            header={
                <DetailHeader
                    title={title}
                    date={date}
                    onClose={onClose}
                />
            }
            contentContainerStyle={styles.scrollContent}
        >
            <DetailImage uri={creation.uri} />

            {story ? (
                <DetailStory story={story} />
            ) : null}

            <DetailActions
                onShare={() => onShare(creation)}
                onDelete={() => onDelete(creation)}
                shareLabel={t("result.shareButton") || "Share"}
                deleteLabel={t("common.delete") || "Delete"}
            />
        </ScreenLayout>
    );
};

const useStyles = (tokens: DesignTokens) => StyleSheet.create({
    scrollContent: {
        paddingBottom: tokens.spacing.xxl,
    },
});
