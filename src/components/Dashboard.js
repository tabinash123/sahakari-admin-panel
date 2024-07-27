import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Statistic, Table, Typography, Spin } from 'antd';
import { ShoppingCartOutlined, ShoppingOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getAllOrders } from '../repository/getAllOrdersRepository';
import { getAllProducts } from '../repository/getAllProducts';

const { Header, Content } = Layout;
const { Title } = Typography;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledHeader = styled(Header)`
  background-color: #fff;
  padding: 0 20px;
`;

const StyledContent = styled(Content)`
  margin: 24px 16px;
  padding: 24px;
  background-color: #fff;
`;

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersData, productsData] = await Promise.all([
          getAllOrders(),
          getAllProducts()
        ]);
        setOrders(ordersData);
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateOrderStats = (orders) => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    return orders.reduce((acc, order) => {
      const orderDate = new Date(order.creationDate);
      const orderTotal = order.orderDetails.reduce((sum, detail) => 
        sum + (detail.product.price * detail.quantity), 0);

      if (orderDate >= todayStart) {
        acc.today.count++;
        acc.today.total += orderTotal;
      }
      if (orderDate >= weekStart) {
        acc.week.count++;
        acc.week.total += orderTotal;
      }
      if (orderDate >= monthStart) {
        acc.month.count++;
        acc.month.total += orderTotal;
      }

      return acc;
    }, {
      today: { count: 0, total: 0 },
      week: { count: 0, total: 0 },
      month: { count: 0, total: 0 }
    });
  };

  const orderStats = calculateOrderStats(orders);

  const orderColumns = [
    { title: 'Order ID', dataIndex: 'id', key: 'id' },
    { title: 'Customer', dataIndex: 'customerName', key: 'customerName' },
    { 
      title: 'Total Amount', 
      key: 'totalAmount',
      render: (_, record) => `$${record.orderDetails.reduce((sum, detail) => 
        sum + (detail.product.price * detail.quantity), 0).toFixed(2)}`
    },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Date', dataIndex: 'creationDate', key: 'creationDate' },
  ];

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
    .slice(0, 10);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <StyledLayout>
      <StyledHeader>
        <Title level={2}>E-commerce Dashboard</Title>
      </StyledHeader>
      <StyledContent>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic 
                title="Today's Orders"
                value={orderStats.today.count}
                prefix={<ShoppingCartOutlined />}
              />
              <Statistic 
                title="Today's Revenue"
                value={orderStats.today.total}
                prefix="$"
                precision={2}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic 
                title="This Week's Orders"
                value={orderStats.week.count}
                prefix={<ShoppingCartOutlined />}
              />
              <Statistic 
                title="This Week's Revenue"
                value={orderStats.week.total}
                prefix="$"
                precision={2}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic 
                title="This Month's Orders"
                value={orderStats.month.count}
                prefix={<ShoppingCartOutlined />}
              />
              <Statistic 
                title="This Month's Revenue"
                value={orderStats.month.total}
                prefix="$"
                precision={2}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col span={24}>
            <Card title="Recent Orders (Last 10)">
              <Table 
                columns={orderColumns} 
                dataSource={recentOrders} 
                pagination={false}
              />
            </Card>
          </Col>
        </Row>
      </StyledContent>
    </StyledLayout>
  );
};

export default Dashboard;