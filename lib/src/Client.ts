import {
  IClientData,
  IClient,
  IPaginateResult,
  IService
} from "../common/interfaces";
import { Highway } from "./Highway";

export class Client {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (client: IClientData): Promise<IClient> => {
    const response = await this.highway.post(`client`, client);
    return response;
  };

  createMany = async (arrayClients: IClientData[]): Promise<IClient[]> => {
    const response = await this.highway.post(`clients`, arrayClients);
    return response;
  };

  update = async (clientId: string, client: IClientData): Promise<IClient> => {
    const response = await this.highway.put(`client/${clientId}`, client);
    return response;
  };

  delete = async (clientId: string): Promise<IClient> => {
    const response = await this.highway.delete(`client/${clientId}`);
    return response;
  };

  get = async (clientId: string): Promise<IClient> => {
    const response = await this.highway.get(`client/${clientId}`);
    return response;
  };

  list = async (
    offset = 0,
    limit = 20,
    text = undefined,
    sort = undefined,
  ): Promise<IPaginateResult<IClient>> => {
    const params = new URLSearchParams();
    params.append(`offset`, `${offset}`);
    params.append(`limit`, `${limit}`);
    if (text) {
      params.append(`text`, `${text}`);
    }
    if (sort) {
      params.append(`sort`, `${sort}`);
    }
    const response = await this.highway.get(`clients?${params.toString()}`);
    return response;
  };

  listFlat = async () => {
    const response = await this.highway.get(`clients/flat`);
    return response;
  };

  fromService = (service: IService): IClientData => {
    const { label, location, tags, comments, phone, email, website } = service;
    const newClient: IClientData = {
      label,
      location,
      tags,
      comments,
      phone,
      email,
      website,
      default_reward: service.reward,
      default_requires: service.requires,
      default_cluster: service.cluster,
      default_assign_to: service.assign_to,
      default_volume: service.volume,
      default_weight: service.weight,
      default_timewindows: service.timewindows,
    };
    return Object.entries(newClient).reduce(
      (a, [k, v]) => (v === undefined ? a : { ...a, [k]: v }),
      {},
    );
  };
}
