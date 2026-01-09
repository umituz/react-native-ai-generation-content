/**
 * usePartnerProfile Hook
 */

import { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { PartnerProfile } from "../../domain/types";
import { PartnerProfileRepository } from "../../infrastructure/persistence/PartnerProfileRepository";

export const usePartnerProfile = (onBack: () => void) => {
  const [profile, setProfile] = useState<PartnerProfile>({
    name: "",
    nickname: "",
    hobbies: "",
    traits: "",
    quirks: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const savedProfile = await PartnerProfileRepository.getProfile();
      if (savedProfile) {
        setProfile(savedProfile);
      }
      setIsLoading(false);
    };
    loadProfile();
  }, []);

  const handleSave = useCallback(async () => {
    const success = await PartnerProfileRepository.saveProfile(profile);
    if (success) {
      onBack();
    }
  }, [profile, onBack]);

  return {
    profile,
    setProfile,
    isLoading,
    handleSave,
  };
};
