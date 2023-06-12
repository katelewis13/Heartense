import useSWR from 'swr';
import { fetcher } from '../actions/fetcher';
import { endpoints } from '../actions/endpoints';
import { SensorReading } from '../types/sensorReading';

export type SingleReading = {
  name: string;
  heartRate: number;
  bloodOxygen: number;
}

export const useSensorData = () => {
  const { data: sensorData, error, mutate } = useSWR<SensorReading[]>(endpoints.getHeartOx, fetcher, { refreshInterval: 5000 });

  let latestReadings: SingleReading[] = [];
  if (!!sensorData) {
    const latest = sensorData[sensorData.length - 2]

    latestReadings = Object.entries(latest)
    .filter(([key, _]) => key !== 'recorded_on')
    .map(([key, value]) => {
      const val = value as { heart_rate: number; blood_oxygen: number };
      return { name: key, heartRate: val.heart_rate, bloodOxygen: val.blood_oxygen };
    });

  }

  return{
    data: sensorData ?? [],
    latest: latestReadings ?? [],
    isLoading: !sensorData && !error,
    hasError: !!error,
  }
}