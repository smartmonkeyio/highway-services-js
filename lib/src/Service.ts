import { IServiceData } from "../common/interfaces";
import { Highway } from "./Highway";

export class Service {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (planId: string, service: IServiceData) => {
    const response = await this.highway.post(
      `service?plan_id=${planId}`,
      service
    );
    return response;
  };

  createMany = async (planId: string, arrayServices: IServiceData[]) => {
    const response = await this.highway.post(
      `services?plan_id=${planId}`,
      arrayServices
    );
    return response;
  };

  fromClient = async (clientId: string) => {
    // TODO: WHAT IS THIS?
    const response = await this.highway.post(`service/${clientId}`);
    return response;
  };

  update = async (serviceId: string, service: IServiceData) => {
    const response = await this.highway.put(`service/${serviceId}`, service);
    return response;
  };

  delete = async (serviceId: string) => {
    const response = await this.highway.delete(`service/${serviceId}`);
    return response;
  };

  get = async (serviceID: string) => {
    const response = await this.highway.get(`service/${serviceID}`);
    return response;
  };
}
