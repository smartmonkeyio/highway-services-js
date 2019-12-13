import Highway from "./src/Highway";
import { IHighway } from "./common/interfaces";

export function createHighway(APIKey: string, bearer: string): IHighway {
  return new Highway(APIKey, bearer);
}
