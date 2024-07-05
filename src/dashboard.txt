import React from 'react';
import styled from 'styled-components';
import DashboardOverview from './DashboardOverview';
import RecentOrders from './RecentOrders';

const DashboardWrapper = styled.div`
  height: 100vh;
  overflow: auto;
  background-color: #f0f2f5; /* Subtle background color */
`;

const DashboardContainer = styled.div`
  padding: 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 40px;
  overflow-y: auto; /* Enable vertical scrolling */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Added subtle elevation */
`;

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <DashboardContainer>
        <DashboardOverview />
        <RecentOrders />
      </DashboardContainer>
    </DashboardWrapper>
  );
};

export default Dashboard;
