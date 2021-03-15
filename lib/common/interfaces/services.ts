import { ICRUD, ILocation, IUserObject, Timewindow } from './common';

export type IServiceStatus = `completed` | `canceled` | `pending`;

export type ServiceType = `pickup` | `delivery`;

export type ServiceIconTypes =
  | `normal`
  | `fav`
  | `champ`
  | `barrow`
  | `warning`
  | `hangar`
  | `user`
  | `bookmark`
  | `poi`;

export interface IServiceConstraints {
  duration?: number;
  reward?: number;
  requires?: string[];
  cluster?: string;
  optional?: boolean;
  assign_to?: string[];
  timewindows?: Timewindow[];
  volume?: number;
  weight?: number;
  price?: number;
}

export interface IServiceInfo {
  label?: string;
  client_id?: string;
  client_external_id?: string;
  reference_person?: string;
  icon?: ServiceIconTypes;
  location?: ILocation;
  location_details?: string;
  comments?: string;
  phone?: string;
  email?: string;
  website?: string;
  custom_fields?: object;
}
export interface IServiceTracking {
  done_at?: Date;
  done_by?: string;
  done_error?: boolean;
  done_location?: ILocation;
  feedback?: IServiceReportFeedback;
  status?: IServiceStatus;
}

export type ServiceReportTypes = `service_report_completed` | `senrvice_report_caceled`;

export interface IServiceRouteData {
  route_id?: string;
  order?: number;
  planned_arrival_time?: number;
  planned_departure_time?: number;
  distance_to_previous_location?: number;
  distance_to_next_location?: number;
}

export interface IServiceReportFeedback {
  comments?: string;
  signature?: string;
  images?: string[];
  reason?: string;
  completed_custom_fields?: object;
  canceled_custom_fields?: object;
}

export interface IServiceBase
  extends ICRUD,
    IUserObject,
    IServiceConstraints,
    IServiceInfo,
    IServiceTracking,
    IServiceRouteData {
  id?: string;
  project_id?: string;
  plan_id?: string;
  pickup_id?: string;
  type?: ServiceType;
}

export interface IServiceData extends IServiceBase {
  id: string;
}

export interface IServiceDataExtended extends IServiceData {
  pickup?: IServiceData;
}
