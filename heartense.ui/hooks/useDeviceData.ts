import useSWR from 'swr';
import { fetcher } from '../actions/fetcher';
import { endpoints } from '../actions/endpoints';
import { DeviceColour } from '../types/deviceColours';

export const useDeviceData = () => {
  const { data: devices, error, mutate } = useSWR<DeviceColour[]>(endpoints.getColour, fetcher, { refreshInterval: 5000 });

  return{
    data: devices ?? [],
    isLoading: !devices && !error,
    hasError: !!error,
  }
}