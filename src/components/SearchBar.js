// src/components/SearchBar.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: row; // Align items in a row
  margin-bottom: 20px;
  gap:10px;
  position: relative; // for positioning the dropdown
  background-color: white; // White background
  border-radius: 5px; // Rounded corners
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); // Subtle shadow
  width: 100%; // Full width

  @media (max-width: 600px) {
  background-color: white;
    flex-direction: column; // Stack input and button on small screens
  }
`;

const InputField = styled.input`
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px ; // Rounded corners for left side
  border: 1px solid #ccc;
  width: 94%; // Full width for the input
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); // Inner shadow for input
  transition: border-color 0.3s; // Smooth border change

  &:focus {
    border-color: #2196f3; // Change border color on focus
    outline: none; // Remove default outline
  }

  @media (max-width: 600px) {
    margin-bottom: 10px; // Space below input on small screens
  }
`;

const SearchButton = styled.button`
  padding: 10px 15px;
  background-color: #2196f3;
  color: #fff;
  border: none;
  border-radius: 5px; // Rounded corners for right side
  cursor: pointer;
  transition: background-color 0.3s; // Smooth background change

  &:hover {
    background-color: #1976d2; // Darker blue on hover
  }

  @media (max-width: 600px) {
    flex-shrink: 0; // Prevent button from shrinking
  }
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  
  border: 1px solid #ccc;
  border-radius: 5px;
  list-style-type: none;
  padding: 0;
  margin: 5px 0 0 0;
  max-height: 200px; // Increased height for better visibility
  overflow-y: auto;
  z-index: 1000; // ensure it appears above other elements
`;

const SuggestionItem = styled.li`
  padding: 10px; // Increased padding for touch targets
  cursor: pointer;
  transition: background-color 0.3s; // Smooth background change
  color:tomato;
  &:hover {
    background-color: #f0f0f0; // Light grey on hover
  }
`;

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Function to fetch city suggestions
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/find`, {
        params: {
          q: query,
          appid: process.env.REACT_APP_WEATHER_API_KEY, // Ensure this is defined
          units: 'metric',
          cnt: 5 // Limit suggestions to 5
        }
      });
      setSuggestions(response.data.list);
    } catch (error) {
      console.error("Error fetching city suggestions", error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      fetchSuggestions(input);
    }, 300); // Fetch suggestions after 300ms of typing

    return () => clearTimeout(debounceFetch); // Cleanup the timeout
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      onSearch(input);
      setInput('');
      setSuggestions([]); // Clear suggestions after search
    }
  };

  const handleSuggestionClick = (city) => {
    setInput(city.name); // Set input to clicked city name
    setSuggestions([]); // Clear suggestions
    onSearch(city.name); // Trigger the search
  };

  return (
    <InputContainer>
      <InputField
        type="text"
        placeholder="Enter city..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <SearchButton onClick={handleSubmit}>Search</SearchButton>
      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((city) => (
            <SuggestionItem key={city.id} onClick={() => handleSuggestionClick(city)}>
              {city.name}, {city.sys.country} {/* Display city and country */}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </InputContainer>
  );
};

export default SearchBar;
