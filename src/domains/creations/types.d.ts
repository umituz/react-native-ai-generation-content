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

declare module "@umituz/react-native-sentry";
declare module "expo-apple-authentication";
declare module "@umituz/react-native-filesystem";
