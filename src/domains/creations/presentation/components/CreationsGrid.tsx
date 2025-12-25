import React from 'react';
import { FlatList, RefreshControl, StyleSheet, type ViewStyle } from 'react-native';
import { useAppDesignTokens, type DesignTokens } from "@umituz/react-native-design-system";
import type { Creation } from "../../domain/entities/Creation";
import type { CreationType } from "../../domain/value-objects/CreationsConfig";
import { CreationCard } from "./CreationCard";

interface CreationsGridProps {
    readonly creations: Creation[];
    readonly types: readonly CreationType[];
    readonly isLoading: boolean;
    readonly onRefresh: () => void;
    readonly onView: (creation: Creation) => void;
    readonly onShare: (creation: Creation) => void;
    readonly onDelete: (creation: Creation) => void;
    readonly onFavorite?: (creation: Creation, isFavorite: boolean) => void;
    readonly contentContainerStyle?: ViewStyle;
    readonly ListEmptyComponent?: React.ReactElement | null;
    readonly ListHeaderComponent?: React.ComponentType<unknown> | React.ReactElement | null;
}

export const CreationsGrid: React.FC<CreationsGridProps> = ({
    creations,
    types,
    isLoading,
    onRefresh,
    onView,
    onShare,
    onDelete,
    onFavorite,
    contentContainerStyle,
    ListEmptyComponent,
    ListHeaderComponent,
}) => {
    const tokens = useAppDesignTokens();
    const styles = useStyles(tokens);

    const renderItem = ({ item }: { item: Creation }) => (
        <CreationCard
            creation={item}
            types={types as CreationType[]}
            onView={() => onView(item)}
            onShare={() => onShare(item)}
            onDelete={() => onDelete(item)}
            onFavorite={onFavorite ? (creation, isFavorite) => onFavorite(creation, isFavorite) : undefined}
        />
    );

    return (
        <FlatList
            data={creations}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={ListHeaderComponent}
            ListEmptyComponent={ListEmptyComponent}
            contentContainerStyle={[
                styles.list,
                contentContainerStyle,
                (!creations || creations.length === 0) && { flexGrow: 1 }
            ]}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={onRefresh}
                    tintColor={tokens.colors.primary}
                />
            }
        />
    );
};

const useStyles = (tokens: DesignTokens) => StyleSheet.create({
    list: {
        padding: tokens.spacing.md,
        paddingBottom: 100, // Space for fab or bottom tab
    },
});
