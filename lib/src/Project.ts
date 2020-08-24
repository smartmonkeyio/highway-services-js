import { IProject, IProjectData } from "../common/interfaces";
import { Highway } from "./Highway";

export class Project {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (project: IProjectData): Promise<IProject> => {
    const response = await this.highway.post(`project`, project);
    return response;
  };

  get = async (projectId: string): Promise<IProject> => {
    const response = await this.highway.get(`project/${projectId}`);
    return response;
  };

  getAll = async (): Promise<IProject> => {
    const response = await this.highway.get(`projects`);
    return response;
  };

  update = async (
    projectId: string,
    project: IProjectData
  ): Promise<IProject> => {
    const response = await this.highway.put(`project/${projectId}`, project);
    return response;
  };

  delete = async (projectId: string): Promise<IProject> => {
    const response = await this.highway.delete(`plan/${projectId}`);
    return response;
  };

  // list = async (
  //   text = undefined,
  //   status = undefined,
  //   fromDate = undefined,
  //   toDate = undefined,
  //   sort = undefined,
  //   offset = 0,
  //   limit = 20
  // ): Promise<IPaginateResult<IProjectSchema>> => {
  //   const params = new URLSearchParams();
  //   if (text) {
  //     params.append(`text`, `${text}`);
  //   }
  //   if (status) {
  //     params.append(`status`, `${status}`);
  //   }
  //   if (fromDate) {
  //     params.append(`fromDate`, `${fromDate}`);
  //   }
  //   if (toDate) {
  //     params.append(`toDate`, `${toDate}`);
  //   }
  //   if (sort) {
  //     params.append(`sort`, `${sort}`);
  //   }
  //   params.append(`offset`, `${offset}`);
  //   params.append(`limit`, `${limit}`);

  //   const response = await this.highway.get(`plans?${params.toString()}`);
  //   return response;
  // };

  // addServices = async (
  //   planId: string,
  //   services: IServiceData[]
  // ): Promise<IPlan> => {
  //   await this.highway.service.createMany(planId, services);
  //   const response = await this.get(planId);
  //   return response;
  // };

  // addRoutes = async (planId: string, routes: IRouteData[]): Promise<IPlan> => {
  //   await this.highway.route.createMany(planId, routes);
  //   const response = await this.get(planId);
  //   return response;
  // };
}
