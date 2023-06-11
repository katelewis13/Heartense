import { Method } from 'axios';

export type Endpoint = {
  method: Method;
  url: string;
  params?: any;
};

// This is just a placeholder for now to show an example of how this file will look. 
const BASE_URL = 'https://heartense-serverless.vercel.app/api';

export const endpoints = {
  getHeartOx: `${BASE_URL}/sensor/data`, 
  getColour: `${BASE_URL}/actuator/colour`,
  updateColour: (person: string, value: number) => ({
    method: 'POST',
    url: `${BASE_URL}/actuator/colour`,
    data: {
      key: person,
      value,
    },
  }),
}