import { IRouteData } from "../common/interfaces";
import { Highway } from "./Highway";

export class Route {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (planId: string, route: IRouteData) => {
    const response = await this.highway.post(`route?plan_id=${planId}`, route);
    return response;
  };

  createMany = async (planId: string, arrayRoutes: IRouteData[]) => {
    const response = await this.highway.post(
      `routes?plan_id=${planId}`,
      arrayRoutes,
    );
    return response;
  };

  fromVehicle = async (vehicleId: string) => {
    //TODO: What is this?
    const response = await this.highway.post(`route/${vehicleId}`);
    return response;
  };

  update = async (routeId: string, route: IRouteData) => {
    const response = await this.highway.put(`route/${routeId}`, route);
    return response;
  };

  delete = async (routeId: string) => {
    const response = await this.highway.delete(`route/${routeId}`);
    return response;
  };

  get = async (routeId: string) => {
    const response = await this.highway.get(`route/${routeId}`);
    return response;
  };

  optimize = async (routeId: string) => {
    const response = await this.highway.post(`route/${routeId}/optimize`);
    return response;
  };
}
