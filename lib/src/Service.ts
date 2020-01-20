import { IServiceData } from "../common/interfaces";
import { Highway } from "./Highway";

export class Service {
  highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (service: IServiceData) => {
    const response = await this.highway.post(`/service`, service);
    return response;
  };

  createMany = async (arrayServices: IServiceData[]) => {
    const response = await this.highway.post(`/services`, arrayServices);
    return response;
  };

  fromClient = async (clientId: string) => {
    const response = await this.highway.post(`/service/${clientId}`);
    return response;
  };

  update = async (serviceId: string, service: IServiceData) => {
    const response = await this.highway.put(`/service/${serviceId}`, service);
    return response;
  };

  delete = async (serviceId: string) => {
    const response = await this.highway.delete(`/service/${serviceId}`);
    return response;
  };

  get = async (serviceID: string) => {
    const response = await this.highway.get(`/service/${serviceID}`);
    return response;
  };
}