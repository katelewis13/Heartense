import useSWR from 'swr';
import { fetcher } from '../actions/fetcher';
import { endpoints } from '../actions/endpoints';
import { SensorReading } from '../types/sensorReading';

export const useSensorData = () => {
  const { data: sensorData, error, mutate } = useSWR<SensorReading>(endpoints.getHeartOx, fetcher, { refreshInterval: 5000 });

  return{
    data: sensorData ?? [],
    isLoading: !sensorData && !error,
    hasError: !!error,
  }
}