import { IWebhookData } from "../common/interfaces";
import { Highway } from "./Highway";

export class Vehicle {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (vehicle: IWebhookData) => {
    const response = await this.highway.post(`/vehicle`, vehicle);
    return response;

  };

  createMany = async (arrayServices: IWebhookData[]) => {
    const response = await this.highway.post(`/vehicles`, arrayServices);
    return response;
  };

  update = async (vehicleId: string, vehicle: IWebhookData) => {
    const response = await this.highway.put(`/vehicle/${vehicleId}`, vehicle);
    return response;
  };

  delete = async (vehicleId: string) => {
    const response = await this.highway.delete(`/vehicle/${vehicleId}`);
    return response;
  };

  get = async (vehicleID: string) => {
    const response = await this.highway.get(`/vehicle/${vehicleID}`);
    return response;
  };
}
