/**
 * Partner Profile Repository
 * Handles persistence of partner profile data
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { PartnerProfile } from "../../domain/types";

const PARTNER_PROFILE_STORAGE_KEY = "love_message_partner_profile";

export const PartnerProfileRepository = {
  /**
   * Get partner profile from storage
   */
  getProfile: async (): Promise<PartnerProfile | null> => {
    try {
      const data = await AsyncStorage.getItem(PARTNER_PROFILE_STORAGE_KEY);
      if (data) {
        return JSON.parse(data) as PartnerProfile;
      }
      return null;
    } catch {
      return null;
    }
  },

  /**
   * Save partner profile to storage
   */
  saveProfile: async (profile: PartnerProfile): Promise<boolean> => {
    try {
      await AsyncStorage.setItem(PARTNER_PROFILE_STORAGE_KEY, JSON.stringify(profile));
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Clear partner profile from storage
   */
  clearProfile: async (): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(PARTNER_PROFILE_STORAGE_KEY);
      return true;
    } catch {
      return false;
    }
  },
};
