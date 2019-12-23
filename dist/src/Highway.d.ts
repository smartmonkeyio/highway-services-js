import { IHighway, IClientClass, IPlanClass, IRouteClass, IServiceClass, IVehicleClass } from "../common/interfaces";
declare class Highway implements IHighway {
    token?: String;
    apiKey: String;
    client: IClientClass;
    plan: IPlanClass;
    route: IRouteClass;
    service: IServiceClass;
    vehicle: IVehicleClass;
    constructor(APIKey: string, bearer: string);
    post: (url: string, data: Object) => Promise<import("axios").AxiosResponse<any>>;
    get: (url: string) => Promise<import("axios").AxiosResponse<any>>;
    delete: (url: string) => Promise<import("axios").AxiosResponse<any>>;
    put: (url: string, data: Object) => Promise<import("axios").AxiosResponse<any>>;
}
export default Highway;
