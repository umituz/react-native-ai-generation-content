/**
 * Partner Profile Screen
 * Optimized version with hooks and components
 */

import { FC } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicButton,
  useAppDesignTokens,
  useSafeAreaInsets,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import { LOVE_LANGUAGES } from "../../domain/constants";
import { usePartnerProfile } from "../hooks/usePartnerProfile";
import { FieldInput } from "../components/FieldInput";

export const PartnerProfileScreen: FC = () => {
  const tokens = useAppDesignTokens();
  const { top, bottom } = useSafeAreaInsets();
  const { t } = useLocalization();
  const p = usePartnerProfile();

  if (p.isLoading) return null;

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      <View style={[styles.header, { paddingTop: top + tokens.spacing.md }]}>
        <AtomicButton icon="arrow-back" onPress={() => p.navigation.goBack()} variant="text" size="sm" />
        <View style={styles.headerTitle}>
          <AtomicText type="headlineSmall" color="textPrimary" style={styles.headerText}>
            {t("loveMessage.partnerProfile.title")}
          </AtomicText>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={{ paddingBottom: bottom + tokens.spacing.xl, paddingHorizontal: tokens.spacing.lg }}
        showsVerticalScrollIndicator={false}
      >
        <AtomicText type="bodyMedium" color="textSecondary" style={styles.subtitle}>
          {t("loveMessage.partnerProfile.subtitle")}
        </AtomicText>

        <FieldInput 
          label={t("loveMessage.partnerName")} value={p.profile.name} 
          onChange={(text) => p.setProfile((prev) => ({ ...prev, name: text }))} 
          placeholder={t("loveMessage.partnerNamePlaceholder")}
        />

        <View style={styles.field}>
          <AtomicText type="labelLarge" color="textPrimary" style={styles.label}>
            {t("loveMessage.partnerProfile.loveLanguage")}
          </AtomicText>
          <View style={styles.chipContainer}>
            {LOVE_LANGUAGES.map((lang) => (
              <AtomicButton
                key={lang.language} title={t(lang.labelKey)}
                onPress={() => p.setProfile((prev) => ({ ...prev, loveLanguage: lang.language }))}
                variant={p.profile.loveLanguage === lang.language ? "primary" : "outline"}
                size="sm" style={styles.chip}
              />
            ))}
          </View>
        </View>

        <FieldInput 
          label={t("loveMessage.partnerProfile.traits")} value={p.profile.traits} 
          onChange={(text) => p.setProfile((prev) => ({ ...prev, traits: text }))} 
          placeholder={t("loveMessage.partnerProfile.traitsPlaceholder")}
        />

        <FieldInput 
          label={t("loveMessage.partnerProfile.quirks")} value={p.profile.quirks} 
          onChange={(text) => p.setProfile((prev) => ({ ...prev, quirks: text }))} 
          placeholder={t("loveMessage.partnerProfile.quirksPlaceholder")} multiline
        />

        <AtomicButton
          title={t("loveMessage.partnerProfile.save")} onPress={p.handleSave}
          disabled={!p.profile.name.trim()} variant="primary" fullWidth style={styles.saveBtn}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 8, paddingBottom: 24 },
  headerTitle: { flex: 1, marginRight: 40, alignItems: "center" },
  headerText: { fontWeight: "bold" },
  subtitle: { marginBottom: 32 },
  field: { marginBottom: 24 },
  label: { marginBottom: 10, marginLeft: 4 },
  chipContainer: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  chip: { borderRadius: 20 },
  saveBtn: { height: 56, borderRadius: 16, marginTop: 16 },
});
