import { Method } from 'axios';

export type Endpoint = {
  method: Method;
  url: string;
  params?: any;
};

// This is just a placeholder for now to show an example of how this file will look. 
//const BASE_URL = 'https://heartense-serverless.vercel.app/api';
const BASE_URL = 'http://localhost:5000/api';

export const endpoints = {
  getHeartOx: `${BASE_URL}/sensor/data`, 
  getColour: `${BASE_URL}/actuator/colour`,
  updateColour: (
    person: string, 
    heartRateLow: string, 
    hearRateHigh: string, 
    bloodOxLow: string, 
    bloodOxHigh: string) => ({
    method: 'POST',
    url: `${BASE_URL}/actuator/colour`,
    data: {
      name: person,
      heart_rate_low: heartRateLow,
      heart_rate_high: hearRateHigh,
      blood_oxygen_low: bloodOxLow,
      blood_oxygen_high: bloodOxHigh,
    },
  }),
}