import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Navbar from './components/Navbar';
import SidebarComponent from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Customers from './components/Customers';
import Orders from './components/Orders';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow: hidden;
    font-family: 'Roboto', sans-serif;
    background-color: #f0f2f5;
  }
`;

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  background-color: #fff;
  margin-left: ${({ isCollapsed }) => (isCollapsed ? '60px' : '200px')};
  transition: margin-left 0.3s;
  height: 100vh; 
`;

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarToggle = (isCollapsed) => {
    setIsSidebarCollapsed(isCollapsed);
  };

  return (
    <>
      <GlobalStyle />
      <Router>
        <Navbar /> 
        <AppContainer>
          <SidebarComponent onToggle={handleSidebarToggle} />
          <MainContent isCollapsed={isSidebarCollapsed}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </MainContent>
        </AppContainer>
      </Router>
    </>
  );
};

export default App;
