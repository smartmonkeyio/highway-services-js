import { Highway } from "./src/Highway";

export function createHighway(apiKey: string, bearer?: string): Highway {
  return new Highway(apiKey, bearer);
}
