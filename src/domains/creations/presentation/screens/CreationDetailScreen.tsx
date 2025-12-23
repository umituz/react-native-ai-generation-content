
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import type { Creation } from '../../domain/entities/Creation';
import { DetailHeader } from '../components/CreationDetail/DetailHeader';
import { DetailImage } from '../components/CreationDetail/DetailImage';
import { DetailStory } from '../components/CreationDetail/DetailStory';
import { DetailActions } from '../components/CreationDetail/DetailActions';

interface CreationDetailScreenProps {
    readonly creation: Creation;
    readonly onClose: () => void;
    readonly onShare: (creation: Creation) => void;
    readonly onDelete: (creation: Creation) => void;
    readonly t: (key: string) => string;
}

export const CreationDetailScreen: React.FC<CreationDetailScreenProps> = ({
    creation,
    onClose,
    onShare,
    onDelete,
    t
}) => {
    const tokens = useAppDesignTokens();

    // Extract data
    const metadata = (creation as any).metadata || {};
    const title = metadata.names || creation.type;
    const story = metadata.story || metadata.description || "";
    const date = metadata.date || new Date(creation.createdAt).toLocaleDateString();

    const styles = useStyles(tokens);

    return (
        <View style={styles.container}>
            <DetailHeader
                title={title}
                date={date}
                onClose={onClose}
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <DetailImage uri={creation.uri} />

                <DetailStory story={story} />

                <DetailActions
                    onShare={() => onShare(creation)}
                    onDelete={() => onDelete(creation)}
                    shareLabel={t("result.shareButton") || "Share"}
                    deleteLabel={t("common.delete") || "Delete"}
                />
            </ScrollView>
        </View>
    );
};

const useStyles = (tokens: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: tokens.colors.backgroundPrimary,
    },
    scrollContent: {
        paddingBottom: tokens.spacing.xxl,
    },
});
