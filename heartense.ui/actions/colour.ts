import { endpoints } from "./endpoints"
import { authenticatedAxios } from "./fetcher"

export const updateColour = (
  person: string, 
  heartRateLow:string, 
  hearRateHigh: string, 
  bloodOxLow: string, 
  bloodOxHigh: string
  ) => {

  
  return authenticatedAxios.request<void>(
    endpoints.updateColour(
      person, 
      heartRateLow, 
      hearRateHigh, 
      bloodOxLow, 
      bloodOxHigh
    )
  );
}