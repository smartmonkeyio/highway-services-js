import { ICRUD, ILocation, IPagination, IUserObject, Timewindow } from './common';
import { ServiceIconTypes } from './services';

export interface IClientFlat {
  id: string;
  lat: number;
  lng: number;
}

export interface IClientConstraints {
  default_duration?: number;
  default_requires?: string[];
  default_timewindows?: Timewindow[];
  default_volume?: number;
  default_weight?: number;
  // default_assign_to?: string[];
  // default_reward?: number;
  // default_cluster?: string;
}

export interface IClientInfo {
  icon?: ServiceIconTypes;
  location?: ILocation;
  location_details?: string;
  comments?: string;
  phone?: string;
  email?: string;
  website?: string;
  reference_person?: string;
  custom_fields?: object;
}

export interface IClientBase extends ICRUD, IUserObject, IClientInfo, IClientConstraints {
  organization_id?: string;
  project_id?: string;
}

export interface IClientData extends IClientBase {
  id: string;
}

export type IClientPagination = IPagination<IClientData>;
