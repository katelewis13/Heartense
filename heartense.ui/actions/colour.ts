import { endpoints } from "./endpoints"
import { authenticatedAxios } from "./fetcher"

export const updateColour = (
  person: string, 
  heartRateLow:string, 
  hearRateHigh: string, 
  bloodOxLow: string, 
  bloodOxHigh: string
  ) => {

  const defaultColour = '#000000';

  if (!person) {
    throw new Error('Invalid input');
  }
  if (!heartRateLow) {
    heartRateLow = defaultColour
  }
  if (!hearRateHigh) {
    hearRateHigh = defaultColour
  }
  if (!bloodOxLow) {
    bloodOxLow = defaultColour
  }
  if (!bloodOxHigh) {
    bloodOxHigh = defaultColour
  }

  
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