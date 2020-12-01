import { IRouteData } from "../common/interfaces/routes";
import { IVehicleBase, IVehicleData, IVehiclePagination } from "../common/interfaces/vehicles";
import { Highway } from "./Highway";

export class Vehicle {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (
    vehicleData: IVehicleBase,
    projectId?: string
  ): Promise<IVehicleData> => {
    const params = new URLSearchParams();
    if (projectId) params.append(`project_id`, `${projectId}`);
    return this.highway.post(`vehicle?${params.toString()}`, vehicleData);
  };

  createMany = async (
    arrayServices: IVehicleBase[],
    projectId?: string
  ): Promise<IVehicleData[]> => {
    const params = new URLSearchParams();
    if (projectId) params.append(`project_id`, `${projectId}`);
    return this.highway.post(`vehicles?${params.toString()}`, arrayServices);
  };

  update = async (
    vehicleId: string,
    vehicle: IVehicleBase
  ): Promise<IVehicleData> => {
    return this.highway.put(`vehicle/${vehicleId}`, vehicle);
  };

  delete = async (vehicleId: string): Promise<IVehicleData> => {
    return this.highway.delete(`vehicle/${vehicleId}`);
  };

  get = async (vehicleID: string): Promise<IVehicleData> => {
    return this.highway.get(`vehicle/${vehicleID}`);
  };

  list = async (
    projectId?: string,
    offset = 0,
    limit = 20,
    text = undefined,
    sort = undefined
  ): Promise<IVehiclePagination> => {
    const params = new URLSearchParams();
    if (projectId) {
      params.append(`project_id`, `${projectId}`);
    }
    params.append(`offset`, `${offset}`);
    params.append(`limit`, `${limit}`);
    if (text) {
      params.append(`text`, `${text}`);
    }
    if (sort) {
      params.append(`sort`, `${sort}`);
    }

    return this.highway.get(`vehicles?${params.toString()}`);
  };

  listFlat = async (projectId?: string) => {
    const params = new URLSearchParams();
    if (projectId) params.append(`project_id`, `${projectId}`);
    return this.highway.get(`vehicles/flat?${params.toString()}`);
  };

  /**
   * Create a new route from a vehicle object.
   */
  fromRoute = (route: IRouteData): IVehicleBase => {
    const {
      end_location,
      start_location,
      max_volume,
      max_weight,
      max_services,
      provides,
      timewindow,
      plate,
      vehicle_model,
      icon,
      brand,
      phone,
      label,
      email,
      custom_fields,
      price_per_minute,
      price_per_distance,
    } = route;

    const newVehicle: IVehicleBase = {
      default_start_location: start_location,
      default_end_location: end_location,
      default_max_volume: max_volume,
      default_max_weight: max_weight,
      default_max_services: max_services,
      default_provides: provides,
      default_timewindow: timewindow,
      plate,
      vehicle_model,
      icon,
      brand,
      phone,
      label,
      email,
      custom_fields,
      price_per_minute,
      price_per_distance,
    };
    return Object.entries(newVehicle).reduce(
      (a, [k, v]) => (v === undefined ? a : { ...a, [k]: v }),
      {}
    );
  };
}
