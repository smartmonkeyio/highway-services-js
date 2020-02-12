import {
  IPlanData,
  IPlan,
  IServiceData,
  IRouteData,
  IPaginateResult,
  IPlanSchema
} from "../common/interfaces";
import { Highway } from "./Highway";

export class Plan {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (plan: IPlan): Promise<IPlan> => {
    const response = await this.highway.post(`plan`, plan);
    return response;
  };

  // createMany = async (arrayPlans: Array<IPlanData>) => {
  //   const response = await this.highway.post(`/plans`, arrayPlans);
  //   return response;
  // };

  update = async (planId: string, plan: IPlanData): Promise<IPlan> => {
    const response = await this.highway.put(`plan/${planId}`, plan);
    return response;
  };

  delete = async (planId: string): Promise<IPlan> => {
    const response = await this.highway.delete(`plan/${planId}`);
    return response;
  };

  get = async (planId: string): Promise<IPlan> => {
    const response = await this.highway.get(`plan/${planId}`);
    return response;
  };

  list = async (
    text = undefined,
    status = undefined,
    fromDate = undefined,
    toDate = undefined,
    sort = undefined,
    offset = 0,
    limit = 20,
  ): Promise<IPaginateResult<IPlanSchema>> => {
    const params = new URLSearchParams();
    if (text) {params.append(`text`, `${text}`);}
    if (status) {params.append(`status`, `${status}`);}
    if (fromDate) {params.append(`fromDate`, `${fromDate}`);}
    if (toDate) {params.append(`toDate`, `${toDate}`);}
    if (sort) {params.append(`sort`, `${sort}`);}
    params.append(`offset`, `${offset}`);
    params.append(`limit`, `${limit}`);

    const response = await this.highway.get(`plans?${params.toString()}`);
    return response;
  };

  optimize = async (planId: string): Promise<IPlan> => {
    const response = await this.highway.post(`plan/${planId}/optimize`);
    return response;
  };

  addServices = async (
    planId: string,
    services: IServiceData[],
  ): Promise<IPlan> => {
    await this.highway.service.createMany(planId, services);
    const response = await this.get(planId);
    return response;
  };

  addRoutes = async (planId: string, routes: IRouteData[]): Promise<IPlan> => {
    await this.highway.route.createMany(planId, routes);
    const response = await this.get(planId);
    return response;
  };
}
