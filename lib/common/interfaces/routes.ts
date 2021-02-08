import { ICRUD, ILocation, IUserObject, Timewindow } from './common';
import { IServiceDataExtended } from './services';
import { VehicleIconTypes } from './vehicles';

export type IRouteStatus = `not_started` | `in_transit` | `finished`;

export interface IRouteInfo {
  vehicle_id?: string;
  label?: string;
  phone?: string;
  icon?: VehicleIconTypes;
  comments?: string;
  email?: string;
  plate?: string;
  vehicle_model?: string;
  color?: string;
  brand?: string;
  custom_fields?: object;
  price_per_distance?: number;
  price_per_minute?: number;
}
export interface IRouteConstraints {
  timewindow?: Timewindow;
  max_distance?: number;
  max_weight?: number;
  max_volume?: number;
  max_services?: number;
  start_location?: ILocation;
  end_location?: ILocation;
  provides?: string[];
}

export interface IRouteTracking {
  start_date?: Date;
  end_date?: Date;
  planned_track?: string;
  planned_start_time?: number;
  planned_end_time?: number;
  real_track?: string;
  status?: IRouteStatus;
}

export interface IRouteBase
  extends ICRUD,
    IUserObject,
    IRouteInfo,
    IRouteTracking,
    IRouteConstraints {
  project_id?: string;
  plan_id?: string;
  vehicle_id?: string;
  is_locked?: boolean;
  tracing_percent?: number;
}

export interface IRouteData extends IRouteBase {
  id: string;
}

export interface IRouteDataExtended extends IRouteData {
  services: IServiceDataExtended[];
}
