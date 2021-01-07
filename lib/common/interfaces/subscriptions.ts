export type PlanType = `monkey` | `gorilla` | `kong`;
export type StatusTypes =
  | `active`
  | `incomplete`
  | `incomplete_expired`
  | `trialing`
  | `past_due`
  | `canceled`
  | `unpaid`;

export interface IPlan {
  type: PlanType;
  vehicles: number;
  max_customer_emails: number;
  customer_emails_count: number;
}

export interface ISubscriptionBase {
  organization_id: string;
  stripe_user_id?: string;
  stripe_subscription_id?: string;
  valid: Date;
  status?: StatusTypes;
  stripe_payment_token?: string;
  plan: IPlan;
  updated: Date;
  will_cancel?: boolean;
}

export interface IBillingInfo {
  city?: string;
  country?: string;
  line1?: string;
  line2?: string;
  postal_code?: string;
  state?: string;
  vat_number?: string;
}
