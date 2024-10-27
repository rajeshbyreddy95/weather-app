// src/components/WeatherCard.js
import React from 'react';
import styled from 'styled-components';

const DateTime = styled.p`
  margin: 5px 0;
  font-size: 0.9em; // Smaller font size
  color: #e0e0e0; // Light color for date and time
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  background: #4caf50;
  padding: 10px; // Reduced padding for better fit
  border-radius: 8px;
  color: #fff;
  max-width: 100%; // Allow card to take full width on smaller screens
  width: 300px; // Fixed width on larger screens
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); // Add shadow for better visibility
  margin: 10px; // Margin to separate multiple cards

  @media (max-width: 400px) {
    padding: 15px; 
    width: 90%;
  }

  @media (max-width: 600px) {
    width: 80%; // Responsive width for medium screens
  }
`;

const WeatherCard = ({ data }) => {
  // Get current date and time
  const now = new Date();
  const dateString = now.toLocaleDateString(); // Format: MM/DD/YYYY
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format: HH:MM

  return (
    <Card>
      <h2>{data.name}</h2>
      <p>{data.weather[0].description}</p>
      <h1 style={{ fontSize: '2.5em', margin: '10px 0' }}>{Math.round(data.main.temp)}°C</h1>
      <p style={{ margin: '5px 0' }}>Humidity: {data.main.humidity}%</p>
      <p style={{ margin: '5px 0' }}>Wind: {data.wind.speed} m/s</p>
      <DateTime>{dateString}</DateTime> {/* Display the current date */}
      <DateTime>{timeString}</DateTime> {/* Display the current time */}
    </Card>
  );
};

export default WeatherCard;
