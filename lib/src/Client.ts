import { IClientData, IHighway } from "../common/interfaces";

class Client {
  highway: IHighway;

  constructor(hw: IHighway) {
    this.highway = hw;
  }

  create = async (client: IClientData) => {
    const response = await this.highway.post(`client`, client);
    return response;
  };

  createMany = async (arrayClients: Array<IClientData>) => {
    const response = await this.highway.post(`clients`, arrayClients);
    return response;
  };

  update = async (clientId: String, client: IClientData) => {
    const response = await this.highway.put(`client/${clientId}`, client);
    return response;
  };

  delete = async (clientId: String) => {
    const response = await this.highway.delete(`client/${clientId}`);
    return response;
  };

  get = async (clientId: String) => {
    const response = await this.highway.get(`client/${clientId}`);
    return response;
  };
}

export default Client;
