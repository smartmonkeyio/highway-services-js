import axios from "axios";
import { HIGHWAY_ENDPOINT, API_VERSION } from "../common/constants";
import {
  IHighway,
  IClientClass,
  IPlanClass,
  IRouteClass,
  IServiceClass,
  IVehicleClass
} from "../common/interfaces";
import Client from "./Client";
import Plan from "./Plan";
import Vehicle from "./Vehicle";
import Route from "./Route";
import Service from "./Service";

class Highway implements IHighway {
  token?: String;
  apiKey: String;

  client: IClientClass;
  plan: IPlanClass;
  route: IRouteClass;
  service: IServiceClass;
  vehicle: IVehicleClass;

  constructor(APIKey: string, bearer: string) {
    this.token = bearer;
    this.apiKey = APIKey;
    this.client = new Client(this);
    this.plan = new Plan(this);
    this.route = new Route(this);
    this.service = new Service(this);
    this.vehicle = new Vehicle(this);
  }

  post = async (url: string, data: Object) => {
    if (this.token) {
      return await axios.post(
        `${HIGHWAY_ENDPOINT}/${API_VERSION}/${url}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
      );
    } else {
      return await axios.post(
        `${HIGHWAY_ENDPOINT}/${API_VERSION}/${url}`,
        data,
        { params: { private_key: this.apiKey } }
      );
    }
  };

  get = async (url: string) => {
    if (this.token) {
      const response = axios.get(`${HIGHWAY_ENDPOINT}/${API_VERSION}/${url}`, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      return response;
    } else {
      const response = axios.get(`${HIGHWAY_ENDPOINT}/${API_VERSION}/${url}`, {
        params: { private_key: this.apiKey }
      });
      return response;
    }
  };

  delete = async (url: string) => {
    if (this.token) {
      const response = await axios.delete(
        `${HIGHWAY_ENDPOINT}/${API_VERSION}/${url}`,
        { headers: { Authorization: `Bearer ${this.token}` } }
      );
      return response;
    } else {
      const response = await axios.delete(
        `${HIGHWAY_ENDPOINT}/${API_VERSION}/${url}`,
        { params: { private_key: this.apiKey } }
      );
      return response;
    }
  };

  put = async (url: string, data: Object) => {
    if (this.token) {
      const response = await axios.put(
        `${HIGHWAY_ENDPOINT}/${API_VERSION}/${url}`,
        data,
        { headers: { Authorization: `Bearer ${this.token}` } }
      );
      return response;
    } else {
      return await axios.put(
        `${HIGHWAY_ENDPOINT}/${API_VERSION}/${url}`,
        data,

        { params: { private_key: this.apiKey } }
      );
    }
  };
}

export default Highway;
