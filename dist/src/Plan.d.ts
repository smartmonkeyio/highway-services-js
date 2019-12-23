import { IPlanData, IHighway } from "../common/interfaces";
declare class Plan {
    highway: IHighway;
    constructor(hw: IHighway);
    create: (plan: IPlanData) => Promise<any>;
    update: (planId: String, plan: IPlanData) => Promise<any>;
    delete: (planId: String) => Promise<any>;
    get: (clientId: String) => Promise<any>;
}
export default Plan;
