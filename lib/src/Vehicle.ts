import {
  IPaginateResult,
  IRoute,
  IVehicle,
  IVehicleData,
} from "../common/interfaces";
import { Highway } from "./Highway";

export class Vehicle {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (
    vehicleData: IVehicleData,
    projectId?: string
  ): Promise<IVehicle> => {
    const params = new URLSearchParams();
    if (projectId) params.append(`project_id`, `${projectId}`);
    return this.highway.post(`vehicle?${params.toString()}`, vehicleData);
  };

  createMany = async (
    arrayServices: IVehicleData[],
    projectId?: string
  ): Promise<IVehicle[]> => {
    const params = new URLSearchParams();
    if (projectId) params.append(`project_id`, `${projectId}`);
    return this.highway.post(`vehicles?${params.toString()}`, arrayServices);
  };

  update = async (
    vehicleId: string,
    vehicle: IVehicleData
  ): Promise<IVehicle> => {
    return this.highway.put(`vehicle/${vehicleId}`, vehicle);
  };

  delete = async (vehicleId: string): Promise<IVehicle> => {
    return this.highway.delete(`vehicle/${vehicleId}`);
  };

  get = async (vehicleID: string): Promise<IVehicle> => {
    return this.highway.get(`vehicle/${vehicleID}`);
  };

  list = async (
    projectId?: string,
    offset = 0,
    limit = 20,
    text = undefined,
    sort = undefined
  ): Promise<IPaginateResult<IVehicle>> => {
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
  fromRoute = (route: IRoute): IVehicleData => {
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
      avatar,
      phone,
      label,
      email,
    } = route;

    const newVehicle: IVehicleData = {
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
      avatar,
      phone,
      label,
      email,
    };
    return Object.entries(newVehicle).reduce(
      (a, [k, v]) => (v === undefined ? a : { ...a, [k]: v }),
      {}
    );
  };
}
