import axios from "axios";
import { HIGHWAY_ENDPOINT, API_VERSION } from "../common/constants";
import {
  IClientClass,
  IPlanClass,
  IRouteClass,
  IServiceClass,
  IVehicleClass
} from "../common/interfaces";
import { Client } from "./Client";
import { Plan } from "./Plan";
import { Vehicle } from "./Vehicle";
import { Route } from "./Route";
import { Service } from "./Service";
import { HighwayError } from "../common/errors";

export class Highway {
  token?: string;
  apiKey: string;

  client: IClientClass;
  plan: IPlanClass;
  route: IRouteClass;
  service: IServiceClass;
  vehicle: IVehicleClass;

  constructor(apiKey: string, bearer?: string) {
    this.token = bearer;
    this.apiKey = apiKey;
    this.client = new Client(this);
    this.plan = new Plan(this);
    this.route = new Route(this);
    this.service = new Service(this);
    this.vehicle = new Vehicle(this);
  }

  _request = async (method: (url: string, data: any, headers: any) => Promise<any>, url: string, data?: any) => {
    try {
      return await method(
        `${HIGHWAY_ENDPOINT}/${API_VERSION}/${url}`,
        data,
        {
          ...this.apiKey ? {
            params: { private_key: this.apiKey },
          } : {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            },
        }
      );
    } catch (error) {
      const { data } = error.response;
      throw new HighwayError(data.message, data.messageId);
    }
  }

  post = async (url: string, data?: any) => {
    return this._request(axios.post, url, data);
  };

  get = async (url: string) => {
    return this._request(axios.get, url);
  };

  delete = async (url: string) => {
    return this._request(axios.delete, url);
  };

  put = async (url: string, data?: any) => {
    return this._request(axios.put, url, data);
  };
}
