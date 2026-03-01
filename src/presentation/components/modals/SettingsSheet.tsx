/**
 * SettingsSheet Component
 * Generic modal bottom sheet for settings or options
 * Props-driven for 100+ apps compatibility
 */

import React from "react";
import {
  View,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
  type GestureResponderEvent,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AtomicText, AtomicButton } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

export interface SettingsSheetProps {
  readonly visible: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly doneLabel: string;
  readonly children: React.ReactNode;
}

export const SettingsSheet: React.FC<SettingsSheetProps> = ({
  visible,
  onClose,
  title,
  doneLabel,
  children,
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();

  const handleBackdropPress = () => {
    onClose();
  };

  const handleSheetPress = (e: GestureResponderEvent) => {
    e.stopPropagation();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Pressable
        style={[styles.backdrop, { backgroundColor: tokens.colors.modalOverlay }]}
        onPress={handleBackdropPress}
      >
        <Pressable
          style={[
            styles.sheet,
            {
              backgroundColor: tokens.colors.surface,
              paddingBottom: insets.bottom + 16,
            },
          ]}
          onPress={handleSheetPress}
        >
          <View
            style={[styles.handle, { backgroundColor: tokens.colors.border }]}
          />

          <View style={styles.header}>
            <AtomicText
              type="titleMedium"
              style={[styles.title, { color: tokens.colors.textPrimary }]}
            >
              {title}
            </AtomicText>
            <AtomicButton
              variant="secondary"
              size="sm"
              onPress={onClose}
              style={styles.doneButton}
            >
              <AtomicText
                type="bodyMedium"
                style={[styles.doneText, { color: tokens.colors.primary }]}
              >
                {doneLabel}
              </AtomicText>
            </AtomicButton>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            {children}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "80%",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  title: {
    fontWeight: "600",
  },
  doneButton: {
    paddingHorizontal: 0,
    backgroundColor: "transparent",
  },
  doneText: {
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: 4,
  },
});
