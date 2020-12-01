export interface IHighwayOptions {
  bearer?: string;
  apiEndpoint?: string;
  queryParams?: {
    [param: string]: string;
  };
}

interface IProjectLimitsEdit {
  max_vehicles: number;
}

export interface IProjectResources {
  id: string;
  limits: IProjectLimitsEdit;
}

export interface IProjectSchema extends IProjectData {
  id: string;
}

export interface IProject extends IProjectData {
  id: string;
  avatar?: string;
}

export enum ProjectRoles {
  project_manager = `project_manager`,
  project_user = `project_user`,
}

export interface IProjectUsers {
  user_id: string;
  role: ProjectRoles;
}

interface IProjectVehiclePreferences {
  external_id: boolean;
  comments: boolean;
  plate: boolean;
  phone: boolean;
  email: boolean;
  webpage: boolean;
}

interface IProjectClientPreferences {
  external_id: boolean;
  location_details: boolean;
  comments: boolean;
  reference_person: boolean;
  phone: boolean;
  webpage: boolean;
}

interface IProjectConstraintsPreferences {
  distance: boolean;
  weight: boolean;
  volume: boolean;
  timewindows: boolean;
  provide_requires: boolean;
  max_services: boolean;
  pickups: boolean;
}

interface IProjectWebAppPreferences extends IProjectClientPreferences {}

export interface IProjectView {
  constraints: IProjectConstraintsPreferences;
  vehicle: IProjectVehiclePreferences;
  client: IProjectClientPreferences;
  webapp: IProjectWebAppPreferences;
}

export type DistanceType = `km` | `mi`;
export type WeightType = `kg` | `lb`;
export type VolumeType = `l` | `m³`;
export type CurrencyTypes = `EUR` | `USD` | `MXN`;

export interface IProjectUnits {
  distance: DistanceType;
  weight: WeightType;
  volume: VolumeType;
  currency?: CurrencyTypes;
}

export interface IProjectProofOfDelivery {
  rejected_enabled?: boolean;
  accepted_enabled?: boolean;
  comments?: boolean;
  signature?: boolean;
  pictures?: boolean;
  rejected_categorical?: boolean;
}

export interface IProjectAllCustomField {
  client: IProjectCustomField[];
  vehicle: IProjectCustomField[];
  webapp: IProjectCustomField[];
}

export interface IProjectLimits {
  max_vehicles: number;
  max_clients: number;
  max_services_plan: number;
}

export interface IProjectData {
  label?: string;
  location?: ILocation;
  description?: string;
  users?: IProjectUsers[];

  view?: IProjectView;
  optimizer_config?: IOptimizerConfig;
  units?: IProjectUnits;
  pod?: IProjectProofOfDelivery;

  limits?: IProjectLimits;

  created_by?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export type LocalSearchMetaheuristic =
  | `AUTOMATIC`
  | `GREEDY_DESCENT`
  | `GUIDED_LOCAL_SEARCH`
  | `SIMULATED_ANNEALING`
  | `TABU_SEARCH`;

export type FirstSolutionStrategy =
  | `AUTOMATIC`
  | `PATH_CHEAPEST_ARC`
  | `PATH_MOST_CONSTRAINED_ARC`
  | `EVALUATOR_STRATEGY`
  | `SAVINGS`
  | `SWEEP`
  | `CHRISTOFIDES`
  | `ALL_UNPERFORMED`
  | `BEST_INSERTION`
  | `PARALLEL_CHEAPEST_INSERTION`
  | `LOCAL_CHEAPEST_INSERTION`
  | `GLOBAL_CHEAPEST_ARC`
  | `LOCAL_CHEAPEST_ARC`
  | `FIRST_UNBOUND_MIN_VALUE`;

export interface IOptimizerConfig {
  max_wait_time?: number;
  matrix_multiplier?: number;
  first_solution_strategy?: FirstSolutionStrategy;
  local_search_strategy?: LocalSearchMetaheuristic;
  time_limit_seconds?: number;
  lns_time_limit?: number;
  skip_penalty?: number;
  balance_services?: boolean;
  service_duration?: number;
  operation_country?: string;
}

export interface IClientData {
  organization_id?: string;
  project_id?: string;
  external_id?: string;

