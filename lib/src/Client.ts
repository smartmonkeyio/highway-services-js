import { IClientData } from "../common/interfaces";
import { Highway } from "./Highway";


export class Client {
  highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (client: IClientData) => {

    const response = await this.highway.post(`client`, client);
    return response;

  };

  createMany = async (arrayClients: IClientData[]) => {
    const response = await this.highway.post(`clients`, arrayClients);
    return response;
  };

  update = async (clientId: string, client: IClientData) => {
    const response = await this.highway.put(`client/${clientId}`, client);
    return response;
  };

  delete = async (clientId: string) => {
    const response = await this.highway.delete(`client/${clientId}`);
    return response;
  };

  get = async (clientId: string) => {
    const response = await this.highway.get(`client/${clientId}`);
    return response;
  };
}

