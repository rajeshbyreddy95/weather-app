// src/components/Forecast.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ForecastContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  background: #f9f9f9; // Light background for the forecast
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); // Subtle shadow
`;

const DayCard = styled.div`
  flex: 1 1 200px; // Flexible sizing with a minimum width
  background: #4caf50; // Card background color
  color: #fff;
  margin: 10px;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  h3 {
    margin: 0 0 10px;
  }

  p {
    margin: 5px 0;
    font-size: 0.9em;
  }
`;

const Forecast = ({ city }) => {
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState('');

  const fetchForecast = async () => {
    if (!city) return;

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: {
          q: city,
          appid: process.env.REACT_APP_WEATHER_API_KEY, // Replace with your OpenWeatherMap API key
          units: 'metric',
        },
      });
      setForecastData(response.data.list); // Save forecast data
    } catch (error) {
      setError('Failed to fetch forecast data');
      console.error("Error fetching forecast data", error);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, [city]); // Fetch new forecast whenever the city changes

  // Group forecast data by day
  const dailyForecasts = forecastData.reduce((acc, data) => {
    const date = new Date(data.dt * 1000).toLocaleDateString(); 
    if (!acc[date]) {
      acc[date] = []; // Initialize array for new date
    }
    acc[date].push(data); 
    return acc;
  }, {});

  return (
    <ForecastContainer>
      {error && <p>{error}</p>}
      {Object.entries(dailyForecasts).map(([date, forecasts]) => {
        const temp = forecasts.reduce((sum, f) => sum + f.main.temp, 0) / forecasts.length; // Average temperature
        const weatherDescription = forecasts[0].weather[0].description; // Use the first weather description

        return (
          <DayCard key={date}>
            <h3>{date}</h3>
            <p>{Math.round(temp)}°C</p>
            <p>{weatherDescription}</p>
            <p>Humidity: {forecasts[0].main.humidity}%</p>
            <p>Wind: {forecasts[0].wind.speed} m/s</p>
          </DayCard>
        );
      })}
    </ForecastContainer>
  );
};

export default Forecast;
