/**
 * Partner Name Input Component
 * Updated with Icon support to match premium design
 */

import type { FC } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";

interface PartnerInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const PartnerInput: FC<PartnerInputProps> = ({
  value,
  onChangeText,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  return (
    <View style={styles.container}>
      <AtomicText
        type="labelSmall"
        color="textTertiary"
        style={styles.label}
      >
        {t("loveMessage.partnerName").toUpperCase()}
      </AtomicText>
      <View style={[styles.inputWrapper, { 
        backgroundColor: tokens.colors.surfaceSecondary,
      }]}>
        <AtomicIcon name="heart" color="primary" size="sm" style={styles.icon} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={t("loveMessage.partnerNamePlaceholder")}
          placeholderTextColor={tokens.colors.textTertiary}
          style={[styles.input, { color: tokens.colors.textPrimary }]}
          selectionColor={tokens.colors.primary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
    marginLeft: 4,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
});