  location?: ILocation;
  location_details?: string;
  label?: string;
  tags?: string[];
  icon?: string;
  comments?: string;
  phone?: string;
  email?: string;
  website?: string;
  reference_person?: string;

  default_duration?: number;
  default_reward?: number;
  default_requires?: string[];
  default_cluster?: string;
  default_assign_to?: string[];
  default_timewindows?: [[number, number]];
  default_volume?: number;
  default_weight?: number;

  created_by?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
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

export type PlanStatusType = `planning` | `in_progress` | `finished`;

export interface IPlanData {
  project_id?: string;
  unit_id?: string;
  _version?: number;
  date_start?: Date;
  date_end?: Date;
  single_day?: boolean;
  tags?: string[];
  label?: string;

  external_id?: string;
  status?: PlanStatusType;
  start_date?: Date;
  end_date?: Date;

  optimizer_config?: IOptimizerConfig;

  created_by?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface IRoute extends IRouteData {
  id: string;
  services: IService[];
}

export interface IRouteData {
  project_id?: string;
  external_id?: string;
  plan_id?: string;
  vehicle_id?: string;

  label?: string;
  phone?: string;
  avatar?: string;
  icon?: string;
  email?: string;
  plate?: string;
  vehicle_model?: string;
  brand?: string;

  timewindow?: [number, number];
  max_distance?: number;
  max_weight?: number;
  max_volume?: number;
  max_services?: number;
  start_location?: ILocation;
  end_location?: ILocation;
  provides?: string[];

  date_start?: Date;
  date_end?: Date;
  //track TimeAwarePolyline aqui no se que sera
  feedback_images?: string[];
  feedback_comments?: string;
  feedback_duration?: number;

  price_per_distance?: number;
  price_per_minute?: number;

  created_by?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface IService extends IServiceData {
  id: string;
}
export interface IServiceData {
  project_id?: string;
  plan_id?: string;
  client_id?: string;
  client_external_id?: string;
  external_id?: string;

  route_id?: string;
  order?: number;
  planned_arrival_time?: number;
  planned_departure_time?: number;

  icon?: string;

  location?: ILocation;
  location_details?: string;
  label?: string;
  tags?: string[];
  comments?: string;
  phone?: string;
  email?: string;
  website?: string;
  reference_person?: string;

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

  created_by?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  // AIXÒ QUE COI FA??????
  // up?: Date;
  // d_at?: Date;
}

export interface IVehicle extends IVehicleData {
  id: string;
}
export interface IVehicleData {
  organization_id?: string;
  project_id?: string;
  external_id?: string;
  unit_id?: string;

  label?: string;
  phone?: string;
  avatar?: string;
  icon?: string;
  email?: string;
  plate?: string;
  vehicle_model?: string;
  brand?: string;

  default_timewindow?: [number, number];
  default_max_distance?: number;
  default_max_weight?: number;
  default_max_volume?: number;
  default_start_location?: ILocation;
  default_end_location?: ILocation;
  default_provides?: string[];
  default_max_services?: number;

  custom_fields?: object;
  price_per_distance?: number;
  price_per_minute?: number;

  created_by?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
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

export interface IPaginateResult<T> {
  docs: T[];
  total: number;
  limit: number;
  page?: number;
  pages?: number;
  offset?: number;
}

export type CustomFieldValueTypes =
  | `text`
  | `boolean`
  | `numerical`
  | `categorical`;

export interface ICategoricalOptions {
  id: string;
  label: string;
}

export interface IProjectCustomField {
  id: string;
  label: string;
  type: CustomFieldValueTypes;
  // optional?: boolean; // NOT YET!
  multiple?: boolean;
  options?: ICategoricalOptions[];
}

export interface IPutProjectCustomFieldPayload {
  label?: string;
  order?: number;
}

export type CustomFieldTypes = `client` | `vehicle` | `webapp`;
