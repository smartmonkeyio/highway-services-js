import { IPlanData } from "../common/interfaces";
import { Highway } from "./Highway";

export class Plan {
  highway: Highway;

  constructor(hw: Highway) {
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

  update = async (planId: string, plan: IPlanData) => {
    const response = await this.highway.put(`plan/${planId}`, plan);
    return response;
  };

  delete = async (planId: string) => {
    const response = await this.highway.delete(`plan/${planId}`);
    return response;
  };

  get = async (planId: string) => {
    const response = await this.highway.get(`plan/${planId}`);
    return response;
  };

  optimize = async (planId: string) => {
    const response = await this.highway.post(`plan/${planId}/optimize`);
    return response;
  };
}
