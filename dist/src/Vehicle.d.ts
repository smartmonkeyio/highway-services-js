import { IWebhookData, IHighway } from "../common/interfaces";
export default class Vehicle {
    highway: IHighway;
    constructor(hw: IHighway);
    create: (vehicle: IWebhookData) => Promise<any>;
    createMany: (arrayServices: IWebhookData[]) => Promise<any>;
    update: (vehicleId: String, vehicle: IWebhookData) => Promise<any>;
    delete: (vehicleId: String) => Promise<any>;
    get: (vehicleID: String) => Promise<any>;
}
