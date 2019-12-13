import { IRouteData, IHighway } from "../common/interfaces";

class Route {
  highway: IHighway;

  constructor(hw: IHighway) {
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

  createMany = async (arrayRoutes: Array<IRouteData>) => {
    const response = await this.highway.post(`/routes`, arrayRoutes);
    return response;
  };

  update = async (routeId: String, route: IRouteData) => {
    const response = await this.highway.put(`/route/${routeId}`, route);
    return response;
  };

  delete = async (routeId: String) => {
    const response = await this.highway.delete(`/route/${routeId}`);
    return response;
  };

  get = async (routeId: String) => {
    const response = await this.highway.get(`/route/${routeId}`);
    return response;
  };
}

export default Route;
