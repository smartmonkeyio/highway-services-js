import { IServiceData, IClient } from "../common/interfaces";
import { Highway } from "./Highway";

export class Service {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (planId: string, service: IServiceData) => {
    const response = await this.highway.post(
      `service?plan_id=${planId}`,
      service,
    );
    return response;
  };

  createMany = async (planId: string, arrayServices: IServiceData[]) => {
    const response = await this.highway.post(
      `services?plan_id=${planId}`,
      arrayServices,
    );
    return response;
  };

  fromClient = (client: IClient): IServiceData => {
    const { id, external_id, icon, label, location, tags, comments, phone, email, website, reference_person } = client;
    const newService: IServiceData = {
      label, location, tags, comments,
      phone, email, website, icon,
      reference_person,
      client_id: id,
      client_external_id: external_id,
      location_details: client.location_details,
      duration: client.default_duration,
      reward: client.default_reward,
      requires: client.default_requires,
      cluster: client.default_cluster,
      assign_to: client.default_assign_to,
      volume: client.default_volume,
      weight: client.default_weight,
      timewindows: client.default_timewindows,
    };
    return Object.entries(newService).reduce((a, [k, v]) => (v === undefined ? a : { ...a, [k]: v }), {});
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
