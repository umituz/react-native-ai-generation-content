/**
 * Partner Profile Repository
 * Handles persistence of partner profile data
 */

import { storageRepository, unwrap } from "@umituz/react-native-design-system";
import type { PartnerProfile } from "../../domain/types";

const PARTNER_PROFILE_STORAGE_KEY = "love_message_partner_profile";

export const PartnerProfileRepository = {
  /**
   * Get partner profile from storage
   */
  getProfile: async (): Promise<PartnerProfile | null> => {
    try {
      const result = await storageRepository.getString(PARTNER_PROFILE_STORAGE_KEY, null);
      const data = unwrap(result, null);

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
      await storageRepository.setItem(PARTNER_PROFILE_STORAGE_KEY, JSON.stringify(profile));
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
      await storageRepository.removeItem(PARTNER_PROFILE_STORAGE_KEY);
      return true;
    } catch {
      return false;
    }
  },
};
