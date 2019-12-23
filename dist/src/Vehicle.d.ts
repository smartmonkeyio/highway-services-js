import { IVehicleData, IHighway } from "../common/interfaces";
export default class Vehicle {
    highway: IHighway;
    constructor(hw: IHighway);
    create: (vehicle: IVehicleData) => Promise<any>;
    createMany: (arrayServices: IVehicleData[]) => Promise<any>;
    update: (vehicleId: String, vehicle: IVehicleData) => Promise<any>;
    delete: (vehicleId: String) => Promise<any>;
    get: (vehicleID: String) => Promise<any>;
}
