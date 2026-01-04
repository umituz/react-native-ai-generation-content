/**
 * Provider Validator
 * Validates provider availability and initialization
 */

import type { IAIProvider } from "../../domain/interfaces";
import { providerRegistry } from "./provider-registry.service";

declare const __DEV__: boolean;

export class ProviderValidator {
    getProvider(): IAIProvider {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
             
            console.log("[ProviderValidator] getProvider() called");
        }

        const provider = providerRegistry.getActiveProvider();

        if (!provider) {
            if (typeof __DEV__ !== "undefined" && __DEV__) {
                 
                console.error("[ProviderValidator] No active provider found!");
            }
            throw new Error(
                "No active AI provider. Register and set a provider first.",
            );
        }

        if (!provider.isInitialized()) {
            if (typeof __DEV__ !== "undefined" && __DEV__) {
                 
                console.error("[ProviderValidator] Provider not initialized:", provider.providerId);
            }
            throw new Error(
                `Provider ${provider.providerId} is not initialized.`,
            );
        }

        if (typeof __DEV__ !== "undefined" && __DEV__) {
             
            console.log("[ProviderValidator] getProvider() returning:", {
                providerId: provider.providerId,
                isInitialized: provider.isInitialized(),
            });
        }

        return provider;
    }
}

export const providerValidator = new ProviderValidator();
