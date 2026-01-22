/**
 * ModelSelector Component
 * Generic model selection dropdown for AI generation
 * Package: @umituz/react-native-ai-generation-content
 *
 * @description
 * Universal model selector component that works with any AI model type.
 * Designed for 100+ applications with different model requirements.
 *
 * @example
 * ```tsx
 * <ModelSelector
 *   models={videoModels}
 *   selectedModel={selected}
 *   onSelectModel={(id) => setSelected(id)}
 *   label="Select Video Model"
 * />
 * ```
 */

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import {
  useAppDesignTokens,
  AtomicText,
  AtomicIcon,
  useSafeAreaInsets,
} from "@umituz/react-native-design-system";

export interface ModelOption {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly cost?: number;
  readonly badge?: string;
}

export interface ModelSelectorProps {
  readonly models: ModelOption[];
  readonly selectedModel: ModelOption | null;
  readonly onSelectModel: (modelId: string) => void;
  readonly label?: string;
  readonly isLoading?: boolean;
  readonly translations?: {
    readonly selectModel?: string;
    readonly credits?: string;
    readonly close?: string;
  };
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  selectedModel,
  onSelectModel,
  label,
  isLoading = false,
  translations = {},
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState(false);

  const {
    selectModel = "Select Model",
    credits = "credits",
    close = "Close",
  } = translations;

  const handleSelect = (modelId: string) => {
    onSelectModel(modelId);
    setIsOpen(false);
  };

  const displayName = selectedModel?.name || label || selectModel;

  return (
    <>
      <TouchableOpacity
        style={[
          styles.trigger,
          {
            backgroundColor: tokens.colors.surface,
            borderRadius: tokens.borders.radius.md,
          },
        ]}
        onPress={() => setIsOpen(true)}
        disabled={isLoading}
      >
        <AtomicText type="labelMedium" color="textPrimary">
          {displayName}
        </AtomicText>
        <AtomicIcon name="chevron-down" size="xs" color="secondary" />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          style={[
            styles.overlay,
            { backgroundColor: tokens.colors.modalOverlay },
          ]}
          onPress={() => setIsOpen(false)}
        >
          <View
            style={[
              styles.dropdown,
              {
                backgroundColor: tokens.colors.backgroundSecondary,
                marginTop: insets.top + 50,
                borderRadius: tokens.borders.radius.lg,
              },
            ]}
          >
            <View
              style={[
                styles.header,
                { borderBottomColor: tokens.colors.borderLight },
              ]}
            >
              <AtomicText type="titleSmall" color="textPrimary">
                {selectModel}
              </AtomicText>
              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                accessibilityLabel={close}
                accessibilityRole="button"
              >
                <AtomicIcon name="close" size="sm" color="secondary" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.list}>
              {models.map((model) => {
                const isSelected = selectedModel?.id === model.id;
                return (
                  <TouchableOpacity
                    key={model.id}
                    style={[
                      styles.option,
                      {
                        backgroundColor: isSelected
                          ? `${tokens.colors.primary}15`
                          : "transparent",
                      },
                    ]}
                    onPress={() => handleSelect(model.id)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                  >
                    <View style={styles.optionContent}>
                      <View style={styles.optionInfo}>
                        <AtomicText
                          type="bodyLarge"
                          style={{
                            color: isSelected
                              ? tokens.colors.primary
                              : tokens.colors.textPrimary,
                            fontWeight: isSelected ? "600" : "400",
                          }}
                        >
                          {model.name}
                        </AtomicText>
                        {model.description && (
                          <AtomicText
                            type="bodySmall"
                            color="textSecondary"
                            numberOfLines={2}
                          >
                            {model.description}
                          </AtomicText>
                        )}
                        {model.badge && (
                          <View
                            style={[
                              styles.badge,
                              {
                                backgroundColor: `${tokens.colors.success}20`,
                              },
                            ]}
                          >
                            <AtomicText type="labelSmall" color="success">
                              {model.badge}
                            </AtomicText>
                          </View>
                        )}
                      </View>
                      <View style={styles.optionRight}>
                        {model.cost !== undefined && (
                          <AtomicText type="labelSmall" color="textSecondary">
                            {model.cost} {credits}
                          </AtomicText>
                        )}
                        {isSelected && (
                          <AtomicIcon
                            name="checkmark"
                            size="sm"
                            color="primary"
                          />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },
  overlay: {
    flex: 1,
  },
  dropdown: {
    marginHorizontal: 16,
    maxHeight: 400,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  list: {
    maxHeight: 350,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  optionInfo: {
    flex: 1,
    gap: 4,
  },
  optionRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
});
