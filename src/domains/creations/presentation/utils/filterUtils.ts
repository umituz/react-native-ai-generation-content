import type { CreationsConfig } from "../../domain/value-objects/CreationsConfig";
import type { FilterCategory } from "@umituz/react-native-design-system";

/**
 * Transforms the creations configuration into filter categories for the UI.
 * 
 * @param config The creations configuration object
 * @param t Translation function
 * @returns Array of FilterCategory
 */
export const getFilterCategoriesFromConfig = (
    config: CreationsConfig,
    t: (key: string) => string
): FilterCategory[] => {
    const categories: FilterCategory[] = [];

    if (config.types && config.types.length > 0) {
        categories.push({
            id: 'type',
            title: t(config.translations.filterTitle),
            multiSelect: false,
            options: config.types.map(type => ({
                id: type.id,
                label: t(type.labelKey),
                icon: type.icon
            }))
        });
    }

    if (config.filterCategories && config.filterCategories.length > 0) {
        categories.push(...config.filterCategories);
    }

    return categories;
};

/**
 * Translates the creation types for display.
 * 
 * @param config The creations configuration object
 * @param t Translation function
 * @returns Array of types with translated labels
 */
export const getTranslatedTypes = (
    config: CreationsConfig,
    t: (key: string) => string
) => {
    return config.types.map(type => ({
        ...type,
        labelKey: t(type.labelKey)
    }));
};
