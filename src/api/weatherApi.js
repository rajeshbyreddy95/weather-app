// src/api/weatherApi.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY ;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const getWeatherData = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching the weather data", error);
    throw error;
  }
};
