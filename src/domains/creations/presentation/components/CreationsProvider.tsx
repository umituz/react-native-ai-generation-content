/**
 * Creations Provider
 * Context provider for creations configuration and localization
 */

import React, { createContext, useContext, useMemo, type ReactNode } from "react";
import type { CreationsConfig, CreationType } from "../../domain/value-objects/CreationsConfig";
import { getTranslatedTypes } from "../utils/filterUtils";

interface CreationsContextValue {
  config: CreationsConfig;
  t: (key: string) => string;
  translatedTypes: readonly CreationType[];
  getLocalizedTitle: (typeId: string) => string;
}

const CreationsContext = createContext<CreationsContextValue | null>(null);

interface CreationsProviderProps {
  config: CreationsConfig;
  t: (key: string) => string;
  children: ReactNode;
}

export function CreationsProvider({ config, t, children }: CreationsProviderProps) {
  const translatedTypes = useMemo(() => getTranslatedTypes(config, t), [config, t]);

  const getLocalizedTitle = (typeId: string): string => {
    const typeConfig = translatedTypes.find((type) => type.id === typeId);
    return typeConfig?.labelKey || typeId;
  };

  const value = useMemo<CreationsContextValue>(
    () => ({
      config,
      t,
      translatedTypes,
      getLocalizedTitle,
    }),
    [config, t, translatedTypes]
  );

  return (
    <CreationsContext.Provider value={value}>
      {children}
    </CreationsContext.Provider>
  );
}

export function useCreationsProvider(): CreationsContextValue {
  const context = useContext(CreationsContext);
  if (!context) {
    throw new Error("useCreationsProvider must be used within a CreationsProvider");
  }
  return context;
}
