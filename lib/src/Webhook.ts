import { IWebhookData } from "../common/interfaces";
import { Highway } from "./Highway";

export class Webhook {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (webhook: IWebhookData) => {
    const response = await this.highway.post(`/webhook`, webhook);
    return response;
  };

  createMany = async (arrayServices: IWebhookData[]) => {
    const response = await this.highway.post(`/webhooks`, arrayServices);
    return response;
  };

  update = async (webhookId: string, webhook: IWebhookData) => {
    const response = await this.highway.put(`/webhook/${webhookId}`, webhook);
    return response;
  };

  delete = async (webhookId: string) => {
    const response = await this.highway.delete(`/webhook/${webhookId}`);
    return response;
  };

  get = async (webhookID: string) => {
    const response = await this.highway.get(`/webhook/${webhookID}`);
    return response;
  };
}
