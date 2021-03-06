import { IRouteBase, IRouteData } from '../common/interfaces/routes';
import { IVehicleData } from '../common/interfaces/vehicles';
import { Highway } from './Highway';

export class Route {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (planId: string, route: IRouteData) => {
    const response = await this.highway.post(`route?plan_id=${planId}`, route);
    return response;
  };

  createMany = async (planId: string, arrayRoutes: IRouteBase[]) => {
    const response = await this.highway.post(`routes?plan_id=${planId}`, arrayRoutes);
    return response;
  };

  /**
   * Create a new route from a vehicle object.
   */
  fromVehicle = (vehicle: IVehicleData): IRouteBase => {
    const {
      id,
      default_end_location,
      default_start_location,
      default_max_distance,
      default_max_volume,
      default_max_weight,
      default_provides,
      default_timewindow,
      default_max_services,
      plate,
      vehicle_model,
      icon,
      color,
      brand,
      phone,
      label,
      email,
      custom_fields,
      price_per_distance,
      price_per_minute,
    } = vehicle;

    return {
      vehicle_id: id,
      start_location: default_start_location,
      end_location: default_end_location,
      max_distance: default_max_distance,
      max_volume: default_max_volume,
      max_weight: default_max_weight,
      max_services: default_max_services,

      provides: default_provides,
      timewindow: default_timewindow,
      plate,
      vehicle_model,
      icon,
      color,
      brand,
      phone,
      label,
      email,
      custom_fields,
      price_per_distance,
      price_per_minute,
    };
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
