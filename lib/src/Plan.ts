import { IPlanData, IHighway } from "../common/interfaces";

class Plan {
  highway: IHighway;

  constructor(hw: IHighway) {
    this.highway = hw;
  }

  create = async (plan: IPlanData) => {
    const response = await this.highway.post(`/plan`, plan);
    return response;
  };

  // createMany = async (arrayPlans: Array<IPlanData>) => {
  //   const response = await this.highway.post(`/plans`, arrayPlans);
  //   return response;
  // };

  update = async (planId: String, plan: IPlanData) => {
    const response = await this.highway.put(`/client/${planId}`, plan);
    return response;
  };

  delete = async (planId: String) => {
    const response = await this.highway.delete(`/client/${planId}`);
    return response;
  };

  get = async (clientId: String) => {
    const response = await this.highway.get(`/plan/${clientId}`);
    return response;
  };
}

export default Plan;
