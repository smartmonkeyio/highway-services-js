import { ICRUD } from './common';
import { ISubscriptionBase } from './subscriptions';

export type OrganizationRoles =
  | `organization_administrator`
  | `organization_manager`
  | `organization_user`;

export interface IOrganizationUsers {
  user_id: string;
  role: OrganizationRoles;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  email?: string;
  deleted?: boolean;
  validated?: boolean;
}

export interface IOrganizationBase extends ICRUD {
  label: string;
  active: boolean;
  country?: string;
  owner_id?: string;
  users?: IOrganizationUsers[];
  avatar_url?: string;
  default_project_id?: string;
  subscription: ISubscriptionBase;
}

export interface IOrganizationData extends IOrganizationBase {
  id: string;
}
