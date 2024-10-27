// src/hooks/useWeather.js
import { useState } from 'react';
import { getWeatherData } from '../api/weatherApi';

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    setLoading(true);
    try {
      const data = await getWeatherData(city);
      setWeather(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, fetchWeather };
};
