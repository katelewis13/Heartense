import { Method } from 'axios';

export type Endpoint = {
  method: Method;
  url: string;
  params?: any;
};

// This is just a placeholder for now to show an example of how this file will look. 
const api = 'http://localhost:5000/api';

export const endpoints = {
  example: `${api}/example`, 
}