// src/components/Header.js
import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  font-size: 2rem;
  color: #fff;
  margin: 20px;
  font-weight: bold;
`;

const Header = () => <HeaderContainer>Weather App</HeaderContainer>;

export default Header;
