import { FirstSolutionStrategy, ICRUD, IPagination, IUserObject, LocalSearchMetaheuristic } from './common';
import { IRouteDataExtended } from './routes';
import { IServiceDataExtended } from './services';

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