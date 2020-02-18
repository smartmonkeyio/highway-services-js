import axios from "axios";
import { HIGHWAY_ENDPOINT, API_VERSION } from "../common/constants";
import { Client } from "./Client";
import { Plan } from "./Plan";
import { Vehicle } from "./Vehicle";
import { Route } from "./Route";
import { Service } from "./Service";
import { HighwayError } from "../common/errors";
import { IHighwayOptions } from "../common/interfaces";

export class Highway {
  private _token?: string;
  private _apiKey: string;
  private apiEndpoint: string;
  private queryParams: { [param: string]: string } | undefined;

  client: Client;
  plan: Plan;
  route: Route;
  service: Service;
  vehicle: Vehicle;



  constructor(apiKey: string, options: IHighwayOptions) {
    this._token = options.bearer;
    this._apiKey = apiKey;
    this.client = new Client(this);
    this.plan = new Plan(this);
    this.route = new Route(this);
    this.service = new Service(this);
    this.vehicle = new Vehicle(this);
    this.apiEndpoint = options.apiEndpoint || HIGHWAY_ENDPOINT;
    this.queryParams = options.queryParams;
  }

  private _request = async (
    method: (url: string, data: any, headers?: any) => Promise<any>,
    url: string,
    data?: any,
  ) => {
    try {
      if (data) {
        return (
          await method(
            `${this.apiEndpoint}/api/${API_VERSION}/${url}`,
            data || {},
            {
              params: {
                ...this._apiKey ? { private_key: this._apiKey } : {},
                ...this.queryParams ? this.queryParams : {},
              },
              headers: {
                ...!this._apiKey ? { Authorization: `Bearer ${this._token}` } : {},
              },
            },
          )
        ).data;
      } else {
        return (
          await method(`${this.apiEndpoint}/api/${API_VERSION}/${url}`, {
            params: {
              ...this._apiKey ? { private_key: this._apiKey } : {},
              ...this.queryParams ? this.queryParams : {},
            },
            headers: {
              ...!this._apiKey ? { Authorization: `Bearer ${this._token}` } : {},
            },
          })
        ).data;
      }
    } catch (error) {
      if (error.code === `ENOTFOUND` || error.code === `ECONNREFUSED`) {
        throw new HighwayError(
          `${error.code} - api endpoint is not correctly set`,
          `highway.bad_endpoint`,
          0,
        );
      }
      const { data, status } = error.response;
      throw new HighwayError(
        `${status} - ${data.message}`,
        data.messageId,
        status,
      );
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
  }

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
