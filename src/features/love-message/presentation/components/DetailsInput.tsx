/**
 * Message Details Input Component
 */

import type { FC } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";

interface DetailsInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const DetailsInput: FC<DetailsInputProps> = ({
  value,
  onChangeText,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  return (
    <View style={styles.container}>
      <AtomicText type="labelLarge" color="textPrimary" style={styles.label}>
        {t("loveMessage.details")}
      </AtomicText>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: tokens.colors.surface,
            borderColor: tokens.colors.borderLight,
          },
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={t("loveMessage.detailsPlaceholder")}
          placeholderTextColor={tokens.colors.textTertiary}
          multiline
          numberOfLines={4}
          style={[styles.input, { color: tokens.colors.textPrimary }]}
          selectionColor={tokens.colors.primary}
          textAlignVertical="top"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  label: {
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 16,
    minHeight: 120,
  },
  input: {
    fontSize: 16,
    padding: 0,
    flex: 1,
  },
});
