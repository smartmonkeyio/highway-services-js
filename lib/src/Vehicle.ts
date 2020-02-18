import {
  IWebhookData,
  IPaginateResult,
  IVehicle,
  IRoute
} from "../common/interfaces";
import { Highway } from "./Highway";

export class Vehicle {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (vehicle: IWebhookData): Promise<IVehicle> => {
    const response = await this.highway.post(`vehicle`, vehicle);
    return response;
  };

  createMany = async (arrayServices: IWebhookData[]): Promise<IVehicle[]> => {
    const response = await this.highway.post(`vehicles`, arrayServices);
    return response;
  };

  update = async (
    vehicleId: string,
    vehicle: IWebhookData
  ): Promise<IVehicle> => {
    const response = await this.highway.put(`vehicle/${vehicleId}`, vehicle);
    return response;
  };

  delete = async (vehicleId: string): Promise<IVehicle> => {
    const response = await this.highway.delete(`vehicle/${vehicleId}`);
    return response;
  };

  get = async (vehicleID: string): Promise<IVehicle> => {
    const response = await this.highway.get(`vehicle/${vehicleID}`);
    return response;
  };

  list = async (
    offset = 0,
    limit = 20,
    text = undefined
  ): Promise<IPaginateResult<IVehicle>> => {
    const params = new URLSearchParams();
    params.append(`offset`, `${offset}`);
    params.append(`limit`, `${limit}`);
    if (text) {
      params.append(`text`, `${text}`);
    }

    const response = await this.highway.get(`vehicles?${params.toString()}`);
    return response;
  };

  listFlat = async () => {
    const response = await this.highway.get(`vehicles/flat`);
    return response;
  };

  /**
   * Create a new route from a vehicle object.
   */
  fromRoute = (route: IRoute): IWebhookData => {
    const {
      end_location,
      start_location,
      max_volume,
      max_weight,
      provides,
      timewindow,
      plate,
      vehicle_model,
      icon,
      brand,
      avatar,
      phone,
      label,
      email
    } = route;

    const newVehicle: IWebhookData = {
      default_start_location: start_location,
      default_end_location: end_location,
      default_max_volume: max_volume,
      default_max_weight: max_weight,
      default_provides: provides,
      default_timewindow: timewindow,
      plate,
      vehicle_model,
      icon,
      brand,
      avatar,
      phone,
      label,
      email
    };
    return Object.entries(newVehicle).reduce(
      (a, [k, v]) => (v === undefined ? a : { ...a, [k]: v }),
      {}
    );
  };
}
