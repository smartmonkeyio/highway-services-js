import { IClientBase, IClientData, IClientPagination } from "../common/interfaces/clients";
import { IServiceData } from "../common/interfaces/services";
import { Highway } from "./Highway";

export class Client {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (
    client: IClientBase,
    projectId?: string
  ): Promise<IClientData> => {
    const params = new URLSearchParams();
    if (projectId) params.append(`project_id`, `${projectId}`);
    return this.highway.post(`client?${params.toString()}`, client);
  };

  createMany = async (
    arrayClients: IClientBase[],
    projectId?: string
  ): Promise<IClientData[]> => {
    const params = new URLSearchParams();
    if (projectId) params.append(`project_id`, `${projectId}`);
    return this.highway.post(`clients?${params.toString()}`, arrayClients);
  };

  update = async (clientId: string, client: IClientBase): Promise<IClientData> => {
    return this.highway.put(`client/${clientId}`, client);
  };

  delete = async (clientId: string): Promise<IClientData> => {
    return this.highway.delete(`client/${clientId}`);
  };

  get = async (clientId: string): Promise<IClientData> => {
    return this.highway.get(`client/${clientId}`);
  };

  list = async (
    projectId?: string,
    offset = 0,
    limit = 20,
    text = undefined,
    sort = undefined
  ): Promise<IClientPagination> => {
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
    return this.highway.get(`clients?${params.toString()}`);
  };

  listFlat = async (projectId?: string) => {
    const params = new URLSearchParams();
    if (projectId) params.append(`project_id`, `${projectId}`);
    return this.highway.get(`clients/flat?${params.toString()}`);
  };

  fromService = (service: IServiceData): IClientBase => {
    const {
      label,
      location,
      comments,
      phone,
      email,
      website,
      location_details,
      client_external_id,
      reference_person,
    } = service;
    const newClient: IClientBase = {
      label,
      location,
      location_details,
      comments,
      phone,
      email,
      website,
      reference_person,
      external_id: client_external_id,
      default_reward: service.reward,
      default_requires: service.requires,
      default_cluster: service.cluster,
      default_assign_to: service.assign_to ? service.assign_to[0] : undefined,
      default_volume: service.volume,
      default_weight: service.weight,
      default_timewindows: service.timewindows,
    };
    return Object.entries(newClient).reduce(
      (a, [k, v]) => (v === undefined ? a : { ...a, [k]: v }),
      {}
    );
  };
}
