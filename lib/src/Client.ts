import { IClientData, IClient } from "../common/interfaces";
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
}

