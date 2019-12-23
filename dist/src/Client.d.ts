import { IClientData, IHighway } from "../common/interfaces";
declare class Client {
    highway: IHighway;
    constructor(hw: IHighway);
    create: (client: IClientData) => Promise<any>;
    createMany: (arrayClients: IClientData[]) => Promise<any>;
    update: (clientId: String, client: IClientData) => Promise<any>;
    delete: (clientId: String) => Promise<any>;
    get: (clientId: String) => Promise<any>;
}
export default Client;
