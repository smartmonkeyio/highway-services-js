import { Highway } from "./src/Highway";

export function createHighway(
  apiKey: string,
  bearer?: string,
  apiEndpoint?: string,
): Highway {
  return new Highway(apiKey, bearer, apiEndpoint);
}
