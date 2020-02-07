export interface IClientData {
  user_id?: string;
  external_id?: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  //   icon?: Icon;

  location?: ILocation;
  label?: string;
  tags?: string[];
  comments?: string;
  phone?: string;
  email?: string;
  website?: string;

  default_duration?: number;
  default_reward?: number;
  default_requires?: string[];
  default_cluster?: string;
  default_assign_to?: string[];
  default_timewindows?: [[number, number]];
  default_volume?: number;
  default_weight?: number;
}
export interface IClient extends IClientData {
  id: string;
}

export interface IPlanSchema extends IPlanData {
  id: string;
  services_count: number;
  routes_count: number;
}

export interface IPlan extends IPlanData {
  id: string;
  services: IService[];
  routes: IRoute[];
}
export interface IPlanData {
  unit_id?: string;
  _version?: number;
  user_id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  date_start?: Date;
  date_end?: Date;
  single_day?: boolean;
  tags?: string[];
  label?: string;
}
export interface IRoute extends IRouteData {
  id: string;
  services: IService[];
}
export interface IRouteData {
  user_id?: string;
  external_id?: string;
  plan_id?: string;
  vehicle_id?: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  label?: string;
  phone?: string;
  avatar?: string;
  email?: string;
  plate?: string;

  timewindow?: [[number, number]];
  max_weight?: number;
  max_volume?: number;
  location_start?: ILocation;
  location_end?: ILocation;
  provides?: string[];

  date_start?: Date;
  date_end?: Date;
  //track TimeAwarePolyline aqui no se que sera
  feedback_images?: string[];
  feedback_comments?: string;
  feedback_duration?: number;
}

export interface IService extends IServiceData {
  id: string;
}
export interface IServiceData {
  plan_id?: string;
  client_id?: string;
  user_id?: string;
  external_id?: string;

  route_id?: string;
  order?: number;
  planned_arrival_time?: number;
  planned_departure_time?: number;

  //icon Icon

  created_at?: Date;
  up?: Date;
  d_at?: Date;
  deleted_at?: Date;

  location?: ILocation;
  label?: string;
  tags?: string[];
  comments?: string;
  phone?: string;
  email?: string;
  website?: string;

  duration?: number;
  reward?: number;
  requires?: string[];
  cluster?: string;
  assign_to?: string[];
  timewindows?: [[number, number]];
  volume?: number;
  weight?: number;

  done_at?: Date;
  done_location?: ILocation;
  feedback_images?: string[];
  feedback_comments?: string;
  feedback_duration?: number;
  feedback_rejection_reason?: string;
}

export interface IVehicle extends IWebhookData {
  id: string;
}
export interface IWebhookData {
  user_id?: string;
  external_id?: string;
  unit_id?: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  label?: string;
  phone?: string;
  avatar?: string;
  email?: string;
  plate?: string;
  vehicle_model?: string;
  brand?: string;

  default_timewindow?: [number, number];
  default_max_weight?: number;
  default_max_volume?: number;
  default_start_location?: ILocation;
  default_end_location?: ILocation;
  default_provides?: string[];
}

export interface ILocation {
  label?: string;
  country?: string;
  state?: string;
  county?: string;
  city?: string;
  district?: string;
  street?: string;
  house_number?: string;
  postal_code?: string;
  comments?: string;
  lat?: number;
  lng?: number;
}

export interface IPaginateResult<T> {
  docs: T[];
  total: number;
  limit: number;
  page?: number;
  pages?: number;
  offset?: number;
}
