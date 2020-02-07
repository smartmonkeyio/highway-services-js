import * as dotenv from "dotenv";

dotenv.config();

export const HIGHWAY_ENDPOINT =
  process.env.HIGHWAY_ENDPOINT || `https://highwayservices.smartmonkey.io/api`;
export const API_VERSION = process.env.API_VERSION || `v1`;
export const USER_AGENT = process.env.USER_AGENT || `SmartMonkeyApiClientJS`;
