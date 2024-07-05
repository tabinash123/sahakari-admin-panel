import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col, Card, Statistic, Typography } from 'antd';
import {
  DollarOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
  ShoppingOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { getAllOrders } from '../repository/getAllOrdersRepository'; // Adjust the path as necessary

const { Text } = Typography;

const OverviewTitle = styled.h2`
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const CardContainer = styled(Card)`
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: ${({ color }) => color || '#f9f9f9'};
  border: none;
  color: #fff;
  text-align: center;
  padding: 20px 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .ant-card-body {
    padding: 0;
  }
`;

const StatisticTitle = styled(Statistic)`
  .ant-statistic-title {
    font-weight: 600;
    color: #fff;
    font-size: 16px;
  }
  .ant-statistic-content {
    color: #fff;
    font-size: 24px;
    font-weight: 700;
  }
`;

const CashDetails = styled.div`
  color: #fff;
  font-size: 12px;
  margin-top: 10px;

  p {
    margin: 0;
  }
`;

const DashboardOverview = () => {
  const [orders, setOrders] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    totalOrders: 0,
    ordersPending: 0,
    ordersProcessing: 0,
    ordersDelivered: 0
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
        calculateOrderSummary(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const calculateOrderSummary = (orders) => {
    const summary = {
      totalOrders: orders.length,
      ordersPending: orders.filter(order => order.status === 'PENDING').length,
      ordersProcessing: orders.filter(order => order.status === 'PROCESSING').length,
      ordersDelivered: orders.filter(order => order.status === 'DELIVERED').length,
    };
    setOrderSummary(summary);
  };

  const stats = [
    {
      title: "Today's Orders",
      value: orders.length, // Adjust this based on your data
      cash: 0.00,
      card: 0.00,
      credit: 0.00,
      color: '#00a693', // teal
      icon: <ShoppingCartOutlined style={{ fontSize: '24px', color: '#fff' }} />,
    },

    {
      title: "This Month",
      value: 32091.17,
      color: '#ffa500', // blue
      icon: <DollarOutlined style={{ fontSize: '24px', color: '#fff' }} />,
    },

    {
      title: "All-Time Sales",
      value: 116206.98,
      color: '#00aa55', // green
      icon: <DollarOutlined style={{ fontSize: '24px', color: '#fff' }} />,
    },
  ];

  const orderSummaryData = [
    {
      title: 'Total Orders',
      value: orderSummary.totalOrders,
      color: '#ffa500', // orange
      icon: <ShoppingOutlined style={{ fontSize: '24px', color: '#ffa500' }} />,
    },
    {
      title: 'Orders Pending',
      value: orderSummary.ordersPending,
      color: '#ff4d4f', // red
      icon: <WarningOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />,
    },
    {
      title: 'Orders Processing',
      value: orderSummary.ordersProcessing,
      color: '#0055ff', // blue
      icon: <SyncOutlined style={{ fontSize: '24px', color: '#0055ff' }} />,
    },
    {
      title: 'Orders Delivered',
      value: orderSummary.ordersDelivered,
      color: '#00aa55', // green
      icon: <CheckCircleOutlined style={{ fontSize: '24px', color: '#00aa55' }} />,
    },
  ];

  return (
    <div>
      <OverviewTitle>Dashboard Overview</OverviewTitle>
      <Row gutter={[16, 16]}>
        {stats.map(stat => (
          <Col span={5} key={stat.title}>
            <CardContainer color={stat.color}>
              <div>{stat.icon}</div>
              <StatisticTitle
                title={stat.title}
                value={stat.value}
                precision={2}
                valueStyle={{ color: '#fff' }}
              />
            </CardContainer>
          </Col>
        ))}
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {orderSummaryData.map(summary => (
          <Col span={6} key={summary.title}>
            <CardContainer color="#fff" style={{ color: summary.color }}>
              <div>{summary.icon}</div>
              <Statistic
                title={summary.title}
                value={summary.value}
                valueStyle={{ color: summary.color }}
              />
            </CardContainer>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DashboardOverview;
