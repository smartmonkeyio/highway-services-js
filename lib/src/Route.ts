import { IRouteData } from "../common/interfaces";
import { Highway } from "./Highway";

export class Route {
  highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (route: IRouteData) => {
    const response = await this.highway.post(`/route`, route);
    return response;
  };

  fromVehicle = async (vehicleId: string) => {
    const response = await this.highway.post(`/route/${vehicleId}`);
    return response;
  };

  createMany = async (arrayRoutes: IRouteData[]) => {
    const response = await this.highway.post(`/routes`, arrayRoutes);
    return response;
  };

  update = async (routeId: string, route: IRouteData) => {
    const response = await this.highway.put(`/route/${routeId}`, route);
    return response;
  };

  delete = async (routeId: string) => {
    const response = await this.highway.delete(`/route/${routeId}`);
    return response;
  };

  get = async (routeId: string) => {
    const response = await this.highway.get(`/route/${routeId}`);
    return response;
  };
}
