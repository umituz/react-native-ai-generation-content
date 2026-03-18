/**
 * App Services - Composite Interface
 * Combined app services interface
 */

import type { INetworkService } from "./app-services.interface";
import type { ICreditService } from "./app-services.interface";
import type { IPaywallService } from "./app-services.interface";
import type { IAuthService } from "./app-services-auth.interface";
import type { IAnalyticsService } from "./app-services-optional.interface";
import type { IFeatureUtils } from "./app-services-optional.interface";

/**
 * Combined app services interface
 * Apps implement this to provide all required services
 */
export interface IAppServices {
  readonly network: INetworkService;
  readonly credits: ICreditService;
  readonly paywall: IPaywallService;
  readonly auth: IAuthService;
  readonly analytics?: IAnalyticsService;
  readonly featureUtils?: IFeatureUtils;
}

/**
 * Partial app services for optional configuration
 */
export type PartialAppServices = Partial<IAppServices>;
