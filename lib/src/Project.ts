import {
  IProject,
  IProjectData,
  IProjectResources,
  IProjectUsers,
  ProjectRoles,
} from "../common/interfaces";
import { Highway } from "./Highway";

export class Project {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (project: IProjectData): Promise<IProject> => {
    return this.highway.post(`project`, project);
  };

  get = async (projectId: string): Promise<IProject> => {
    return this.highway.get(`project/${projectId}`);
  };

  getAll = async (): Promise<IProject[]> => {
    return this.highway.get(`projects`);
  };

  update = async (
    projectId: string,
    project: IProjectData
  ): Promise<IProject> => {
    return this.highway.put(`project/${projectId}`, project);
  };

  delete = async (projectId: string): Promise<IProject> => {
    return this.highway.delete(`project/${projectId}`);
  };

  getUsers = async (projectId: string): Promise<IProjectUsers[]> => {
    return this.highway.get(`project/${projectId}/users`);
  };

  createUser = async (
    projectId: string,
    userData: IProjectUsers
  ): Promise<IProject> => {
    return this.highway.post(`project/${projectId}/users`, userData);
  };

  updateProjectsResources = async (
    projectsResources: IProjectResources[]
  ): Promise<IProject[]> => {
    return this.highway.put(`projects`, projectsResources);
  };

  updateUser = async (
    projectId: string,
    userId: string,
    userData: { role: ProjectRoles }
  ): Promise<IProject> => {
    return this.highway.put(`project/${projectId}/users/${userId}`, userData);
  };

  deleteUser = async (projectId: string, userId: string): Promise<IProject> => {
    return this.highway.delete(`project/${projectId}/users/${userId}`);
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
