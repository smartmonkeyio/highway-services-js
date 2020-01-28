import axios from "axios";
import { HIGHWAY_ENDPOINT, API_VERSION } from "../common/constants";
import { Client } from "./Client";
import { Plan } from "./Plan";
import { Vehicle } from "./Vehicle";
import { Route } from "./Route";
import { Service } from "./Service";
import { HighwayError } from "../common/errors";

export class Highway {
  private _token?: string;
  private _apiKey: string;
  private apiEndpoint: string;

  client: Client;
  plan: Plan;
  route: Route;
  service: Service;
  vehicle: Vehicle;

  constructor(apiKey: string, bearer?: string, apiEndpoint?: string) {
    this._token = bearer;
    this._apiKey = apiKey;
    this.client = new Client(this);
    this.plan = new Plan(this);
    this.route = new Route(this);
    this.service = new Service(this);
    this.vehicle = new Vehicle(this);
    this.apiEndpoint = apiEndpoint || HIGHWAY_ENDPOINT;
  }

  private _request = async (method: (url: string, data: any, headers?: any) => Promise<any>, url: string, data?: any) => {
    try {
      if (data) {
        return (await method(
          `${this.apiEndpoint}/${API_VERSION}/${url}`,
          data || {},
          {
            ...this.apiKey ? {
              params: { private_key: this.apiKey },
            } : {
                headers: {
                  Authorization: `Bearer ${this._token}`,
                },
              },
          }
        )).data;
      } else {
        return (await method(
          `${this.apiEndpoint}/${API_VERSION}/${url}`,
          {
            ...this.apiKey ? {
              params: { private_key: this.apiKey },
            } : {
                headers: {
                  Authorization: `Bearer ${this._token}`,
                },
              },
          }
        )).data;
      }

    } catch (error) {
      if (error.code === `ENOTFOUND` || error.code === `ECONNREFUSED`) {
        throw new HighwayError(`${error.code} - api endpoint is not correctly set`, `highway.bad_endpoint`, 0);
      }
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

  get apiKey(): string {
    return this._apiKey;
  }
  get token(): string | void {
    return this._token;
  }
}
