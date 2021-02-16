import { ICRUD } from './common';

export interface IWebhookBase extends ICRUD {
  url?: string;
  enabled?: boolean;
  enabled_events?: WebhookEventType[]; // This is a array of string because is not posible to create an array of types WebhookTypes.

  project_id?: string;
  organization_id?: string;

  failure_count?: number;
}
export interface IWebhook extends IWebhookBase {
  id: string;
}

export type WebhookEventType =
  | `plan.created`
  | `plan.deleted`
  | `plan.updated`
  | `service.report`
  | `route.track`;

export interface IWebhookCreate {
  url: string;
  enabled?: boolean;
  enabled_events: WebhookEventType[];
}

export interface IWebhookEdit {
  url?: string;
  enabled?: boolean;
  enabled_events?: WebhookEventType[];
  failure_count?: number;
}
