import { ICRUD, ILocation, IPagination, IUserObject, Timewindow } from './common';
import { ServiceIconTypes } from './services';

export interface IClientFlat {
  id: string;
  lat: number;
  lng: number;
}

export interface IClientData extends IClientBase {
  id: string;
}

export interface IClientBase extends ICRUD, IUserObject {
  organization_id?: string;
  project_id?: string;
  icon?: ServiceIconTypes;
  location?: ILocation;
  location_details?: string;
  comments?: string;
  phone?: string;
  email?: string;
  website?: string;
  reference_person?: string;
  default_duration?: number;
  default_reward?: number;
  default_requires?: string[];
  default_cluster?: string;
  default_assign_to?: string;
  default_timewindows?: Timewindow[];
  default_volume?: number;
  default_weight?: number;
  custom_fields?: object;
}

export type IClientPagination = IPagination<IClientData>;
