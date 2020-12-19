import { IPlanBase, IPlanData, IPlanPagination } from '../common/interfaces/plans';
import { IRouteBase } from '../common/interfaces/routes';
import { IServiceBase } from '../common/interfaces/services';
import { Highway } from './Highway';

export class Plan {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (planData: IPlanBase, projectId: string): Promise<IPlanData> => {
    const params = new URLSearchParams();
    params.append(`project_id`, `${projectId}`);
    return this.highway.post(`plan?${params.toString()}`, planData);
  };

  // createMany = async (arrayPlans: Array<IPlanData>) => {
  //   const response = await this.highway.post(`/plans`, arrayPlans);
  //   return response;
  // };

  update = async (planId: string, plan: IPlanData): Promise<IPlanData> => {
    const response = await this.highway.put(`plan/${planId}`, plan);
    return response;
  };

  delete = async (planId: string): Promise<IPlanData> => {
    const response = await this.highway.delete(`plan/${planId}`);
    return response;
  };

  get = async (planId: string): Promise<IPlanData> => {
    const response = await this.highway.get(`plan/${planId}`);
    return response;
  };

  list = async (
    projectId?: string,
    text = undefined,
    status = undefined,
    fromDate = undefined,
    toDate = undefined,
    sort = undefined,
    offset = 0,
    limit = 20
  ): Promise<IPlanPagination> => {
    const params = new URLSearchParams();
    if (projectId) {
      params.append(`project_id`, projectId);
    }

    if (text) {
      params.append(`text`, `${text}`);
    }
    if (status) {
      params.append(`status`, `${status}`);
    }
    if (fromDate) {
      params.append(`fromDate`, `${fromDate}`);
    }
    if (toDate) {
      params.append(`toDate`, `${toDate}`);
    }
    if (sort) {
      params.append(`sort`, `${sort}`);
    }
    params.append(`offset`, `${offset}`);
    params.append(`limit`, `${limit}`);

    const response = await this.highway.get(`plans?${params.toString()}`);
    return response;
  };

  optimize = async (planId: string): Promise<IPlanData> => {
    const response = await this.highway.post(`plan/${planId}/optimize`);
    return response;
  };

  optimizeAsync = async (
    planId: string
  ): Promise<{ finished: boolean; status: `in progress` | `success` | `failed` }> => {
    const response = await this.highway.post(`plan/${planId}/optimize/async`);
    return response;
  };

  addServices = async (planId: string, services: IServiceBase[]): Promise<IPlanData> => {
    await this.highway.service.createMany(planId, services);
    const response = await this.get(planId);
    return response;
  };

  addRoutes = async (planId: string, routes: IRouteBase[]): Promise<IPlanData> => {
    await this.highway.route.createMany(planId, routes);
    const response = await this.get(planId);
    return response;
  };
}
