/**
 * StarRatingPicker Component
 * Shows 5 stars for rating selection
 */

import React, { useState, useMemo } from "react";
import { StyleSheet, View, TouchableOpacity, Modal } from "react-native";
import {
  AtomicIcon,
  AtomicText,
  AtomicButton,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

export interface StarRatingPickerProps {
  visible: boolean;
  onClose: () => void;
  onRate: (rating: number) => void;
  title?: string;
  submitLabel?: string;
  cancelLabel?: string;
}

export const StarRatingPicker: React.FC<StarRatingPickerProps> = ({
  visible,
  onClose,
  onRate,
  title = "Rate this creation",
  submitLabel = "Submit",
  cancelLabel = "Cancel",
}) => {
  const tokens = useAppDesignTokens();
  const [selectedRating, setSelectedRating] = useState(0);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          justifyContent: "center",
          alignItems: "center",
          padding: tokens.spacing.lg,
        },
        container: {
          backgroundColor: tokens.colors.surface,
          borderRadius: 20,
          padding: tokens.spacing.xl,
          width: "100%",
          maxWidth: 320,
          alignItems: "center",
        },
        title: {
          fontSize: 18,
          fontWeight: "700",
          color: tokens.colors.textPrimary,
          marginBottom: tokens.spacing.lg,
          textAlign: "center",
        },
        starsContainer: {
          flexDirection: "row",
          justifyContent: "center",
          gap: 8,
          marginBottom: tokens.spacing.xl,
        },
        starButton: {
          padding: 4,
        },
        buttonsContainer: {
          flexDirection: "row",
          gap: tokens.spacing.md,
          width: "100%",
        },
        button: {
          flex: 1,
        },
      }),
    [tokens],
  );

  const handleSubmit = () => {
    if (selectedRating > 0) {
      onRate(selectedRating);
      setSelectedRating(0);
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedRating(0);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleClose}
      >
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPress={() => {}}
        >
          <AtomicText style={styles.title}>{title}</AtomicText>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                style={styles.starButton}
                onPress={() => setSelectedRating(star)}
                activeOpacity={0.7}
              >
                <AtomicIcon
                  name={star <= selectedRating ? "star" : "star-outline"}
                  customSize={40}
                  customColor={star <= selectedRating ? "#FFD700" : tokens.colors.textTertiary}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.buttonsContainer}>
            <View style={styles.button}>
              <AtomicButton
                title={cancelLabel}
                variant="secondary"
                onPress={handleClose}
              />
            </View>
            <View style={styles.button}>
              <AtomicButton
                title={submitLabel}
                variant="primary"
                onPress={handleSubmit}
                disabled={selectedRating === 0}
              />
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
