import { IVehicleData, IHighway } from "../common/interfaces";

export default class Vehicle {
  highway: IHighway;

  constructor(hw: IHighway) {
    this.highway = hw;
  }

  create = async (vehicle: IVehicleData) => {
    const response = await this.highway.post(`/vehicle`, vehicle);
    return response;
  };

  createMany = async (arrayServices: Array<IVehicleData>) => {
    const response = await this.highway.post(`/vehicles`, arrayServices);
    return response;
  };

  update = async (vehicleId: String, vehicle: IVehicleData) => {
    const response = await this.highway.put(`/vehicle/${vehicleId}`, vehicle);
    return response;
  };

  delete = async (vehicleId: String) => {
    const response = await this.highway.delete(`/vehicle/${vehicleId}`);
    return response;
  };

  get = async (vehicleID: String) => {
    const response = await this.highway.get(`/vehicle/${vehicleID}`);
    return response;
  };
}
