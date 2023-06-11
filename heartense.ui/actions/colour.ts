import { endpoints } from "./endpoints"
import { authenticatedAxios } from "./fetcher"

export const updateColour = (setting: string, value: number) => {
  
  return authenticatedAxios.request<void>(endpoints.updateColour(setting, value));
}