import { ICRUD, ILocation, IPagination, IUserObject, Timewindow } from './common';

export interface IVehicleFlat {
  id: string;
  lat: number;
  lng: number;
}

export interface IVehicleData extends IVehicleBase {
  id: string;
}

export type VehicleIconTypes = `moto` | `walk` | `truck` | `furgo`;

export interface IVehicleBase extends ICRUD, IUserObject {
  organization_id?: string;
  project_id?: string;
  phone?: string;
  icon?: VehicleIconTypes;
  email?: string;
  plate?: string;
  vehicle_model?: string;
  color?: string;
  brand?: string;
  comments?: string;
  default_timewindow?: Timewindow;
  default_max_distance?: number;
  default_max_weight?: number;
  default_max_volume?: number;
  default_max_services?: number;
  // default_capacity?: number[];
  default_start_location?: ILocation;
  default_end_location?: ILocation;
  default_provides?: string[];
  custom_fields?: object;
  price_per_distance?: number;
  price_per_minute?: number;
}

export type IVehiclePagination = IPagination<IVehicleData>;
