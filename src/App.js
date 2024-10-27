// src/App.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useWeather } from './hooks/useWeather';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Forecast from './components/ForeCast';
import WeatherCard from './components/WeatherCard';
import './styles/App.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  max-width: 600px;
  margin: auto;
`;

function App() {
  const [city, setCity] = useState('New York');
  const { weather, loading, fetchWeather } = useWeather();

  const handleSearch = (city) => {
    setCity(city);
    fetchWeather(city);
  };

  return (
    <Container>
      <Header />
      <SearchBar onSearch={handleSearch} />
      {loading ? <p>Loading...</p> : weather && <WeatherCard data={weather} />}
      <h1>Weather Forecast for {city}</h1>
      <Forecast city={city}/>
    </Container>
  );
}

export default App;
