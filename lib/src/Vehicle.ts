import { IWebhookData, IPaginateResult, IVehicle } from "../common/interfaces";
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

  list = async (offset = 0, limit = 20): Promise<IPaginateResult<IVehicle>> => {
    const params = new URLSearchParams();
    params.append(`offset`, `${offset}`);
    params.append(`limit`, `${limit}`);
    const response = await this.highway.get(`vehicles?${params.toString()}`);
    return response;
  };
}
