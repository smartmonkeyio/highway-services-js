import { IHighway, IServiceData } from "../common/interfaces";
declare class Service {
    highway: IHighway;
    constructor(hw: IHighway);
    create: (service: IServiceData) => Promise<any>;
    createMany: (arrayServices: IServiceData[]) => Promise<any>;
    fromClient: (clientId: string) => Promise<any>;
    update: (serviceId: String, service: IServiceData) => Promise<any>;
    delete: (serviceId: String) => Promise<any>;
    get: (serviceID: String) => Promise<any>;
}
export default Service;
