import { IPlanData, IHighway } from "../common/interfaces";

class Plan {
  highway: IHighway;

  constructor(hw: IHighway) {
    this.highway = hw;
  }

  create = async (plan: IPlanData) => {
    const response = await this.highway.post(`plan`, plan);
    return response;
  };

  // createMany = async (arrayPlans: Array<IPlanData>) => {
  //   const response = await this.highway.post(`/plans`, arrayPlans);
  //   return response;
  // };

  update = async (planId: String, plan: IPlanData) => {
    const response = await this.highway.put(`plan/${planId}`, plan);
    return response;
  };

  delete = async (planId: String) => {
    const response = await this.highway.delete(`plan/${planId}`);
    return response;
  };

  get = async (planId: String) => {
    const response = await this.highway.get(`plan/${planId}`);
    return response;
  };

  optimize = async (planId: String) => {
    const response = await this.highway.post(`plan/${planId}/optimize`);
    return response;
  };
}

export default Plan;
