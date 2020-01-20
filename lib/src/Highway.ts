import axios from "axios";
import { HIGHWAY_ENDPOINT, API_VERSION } from "../common/constants";
import { Client } from "./Client";
import { Plan } from "./Plan";
import { Vehicle } from "./Vehicle";
import { Route } from "./Route";
import { Service } from "./Service";
import { HighwayError } from "../common/errors";

export class Highway {
  token?: string;
  apiKey: string;

  client: Client;
  plan: Plan;
  route: Route;
  service: Service;
  vehicle: Vehicle;

  constructor(apiKey: string, bearer?: string) {
    this.token = bearer;
    this.apiKey = apiKey;
    this.client = new Client(this);
    this.plan = new Plan(this);
    this.route = new Route(this);
    this.service = new Service(this);
    this.vehicle = new Vehicle(this);
  }

  _request = async (method: (url: string, data: any, headers?: any) => Promise<any>, url: string, data?: any) => {
    try {
      if (data) {
        return (await method(
          `${HIGHWAY_ENDPOINT}/${API_VERSION}/${url}`,
          data || {},
          {
            ...this.apiKey ? {
              params: { private_key: this.apiKey },
            } : {
                headers: {
                  Authorization: `Bearer ${this.token}`,
                },
              },
          }
        )).data;
      } else {
        return (await method(
          `${HIGHWAY_ENDPOINT}/${API_VERSION}/${url}`,
          {
            ...this.apiKey ? {
              params: { private_key: this.apiKey },
            } : {
                headers: {
                  Authorization: `Bearer ${this.token}`,
                },
              },
          }
        )).data;
      }
      
    } catch (error) {
      const { data, status } = error.response;
      throw new HighwayError(`${status} - ${data.message}`, data.messageId, status);
    }
  }

  post = async (url: string, data?: any) => {
    return this._request(axios.post, url, data || {});
  };

  get = async (url: string) => {
    return this._request(axios.get, url);
  };

  delete = async (url: string) => {
    return this._request(axios.delete, url);
  };

  put = async (url: string, data?: any) => {
    return this._request(axios.put, url, data || {});
  };
}
