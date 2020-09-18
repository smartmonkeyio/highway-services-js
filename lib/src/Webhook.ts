import { IWebhookData } from "../common/interfaces";
import { Highway } from "./Highway";

export class Webhook {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (webhook: IWebhookData, projectId?: string) => {
    const response = await this.highway.post(
      `webhook${projectId ? `?project_id=${projectId}` : ``}`,
      webhook
    );
    return response;
  };

  delete = async (webhookId: string) => {
    const response = await this.highway.delete(`webhook/${webhookId}`);
    return response;
  };

  getAll = async (projectId?: string) => {
    const response = await this.highway.get(
      `webhook${projectId ? `?project_id=${projectId}` : ``}`
    );
    return response;
  };
}
