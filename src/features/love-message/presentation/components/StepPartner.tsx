/**
 * StepPartner Component
 */

import React from "react";
import { View, Pressable, Switch, StyleSheet, ImageBackground } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { useLocalization } from "@umituz/react-native-localization";
import { PartnerInput } from "./PartnerInput";

interface StepPartnerProps {
  partnerName: string;
  setPartnerName: (name: string) => void;
  useProfile: boolean;
  setUseProfile: (val: boolean) => void;
  hasProfile: boolean;
  onEditProfile: () => void;
}

export const StepPartner: React.FC<StepPartnerProps> = ({
  partnerName,
  setPartnerName,
  useProfile,
  setUseProfile,
  hasProfile,
  onEditProfile,
}) => {
  const tokens = useAppDesignTokens();
  const { t } = useLocalization();

  return (
    <View>
      <PartnerInput value={partnerName} onChangeText={setPartnerName} />
      
      <Pressable 
        onPress={onEditProfile}
        style={[styles.profileCard, { backgroundColor: tokens.colors.surfaceSecondary }]}
      >
        <View style={styles.profileLeft}>
          <View style={[styles.profileIconCircle, { backgroundColor: `${tokens.colors.primary}20` }]}>
            <AtomicIcon name="heart" color="primary" size="sm" />
          </View>
          <View>
            <AtomicText type="labelMedium" color="textPrimary">
              {hasProfile ? t("loveMessage.editPartnerProfile") : t("loveMessage.partnerProfile.title")}
            </AtomicText>
            <AtomicText type="bodySmall" color="textTertiary">
              {t("loveMessage.partnerProfile.subtitle")}
            </AtomicText>
          </View>
        </View>
        <Switch 
          value={useProfile} 
          onValueChange={setUseProfile}
          trackColor={{ false: tokens.colors.borderLight, true: tokens.colors.primary }}
          thumbColor="#fff"
        />
      </Pressable>

      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=600&auto=format&fit=crop' }}
        style={styles.decorativeCard}
        imageStyle={{ borderRadius: 24, opacity: 0.6 }}
      >
        <View style={styles.decorativeOverlay}>
          <AtomicText type="bodySmall" color="onPrimary" style={styles.decorativeQuote}>
            {`"Words are the keys to the heart."`}
          </AtomicText>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 20,
    marginBottom: 24,
  },
  profileLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  decorativeCard: {
    width: '100%',
    height: 160,
    justifyContent: 'flex-end',
    marginBottom: 24,
  },
  decorativeOverlay: {
    padding: 20,
    alignItems: 'center',
  },
  decorativeQuote: {
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
