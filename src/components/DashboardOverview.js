import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col, Card, Statistic, Typography } from 'antd';
import {
  DollarOutlined,
  ShoppingCartOutlined,
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
    ordersOrdered: 0,
    ordersDelivered: 0,
    todayOrders: 0,
    thisMonthSales: 0,
    allTimeSales: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        if (Array.isArray(data)) {
          setOrders(data);
          calculateOrderSummary(data);
        } else {
          throw new Error('Data is not an array');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders');
      }
    };

    fetchOrders();
  }, []);

  const calculateOrderSummary = (orders) => {
    const today = new Date().toISOString().split('T')[0];
    const thisMonth = new Date().toISOString().slice(0, 7); // Get 'YYYY-MM' format

    let thisMonthSales = 0;
    let allTimeSales = 0;

    const summary = {
      totalOrders: orders.length,
      ordersOrdered: 0,
      ordersDelivered: 0,
      todayOrders: 0,
    };

    orders.forEach(order => {
      const orderDate = order.creationDate.split('T')[0];
      const orderMonth = order.creationDate.slice(0, 7);
      const orderTotal = order.orderDetails.reduce((total, detail) => total + (detail.product.price * detail.quantity), 0);

      if (orderDate === today) {
        summary.todayOrders += 1;
      }
      if (orderMonth === thisMonth) {
        thisMonthSales += orderTotal;
      }
      allTimeSales += orderTotal;

      if (order.status === 'ORDERED') {
        summary.ordersOrdered += 1;
      } else if (order.status === 'DELIVERED') {
        summary.ordersDelivered += 1;
      }
    });

    setOrderSummary({
      ...summary,
      thisMonthSales,
      allTimeSales,
    });
  };

  const stats = [
    {
      title: "Today's Orders",
      value: `$${orderSummary.todayOrders.toFixed(2)}`,
      cash: "$0.00",
      card: "$0.00",
      credit: "$0.00",
      color: '#00a693', // teal
      icon: <ShoppingCartOutlined style={{ fontSize: '24px', color: '#fff' }} />,
    },
    {
      title: "This Month",
      value: `$${orderSummary.thisMonthSales.toFixed(2)}`,
      color: '#0055ff', // blue
      icon: <ShoppingOutlined style={{ fontSize: '24px', color: '#fff' }} />,
    },
    {
      title: "All-Time Sales",
      value: `$${orderSummary.allTimeSales.toFixed(2)}`,
      color: '#00aa55', // green
      icon: <DollarOutlined style={{ fontSize: '24px', color: '#fff' }} />,
    },
  ];

  const summaryStats = [
    {
      title: 'Total Orders',
      value: orderSummary.totalOrders,
      color: '#ffa500', // orange
      icon: <ShoppingOutlined style={{ fontSize: '24px', color: '#ffa500' }} />,
    },
    {
      title: 'Orders Ordered',
      value: orderSummary.ordersOrdered,
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
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {stats.map(stat => (
              <Col span={6} key={stat.title}>
                <CardContainer color={stat.color}>
                  <div>{stat.icon}</div>
                  <StatisticTitle
                    title={stat.title}
                    value={stat.value}
                    precision={2}
                    valueStyle={{ color: '#fff' }}
                  />
                  <CashDetails>
                    <p>Cash: {stat.cash}</p>
                    <p>Card: {stat.card}</p>
                    <p>Credit: {stat.credit}</p>
                  </CashDetails>
                </CardContainer>
              </Col>
            ))}
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
            {summaryStats.map(summary => (
              <Col span={8} key={summary.title}>
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
        </>
      )}
    </div>
  );
};

export default DashboardOverview;
