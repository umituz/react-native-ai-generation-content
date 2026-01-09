/**
 * PartnerInfoInput Component
 * Name and optional description input for partner
 */

import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { AtomicInput, AtomicText, useAppDesignTokens } from "@umituz/react-native-design-system";

export interface PartnerInfoInputProps {
  readonly t: (key: string) => string;
  readonly name: string;
  readonly onNameChange: (name: string) => void;
  readonly description?: string;
  readonly onDescriptionChange?: (description: string) => void;
  readonly showName?: boolean;
  readonly showDescription?: boolean;
  readonly maxNameLength?: number;
  readonly maxDescriptionLength?: number;
  readonly nameLabelKey?: string;
  readonly namePlaceholderKey?: string;
  readonly descriptionLabelKey?: string;
  readonly descriptionPlaceholderKey?: string;
  readonly optionalKey?: string;
}

export const PartnerInfoInput: React.FC<PartnerInfoInputProps> = ({
  t,
  name,
  onNameChange,
  description = "",
  onDescriptionChange,
  showName = false,
  showDescription = false,
  maxNameLength = 30,
  maxDescriptionLength = 200,
  nameLabelKey = "photoUpload.nameLabel",
  namePlaceholderKey = "photoUpload.namePlaceholder",
  descriptionLabelKey = "photoUpload.descriptionLabel",
  descriptionPlaceholderKey = "photoUpload.descriptionPlaceholder",
  optionalKey = "common.optional",
}) => {
  const tokens = useAppDesignTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingHorizontal: 24,
          gap: 16,
        },
        optionalLabel: {
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
        },
        optional: {
          fontSize: 12,
          color: tokens.colors.textTertiary,
          fontStyle: "italic",
        },
        label: {
          fontSize: 14,
          fontWeight: "600",
          color: tokens.colors.textSecondary,
        },
      }),
    [tokens],
  );

  if (!showName && !showDescription) {
    return null;
  }

  return (
    <View style={styles.container}>
      {showName && (
        <AtomicInput
          label={t(nameLabelKey)}
          value={name}
          onChangeText={onNameChange}
          placeholder={t(namePlaceholderKey)}
          maxLength={maxNameLength}
          showCharacterCount
          variant="outlined"
          size="md"
        />
      )}

      {showDescription && onDescriptionChange && (
        <View>
          <View style={styles.optionalLabel}>
            <AtomicText style={styles.label}>{t(descriptionLabelKey)}</AtomicText>
            <AtomicText style={styles.optional}>({t(optionalKey)})</AtomicText>
          </View>
          <AtomicInput
            value={description}
            onChangeText={onDescriptionChange}
            placeholder={t(descriptionPlaceholderKey)}
            multiline
            numberOfLines={3}
            maxLength={maxDescriptionLength}
            showCharacterCount
            variant="outlined"
            inputStyle={{ minHeight: 100, textAlignVertical: "top" }}
          />
        </View>
      )}
    </View>
  );
};
