import { IHighway, IServiceData } from "../common/interfaces";

class Service {
  highway: IHighway;

  constructor(hw: IHighway) {
    this.highway = hw;
  }

  create = async (service: IServiceData) => {
    const response = await this.highway.post(`/service`, service);
    return response;
  };

  createMany = async (arrayServices: Array<IServiceData>) => {
    const response = await this.highway.post(`/services`, arrayServices);
    return response;
  };

  fromClient = async (clientId: string) => {
    const response = await this.highway.post(`/service/${clientId}`);
    return response;
  };

  update = async (serviceId: String, service: IServiceData) => {
    const response = await this.highway.put(`/service/${serviceId}`, service);
    return response;
  };

  delete = async (serviceId: String) => {
    const response = await this.highway.delete(`/service/${serviceId}`);
    return response;
  };

  get = async (serviceID: String) => {
    const response = await this.highway.get(`/service/${serviceID}`);
    return response;
  };
}

export default Service;
