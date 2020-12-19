import { ICRUD, IOptimizerConfig, IPagination, IUserObject } from './common';
import { IRouteDataExtended } from './routes';
import { IServiceDataExtended } from './services';

export type PlanStatusType = `planning` | `in_progress` | `finished`;

export interface IPlanBase extends ICRUD, IUserObject {
  organization_id?: string;
  project_id?: string;
  status?: PlanStatusType;
  _version?: number;
  start_date?: Date;
  end_date?: Date;
  single_day?: boolean;
  label?: string;
  optimizer_config?: IOptimizerConfig;
  routes: IRouteDataExtended[];
  services: IServiceDataExtended[];
  completed_services?: number;
  canceled_services?: number;
  pending_services?: number;
  total_services?: number;
  total_routes?: number;
}

export interface IPlanData extends IPlanBase {
  id?: string;
}

export type IPlanPagination = IPagination<IPlanData>;
