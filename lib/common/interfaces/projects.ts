import {
  CurrencyTypes,
  FirstSolutionStrategy,
  ICRUD,
  ILocation,
  IOptimizerConfig,
  LocalSearchMetaheuristic
} from './common';
import { PlanType } from './subscriptions';

export type ProjectRoles = `project_manager` | `project_user`;

export interface IProjectUsers {
  user_id: string;
  role: ProjectRoles;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  avatar_url?: string;
  avatar_url_public?: string;
  email?: string;
  deleted?: boolean;
  validated?: boolean;
}

export const defaultOptimizerConfig = {
  max_wait_time: 60 * 60,
  service_duration: 60 * 5,
  balance_services: true,
  matrix_multiplier: 1.25,
  time_limit_seconds: 60 * 4,
};

export type DistanceType = `km` | `mi`;
export type WeightType = `kg` | `lb`;
export type VolumeType = `l` | `m³`;

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
  optional: boolean;
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

type IProjectWebAppPreferences = IProjectClientPreferences;

interface IProjectServiceReportCompletedPreferences {
  comments?: boolean;
  signature?: boolean;
  pictures?: boolean;
}

interface IProjectServiceReportCanceledPreferences {
  comments?: boolean;
  pictures?: boolean;
  canceled_categorical?: boolean;
}

export interface IProjectView {
  constraints: IProjectConstraintsPreferences;
  vehicle: IProjectVehiclePreferences;
  client: IProjectClientPreferences;
  webapp: IProjectWebAppPreferences;
  service_report_completed: IProjectServiceReportCompletedPreferences;
  service_report_canceled: IProjectServiceReportCanceledPreferences;
}

export interface IProjectUnits {
  distance: DistanceType;
  weight: WeightType;
  volume: VolumeType;
  currency?: CurrencyTypes;
}

export interface IProjectOptimizerConfig {
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

export interface IProjectLimits {
  max_vehicles: number;
  max_clients: number;
  max_services_plan: number;
}

export interface IProjectBase extends ICRUD {
  organization_id?: string;
  label?: string;
  location?: ILocation;
  description?: string;
  users?: IProjectUsers[];
  avatar?: string;

  view?: IProjectView;
  optimizer_config?: IOptimizerConfig;
  units?: IProjectUnits;

  limits?: IProjectLimits;

  custom_fields?: IProjectAllCustomField;
}

export interface IProjectData extends IProjectBase {
  id: string;
}

export type CustomFieldValueTypes = `text` | `boolean` | `numerical` | `categorical`;

export interface IProjectCustomField {
  id: string;
  label: string;
  type: CustomFieldValueTypes;
  description?: string;
  // optional?: boolean; // NOT YET!
  enabled: boolean;
  multiple?: boolean;
  options?: string[];
  created_at: Date;
}

export type CustomFieldTypes =
  | `client`
  | `vehicle`
  | `service_report_completed`
  | `service_report_canceled`;

export interface IProjectAllCustomField {
  client: IProjectCustomField[];
  vehicle: IProjectCustomField[];
  service_report_completed: IProjectCustomField[];
  service_report_canceled: IProjectCustomField[];
}

export interface IProjectDataWebapp extends IProjectData {
  subscription_type: PlanType;
} 

export interface IPutProjectCustomFieldPayload {
  label?: string;
  description?: string;
  // optional?: boolean; // NOT YET!
  enabled?: boolean;
  order?: number;
}

interface IProjectLimitsEdit {
  max_vehicles: number;
}

export interface IProjectResources {
  id: string;
  limits: IProjectLimitsEdit;
}