import { Highway } from "./src/Highway";
import { IHighwayOptions } from "./common/interfaces";

export function createHighway(
  apiKey: string,
  options?: IHighwayOptions,
): Highway {
  return new Highway(apiKey, options || {});
}
