import { IRouteData, IHighway } from "../common/interfaces";
declare class Route {
    highway: IHighway;
    constructor(hw: IHighway);
    create: (route: IRouteData) => Promise<any>;
    fromVehicle: (vehicleId: string) => Promise<any>;
    createMany: (arrayRoutes: IRouteData[]) => Promise<any>;
    update: (routeId: String, route: IRouteData) => Promise<any>;
    delete: (routeId: String) => Promise<any>;
    get: (routeId: String) => Promise<any>;
}
export default Route;
