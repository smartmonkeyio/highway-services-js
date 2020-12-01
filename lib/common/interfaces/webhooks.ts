export interface IWebhook extends IWebhookData {
    id: string;
}

export type WebhookEventType = `plan.created` | `plan.deleted` | `plan.updated` | `service.report` | `route.track`;

export interface IWebhookData {
    url?: string;
    enabled?: boolean;
    enabled_events?: WebhookEventType[];

    created_by?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}
