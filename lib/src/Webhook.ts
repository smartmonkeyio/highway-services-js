import { IWebhookData } from "../common/interfaces";
import { Highway } from "./Highway";

export class Webhook {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (webhook: IWebhookData, projectId?: string) => {
    const params = new URLSearchParams();
    if (projectId) params.append(`project_id`, `${projectId}`);
    return this.highway.post(`webhook?${params.toString()}`, webhook);
  };

  delete = async (webhookId: string) => {
    const response = await this.highway.delete(`webhook/${webhookId}`);
    return response;
  };

  getAll = async (projectId?: string) => {
    const params = new URLSearchParams();
    if (projectId) params.append(`project_id`, `${projectId}`);
    return this.highway.get(`webhooks?${params.toString()}`);
  };
}
