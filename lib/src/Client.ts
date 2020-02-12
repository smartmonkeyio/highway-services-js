import { IClientData, IClient, IPaginateResult } from "../common/interfaces";
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
  ): Promise<IPaginateResult<IClient>> => {
    const params = new URLSearchParams();
    params.append(`offset`, `${offset}`);
    params.append(`limit`, `${limit}`);
    if (text) {
      params.append(`text`, `${text}`);
    }
    const response = await this.highway.get(`clients?${params.toString()}`);
    return response;
  };

  listFlat = async () => {
    const response = await this.highway.get(`clients/flat`);
    return response;
  };
}
