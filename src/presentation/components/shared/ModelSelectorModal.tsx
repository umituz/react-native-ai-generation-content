/**
 * ModelSelectorModal Component
 * Single Responsibility: Render the modal with model list
 */

import React from "react";
import {
  Modal,
  Pressable,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useSafeAreaInsets } from "@umituz/react-native-design-system/safe-area";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { ModelOptionItem } from "./ModelOptionItem";
import type { ModelOption } from "./ModelSelector";

interface ModelSelectorModalProps {
  readonly isOpen: boolean;
  readonly models: ModelOption[];
  readonly selectedModel: ModelOption | null;
  readonly onClose: () => void;
  readonly onSelect: (modelId: string) => void;
  readonly selectModelLabel: string;
  readonly creditsLabel: string;
  readonly closeLabel: string;
}

export const ModelSelectorModal: React.FC<ModelSelectorModalProps> = ({
  isOpen,
  models,
  selectedModel,
  onClose,
  onSelect,
  selectModelLabel,
  creditsLabel,
  closeLabel,
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Pressable
        style={[
          styles.overlay,
          { backgroundColor: tokens.colors.modalOverlay },
        ]}
        onPress={onClose}
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
              {selectModelLabel}
            </AtomicText>
            <TouchableOpacity
              onPress={onClose}
              accessibilityLabel={closeLabel}
              accessibilityRole="button"
            >
              <AtomicIcon name="close" size="sm" color="secondary" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.list}>
            {models.map((model) => (
              <ModelOptionItem
                key={model.id}
                model={model}
                isSelected={selectedModel?.id === model.id}
                onSelect={onSelect}
                creditsLabel={creditsLabel}
              />
            ))}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
});
