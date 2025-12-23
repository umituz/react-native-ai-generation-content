/**
 * Type declarations for external modules
 */

declare module "@umituz/react-native-firestore" {
  import type { Firestore } from "firebase/firestore";

  export class BaseRepository {
    protected getDb(): Firestore | null;
    protected getDbOrThrow(): Firestore;
    protected isDbInitialized(): boolean;
    protected isQuotaError(error: unknown): boolean;
    protected handleQuotaError(error: unknown): never;
    protected executeWithQuotaHandling<T>(
      operation: () => Promise<T>,
    ): Promise<T>;
    protected trackRead(
      collection: string,
      count: number,
      cached: boolean,
    ): void;
    protected trackWrite(
      collection: string,
      docId: string,
      count: number,
    ): void;
    protected trackDelete(
      collection: string,
      docId: string,
      count: number,
    ): void;
    destroy(): void;
  }

  export function getFirestore(): Firestore | null;
  export function initializeFirestore(app: unknown): void;
  export function isFirestoreInitialized(): boolean;
}

declare module "@umituz/react-native-design-system" {
  import type { FC, ReactNode } from "react";
  import type { StyleProp, ViewStyle, TextStyle } from "react-native";

  export interface DesignTokens {
    colors: {
      primary: string;
      secondary: string;
      error: string;
      warning: string;
      success: string;
      backgroundPrimary: string;
      backgroundSecondary: string;
      surface: string;
      textPrimary: string;
      textSecondary: string;
      textInverse: string;
      border: string;
      [key: string]: string;
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
      [key: string]: number;
    };
    typography: {
      headingLarge: TextStyle;
      headingMedium: TextStyle;
      headingSmall: TextStyle;
      bodyLarge: TextStyle;
      bodyMedium: TextStyle;
      bodySmall: TextStyle;
      [key: string]: TextStyle;
    };
  }

  export function useAppDesignTokens(): DesignTokens;

  export interface AtomicTextProps {
    children?: ReactNode;
    style?: StyleProp<TextStyle>;
  }
  export const AtomicText: FC<AtomicTextProps>;

  export interface AtomicIconProps {
    name: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    color?: string;
  }
  export const AtomicIcon: FC<AtomicIconProps>;
}

declare module "@umituz/react-native-sharing" {
  export interface ShareOptions {
    dialogTitle?: string;
    mimeType?: string;
  }

  export interface UseSharingResult {
    share: (uri: string, options?: ShareOptions) => Promise<void>;
  }

  export function useSharing(): UseSharingResult;
}
