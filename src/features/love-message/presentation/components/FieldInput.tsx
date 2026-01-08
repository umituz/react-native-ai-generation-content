/**
 * FieldInput Component
 */

import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

interface FieldInputProps {
  label: string;
  value: string | undefined;
  onChange: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
}

export const FieldInput: React.FC<FieldInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.field}>
      <AtomicText type="labelLarge" color="textPrimary" style={styles.label}>
        {label}
      </AtomicText>
      <View
        style={[
          styles.inputContainer,
          multiline && styles.textAreaContainer,
          {
            backgroundColor: tokens.colors.surface,
            borderColor: tokens.colors.borderLight,
          },
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={tokens.colors.textTertiary}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          style={[styles.input, { color: tokens.colors.textPrimary }]}
          selectionColor={tokens.colors.primary}
          textAlignVertical={multiline ? "top" : "center"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 10,
    marginLeft: 4,
  },
  inputContainer: {
    borderRadius: 16,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    height: 56,
    justifyContent: "center",
  },
  textAreaContainer: {
    height: 120,
    paddingVertical: 12,
  },
  input: {
    fontSize: 16,
    padding: 0,
  },
});
