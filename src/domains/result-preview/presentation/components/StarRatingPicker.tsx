/**
 * StarRatingPicker Component
 * Shows 5 stars for rating selection
 */

import React, { useState, useMemo } from "react";
import { StyleSheet, View, TouchableOpacity, Modal, TextInput } from "react-native";
import {
  AtomicIcon,
  AtomicText,
  AtomicButton,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

interface StarRatingPickerProps {
  visible: boolean;
  onClose: () => void;
  onRate: (rating: number, description: string) => void;
  title?: string;
  submitLabel?: string;
  cancelLabel?: string;
  descriptionPlaceholder?: string;
}

export const StarRatingPicker: React.FC<StarRatingPickerProps> = ({
  visible,
  onClose,
  onRate,
  title = "Rate this creation",
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  descriptionPlaceholder = "Tell us what you think... (Optional)",
}) => {
  const tokens = useAppDesignTokens();
  const [selectedRating, setSelectedRating] = useState(0);
  const [description, setDescription] = useState("");

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
          maxWidth: 340,
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
          marginBottom: tokens.spacing.lg,
        },
        starButton: {
          padding: 4,
        },
        inputContainer: {
          width: "100%",
          marginBottom: tokens.spacing.lg,
        },
        input: {
          width: "100%",
          minHeight: 80,
          borderWidth: 1,
          borderColor: tokens.colors.border,
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.md,
          color: tokens.colors.textPrimary,
          backgroundColor: tokens.colors.background,
          textAlignVertical: "top",
          fontSize: 14,
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
      onRate(selectedRating, description);
      setSelectedRating(0);
      setDescription("");
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedRating(0);
    setDescription("");
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
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={descriptionPlaceholder}
                placeholderTextColor={tokens.colors.textTertiary}
                multiline
                numberOfLines={3}
                value={description}
                onChangeText={setDescription}
                maxLength={500}
              />
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
